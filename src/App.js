import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignUp } from "./features/signUp";
import { ProfileScreen } from "./features/ProfileScreen";
import { Login } from "./features/login";
import { useSelector, useDispatch } from "react-redux";
import { authSelect } from "./features/selectors";
import { TestPage } from "./features/test";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { PostsScreen } from "./features/posts/posts";
import { ListItem } from "./features/ListItem/ListItem";
import { BottomBar } from "./features/components/bottomBar";
import { refreshAccessTokenAsync } from "./features/effects";
import { TopBar } from "./features/components/TopBar/topBar";
import { ItemPageNew } from "./features/components/ItemPage/itemPageNew";
import config from "../src/config.json";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(refreshAccessTokenAsync()).then((action) => {
      if (action.payload) {
        //console.log('succsefful log in of the user');
      } else {
        //console.log('unsuccesfful login of the user');
      }
    });
  }, []);

  const authSelect$ = useSelector(authSelect);

  function protectedRoute(component) {
    return authSelect$.loggedIn ? component : <Navigate to="/login" />;
  }

  return (
    <>
      <Router>
        <TopBar/>
        <div className="main-appcontainer">
        <Routes>
          {!authSelect$.refreshTokenPending && (
            <>
              <Route
                path="/"
                element={
                  authSelect$.loggedIn ? (
                    <Navigate to="/home" />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/signup"
                element={
                  authSelect$.loggedIn ? <Navigate to="/home" /> : <SignUp />
                }
              />
              <Route
                path="/login"
                element={
                  authSelect$.loggedIn ? <Navigate to="/home" /> : <Login />
                }
              />
              <Route path="/home" element={protectedRoute(<PostsScreen />)} />
              <Route path="/test" element={<TestPage />} />
              <Route
                path={config.routes.listItem}
                element={
                  authSelect$.loggedIn ? (
                    <ListItem />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path="/user/:username" element={<ProfileScreen />} />
              <Route path="/item/:itemid" element={protectedRoute(<ItemPageNew/>)} />
            </>
          )}
        </Routes></div>
        {/* {authSelect$.loggedIn && <BottomBar />} */}
      </Router>
    </>
  );
}

export default App;
