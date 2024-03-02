import classes from "./errorMessage.module.css";

export default function ErrorMessage({ message }) {
  return <div className={classes.errorMessage}>{message}</div>;
}
