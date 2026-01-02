"use server";

import parse from "node-html-parser";
import { z } from "zod";

export async function getTitleFromUrl(url: string) {
  if (z.string().url().safeParse(url).success === false) {
    return "";
  }

  const pageHtml = await fetch(url).then((r) => r.text());
  const titleElement = parse(pageHtml).querySelector("title");

  if (!titleElement) {
    return "";
  }

  return titleElement.innerText;
}
