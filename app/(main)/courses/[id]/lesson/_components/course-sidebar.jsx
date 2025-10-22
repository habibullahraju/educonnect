import { CourseProgress } from "@/components/course-progress";
import { getLoggedInUser } from "@/lib/loggedInUser";
import { Watch } from "@/model/watch-model";
import { getCourseDetails } from "@/queries/courses";
import DownloadCertificate from "./download-certificate";
import GiveReview from "./give-review";
import SidebarModules from "./sidebar-modules";
import { getAReport } from "@/queries/reports";

export const CourseSidebar = async ({ courseId }) => {
  const loggedInUser = await getLoggedInUser();
  const course = await getCourseDetails(courseId);
  const report = await getAReport({course: courseId, student: loggedInUser.id});
  const tatalCompletedModule = report?.totalCompletedModeules ? report.totalCompletedModeules.length : 0;
  const totalModule = course.modules ? course?.modules.length : 0;

  const totalProgress = (totalModule > 0 ) ? (tatalCompletedModule/totalModule) * 100 : 0;
console.log('raju',{tatalCompletedModule, totalModule, totalProgress})
  const updatedModules = await Promise.all(
    course?.modules.map(async (module) => {
      const moduleId = module._id.toString();
      const lessons = module?.lessonIds;

      const updatedLessons = await Promise.all(
        lessons.map(async (lesson) => {
          const lessonId = lesson._id.toString();
          const watch = await Watch.findOne({
            lesson: lessonId,
            module: moduleId,
            user: loggedInUser.id,
          }).lean();
          if (watch?.state === "completed") {
            console.log(`This lesson ${lesson.title} has completed`);
            lesson.state = "completed";
          }
          return lesson;
        })
      );
      return module;
    })
  );

  console.log({ updatedModules });
  return (
    <>
      <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <div className="p-8 flex flex-col border-b">
          <h1 className="font-semibold">Reactive Accelerator</h1>
          {
            <div className="mt-10">
              <CourseProgress variant="success" value={totalProgress} />
            </div>
          }
        </div>
        <SidebarModules courseId={courseId} module={updatedModules} />
        <div className="w-full px-6">
          <DownloadCertificate courseId={courseId} />
          <GiveReview courseId={courseId} />
        </div>
      </div>
    </>
  );
};
