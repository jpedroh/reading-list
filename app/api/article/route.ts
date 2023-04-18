import { NextResponse } from "next/server";
import { AddArticleSchema } from "../../../modules/articles/domain";
import { addArticle } from "../../../modules/articles/feature-add-article/services/add-article";

export async function POST(request: Request) {
  const payload = AddArticleSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json(
      { message: "Bad Request", errors: payload.error },
      { status: 400 }
    );
  }

  try {
    await addArticle(payload.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Success" });
}
