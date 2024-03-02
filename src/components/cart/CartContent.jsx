export default function CartContent({ title, children }) {
  return (
    <div className="cart">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
