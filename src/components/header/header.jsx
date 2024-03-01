import { useRef } from "react";
import logo from "../../assets/logo.jpg";
import Button from "../../utilities/button/button";
import Modal from "../../utilities/modal/modal";

export default function Header() {
  const modalRef = useRef();

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="REACTFOOD" />
        <h1>REACTFOOD</h1>
      </div>
      <Button onClick={() => modalRef.current.open()}>
        Cart(0)
      </Button>
      <Modal ref={modalRef} />
    </header>
  );
}
