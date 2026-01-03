import { CreatableSelect, Input, Modal } from "@reading-list/shared-ui";
import { getTitleFromUrl } from "../services/get-title-from-url";
import { useRef } from "react";

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
  availableTags: string[];
};

export function AddArticleDialog({ availableTags, isOpen, onDismiss }: Props) {
  const titleRef = useRef<HTMLInputElement>(null);

  async function handleUrlChange(url: string) {
    if (!url) return;
    const title = await getTitleFromUrl({ data: url });
    if (titleRef.current) {
      titleRef.current.value = title;
    }
  }

  return (
    <Modal isOpen={isOpen} isDismissable onOpenChange={onDismiss}>
      <Modal.Title>Add new article</Modal.Title>

      <form>
        <label>
          <span>URL</span>
          <Input
            autoFocus
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
            options={availableTags.map((v) => ({ value: v, label: v }))}
          />
        </label>

        <label>
          <span>OTP</span>
          <Input name="otp" type={"text"} required placeholder="000000" />
        </label>

        {/*     {state && !state?.success && <ErrorAlert>{state.error}</ErrorAlert>}
        <SubmitButton>Add</SubmitButton> */}
      </form>
    </Modal>
  );
}
