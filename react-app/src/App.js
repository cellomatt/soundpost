import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./components/Home"
import Dashboard from "./components/Dashboard"
import LessonScheduleView from "./components/LessonScheduleView"
import AssignmentView from "./components/AssignmentView"
import Stats from "./components/Stats"
import TeacherDashboard from "./components/Teacher/TeacherDashboard"
import StudentsView from "./components/Teacher/StudentsView"
import IndividualStudentView from "./components/Teacher/IndividualStudentView"
import { authenticate } from "./services/auth";
import { setUser } from "./store/session"
import {ReactComponent as Sketch} from "./images/klee.svg"

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [student, setStudent] = useState(null)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        dispatch(setUser(user));
        setStudent(user.student)
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} student={student}/>
      <Switch>
        {!authenticated && <Route exact path="/" authenticated={authenticated}>
          <Home />
        </Route>}
        <Route exact path="/login" >
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            setStudent={setStudent}
          />
        </Route>
        <Route exact path="/signup" >
          <SignUpForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            setStudent={setStudent}
          />
        </Route>
        {student && <ProtectedRoute exact path="/"  authenticated={authenticated}>
          <Dashboard authenticated={authenticated} student={student}/>
        </ProtectedRoute>}
        {!student && <ProtectedRoute exact path="/"  authenticated={authenticated}>
          <TeacherDashboard authenticated={authenticated} student={student}/>
        </ProtectedRoute>}
        <ProtectedRoute exact path="/schedule"  authenticated={authenticated}>
          <LessonScheduleView authenticated={authenticated} student={student}/>
        </ProtectedRoute>
        <ProtectedRoute exact path="/assignments"  authenticated={authenticated}>
          <AssignmentView authenticated={authenticated} />
        </ProtectedRoute>
        <ProtectedRoute exact path="/stats"  authenticated={authenticated}>
          <Stats authenticated={authenticated} />
        </ProtectedRoute>
        {!student && <ProtectedRoute exact path="/students"  authenticated={authenticated}>
          <StudentsView authenticated={authenticated} />
        </ProtectedRoute>}
        {!student && <ProtectedRoute exact path="/students/:studentId"  authenticated={authenticated}>
          <IndividualStudentView authenticated={authenticated} />
        </ProtectedRoute>}
        <Route>
          <div className="main">
            <h1 style={{marginTop: "0", fontSize: "4em"}}>404</h1>
            <p>The resource you requested does not exist. Really.</p>
            <Sketch style={{width: "30%", height: "100%", padding: ".5em 0 1.5em"}}/>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
