import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Quizset } from "@/model/quizsets-model";
import { Quiz } from "@/model/quizzes-model";

export async function getAllQuizsets() {
  try {
    const quizSets = await Quizset.find().lean();
    return replaceMongoIdInArray(quizSets);
  } catch (error) {
    throw new Error(error);
  }
}
export async function getQuizSetById(id) {
  try {
    const quizSet = await Quizset.findById(id)
      .populate({
        path: "quizIds",
        medel: Quiz,
      })
      .lean();
    return replaceMongoIdInObject(quizSet);
  } catch (error) {
    throw new Error(error);
  }
}
