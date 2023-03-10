import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import AddNewCourse from "./pages/AddNewCourse";
import Courses from "./pages/Courses";
import CoursesDetails from "./pages/CoursesDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import EditCourse from "./pages/EditCourse";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="addNewCourse" element={<AddNewCourse />} />
          <Route path="courses" element={<Courses />} />
          <Route path="coursesDetails" element={<CoursesDetails />} />
          <Route path="edit-course" element={<EditCourse />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
