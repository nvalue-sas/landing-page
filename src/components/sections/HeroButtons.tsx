import { Sparkles, ArrowRight, Code } from "lucide-react";
import { toast } from "sonner";

export function HeroButtons() {
  const handleStartProject = () => {
    toast.success("✨ ¡Genial!", {
      description:
        "Estamos trabajando en una experiencia increíble para ti. Pronto podrás iniciar tu proyecto directamente aquí.",
      duration: 5000,
    });
  };

  const handleViewWork = () => {
    toast.info("🚀 Próximamente", {
      description:
        "Estamos preparando nuestro portafolio con proyectos asombrosos. ¡Vuelve pronto!",
      duration: 5000,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
      <button
        onClick={handleStartProject}
        className="group relative overflow-hidden rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/40 active:scale-[0.98]"
      >
        <span className="relative z-10 flex items-center gap-2">
          <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
          Iniciar Proyecto con IA
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </span>
      </button>
      <button
        onClick={handleViewWork}
        className="rounded-xl border-gray-700 bg-transparent px-8 py-4 text-cyan-600 transition-all hover:scale-[1.02] hover:bg-cyan-500/10 dark:text-secondary-100 dark:hover:border-cyan-400 dark:hover:text-cyan-400"
      >
        <span className="relative z-10 flex items-center gap-2">
          <Code className="h-5 w-5" />
          Ver Nuestro Trabajo
        </span>
      </button>
    </div>
  );
}
