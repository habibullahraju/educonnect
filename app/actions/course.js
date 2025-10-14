"use server";
import { getLoggedInUser } from "@/lib/loggedInUser";
import { Course } from "@/model/course-model";
import { create } from "@/queries/courses";

export async function createCourse(data) {
  try {
    const loggedInUser = await getLoggedInUser();
    data["instructor"] = loggedInUser?.id;
    const course = await create(data);
    return course;
  } catch (error) {
    throw new Error(error);
  }
}
export async function updateCourse(courseId, updateToData) {
  try {
    await Course.findByIdAndUpdate(courseId, updateToData);
  } catch (error) {
    throw new Error(error)
  }
}