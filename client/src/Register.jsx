import React, { useState} from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Register() {
  const MySwal = withReactContent(Swal)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const register = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/register', {
      username: name, email: email, password: password
    }).then((response) => {
      if (response.data === "User created") {
        MySwal.fire({
          title: "Register Successfully!",
          text: "You have sign up our website.",
          icon: "success"
        });
        navigate('/login');
      } else if (response.data === "User already exist") {
        MySwal.fire({
          title: "User Already Exists",
          text: "You can't sign up beacuse other people used now. Try again",
          icon: "error"
        });
      }
      
      
    }).catch((err) => {
      console.log(err)
    })
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="register-body">
          <h1>Register Form</h1>

          <form onSubmit={register}>
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
              <p>Enter your email</p>
              <input
                type="email"
                name="email"
                className="form-control "
                onChange={(e) => {
                  setEmail(e.target.value);
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

            <button className="btn btn-success">Register</button>
          </form>

          <span>You already have a account? Go to <Link to="/login">Login</Link></span>
        </div>
      </div>
    </>
  );
}

export default Register;
