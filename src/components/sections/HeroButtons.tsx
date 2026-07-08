import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface HeroButtonsProps {
  scheduleLabel: string;
  viewWorkLabel: string;
  toastScheduleTitle: string;
  toastScheduleDescription: string;
  toastViewWorkTitle: string;
  toastViewWorkDescription: string;
}

export function HeroButtons({
  scheduleLabel,
  viewWorkLabel,
  toastScheduleTitle,
  toastScheduleDescription,
  toastViewWorkTitle,
  toastViewWorkDescription,
}: HeroButtonsProps) {
  const handleScheduleConversation = () => {
    toast.success(toastScheduleTitle, {
      description: toastScheduleDescription,
      duration: 5000,
    });
  };

  const handleViewWork = () => {
    toast.info(toastViewWorkTitle, {
      description: toastViewWorkDescription,
      duration: 5000,
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Primary Button */}
      <button
        onClick={handleScheduleConversation}
        className="group inline-flex items-center justify-center gap-2 rounded-md bg-cyan-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:-translate-y-px hover:shadow-cyan-500/40 active:scale-[0.98] dark:bg-cyan-400 dark:text-secondary-950"
      >
        {scheduleLabel}
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </button>

      {/* Secondary Button */}
      <button
        onClick={handleViewWork}
        className="inline-flex items-center justify-center gap-2 rounded-md border border-secondary-300 px-5 py-3 text-sm font-medium text-secondary-700 transition-all duration-200 hover:border-cyan-500/70 hover:text-cyan-600 active:scale-[0.98] dark:border-secondary-700 dark:text-secondary-200 dark:hover:border-cyan-400/60 dark:hover:text-cyan-400"
      >
        {viewWorkLabel}
      </button>
    </div>
  );
}
