import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import CoursesPage from "./courses/CoursesPage";
import ManageCoursesPage from "./courses/ManageCoursePage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/course/:slug" component={ManageCoursesPage} />

        {/* Below route is for "Add Course" button */}
        <Route path="/course" component={ManageCoursesPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;