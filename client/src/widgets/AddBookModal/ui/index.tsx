import React from "react";
import { Modal } from "antd";

import { AddBookForm } from "@/features/AddBookForm";

interface AddBookModalProps {
  isOpen: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
}
export const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Modal
      title={<h2>Add book</h2>}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null}
    >
      <AddBookForm onSuccess={() => setIsOpen(false)} />
    </Modal>
  )
}
