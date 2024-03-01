import logo from "../../assets/logo.jpg";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        {  <img src={logo} alt="REACTFOOD" />}
        <h1>REACTFOOD</h1>
      </div>
      <button>Cart(0)</button>
    </header>
  );
}
