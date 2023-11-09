import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

export default function DefaultLayout() {

  const { user, token } = useStateContext();

  if(!token){
    return <Navigate to="/login" />
  }

  const onLogout = (e) => {
    e.preventDefault()
  }

  return (
    <div id='defaultLayout'>
        {/* DefaultLayout */}
        <aside>
          <Link to="dashboard">Dashboard</Link>
          <Link to="/users">Login</Link>
        </aside>
        <div className='content'>
          <header>
            <div>
              Header
            </div>
            <div>
              {user?.name}
              <a  className="btn-logout" href="#" onClick={ onLogout }>Logout</a>
            </div>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
    </div>
  )
}
