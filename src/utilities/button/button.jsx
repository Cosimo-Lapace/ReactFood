export default function Button({ children, onClick, $class, ...props }) {
  return (
    <>
      <button className={`${"button " + $class}`} onClick={onClick} {...props}>
        {children}
      </button>
    </>
  );
}
