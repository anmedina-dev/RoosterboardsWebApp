import React from "react";
import "./ProfileCSS.css";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { signIn, signUp, logout } from "../../services/loginService";

function Profile() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userCheck, setUserCheck] = useState(false);
  const [user, setUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = (event) => {
    setErrorMessage("");
    event.preventDefault();
    const data = {
      username: name,
      password: password,
    };
    signIn(data).then((res) => {
      console.log(res);

      if (!res.hasOwnProperty("id")) {
        setErrorMessage(res.message);
      } else {
        localStorage.setItem("user", JSON.stringify(res));
        setUser(res["username"]);
        setUserCheck(true);
      }
    });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const data = {
      email: email,
      username: name,
      password: password,
    };

    signUp(data).then((res) => {
      console.log(res);
    });
  };

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    setUserCheck(false);
    setUser("");
  };

  useEffect(() => {
    const localUserCheck = JSON.parse(localStorage.getItem("user"));
    if (localUserCheck) {
      setUser(localUserCheck["username"]);
      setUserCheck(true);
    }
  }, []); // do not give the dependency as repositories as it will go to infinite loop

  return (
    <div className="profile-body">
      {userCheck ? (
        <div className="login-section">
          <div>{user}</div>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <ProfileForm
          errorMessage={errorMessage}
          handleSignIn={handleSignIn}
          handleSignUp={handleSignUp}
          setName={setName}
          setPassword={setPassword}
          setEmail={setEmail}
          userCheck={userCheck}
        />
      )}
    </div>
  );
}

function ProfileForm(props) {
  const [isSignIn, setIsSignIn] = useState(props.userCheck);
  const errorMessage = props.errorMessage;

  return (
    <>
      {isSignIn ? (
        <>
          <form onSubmit={props.handleSignIn}>
            <fieldset>
              <div className="sign-in-input">
                <label className="sign-in-label">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={(e) => props.setName(e.target.value)}
                />
              </div>
              <div className="sign-in-input">
                <label className="sign-in-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => props.setPassword(e.target.value)}
                />
              </div>
              <Button variant="primary" type="submit">
                Sign In
              </Button>
            </fieldset>
          </form>
          {errorMessage.length > 0 ? (
            <div className="error-message">{errorMessage}</div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <form onSubmit={props.handleSignUp}>
          <fieldset>
            <div className="sign-in-input">
              <label className="sign-in-label">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={(e) => props.setEmail(e.target.value)}
              />
            </div>
            <div className="sign-in-input">
              <label className="sign-in-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={(e) => props.setName(e.target.value)}
              />
            </div>
            <div className="sign-in-input">
              <label className="sign-in-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => props.setPassword(e.target.value)}
              />
            </div>
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </fieldset>
        </form>
      )}

      <div className="form-tabs">
        <div
          className={isSignIn ? "current-tab" : ""}
          onClick={() => setIsSignIn(true)}
        >
          Sign In
        </div>
        <div
          className={isSignIn ? "" : "current-tab"}
          onClick={() => setIsSignIn(false)}
        >
          Sign Up
        </div>
      </div>
    </>
  );
}

export default Profile;
