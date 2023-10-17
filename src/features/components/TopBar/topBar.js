import { LeftArrow } from "../../../vectors/leftArrow";
import { MainLogo } from "../../../vectors/mainLogo";
import styles from "./TopBar.module.css";

import { useLocation, useNavigate } from "react-router-dom";

export const TopBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center standard-shadow">
        <div className=" header h-32 w-full flex justify-center max-w-xl mx-auto px-4 items-center fixed z-10">
          <div className="w-16">
            <LeftArrow   onClick={() => { navigate(-1) }} className={`cursor-pointer ${ !(location.pathname.split("/").length > 2) ? styles.hide : ''} ${styles.backButton}  `} />
            <p>{ location.pathname.split("/").length > 2 }</p>
          </div>
          <div className="flex-grow" />
          <MainLogo />
          <div className="flex-grow" />

          <div className="w-16" />
        </div>

        <div className="h-32" />
      </div>
    </>
  );
};
