import { setSomeRandomText } from "./counterSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { dashboardSelect } from "./selectors";
import { testRequestAsync, refreshAccessTokenAsync } from "./effects";
import { CustomButton } from "./components/customButton";
import { Post } from "./components/post";
import { posts } from "../mockedData/posts";
import { LeftArrow } from "../vectors/leftArrow";
import { AddImage } from "./components/AddImage/AddImage";
import { DropImage } from "./components/DropImage/DropImage";
import { ChatIcon } from "../vectors/ChatIcon/ChatIcon";

export const TestPage = () => {
  const dashboardSelect$ = useSelector(dashboardSelect);
  const dispatch = useDispatch();
  let [testBool, setTestBool] = useState(false);

  return (
    <>
      <div className="center-children-x-y w-full h-full">
        {/* <AddImage /> */}
        {/* <DropImage /> */}
        <ChatIcon/>
      </div>
    </>
  );
};
