"use client";

import { Button, CreatableSelect, Input, Modal } from "@reading-list/modules/shared/ui";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { addArticle, getTitleFromUrl } from "../../services/add-article";
import { fetchTags } from "../../services/fetch-tags";
import styles from "./index.module.css";

type Props = {
  availableTags: Awaited<ReturnType<typeof fetchTags>>;
};

export function AddArticleDialog({ availableTags }: Props) {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const [isMutating, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");

  function closeModal() {
    router.back();
  }

  async function handleSubmit(formData: FormData) {
    startTransition(() => {
      setErrorMessage("");
      addArticle(formData).then((result) => {
        if (result.success) {
          router.push("/");
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
    <Modal isOpen={true} close={closeModal} title={"Add new article"}>
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
          <CreatableSelect
            name="tags"
            required
            isMulti={true}
            options={availableTags}
          />
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
        <Button disabled={isMutating} type="submit">
          {isMutating ? "Loading" : "Add"}
        </Button>
      </form>
    </Modal>
  );
}
