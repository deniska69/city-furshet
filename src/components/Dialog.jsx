import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "./Icon.jsx";
import "./Dialog.css";

const Dialog = ({ title = "", onClose = null, size = "md", className = null, children }) => {
  const refDialog = useRef(null);
  // const navigate = useNavigate();

  useEffect(() => {
    if (refDialog?.current) refDialog?.current?.showModal();
    document.body.classList.add("dialog-open");

    return () => {
      if (refDialog?.current) refDialog?.current?.close();
      document.body.classList.remove("dialog-open");
    };
  }, []);

  const handleClose = () => {
    if (onClose) return onClose();
    // navigate("/");
  };

  return (
    <dialog ref={refDialog} className="dialog-root noselect" onClick={onClose}>
      <div
        className={`dialog-content dialog-size-${size} ${className ? className : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dialog-header">
          <span>{title}</span>

          <button className="dialog-header-close" onClick={handleClose}>
            <Icon name="close" color="#404040" />
          </button>
        </div>

        <div className="dialog-body">{children}</div>
      </div>
    </dialog>
  );
};

export default Dialog;
