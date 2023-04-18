"use client";

import { ReactNode, useState } from "react";
import { Modal } from "../../../../shared/components/modal";
import { useKeyboardInteraction } from "../../../../shared/hooks/useKeyboardInteraction";
import { AddArticleForm } from "../add-article-form";

export function AddArticleDialog({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  useKeyboardInteraction({ key: " ", interaction: openModal });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="rounded-md bg-blue-800 bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Add new article
      </button>

      <Modal isOpen={isOpen} close={closeModal} title={"Add new article"}>
        <AddArticleForm onCreated={closeModal}>{children}</AddArticleForm>
      </Modal>
    </>
  );
}
