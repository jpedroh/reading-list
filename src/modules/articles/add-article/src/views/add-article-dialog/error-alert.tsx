import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export function ErrorAlert({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();

  if (pending) {
    return null;
  }

  return (
    <p
      role="alert"
      className="bg-red-700 text-white border border-red-900 p-3 rounded"
    >
      {children}
    </p>
  );
}
