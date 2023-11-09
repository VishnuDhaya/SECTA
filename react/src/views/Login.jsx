import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from './axios-client';

export default function Login() {

  const emailRef =  useRef();
  const pwdRef = useRef();

  const [errors, setErrors] = useState(null);


  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: pwdRef.current.value 
    }
    console.log('payload', payload);
    axiosClient.post('/login', payload)

    .then(({data})=>{
      setToken(data?.token)
      setUser(data?.user)
    })
    
    .catch(err => {
        const response = err?.response;
        if(response && response?.status === 422){
          console.log(response.data.errors);
          setErrors(response?.data?.errors)
        }
    })
  }

  
  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className='form'>
        <form onSubmit={onSubmit}>
          <h1 className='title'>Login into your account</h1>
          <input ref={emailRef} type="text" placeholder='Email' name='email'/>
          {errors && 
            <div className='alert'>
              <p >{errors.email[0]}</p>
            </div>
          }
          <input ref={pwdRef} type="password" placeholder='Password' name="password"/>
          {errors && 
            <div className='alert'>
              <p >{errors.password[0]}</p>
            </div>
          }
          <button className='btn btn-block'>Login</button>
          <p className='message'>
            Not Registered ? <Link to="/signup"> Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
