import type { ComponentPropsWithoutRef, ReactNode } from "react";
import {
  Dialog as RACDialog,
  Heading as RACHeading,
  Modal as RACModal,
  ModalOverlay as RACModalOverlay,
} from "react-aria-components";
import { twc } from "react-twc";

type Props = {
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<typeof RACModalOverlay>, "classname">;

const ModalContainer = twc(
  RACModal,
)`w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-800 p-6 text-left align-middle shadow-xl`;

export function Modal({ children, ...rest }: Props) {
  return (
    <RACModalOverlay
      className={({ isEntering, isExiting }) =>
        [
          "fixed inset-0 z-10 overflow-y-auto bg-zinc-800 bg-opacity-70 min-h-full md:flex items-center justify-center p-4 md:p-16 text-center backdrop-blur",
          isEntering ? "animate-in fade-in duration-300 ease-out" : "",
          isExiting ? "animate-out fade-out duration-200 ease-in" : "",
        ].join(" ")
      }
      {...rest}
    >
      <ModalContainer>
        <RACDialog
          role="dialog"
          className="outline-none relative flex flex-col gap-4"
        >
          {children}
        </RACDialog>
      </ModalContainer>
    </RACModalOverlay>
  );
}

Modal.Title = twc(RACHeading).attrs({
  slot: "title",
})`text-2xl font-bold leading-6 text-zinc-300 border-b pb-3 border-zinc-700`;

Modal.Content = twc("div")`p-4 dark:text-white gap-2 flex flex-col`;
