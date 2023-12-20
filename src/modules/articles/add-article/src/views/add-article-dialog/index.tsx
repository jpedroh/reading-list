"use client";

import { CreatableSelect, Input, Modal } from "@reading-list/modules/shared/ui";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { addArticle } from "../../services/add-article";
import { fetchTags } from "../../services/fetch-tags";
import { getTitleFromUrl } from "../../services/get-title-from-url";
import { ErrorAlert } from "./error-alert";
import styles from "./index.module.css";
import { SubmitButton } from "./submit-button";

type Props = {
  availableTags: Awaited<ReturnType<typeof fetchTags>>;
};

export function AddArticleDialog({ availableTags }: Props) {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const [state, formAction] = useFormState(async (_: unknown, formData: FormData) => {
    const response = await addArticle(formData);
    if (response.success) {
      router.push("/")
    }
    return response;
  }, null)

  function closeModal() {
    router.back();
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
      <form action={formAction} className={styles.container}>
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

        {state && !state?.success && <ErrorAlert>{state.error}</ErrorAlert>}
        <SubmitButton>Add</SubmitButton>
      </form>
    </Modal>
  );
}
