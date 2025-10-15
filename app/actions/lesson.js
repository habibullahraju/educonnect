"use server";

import { Lesson } from "@/model/lesson-model";
import { Module } from "@/model/module.model";
import { create } from "@/queries/lessons";

export async function createLesson(data) {
  try {
    const title = data.get("title");
    const slug = data.get("slug");
    const moduleId = data.get("moduleId");
    const order = data.get("order");

    const createdLesson = await create({ title, slug, moduleId, order });
    const modules = await Module.findById(moduleId);
    modules.lessonIds.push(createdLesson._id);
    modules.save();
    return createdLesson;
  } catch (error) {
    throw new Error(error);
  }
}

export async function reOrderLesson(data) {
  try {
    await Promise.all(
      data.map(async (element) => {
        await Lesson.findByIdAndUpdate(element.id, { order: element.position });
      })
    );
  } catch (error) {
    throw new Error(error);
  }
}
