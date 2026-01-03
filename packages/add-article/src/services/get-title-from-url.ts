import { createServerFn } from "@tanstack/react-start";
import parse from "node-html-parser";
import { z } from "zod";

const UrlSchema = z.string().url();

export const getTitleFromUrl = createServerFn({ method: "POST" })
  .inputValidator(UrlSchema)
  .handler(async ({ data, signal, context }) => {
    const response = await fetch(data, { signal });
    if (!response.ok) return "";

    const pageHtml = await response.text();
    const titleElement = parse(pageHtml).querySelector("title");
    if (!titleElement) return "";

    return titleElement.innerText;
  });
