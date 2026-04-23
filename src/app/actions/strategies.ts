"use server";

import prisma from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createStrategy(formData: FormData): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return;
  }

  const title = formData.get("title") as string;
  const difficulty = formData.get("difficulty") as string;
  const content = formData.get("content") as string;
  const file = formData.get("image") as File | null;

  if (!title || !difficulty || !content) {
    return;
  }

  try {
    let imageUrl = null;

    // الرفع عبر Vercel Blob بدلاً من الحفظ المحلي
    if (file && file.size > 0) {
      const blob = await put(`strategies/${file.name}`, file, {
        access: "public",
        addRandomSuffix: true,
      });
      imageUrl = blob.url;
    }

    await prisma.strategy.create({
      data: {
        title,
        difficulty,
        content,
        ...(imageUrl && { imageUrl }),
        authorId: session.user.id,
      },
    });
  } catch (error) {
    console.error("Create strategy error:", error);
    return;
  }

  revalidatePath("/admin/strategies");
  revalidatePath("/strategies");
  revalidatePath("/");
  redirect("/admin/strategies");
}

export async function updateStrategy(formData: FormData): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return;
  }

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const difficulty = formData.get("difficulty") as string;
  const content = formData.get("content") as string;
  const file = formData.get("image") as File | null;

  if (!id || !title || !difficulty || !content) {
    return;
  }

  try {
    const dataToUpdate: any = { title, difficulty, content };

    // الرفع عبر Vercel Blob
    if (file && file.size > 0) {
      const blob = await put(`strategies/${file.name}`, file, {
        access: "public",
        addRandomSuffix: true,
      });
      dataToUpdate.imageUrl = blob.url;
    }

    await prisma.strategy.update({
      where: { id },
      data: dataToUpdate,
    });
  } catch (error) {
    console.error("Update strategy error:", error);
    return;
  }

  revalidatePath("/admin/strategies");
  revalidatePath("/strategies");
  revalidatePath("/");
  redirect("/admin/strategies");
}

export async function deleteStrategy(formData: FormData): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return;
  }

  const id = formData.get("id") as string;
  if (!id) return;

  try {
    await prisma.strategy.delete({ where: { id } });
    revalidatePath("/admin/strategies");
    revalidatePath("/strategies");
    revalidatePath("/");
  } catch (error) {
    console.error("Delete strategy error:", error);
  }
}