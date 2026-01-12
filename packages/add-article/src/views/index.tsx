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
        <div>
          <label htmlFor="url">
            <span>URL</span>
          </label>
          <Input
            id="url"
            name="url"
            type={"text"}
            required
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label htmlFor="title">Title</label>
          <Input
            id="title"
            name="title"
            type={"text"}
            required
            placeholder="Example title"
          />
        </div>

        <div>
          <label htmlFor="tags">Tags</label>
          <CreatableSelect
            id="tags"
            name="tags"
            required
            isMulti={true}
            options={availableTags.map((v) => ({ value: v, label: v }))}
          />
        </div>

        <div>
          <label htmlFor="otp">OTP</label>
          <Input
            id="otp"
            name="otp"
            type={"text"}
            required
            placeholder="000000"
          />
        </div>

        <Button type="submit">Add</Button>
      </S.Form>
    </Modal>
  );
}
