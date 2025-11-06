import { CreatePostIcon } from "../../vectors/createPost";
import { HomeIcon } from "../../vectors/home";
import { ProfileIcon } from "../../vectors/profileIcon";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { dashboardSelect, userSelect } from "../selectors";
import { ChatIcon } from "../../vectors/ChatIcon/ChatIcon";
import config from "../../config.json";

const activeColor = "#ffffff3f";

export const BottomBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dashboardSelect$ = useSelector(dashboardSelect);
  const userSelect$ = useSelector(userSelect);

  const showBottomBar = /* location.pathname === "/home"; */ true;

  return (
    showBottomBar && (
      <div className="bg-black h-12 w-full fixed z-10 bottom-0">
        <div className="max-w-xl mx-auto flex  h-full ">
          <div
            className="flex-1 flex justify-center items-center"
            style={{
              backgroundColor:
                dashboardSelect$.activePageIndex === 0 && activeColor,
            }}
            onClick={() => {
              navigate(`/home`);
            }}
          >
            <HomeIcon active={true} />
          </div>
          <div
            className="flex-1 flex justify-center items-center"
            style={{
              backgroundColor:
                dashboardSelect$.activePageIndex === 1 && activeColor,
            }}
            onClick={() => {
              navigate(config.routes.listItem);
            }}
          >
            <CreatePostIcon active={false} />
          </div>
          <div
            className="flex-1 flex justify-center items-center"
            style={{
              backgroundColor:
                dashboardSelect$.activePageIndex === 2 && activeColor,
            }}
            onClick={() => {
              navigate(`/user/${userSelect$.username}`, {
                state: { name: "My Name" },
              });
            }}
          >
            <ProfileIcon active={false} />
          </div>
          <div
            className="flex-1 flex justify-center items-center"
            style={{
              backgroundColor:
                dashboardSelect$.activePageIndex === 3 && activeColor,
            }}
            onClick={() => {

            }}
          >
            <ChatIcon/>
          </div>
        </div>
      </div>
    )
  );
};
