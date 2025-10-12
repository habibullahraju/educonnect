import {
  ENROLLMENT_DATA,
  getInstructorDashboardData,
} from "@/lib/dashboard-helper";
import { getCourseDetails } from "@/queries/courses";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const EnrollmentsPage = async ({ params: { courseId } }) => {
  const course = await getCourseDetails(courseId);
  const allEnrollments = await getInstructorDashboardData(ENROLLMENT_DATA);
  const enrollmentsForCourse = allEnrollments.filter(
    (enrollment) => enrollment?.course.toString() == courseId
  );

  return (
    <div className="p-6">
      <h2>{course?.title}</h2>
      <DataTable columns={columns} data={enrollmentsForCourse} />
    </div>
  );
};

export default EnrollmentsPage;
