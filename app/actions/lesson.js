"use server";

import { Lesson } from "@/model/lesson-model";
import { Module } from "@/model/module.model";
import { create } from "@/queries/lessons";
import mongoose from "mongoose";

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

export async function updateLesson(lessonId, data) {
  try {
    await Lesson.findByIdAndUpdate(lessonId, data);
  } catch (error) {
    throw new Error(error);
  }
}

export async function changeLessonPublishedState(lessonId) {
  try {
    const lesson = await Lesson.findById(lessonId);
    const res = await Lesson.findByIdAndUpdate(
      lessonId,
      { active: !lesson.active },
      { lean: true }
    );
    return res.active;
  } catch (error) {
    throw new Error(error);
  }
}
export async function deleteLesson(lessonId, moduleId) {
  try {
    const modules = await Module.findById(moduleId);
    modules.lessonIds.pull(new mongoose.Types.ObjectId(lessonId));
    const lesson = await Lesson.findByIdAndDelete(lessonId);
    modules.save();
  } catch (error) {
    throw new Error(error);
  }
}
