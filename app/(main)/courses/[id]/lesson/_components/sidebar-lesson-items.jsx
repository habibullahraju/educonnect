import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";

export default function SidebarLessonItems() {
  const isActive = true;
  const isCompleted = true;
  return (
    <>
      <button
        type="button"
        className={cn(
          "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600 ",
          isActive && "text-slate-700  hover:text-slate-700",
          isCompleted && "text-emerald-700 hover:text-emerald-700"
        )}
      >
        <div className="flex items-center gap-x-2">
          <CheckCircle
            size={16}
            className={cn(
              "text-slate-500",
              isActive && "text-slate-700",
              isCompleted && "text-emerald-700"
            )}
          />
          Introduction
        </div>
      </button>
      {/* not active and completed */}
      <button
        type="button"
        className={cn(
          "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600 ",
          false && "text-slate-700  hover:text-slate-700",
          isCompleted && false && "text-emerald-700 hover:text-emerald-700"
        )}
      >
        <div className="flex items-center gap-x-2">
          <PlayCircle
            size={16}
            className={cn("text-slate-500", isActive && "text-slate-700")}
          />
          What is React ?
        </div>
      </button>
      {/* lock*/}
      <button
        type="button"
        className={cn(
          "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600",
          false && "text-slate-700  hover:text-slate-700",
          isCompleted && false && "text-emerald-700 hover:text-emerald-700"
        )}
      >
        <div className="flex items-center gap-x-2">
          <Lock
            size={16}
            className={cn("text-slate-500", isActive && "text-slate-700")}
          />
          What is React ?
        </div>
      </button>
    </>
  );
}
