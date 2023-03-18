"use client";

import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
} from "react";
import ReactModal from "react-modal";

import style from "./style.module.scss";
import clsx from "clsx";
import { ButtonProps } from "../button";
import { AiOutlineClose } from "react-icons/ai";
ReactModal.setAppElement("#modal");

const ModalContext = React.createContext<ModalContextType>({
  modalIsOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

ModalContext.displayName = "ModalContext";

type ModalContextType = {
  modalIsOpen: boolean;
  openModal(): void;
  closeModal(): void;
};
export interface ModalProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}
export function Modal({ children, className }: PropsWithChildren<ModalProps>) {
  const [modalIsOpen, setIsOpen] = React.useState(true);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <ModalContext.Provider
      value={{ modalIsOpen, openModal, closeModal } as const}
    >
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        overlayClassName={style["overlay"]}
        className={clsx(style["modal"], className)}
      >
        {children}
      </ReactModal>
    </ModalContext.Provider>
  );
}
function useModal() {
  const context = React.useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a <Modal />");
  }
  return context;
}

export function ModalToggle({
  children,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const { openModal, modalIsOpen, closeModal } = useModal();
  return (
    <button
      className={clsx(className, style["toggle"])}
      onClick={modalIsOpen ? closeModal : openModal}
      {...props}
    >
      {modalIsOpen ? <AiOutlineClose className={style['close']} size={15} /> : <div></div>}
      {children}
    </button>
  );
}
