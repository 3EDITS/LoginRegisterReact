import React, { useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function Login() {
    const MySwal = withReactContent(Swal)


    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const login = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/login', {
            username: name,
            password: password
        }).then((res) => {
            if (res.data === "Login Successfully") {
                MySwal.fire({
                    title: "Login Successfully!",
                    icon: "success"
                  });
            } else if (res.data === "Wrong password!") {
                MySwal.fire({
                    title: "Wrong password!",
                    text: "Please check your password",
                    icon: "error"
                  });
            } else if (res.data === "User doesn't exist") {
                MySwal.fire({
                    title: "User doesn't exist",
                    icon: "error"
                  });
            }
        }).catch((err) => {
            console.log(err)
        })
    }

  return (
    <>
        <div className="container d-flex justify-content-center align-items-center">
        <div className="login-body">
          <h1>Login Form</h1>

          <form onSubmit={login}>
            <div className="mb-3" style={{ width: "300px" }}>
              <p>Enter your username</p>
              <input
                type="text"
                name="username"
                className="form-control"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="mb-3" style={{ width: "300px" }}>
              <p>Enter your password</p>
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <button className="btn btn-success">Login</button>
          </form>

          <span>You don't have a account? Go to <Link to="/Register">Register</Link></span>
        </div>
      </div>
    </>
  )
}

export default Login