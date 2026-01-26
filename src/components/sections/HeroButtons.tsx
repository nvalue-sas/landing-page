import { Sparkles, ArrowRight, Eye } from "lucide-react";
import { toast } from "sonner";

export function HeroButtons() {
  const handleStartProject = () => {
    toast.success("¡Genial!", {
      description:
        "Estamos trabajando en una experiencia increíble para ti. Pronto podrás iniciar tu proyecto directamente aquí.",
      duration: 5000,
    });
  };

  const handleViewWork = () => {
    toast.info("Próximamente", {
      description:
        "Estamos preparando nuestro portafolio con proyectos asombrosos. ¡Vuelve pronto!",
      duration: 5000,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row sm:gap-6">
      {/* Primary Button */}
      <button
        onClick={handleStartProject}
        className="group relative overflow-hidden rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
      >
        {/* Animated shine effect */}
        <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        <span className="relative z-10 flex items-center gap-2.5">
          <Sparkles className="h-5 w-5 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
          Iniciar Proyecto con IA
          <ArrowRight className="h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
        </span>
      </button>

      {/* Secondary Button */}
      <button
        onClick={handleViewWork}
        className="group relative overflow-hidden rounded-xl border border-transparent bg-transparent px-8 py-4 font-semibold text-cyan-600 transition-all duration-300 hover:scale-[1.02] hover:bg-cyan-500/10 active:scale-[0.98] dark:text-white dark:hover:border-cyan-400/50 dark:hover:text-cyan-400"
      >
        {/* Subtle shine effect */}
        <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-cyan-400/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        <span className="relative z-10 flex items-center gap-2.5">
          <Eye className="h-5 w-5 transition-all duration-300 group-hover:scale-110" />
          Ver Nuestro Trabajo
          <ArrowRight className="h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
        </span>
      </button>
    </div>
  );
}
