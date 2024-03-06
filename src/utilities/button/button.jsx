export default function Button({
  type = "button",
  children,
  onClick,
  $class = "",
  ...props
}) {
  if ($class === "none") {
    $class = "";
  } else {
    $class = "button " + $class;
  }

  console.log($class);
  return (
    <>
      <button type={type} className={$class} onClick={onClick} {...props}>
        {children}
      </button>
    </>
  );
}
