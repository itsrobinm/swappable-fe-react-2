import styles from "./ItemCard.module.css";
import { lighterGrey, lightestGrey, loadingAnimation } from "../../../app/globalStyles";
import { styled } from "@mui/system";

export const LoadingCard = (props) => {
  return (
    <StyledDiv
      {...props}

      className={` border-radius-standard ${styles.container}`}
    />
  );
};

const StyledDiv = styled("div")`
  animation: 0.7s infinite alternate ${loadingAnimation} ;
/* 
  @keyframes loadingAnimation {
    
  } */
`;
