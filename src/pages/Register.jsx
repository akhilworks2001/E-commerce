import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Form.css"
import { useFormData } from '../hooks/useFormData'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase-config'
import { useDispatch } from 'react-redux'
import { addUserStart } from '../redux/actions/user.action'

const initialState = {
    name: '',
    image: '',
    email: '',
    contact: '',
    password: '',
    status: 1
}

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState(false);

    const [formData, , , inputChange] = useFormData(initialState, "")

    let { name, email, password } = formData


    const submit = (event) => {
        event.preventDefault()

        console.log(formData);
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                let uid = userCredential.user.uid

                dispatch(addUserStart({ ...formData, uid: uid }))

                setTimeout(() => {
                    navigate("/login")
                }, 1000)
            })
            .catch((error) => {
                setErrorMessage(true)
            });
    }

    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Register</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active text-white">Register</li>
                </ol>
            </div>

            <div className="global-container mt-5">
                <div className="card login-form">
                    <div className="card-body">
                        <h3 className="card-title text-center">Register</h3>
                        <div className="card-text">
                            {
                                errorMessage && 
                                    <div 
                                        className="alert alert-danger alert-dismissible fade show" 
                                        role="alert">
                                            User name allready exists 
                                    </div>
                            }
                            <form onSubmit={submit}>
                                <div className="form-group mb-2">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="name"
                                        className="form-control"
                                        id="name"
                                        name='name'
                                        value={name}
                                        onChange={inputChange}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name='email'
                                        value={email}
                                        onChange={inputChange} />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name='password'
                                        value={password}
                                        onChange={inputChange}
                                    />
                                </div>
                                <div className='d-grid'>
                                    <button type="submit" className="btn btn-auth btn-primary">Sign in</button>
                                </div>

                                <div className="sign-up">
                                    Already have an account? <Link to="/login">Sign Up</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
