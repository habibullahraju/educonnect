"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { replaceMongoIdInArray } from "@/lib/convertData";
import { useSearchParams } from "next/navigation";
import SidebarLesson from "./sidebar-lesson";

export default function SidebarModules({ courseId, module }) {
  const searchParams = useSearchParams();
  const allModules = replaceMongoIdInArray(module).toSorted(
    (a, b) => a.order - b.order
  );
  const query = searchParams.get("name");
  const expandedModule = allModules.find((module) => {
    return module.lessonIds.find((lesson) => {
      return lesson.slug === query;
    });
  });
  const expandedMoudleId = expandedModule?.id ?? allModules[0].id;

  return (
    <Accordion
      defaultValue={expandedMoudleId}
      type="single"
      collapsible
      className="w-full px-6"
    >
      {/* item */}
      {allModules.map((module) => (
        <AccordionItem key={module.id} className="border-0" value={module.id}>
          <AccordionTrigger>{module.title} </AccordionTrigger>
          <SidebarLesson courseId={courseId} lessons={module.lessonIds} module={module.slug} />
        </AccordionItem>
      ))}
    </Accordion>
  );
}
