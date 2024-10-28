import { useRef, useEffect } from "react";

import "./Dialog.css";

const Dialog = ({ isOpen, onClose, children }) => {
  const refDialog = useRef(null);

  useEffect(() => {
    if (isOpen) {
      refDialog.current?.showModal();
      document.body.classList.add("dialog-open");
    } else {
      refDialog.current?.close();
      document.body.classList.remove("dialog-open");
    }
  }, [isOpen]);

  return (
    <dialog ref={refDialog} className="dialog-root noselect" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </dialog>
  );
};

export default Dialog;
