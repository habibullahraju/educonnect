"use client";

import { Trash } from "lucide-react";

import { changeModulePublishedState, deleteModule } from "@/app/actions/module";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const ModuleActions = ({ module, courseId }) => {
  const router = useRouter();
  const [action, setAction] = useState(null);
  const [published, setPublished] = useState(module?.active);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      switch (action) {
        case "change-action": {
          const activeState = await changeModulePublishedState(module.id);
          setPublished(!activeState);
          toast.success("Module has been updated!");
          router.refresh();
          break;
        }
        case "delete": {
          if (published) {
            toast.error(
              "A published module can't be DELETED.First unpublished it, after that you can DELETE it"
            );
          } else {
            await deleteModule(module.id, courseId);
            router.push(`/dashboard/courses/${courseId}`);
          }
          break;
        }
        default: {
          throw new Error("Invalid lesson action!");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAction("change-action")}
        >
          {published ? "Unpublish" : "Publish"}
        </Button>

        <Button size="sm" onClick={() => setAction("delete")}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};
