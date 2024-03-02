import { useContext, useImperativeHandle, useRef } from "react";
import { forwardRef } from "react";
import { createPortal } from "react-dom";
import Button from "../button/button";
import { MealContext } from "../../store/meal-context";

const Modal = forwardRef(function Modal({ children }, ref) {
  const dialog = useRef();
   const { checkIsCheckout } = useContext(MealContext);
  console.log(dialog.current);
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
    <dialog ref={dialog} className="modal" onClose={() => checkIsCheckout(false)}>
      <form method="dialog" className="modal-actions">
        <Button onClick={()=>checkIsCheckout(false)} $class={"text-modal-button"}>
          X
        </Button>
      </form>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
