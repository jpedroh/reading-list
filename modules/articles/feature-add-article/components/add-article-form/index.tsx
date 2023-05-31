"use client";

import { ReactNode, useRef, useState, useTransition } from "react";
import { Input } from "../../../../shared/components/input";
import { addArticle, getTitleFromUrl } from "../../services/add-article";
import styles from "./index.module.css";

export function AddArticleForm({
  children,
  onCreated,
}: {
  children: ReactNode;
  onCreated: () => void;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const [isMutating, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    startTransition(() => {
      setErrorMessage("");
      addArticle(formData).then((result) => {
        if (result.success) {
          onCreated();
        } else {
          setErrorMessage(result.error);
        }
      });
    });
  }

  async function handleUrlChange(url: string) {
    if (!url) return;
    const title = await getTitleFromUrl(url);
    if (titleRef.current) {
      titleRef.current.value = title;
    }
  }

  return (
    // @ts-expect-error NextJS server action
    <form action={handleSubmit} className={styles.container}>
      <label>
        <span>URL</span>
        <Input
          name="url"
          type={"text"}
          required
          onBlur={(evt) => handleUrlChange(evt.target.value)}
          placeholder="https://example.com"
        />
      </label>

      <label>
        <span>Title</span>
        <Input
          ref={titleRef}
          name="title"
          type={"text"}
          required
          placeholder="Example title"
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

      {!isMutating && errorMessage && (
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
