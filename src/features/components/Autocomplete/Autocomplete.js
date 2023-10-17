import * as React from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import { styled } from "@mui/system";
import { accentColor, genericBorder } from "../../../app/globalStyles";

//const options = ['Firefox', 'Google Chrome', 'Microsoft Edge', 'Safari', 'Opera'];

export const CustomAutoComplete = ({ arr, valChange }) => {
  const options = arr.map((option) => option.label);

  const [value, setValue] = React.useState("Choose a category");
  const [inputValue, setInputValue] = React.useState("");

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
  } = useAutocomplete({
    id: "controlled-state-demo",
    options,
    value,
    onChange: (event, newValue) => {

      setValue(newValue);
      valChange(newValue);
      },
    inputValue,
    onInputChange: (event, newInputValue) => setInputValue(newInputValue),
  });

  return (
    <div style={{ ...genericBorder }}>
      {/* <Pre>
        value: <code>{value ?? ' '}</code>
      </Pre>
      <Pre>
        inputValue: <code>{inputValue ?? ' '}</code>
      </Pre> */}
      <StyledAutocomplete>
        <StyledInputRoot
          onChange={() => {
            console.log("something ghot packed");
          }}
          {...getRootProps()}
          className={focused ? "focused" : ""}
        >
          <StyledInput {...getInputProps()} />
        </StyledInputRoot>
        {groupedOptions.length > 0 && (
          <StyledListbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <StyledOption {...getOptionProps({ option, index })}>
                {option}
              </StyledOption>
            ))}
          </StyledListbox>
        )}
      </StyledAutocomplete>
    </div>
  );
};

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledAutocomplete = styled("div")`
  position: relative;
`;

const StyledInputRoot = styled("div")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[500]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  display: flex;
  gap: 5px;
  padding-right: 5px;
  overflow: hidden;

  &.focused {
    border-color: ${accentColor};
  }

  &:hover {
    border-color: ${accentColor};
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const StyledInput = styled("input")(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
  flex: 1 0 auto;
`
);

const StyledListbox = styled("ul")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  max-height: 300px;
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  background: ${theme.palette.mode === "dark" ? accentColor : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? accentColor : grey[200]};
  color: ${theme.palette.mode === "dark" ? accentColor : grey[900]};
  `
);

const StyledOption = styled("li")(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    cursor: pointer;
  }

  &[aria-selected=true] {
    background-color: ${accentColor}
  }

  &.Mui-focused,
  &.Mui-focusVisible {
    background-color: ${
      theme.palette.mode === "dark" ? accentColor : grey[100]
    };
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.Mui-focusVisible {
  }

  &[aria-selected=true].Mui-focused,
  &[aria-selected=true].Mui-focusVisible {
    background-color: ${accentColor}
  }
  `
);

const Layout = styled("div")`
  display: flex;
  flex-flow: column nowrap;
  border: 1px solid red;
`;

const Pre = styled("pre")(({ theme }) => ({
  margin: "0.5rem 0",
  "& code": {
    backgroundColor: theme.palette.mode === "light" ? "#ebebef" : "#25252d",
    color: theme.palette.mode === "light" ? "#000" : "#fff",
    padding: "0.125rem 0.25rem",
    borderRadius: 3,
  },
}));
