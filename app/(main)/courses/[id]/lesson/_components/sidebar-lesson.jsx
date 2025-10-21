import { AccordionContent } from "@/components/ui/accordion";
import { replaceMongoIdInArray } from "@/lib/convertData";
import SidebarLessonItems from "./sidebar-lesson-items";

export default function SidebarLesson({ courseId, lessons, module }) {
  const allLessons = replaceMongoIdInArray(lessons).toSorted(
    (a, b) => a.order - b.order
  );

  return (
    <AccordionContent>
      <div className="flex flex-col w-full gap-3">
        {allLessons.map((lesson) => (
          <SidebarLessonItems
            key={lesson.id}
            lesson={lesson}
            module={module}
            courseId={courseId}
          />
        ))}
      </div>
    </AccordionContent>
  );
}
