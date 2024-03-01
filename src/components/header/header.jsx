import logo from "../../assets/logo.jpg";
import Button from "../../utilities/button/button";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="REACTFOOD" />
        <h1>REACTFOOD</h1>
      </div>
      <Button $class={"cart-button"}>Cart(0)</Button>
    </header>
  );
}
