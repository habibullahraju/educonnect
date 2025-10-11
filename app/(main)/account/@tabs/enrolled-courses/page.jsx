import { auth } from "@/auth";
import { getEnrollmentsForUser } from "@/queries/enrollments";
import { getUserByEmail } from "@/queries/users";
import { redirect } from "next/navigation";
import EnrolledCourseCard from "../../component/EnrolledCourseCard";
async function EnrolledCourses() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }
  const loggedInUser = await getUserByEmail(session?.user?.email);
  const enrollments = await getEnrollmentsForUser(loggedInUser?.id);
  console.log(enrollments);

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {enrollments && enrollments.length > 0 ? (
        <>
          {enrollments?.map((enrollment) => (
            <EnrolledCourseCard key={enrollment} enrollment={enrollment} />
          ))}
        </>
      ) : (
        <p>No Enrolments Found</p>
      )}
    </div>
  );
}

export default EnrolledCourses;
