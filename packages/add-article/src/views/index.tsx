import { Button, CreatableSelect, Input, Modal } from "@reading-list/shared-ui";
import * as S from "./styles";

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
  availableTags: string[];
  formActionUrl: string;
};

export function AddArticleDialog({
  availableTags,
  formActionUrl,
  isOpen,
  onDismiss,
}: Props) {
  return (
    <Modal isOpen={isOpen} isDismissable onOpenChange={onDismiss}>
      <Modal.Title>Add new article</Modal.Title>

      <S.Form
        action={formActionUrl}
        method="post"
        encType={"multipart/form-data"}
      >
        <label>
          <span>URL</span>
          <Input
            autoFocus
            name="url"
            type={"text"}
            required
            placeholder="https://example.com"
          />
        </label>

        <label>
          <span>Title</span>
          <Input
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

        <Button type="submit">Add</Button>
      </S.Form>
    </Modal>
  );
}
