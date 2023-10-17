import { keyframes } from "@mui/system";

export const accentColor = "#03e3ac";
export const successColor = "#49bf00";
export const errorColor = "#ff5968";

export const darkGrey = "#777777";
export const lightGrey = "#cccccc";
export const lighterGrey = "#e7e7e7";
export const lightestGrey = "#f8f8f8";

export const darkColor = "#1D1D1B";

export const fullPageContainerStyle = {
  width: "100%",
  height: "100%",
  position: "relative",
  display: "flex",
  //justifyContent: "center",
  textAlign: "center",
};

export const subheadingStyle = {
  fontWeight: "200",
  letterSpacing: "0px",
  color: "#2c2c2c",
  fontSize: "1.75rem",
};

export const standardShadow = {
  boxShadow: "rgb(0 0 0 / 9%) 0px 0px 8px 4px",
};

export const warningTextStyle = {
  fontSize: "12px",
  color: "red",
};

export const strongText = {
  fontSize: "20px",
};

export const genericBackgroundLight = {
  backgroundColor: "#e9e9e9",
};

export const genericBorder = {
  borderWidth: "2px",
  borderColor: lighterGrey,
  borderRadius: "7px",
};

export const roundedEdge = {
  borderRadius: "7px",
};

export const loadingAnimation = keyframes` 
from { background-color: ${lightestGrey} } 
to { background-color: ${lighterGrey} }
`;
