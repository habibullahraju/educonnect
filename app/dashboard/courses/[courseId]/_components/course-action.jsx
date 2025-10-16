"use client";

import { Trash } from "lucide-react";

import { changeCoursePublishedState, deleteCourse } from "@/app/actions/course";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const CourseActions = ({ courseId, isActive }) => {
  const router = useRouter();
  const [action, setAction] = useState(null);
  const [published, setPublished] = useState(isActive);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      switch (action) {
        case "change-action": {
          const activeState = await changeCoursePublishedState(courseId);
          setPublished(!activeState);
          toast.success("The course has been update successfully!");
          router.refresh();
          break;
        }
        case "delete": {
          if (published) {
            toast.error(
              "A published course can't be DELETED.First unpublished it, after that you can DELETE it"
            );
          } else {
            await deleteCourse(courseId);
            toast.success("Course has been deleted successfully");
            router.push("/dashboard/courses");
          }
          break;
        }
        default: {
          throw new Error("invalid course action");
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
