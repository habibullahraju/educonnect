import { replaceMongoIdInArray } from "@/lib/convertData";
import { Enrollment } from "@/model/enrollment-model";

export async function getEnrollmentsForCourse(courseId) {
  const course = await Enrollment.find({ course: courseId }).lean();

  return replaceMongoIdInArray(course);
}
