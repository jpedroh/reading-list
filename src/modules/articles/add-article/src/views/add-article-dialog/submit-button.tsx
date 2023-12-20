"use client";

import { Button } from "@reading-list/modules/shared/ui";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending ? "Loading" : children}
    </Button>
  );
}
