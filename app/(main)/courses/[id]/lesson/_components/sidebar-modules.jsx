import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SidebarLesson from "./sidebar-lesson";

export default function SidebarModules() {

  return (
    <Accordion
      defaultValue="item-1"
      type="single"
      collapsible
      className="w-full px-6"
    >
      {/* item */}
      <AccordionItem className="border-0" value="item-1">
        <AccordionTrigger>Introduction </AccordionTrigger>
        <SidebarLesson />
      </AccordionItem>
    </Accordion>
  );
}
