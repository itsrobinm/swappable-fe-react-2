import { styled } from "@mui/system";
import { accentColor, genericBorder } from "../../../app/globalStyles";

export const TextBox = ({ onChange }) => {
  return (
    <StyledTextArea
      placeholder="Enter an item description here."
      style={{
        resize: "none",
        width: "100%",
        ...genericBorder,
        textAlign: "center",
      }}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
};

const StyledTextArea = styled("textarea")`
  outline: none;
  &:focus {
    border-color: ${accentColor} !important;
  }
`;
