"use server";

import { getSlug } from "@/lib/convertData";
import { Quizset } from "@/model/quizsets-model";
import { createQuiz } from "@/queries/quizzes";

export async function updateQuizSet(quizSetId, updateToData) {
  try {
    await Quizset.findByIdAndUpdate(quizSetId, updateToData);
  } catch (error) {
    throw new Error(error);
  }
}

export async function addQuizToQuizSet(quizSetId, quizData) {
  try {
    const transformedQuizData = {};
    transformedQuizData["title"] = quizData.title;
    transformedQuizData["description"] = quizData.description;
    transformedQuizData["slug"] = getSlug(quizData.title);
    transformedQuizData["options"] = [
      {
        text: quizData.optionA.label,
        is_correct: quizData.optionA.isTrue,
      },
      {
        text: quizData.optionB.label,
        is_correct: quizData.optionB.isTrue,
      },
      {
        text: quizData.optionC.label,
        is_correct: quizData.optionC.isTrue,
      },
      {
        text: quizData.optionD.label,
        is_correct: quizData.optionD.isTrue,
      },
    ];
    const createdQuizId = await createQuiz(transformedQuizData);
    const quizSet = await Quizset.findById(quizSetId);
    quizSet.quizIds.push(createdQuizId);
    quizSet.save();
  } catch (error) {
    throw new Error(error);
  }
}

export async function doAddQuizSet(data) {
  try {
    data["slug"] = getSlug(data.title);
    const quizSet = await Quizset.create(data);
    return quizSet._id.toString();
  } catch (error) {
    throw new Error(error);
  }
}
