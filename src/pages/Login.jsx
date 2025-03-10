import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormData } from "../hooks/useFormData";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { getUserStart, loginUserStart } from "../redux/actions/user.action";

const initialState = {
  name: "",
  image: "",
  email: "",
  contact: "",
  password: "",
  status: 1,
};

export default function Login() {
  const users = useSelector((state) => state.user.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(false);

  const [formData, , , inputChange] = useFormData(initialState, "");

  let { name, email, password } = formData;

  const submit = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
          let currentUser = users.find((user) => user.uid === userCredential.user.uid);
          dispatch(loginUserStart(currentUser));
          setTimeout(() => {
            navigate("/admin");
          }, 1500)
      })
      .catch((error) => {
        setErrorMessage(true);
      });
  };

  useEffect(() => {
      dispatch(getUserStart());
  }, [users.length]);

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Login</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active text-white">Login</li>
        </ol>
      </div>

      <div className="global-container mt-5">
        <div className="card login-form">
          <div className="card-body">
            <h3 className="card-title text-center">Log in</h3>
            <div className="card-text">

              <div className="border rounded">
              <h5 className="mt-2 text-center">For Test</h5>
              <h6 className="text-center">Email: mail@mail.com</h6>
              <h6 className="text-center">Password: <span style={{fontFamily: 'Courier,New Courier, monospace'}}>12345678</span></h6>
              </div>
              

              {errorMessage && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  User Id and Password does't exists
                </div>
              )}

              <form onSubmit={submit}>
                <div className="form-group mb-2">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={inputChange}
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={inputChange}
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-auth btn-primary">
                    Sign in
                  </button>
                </div>

                <div className="sign-up">
                  Don't have an account? <Link to="/register">Create One</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
