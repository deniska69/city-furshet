import { useRef, useEffect } from "react";
import { Icon } from "components";
import "./Dialog.css";

const Dialog = ({ isOpen, onClose, title = "", children }) => {
  const refDialog = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (refDialog?.current) refDialog.current?.showModal();
      document.body.classList.add("dialog-open");
    } else {
      if (refDialog?.current) refDialog.current?.close();
      document.body.classList.remove("dialog-open");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog ref={refDialog} className="dialog-root noselect" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <span>{title}</span>

          <button className="dialog-header-close" onClick={onClose}>
            <Icon name="close" color="#404040" />
          </button>
        </div>

        {children}
      </div>
    </dialog>
  );
};

export default Dialog;
