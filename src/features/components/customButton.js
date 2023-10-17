import { accentColor, standardShadow } from "../../app/globalStyles";

export const CustomButton = (props) => {
  return (
    <div
      onClick={() => {
        props.clicked(props.enabled);
      }}
      style={{
        borderRadius: "7px",
        padding: "7px",
        backgroundColor: !props.extraClasses && accentColor,
        ...props.style
      }}
      className={` text-white h-10 text-center flex justify-center items-center  ${
        props.extraClasses
      }  ${props.enabled ? "cursor-pointer" : ""}`}
    >
      {!props.loading ? (
        <span
          style={{
            opacity: !props.enabled && "0.5",
            cursor: props.enabled && "pointer",
          }}
          className={"text-center"}
        >
          {props.text}
        </span>
      ) : (
        <span className="loader"></span>
      )}
    </div>
  );
};

export const CustomButtonAlt = (props) => {
  return (
    <div
      onClick={() => {
        props.clicked();
      }}
      style={{
        ...standardShadow,
        backgroundColor: props.theme === "light" ? "white" : "black",
        color: props.theme === "light" ? "black" : "white",

        borderRadius: "7px",
        width: "min(25rem,80%)",
        padding: "7px",
        margin: "7px auto",
      }}
    >
      <p
        style={{
          cursor: "pointer",
        }}
      >
        {props.text}
      </p>
    </div>
  );
};
