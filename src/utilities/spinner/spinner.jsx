import classes from "./spinner.module.css";
export default function Spinner({ typeContainer }) {
  return (
    <div
      className={
        typeContainer === "sm"
          ? classes.spinnerContainerSm
          : classes.spinnerContainerXl
      }
    >
      <span className={classes.loader}></span>
    </div>
  );
}
