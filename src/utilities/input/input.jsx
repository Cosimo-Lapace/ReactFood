import ErrorMessage from "../error/errorMessage/errorMessage";

const Input = function Input({
  inputObj,
  setInputObj,
  label,
  type,
  name,
  ...props
}) {
  function changeValue(event) {
    const { target } = event;
    const { value } = target;
    setInputObj((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  return (
    <div className="control">
      <label>{label}</label>
      <input
        className={!inputObj.isValid ? "error" : null}
        onChange={changeValue}
        type={type}
        name={name}
        {...props}
      />
    </div>
  );
};

export default Input;
