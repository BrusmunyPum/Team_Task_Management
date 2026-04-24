import { Modal } from "@/components/ui/Modal";

type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmDialog({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} title={title} onClose={onCancel}>
      <p className="form-help">{message}</p>
      <div className="modal-actions">
        <button className="secondary-action" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className="primary-action" type="button" onClick={onConfirm}>
          Confirm
        </button>
      </div>
    </Modal>
  );
}
