import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useFormData } from "../../../hooks/useFormData";
import Sidebar from "../../../layouts/Sidebar";
import { editProfileUserStart, updateUserStart } from "../../../redux/actions/user.action";

export default function ProfileEdit() {
  const currentLoginedUser = useSelector((state) => state.user.currentLoginedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [formData, , uploadImage, inputChange, uploadFile] =
    useFormData(currentLoginedUser, "user");

  let { name, image, email, contact } = formData;

  const submit = (event) => {
    event.preventDefault();

    dispatch(editProfileUserStart(formData));

    setTimeout(() => {
      navigate("/admin/user");
    }, 1000);
  };


  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">
          Profile Edit
        </h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active text-white">
            Profile Edit
          </li>
        </ol>
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className="col-sm-3">
            <Sidebar />
          </div>
          <div className="col-sm-9">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h5>Profile Edit</h5>
                <Link
                  to="/admin/user"
                  className="btn btn-primary btn-sm text-white"
                >
                  Back
                </Link>
              </div>
              <div className="card-body">
                <form onSubmit={submit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      User Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="User Name"
                      value={name}
                      name="name"
                      onChange={inputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      user Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      onChange={uploadFile}
                    />
                    {image && (
                      <div className="mt-2">
                        <img src={image} />
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      User Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="User email"
                      value={email}
                      name="email"
                      onChange={inputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="contact" className="form-label">
                      User contact
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="contact"
                      placeholder="User contact"
                      value={contact}
                      name="contact"
                      onChange={inputChange}
                    />
                  </div>

                  <div className="row">
                    <div className="col-sm-6 d-grid">
                      <button
                        type="submit"
                        className="btn btn-primary text-white"
                        disabled={uploadImage}
                      >
                        Submit
                      </button>
                    </div>
                    <div className="col-sm-6 d-grid">
                      <button
                        type="reset"
                        className="btn btn-warning text-white"
                        disabled={uploadImage}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
