import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { httpCallAsync } from "./effects";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { fullPageContainerStyle } from "../app/globalStyles";
//import "@splidejs/react-splide/css";
import { CustomButton, CustomButtonAlt } from "./components/customButton";

//import backgroundImg from "../assets/img/2.jpg";
import { SignUp } from "./signUp";
import { SignIn } from "./signIn";

export const LandingPage = () => {
  const splideRef = React.createRef();

  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.status);

  //some local states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    //dispatch the sign up action
    dispatch(httpCallAsync({ username: username, password: password }));
  };

  const inputStyle = {
    backgroundColor: "transparent",
    textAlign: "center",
  };

  return (
    <>
      <div
        className="w-full h-full fixed bg-black"
        style={{
          top: 0,
          left: 0,
          transform: "scale(1.1)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          filter: "blur(3px)",
        }}
      ></div>
      <Splide
        ref={splideRef}
        options={{
          pagination: false,
          arrows: false,
          start: 1,
        }}
      >
        <SplideSlide>
          <SignUp />
        </SplideSlide>
        <SplideSlide>
          <div style={{ ...fullPageContainerStyle }} className="  ">
            <div
              style={{
                alignSelf: "flex-end",
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <CustomButtonAlt
                clicked={() => {
                  splideRef.current.splide.go(0);
                }}
                text={"Sign up"}
                theme={"light"}
              />
              <CustomButtonAlt
              clicked={() => {
                splideRef.current.splide.go(2);
              }}
              
              text={"Sign in"} />
            </div>
          </div>
        </SplideSlide>
        <SplideSlide>
          <SignIn />
        </SplideSlide>
      </Splide>
    </>
  );
};
