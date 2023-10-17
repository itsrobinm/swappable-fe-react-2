import { useNavigate } from "react-router-dom";
import config from "../config.json"


export const MainLogo = () => {
  const navigate = useNavigate();

  return (
    <div  onClick={() => { navigate(config.routes.home)}} className="w-36 h-36 cursor-pointer">
      <img draggable="false" className="object-contain" alt="logo" src="/mainlogo.svg" />
    </div>
  );
};
