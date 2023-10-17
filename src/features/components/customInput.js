import { useEffect, useState } from "react";
import { accentColor, errorColor, lightGrey, lighterGrey, successColor, roundedEdge } from "../../app/globalStyles";

export const CustomInput = (props) => {

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className="border-2"
      style={{ borderColor: !isFocused ? lighterGrey : accentColor , ...roundedEdge }}
    >
      <input
        onFocus={(e) => {
          setIsFocused(true);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          //if (props.onBlur) props.onBlur(e);
        }}
        key={props.keyName}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        onKeyUp={(e) => {
          if (props.onKeyUp) {
            props.onKeyUp(e.target.value);
          }
        }}
        style={{
          width: "100%",
        }}
        type={props.type}
        autoComplete={props.autoComplete}
        placeholder={props.placeholder}
        className=" focus:outline-none text-center bg-transparent font-bold custom-input"
      />
    </div>
  );
};
