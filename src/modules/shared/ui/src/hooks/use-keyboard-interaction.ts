import { useEffect } from "react";

type Props = {
  key: string;
  interaction: () => void;
};

export function useKeyboardInteraction({ key, interaction }: Props) {
  useEffect(() => {
    function handle(evt: KeyboardEvent) {
      if (evt.key?.toUpperCase() === key && evt.ctrlKey) {
        evt.preventDefault();
        interaction();
      }
    }

    window.addEventListener("keydown", handle);
    return () => {
      window.removeEventListener("keydown", handle);
    };
  }, [interaction, key]);
}
