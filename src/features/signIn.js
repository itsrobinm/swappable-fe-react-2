import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNewUserData, dismissSignUpSnackBar } from "./counterSlice";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";

import { checkUserFieldExistsAsync, signInAsync, signUpUserAsync } from "./effects";
//import "@splidejs/react-splide/css";
import { CustomButton } from "./components/customButton";
import { CustomInput } from "./components/customInput";
import { Card } from "./components/card";
import { signUpSelect } from "./selectors";
import { TopBar } from "./components/TopBar/topBar";
import { LogoSmall } from "./components/logosmall";
//import  from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export const SignIn = () => {
  const [swiperRef, setSwiperRef] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //const swiper = useSwiper();

  let vertical = "top";
  let horizontal = "center";

  useEffect(() => {
    console.log("whole component rerendered");
  }, []);

  const [state, setState] = useState({
    userName: "",
    password: "",
    loginFailed: false,
  });

  const inputStyle = {
    backgroundColor: "transparent",
    textAlign: "center",
  };

  return (
    <>
      <div className=" w-full h-full relative flex flex-col justify-center items-center text-center p-4">
        <Card
          content={
            <>
              <div className="space-y-4">
                <LogoSmall />
                <Swiper
                  onSwiper={setSwiperRef}
                  allowTouchMove={false}
                >
                  <SwiperSlide className="space-y-4">
                    <p className="font-bold">Login to your account</p>
                    <CustomInput
                      value={state.firstName}
                      //setState={setState}
                      keyName={"email"}
                      placeholder={"Username"}
                      type={"text"}
                      //currentStep={state.currentStep}
                      onChange={(text) => {

                        let input = text.toLowerCase();
                        const patternArr = [
                          /^[a-z0-9_.]{0,20}$/,
                          ///^[^.].*[^.]{0,20}$/,
                        ];

                        if (patternArr.every((regex) => regex.test(input))) {
                          setState((prevState) => ({
                            ...prevState,
                            userName: input,
                          }));
                        }
                      }}
                    />
                    <CustomInput
                      value={state.lastName}
                      //setState={setState}
                      keyName={"email"}
                      placeholder={"Password"}
                      type={"password"}
                      //currentStep={state.currentStep}
                      onChange={(text) => {
                        setState((prevState) => ({
                          ...prevState,
                          //email: text,
                          password: text,
                          //currentStep: 0,
                        }));
                        //}
                      }}
                    />
                  </SwiperSlide>
                </Swiper>

                <CustomButton
                  clicked={() => {
                    //console.log([state.userName, state.password])

                    dispatch(signInAsync({ username: state.userName, password: state.password })).then((action) => {
                      if (action.payload) {
                        navigate(`/home`, {replace: true});
                      } else {
                        setState((prevState) => ({
                          ...prevState,
                          //email: text,
                          loginFailed: true
                          //currentStep: 0,
                        }));
                      }
                    });
                  }}
                  enabled={ true }
                  text={"Log In"}
                  //loading={signUpSelect$.pending}
                />

                {/* <p>{state.firstName}</p> */}
              </div>
            </>
          }
        />
      
        <Snackbar
          open={state.loginFailed}
          anchorOrigin={{ vertical, horizontal }}
          onClose={() => {
            //console.log("attempt to close the snackbar");
            //dispatch(dismissSignUpSnackBar());
            setState((prevState) => ({
              ...prevState,
              //email: text,
              loginFailed: false
              //currentStep: 0,
            }));
          }}
          autoHideDuration={3000}
          message={"Login Failed."}
        ></Snackbar> 
      </div>
    </>
  );

  function arePasswordsValid(password, repeat) {
    return password.length > 0 && repeat.length > 0 && password === repeat;
  }
};
