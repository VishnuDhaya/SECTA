import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from './axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function Signup() {

  const nameRef = useRef()
  const emailRef = useRef()
  const pwdRef = useRef()
  const pwdconfirmationRef = useRef()
  const [errors, setErrors] = useState(null);

  const {setToken, setUser} = useStateContext()

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: pwdRef.current.value,
      password_confirmation: pwdconfirmationRef.current.value
    }
    console.log('payload', payload);
    axiosClient.post('/signup', payload)

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
          <h1 className='title'>Signup for free</h1>
          <input ref={nameRef} type="text" placeholder='Full Name'/>
          {errors && 
            <div className='alert'>
              <p >{errors.name[0]}</p>
            </div>
          }
          <input ref={emailRef} type="email" placeholder='Email Address' />
          {errors && 
            <div className='alert'>
              <p >{errors.email[0]}</p>
            </div>
          }
          <input ref={pwdRef} type="password" placeholder='Password' />
          {errors && 
            <div className='alert'>
              <p >{errors.password[0]}</p>
            </div>
          }
          <input ref={pwdconfirmationRef} type="password" placeholder='Password Confirmation'/>f
          <button className='btn btn-block'>Signup</button>
          <p className='message'>
            Already Registered ? <Link to="/login"> Sign in </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
