import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { standardShadow, subheadingStyle } from "../app/globalStyles";
import { ProfileImage } from "../vectors/profileImg";
import { logoutUser, setActivePageIndex } from "./counterSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getUserInformation } from "./effects";
import { profileSelect, userSelect } from "./selectors";
import { CustomButton } from "./components/customButton";

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const profileSelect$ = useSelector(profileSelect);
  const userSelect$ = useSelector(userSelect);

  useEffect(() => {
    dispatch(setActivePageIndex(2));
    //get information about the user in question
    if (params.username) {
      //console.log(params.username);
      dispatch(getUserInformation({ username: params.username }));
    }
  }, []);

  return (
    <>
      <div
        style={{ ...standardShadow }}
        className="flex justify-center items-center flex-col space-y-4 w-full pt-10 pb-4"
      >
        <ProfileImage />
        {/* <p style={{ ...subheadingStyle }}>{ location.state.name }</p> */}
        <p style={{ ...subheadingStyle }}>{profileSelect$.username}</p>
        {params.username === userSelect$.username && (
          <CustomButton
            text={"Log Out"}
            enabled={true}
            extraClasses="bg-red-500"
            clicked={() => {
              console.log("logout");
              dispatch(logoutUser());
              navigate(`/login`, {replace: true});
            }}
          />
        )}
      </div>
    </>
  );
};
