import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import "./style.css";
import NavBar from "./components/layout/NavBar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import Alert from "./components/layout/Alert";
import CreateProfile from "./components/profile-forms/CreateProfile";
import PrivateRoute from "./components/routing/PrivateRoute";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profile/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utility/setAuthToken";
import { addEducation } from "./actions/profile";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <NavBar />
          <Alert />
          <Routes>
            <Route exact path="/" element={<Landing />}></Route>

            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route exact path="/profiles" element={<Profiles />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute component={Dashboard} />}
            />
            <Route
              path="/create"
              element={<PrivateRoute component={CreateProfile} />}
            />
            <Route
              path="/experience"
              element={<PrivateRoute component={AddExperience} />}
            />
            <Route
              path="/education"
              element={<PrivateRoute component={AddEducation} />}
            />
            <Route
              path="/profile/:id"
              element={<PrivateRoute component={Profile} />}
            />
            <Route path="/posts" element={<PrivateRoute component={Posts} />} />
            <Route
              path="/posts/:id"
              element={<PrivateRoute component={Post} />}
            />
          </Routes>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
