import { replaceMongoIdInArray } from "@/lib/convertData";
import { Testimonial } from "@/model/testimonials.model";

export async function getTestimonialsForCourse(courseId) {
  const testimonials = await Testimonial.find({ courseId: courseId }).lean();

  return replaceMongoIdInArray(testimonials);
}
