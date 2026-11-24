"use client";

import { useId, useState } from "react";

type DeleteConfirmFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  fields: { name: string; value: string }[];
  itemLabel: string;
  buttonLabel?: string;
};

export default function DeleteConfirmForm({
  action,
  fields,
  itemLabel,
  buttonLabel = "Delete",
}: DeleteConfirmFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const messageId = useId();

  return (
    <>
      <button
        type="button"
        className="admin-button admin-button-danger"
        onClick={() => setIsOpen(true)}
      >
        {buttonLabel}
      </button>
      {isOpen ? (
        <div
          className="admin-confirm-backdrop"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="admin-confirm-dialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={messageId}
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id={titleId}>Confirm deletion</h2>
            <p id={messageId}>
              Are you sure you want to delete <strong>{itemLabel}</strong>? This
              action cannot be undone.
            </p>
            <div className="admin-confirm-actions">
              <button
                type="button"
                className="admin-button admin-button-secondary"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <form action={action}>
                {fields.map((field) => (
                  <input
                    key={field.name}
                    type="hidden"
                    name={field.name}
                    value={field.value}
                  />
                ))}
                <button type="submit" className="admin-button admin-button-danger">
                  Confirm delete
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
