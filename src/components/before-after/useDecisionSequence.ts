import { useEffect, useRef, useState } from "react";

interface DecisionSequence {
  rootRef: React.RefObject<HTMLDivElement>;
  step: number; // 0=idle, 1..N=señales, N+1=decisión
  beforeDimmed: boolean; // el "antes" arranca vivo y se apaga
}

export function useDecisionSequence(
  signalsCount: number,
  sceneIdx: number,
): DecisionSequence {
  const [step, setStep] = useState(0);
  const [beforeDimmed, setBeforeDimmed] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  // La secuencia arranca cuando la sección entra en viewport, no al montar:
  // así el usuario siempre ve el "antes" encendido antes de que se apague.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    setStep(0);
    const total = signalsCount + 1;
    if (reduced) {
      setBeforeDimmed(true);
      setStep(total);
      return;
    }
    // El "antes" arranca a plena opacidad, se sostiene un instante y se apaga.
    // Solo cuando termina ese apagado arranca el razonamiento del "después".
    setBeforeDimmed(false);
    const fade = window.setTimeout(() => setBeforeDimmed(true), 1400);
    const base = 3400; // el razonamiento empieza tras apagarse el "antes"
    const timers = Array.from({ length: total }, (_, k) =>
      window.setTimeout(() => setStep(k + 1), base + k * 620),
    );
    timers.push(fade);
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [sceneIdx, reduced, inView, signalsCount]);

  return { rootRef, step, beforeDimmed };
}