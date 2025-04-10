import { Routes, Route, Link } from "react-router-dom";
// import SignUpForm from "./SignUpForm";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { Login } from "./pages/Login";
import StudentSignup from "./pages/Student/StudentSignup";
import TeacherSignup from "./pages/TeacherSignup";
import Dashboard from "./pages/Student/Dashboard";
import Profile from "./pages/Student/Profile";
import Idea from "./pages/Student/Idea";
import WeeklyReports from "./pages/Student/WeeklyReports";
import AllProjects from "./pages/Student/AllProjects";
import Notification from "./pages/Student/Notification";
import ProjectDetails from "./pages/Student/ProjectDetails";
import AllReports from "./pages/Teacher/AllReports";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />}>
          <Route path="teacher" element={<TeacherSignup />} />
          <Route path="student" element={<StudentSignup />} />
        </Route>
        <Route path="/login" element={<Login />} /> 
        <Route path="/allReports" element={<AllReports />} /> 
        {/* adding protected routes */}
        <Route path="/student-dashboard" element= {<Dashboard/>}>
            <Route path="profile" element={<Profile/>} />
            <Route path="idea" element={<Idea/>} />
            <Route path="weekly-reports" element={<WeeklyReports />} />
            <Route path="notifications" element={<Notification />} />
            <Route path="all-projects" element = {<AllProjects/>}/>
            <Route path="project-details" element = {<ProjectDetails/>}/>
        </Route>
        
      </Routes>
    </div>
  );
}
