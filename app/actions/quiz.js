"use server";

import { getSlug } from "@/lib/convertData";
import { Quizset } from "@/model/quizsets-model";

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
        isCorrect: quizData.optionA.isTrue,
      },
      {
        text: quizData.optionB.label,
        isCorrect: quizData.optionB.isTrue,
      },
      {
        text: quizData.optionC.label,
        isCorrect: quizData.optionC.isTrue,
      },
      {
        text: quizData.optionD.label,
        isCorrect: quizData.optionD.isTrue,
      },
    ];
  } catch (error) {
    throw new Error(error);
  }
}
