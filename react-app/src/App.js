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
import { authenticate } from "./services/auth";
import { setUser } from "./store/session"
import {ReactComponent as Sketch} from "./images/klee.svg"

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        dispatch(setUser(user));
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
      <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <Switch>
        {!authenticated && <Route exact path="/" authenticated={authenticated}>
          <Home />
        </Route>}
        <Route exact path="/login" >
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route exact path="/signup" >
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <ProtectedRoute exact path="/"  authenticated={authenticated}>
          <Dashboard authenticated={authenticated} />
        </ProtectedRoute>
        <ProtectedRoute exact path="/schedule"  authenticated={authenticated}>
          <LessonScheduleView authenticated={authenticated} />
        </ProtectedRoute>
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
