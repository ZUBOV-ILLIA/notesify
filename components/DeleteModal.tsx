import { createPortal } from "react-dom";

type Props = {
  onDelete: () => void;
  onCancel: () => void;
};

export function DeleteModal({ onDelete, onCancel }: Props) {
  return createPortal(
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="m-2 p-4 bg-slate-600 rounded-md">
        <h2 className="text-lg font-bold">Delete Note</h2>
        <p className="mt-2">Are you sure you want to delete this note ?</p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="py-1 px-4 rounded-md border bg-red-600"
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            className="py-1 px-4 text-gray-700 bg-gray-200 rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
