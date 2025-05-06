import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNewUserData, dismissSignUpSnackBar } from "./counterSlice";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import { MainLogo } from "../vectors/mainLogo";



import {
  sendConfirmationEmailAsync,
  confirmUserCodeAsync,
  checkUserFieldExistsAsync,
  sendConfirmationTextAsync,
  signUpUserAsync,
} from "./effects";
//import "@splidejs/react-splide/css";
import { CustomButton } from "./components/customButton";
import { CustomInput } from "./components/customInput";
import { Card } from "./components/card";

import ReactInputVerificationCode from "react-input-verification-code";
import "./verificationCodeStyles.css";
import { signUpSelect } from "./selectors";
import { TopBar } from "./components/TopBar/topBar";
import { LogoSmall } from "./components/logosmall";
//import  from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

export const SignUp = () => {
  const myRef = React.createRef();
  const [swiperRef, setSwiperRef] = useState(null);
  const signUpSelect$ = useSelector(signUpSelect);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //const swiper = useSwiper();

  let vertical = "top";
  let horizontal = "center";

  function doSomething() {
    myRef.current.splide.go(3);
  }

  useEffect(() => {
    console.log("whole component rerendered");
  }, []);

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    repeatPassword: "",
    currentStep: 0,
    passwordsValid: undefined,
    usernameAvailable: undefined,
    currentStepValidArray: [false, false, false, false],
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
                {/* <LogoSmall /> */}
                <MainLogo />
                <Swiper
                  onSwiper={setSwiperRef}
                  allowTouchMove={false}
                >
                  <SwiperSlide className="space-y-4">
                    <p className="font-bold">Let's start with your name...</p>
                    <CustomInput
                      value={state.firstName}
                      keyName={"email"}
                      placeholder={"First Name"}
                      type={"text"}
                      onChange={(text) => {
                        const pattern = /^[a-zA-Z]{0,10}$/;

                        if (pattern.test(text)) {
                          //console.log(state.firstName.length);

                          if (state.firstName.length === 0)
                            text = text.toUpperCase();

                          setState((prevState) => ({
                            ...prevState,
                            //email: text,
                            firstName: text,
                            //currentStep: 0,
                          }));
                        }
                      }}
                      onKeyUp={() => {
                        let currentStepValidArrayCopy =
                          state.currentStepValidArray;
                        if (
                          state.firstName.length > 0 &&
                          state.lastName.length > 0
                        ) {
                          currentStepValidArrayCopy[state.currentStep] = true;
                        } else {
                          currentStepValidArrayCopy[state.currentStep] = false;
                        }

                        setState((prevState) => ({
                          ...prevState,
                          //email: text,
                          currentStepValidArray: currentStepValidArrayCopy,
                          //currentStep: 0,
                        }));
                      }}
                    />
                    <CustomInput
                      value={state.lastName}
                      //setState={setState}
                      keyName={"email"}
                      placeholder={"Second Name"}
                      type={"text"}
                      //currentStep={state.currentStep}
                      onChange={(text) => {
                        const pattern = /^[a-zA-Z]{0,10}$/;

                        if (pattern.test(text)) {
                          if (state.lastName.length === 0)
                            text = text.toUpperCase();

                          setState((prevState) => ({
                            ...prevState,
                            //email: text,
                            lastName: text,
                            //currentStep: 0,
                          }));
                        }
                      }}
                      onKeyUp={() => {
                        let currentStepValidArrayCopy =
                          state.currentStepValidArray;
                        if (
                          state.firstName.length > 0 &&
                          state.lastName.length > 0
                        ) {
                          currentStepValidArrayCopy[state.currentStep] = true;
                        } else {
                          currentStepValidArrayCopy[state.currentStep] = false;
                        }

                        setState((prevState) => ({
                          ...prevState,
                          //email: text,
                          currentStepValidArray: currentStepValidArrayCopy,
                          //currentStep: 0,
                        }));
                      }}
                    />
                  </SwiperSlide>
                  <SwiperSlide className="space-y-4">
                    <p className="font-bold">Choose a username...</p>
                    <CustomInput
                      value={state.userName}
                      //autoComplete={'off'}
                      keyName={"email"}
                      placeholder={"jonty.mitchell"}
                      validOrNot={
                        state.userName.length > 0
                          ? !signUpSelect$.usernameExists
                          : undefined
                      }
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

                          dispatch(
                            checkUserFieldExistsAsync({
                              field: "username",
                              value: input,
                            })
                          ).then((action) => {
                            //console.log(action.payload);
                            let currentStepValidArrayCopy =
                              state.currentStepValidArray;

                            if (action.payload) {
                              currentStepValidArrayCopy[1] =
                                !action.payload.value && text.length > 0;

                              setState((prevState) => ({
                                ...prevState,
                                //email: text,
                                currentStepValidArray:
                                  currentStepValidArrayCopy,
                                //currentStep: 0,
                              }));
                            } else {
                              console.log("connection err");
                            }
                          });
                        }
                      }}
                    />
                    {state.userName.length > 0 &&
                      (signUpSelect$.usernameExists ? (
                        <p>Sorry, this username is taken. </p>
                      ) : (
                        <p>Username available. </p>
                      ))}
                  </SwiperSlide>
                  <SwiperSlide className="space-y-4">
                    <p className="font-bold">Create a password...</p>
                    <CustomInput
                      value={state.password}
                      placeholder={"Password"}
                      validOrNot={state.passwordsValid}
                      type={"password"}
                      autoComplete={"new-password"}
                      onChange={(text) => {
                        if (text.length <= 15) {
                          let valid = arePasswordsValid(
                            text,
                            state.repeatPassword
                          );

                          let currentStepValidArrayCopy =
                            state.currentStepValidArray;
                          currentStepValidArrayCopy[2] = valid;

                          setState((prevState) => ({
                            ...prevState,
                            password: text,
                            passwordsValid: valid,
                            currentStepValidArray: currentStepValidArrayCopy,
                          }));
                        }
                      }}
                    />
                    <CustomInput
                      value={state.repeatPassword}
                      placeholder={"Repeat Password"}
                      validOrNot={state.passwordsValid}
                      autoComplete={"new-password"}
                      type={"password"}
                      onBlur={(e) => {
                        //arePasswordsValid();
                      }}
                      onChange={(text) => {
                        if (text.length <= 15) {
                          let valid = arePasswordsValid(text, state.password);

                          let currentStepValidArrayCopy =
                            state.currentStepValidArray;

                          currentStepValidArrayCopy[2] = valid;

                          setState((prevState) => ({
                            ...prevState,
                            repeatPassword: text,
                            passwordsValid: valid,
                            currentStepValidArray: currentStepValidArrayCopy,
                          }));
                        }
                      }}
                    />
                    {state.passwordsValid !== undefined ? (
                      state.passwordsValid ? (
                        <p>Passwords match.</p>
                      ) : (
                        <p>Passwords don't match.</p>
                      )
                    ) : (
                      <p> </p>
                    )}
                  </SwiperSlide>
                </Swiper>

                <CustomButton
                  clicked={() => {
                    if (state.currentStepValidArray[state.currentStep]) {
                      if (state.currentStep < 2) {
                        setState((prevState) => ({
                          ...prevState,
                          currentStep: state.currentStep + 1,
                        }));
                        swiperRef.slideNext();
                      } else {
                        //console.log('final step')
                        dispatch(
                          signUpUserAsync({
                            name: state.firstName + " " + state.lastName,
                            username: state.userName,
                            password: state.password,
                          })
                        ).then((action) => {
                          if(action.payload) {
                            navigate(`/home`, {replace: true});

                          }
                        })
                      }
                    }
                  }}
                  //enabled={!(state.email === "" || state.password === "")}
                  enabled={state.currentStepValidArray[state.currentStep]}
                  text={"Next"}
                  //loading={signUpSelect$.pending}
                />

                {/* <p>{state.firstName}</p> */}
              </div>
            </>
          }
        />
{/* 
        <Snackbar
          open={signUpSelect$.toggleSnackBar}
          anchorOrigin={{ vertical, horizontal }}
          onClose={() => {
            console.log("attempt to close the snackbar");
            dispatch(dismissSignUpSnackBar());
          }}
          autoHideDuration={3000}
          message={signUpSelect$.statusMessage}
        ></Snackbar> */}
      </div>
    </>
  );

  function arePasswordsValid(password, repeat) {
    return password.length > 0 && repeat.length > 0 && password === repeat;
  }
};

const VerificationCodeInput = (props) => {
  return (
    <div className="custom-styles">
      <ReactInputVerificationCode
        placeholder=""
        // key={props.myKey}
        // onChange={(val) => {
        //   setCode(val);
        // }}
        // value={code}
        // setState((prevState) => ({
        //   ...prevState,
        //   verificationCode: val,
        // }))

        onCompleted={(val) => props.onCompleted(val)}
      />
    </div>
  );
};
