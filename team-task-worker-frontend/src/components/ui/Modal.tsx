import type { ReactNode } from "react";
import { AppIcon } from "@/components/ui/AppIcon";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  title: string;
  onClose: () => void;
};

export function Modal({ children, isOpen, title, onClose }: ModalProps) {
  return (
    <div className="modal-backdrop" hidden={!isOpen} onClick={onClose}>
      <section
        className="task-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">Form</p>
            <h2 id="modal-title">{title}</h2>
          </div>
          <button className="icon-button" type="button" aria-label="Close" onClick={onClose}>
            <AppIcon name="close" />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
