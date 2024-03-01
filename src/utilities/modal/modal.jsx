import { useImperativeHandle, useRef } from "react";
import { forwardRef } from "react";
import { createPortal } from "react-dom";
import Button from "../button/button";

const Modal = forwardRef(function Modal(props, ref) {
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
      <form method="dialog" style={{ textAlign: "end" }}>
        <Button $class={"text-modal-button"}>X</Button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
