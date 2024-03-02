export default function Button({ children, onClick, $class, ...props }) {
  if($class === "none"){
    $class = "";
  }else{
  $class = "button " + $class;
  }

  return (
    <>
      <button className={$class} onClick={onClick} {...props}>
        {children}
      </button>
    </>
  );
}
