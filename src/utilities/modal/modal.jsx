import { useImperativeHandle, useRef } from "react";
import { forwardRef } from "react";
import { createPortal } from "react-dom";
import Button from "../button/button";

const Modal = forwardRef(function Modal({ children }, ref) {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
      close: () => {
        dialog.current.close();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="modal">
      <form method="dialog" className="modal-actions">
        <Button $class={"text-modal-button"}>X</Button>
      </form>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
