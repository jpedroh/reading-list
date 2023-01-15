import { CreatableSelect } from "../../../../shared/components/creatable-select";
import { Input } from "../../../../shared/components/input";
import { fetchTags } from "../../services/fetch-tags";
import styles from "./index.module.css";

export async function AddArticleForm() {
  const availableTags = await fetchTags();

  return (
    <form className={styles.container} method="POST" action="/api/article">
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

      <button type="submit">Add</button>
    </form>
  );
}
