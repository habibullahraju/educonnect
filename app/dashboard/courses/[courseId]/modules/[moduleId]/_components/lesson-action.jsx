"use client";

import { Trash } from "lucide-react";

import { changeLessonPublishedState, deleteLesson } from "@/app/actions/lesson";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const LessonActions = ({ lesson, moduleId, onDelete }) => {
  const [action, setAction] = useState(null);
  const [published, setPublished] = useState(lesson?.active);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      switch (action) {
        case "change-action": {
          const activeState = await changeLessonPublishedState(lesson.id);
          setPublished(!activeState);
          toast.success("Lesson has been updated!");
          break;
        }
        case "delete": {
          if (published) {
            toast.error(
              "A published lesson can't be DELETED.First unpublished it, after that you can DELETE it"
            );
          } else {
            await deleteLesson(lesson.id, moduleId);
            onDelete();
            toast.success("Lesson has been DELETED successfully");
          }
          break;
        }
        default: {
          throw new Error("Invalid lesson action!");
        }
      }
    } catch (error) {
      toast.error(error?.message);
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
