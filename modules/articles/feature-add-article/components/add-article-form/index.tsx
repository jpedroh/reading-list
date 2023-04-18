"use client";

import { useRouter } from "next/navigation";
import { FormEvent, ReactNode, useState, useTransition } from "react";

import { Input } from "../../../../shared/components/input";
import styles from "./index.module.css";
import { AddArticleDto, AddArticleSchema } from "../../../domain";

async function submitArticle(payload: AddArticleDto) {
  const response = await fetch(`api/article`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (response.status >= 400) {
    throw new Error((await response.json()).message);
  }
}

export function AddArticleForm({
  children,
  onCreated,
}: {
  children: ReactNode;
  onCreated: () => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isMutating = isFetching || isPending;

  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    try {
      evt.preventDefault();

      const payload = AddArticleSchema.safeParse(
        Object.fromEntries(new FormData(evt.target as HTMLFormElement))
      );
      if (!payload.success) {
        throw new Error("Validation error");
      }

      setErrorMessage("");
      setIsFetching(true);
      await submitArticle(payload.data);
      setIsFetching(false);
      onCreated();

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Internal server error"
      );
      setIsFetching(false);
    }
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <label>
        <span>URL</span>
        <Input
          name="url"
          type={"text"}
          required
          placeholder="https://example.com"
        />
      </label>

      <label>
        <span>Tags</span>
        {children}
      </label>

      <label>
        <span>OTP</span>
        <Input name="otp" type={"text"} required placeholder="000000" />
      </label>

      {errorMessage && (
        <p
          role="alert"
          className="bg-red-700 text-white border border-red-900 p-3 rounded"
        >
          {errorMessage}
        </p>
      )}
      <button disabled={isMutating} type="submit">
        {isMutating ? "Loading" : "Add"}
      </button>
    </form>
  );
}
