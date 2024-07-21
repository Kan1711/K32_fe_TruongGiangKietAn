import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { getLoggedInUser, logout } from '../redux/auth/authSlice'
import { ACCESS_TOKEN } from '../constants'

function Layout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(getLoggedInUser)
  
  const handleLogout = () => {
    if (confirm('Confirm Logout?')){
      const accessToken = localStorage.getItem(ACCESS_TOKEN)
      dispatch(logout(accessToken))
      navigate('/login')
    }
  }

  return (
    <>
      <header style={{
        backgroundColor: '#222222',
        padding: '30px 60px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent:'space-between',
          alignItems: 'center',
        }}>
        <Link style={{
          color: 'white',
          cursor: 'pointer',
          }} 
          title='Home'
          to={user ? "/" : "/login"}
          className='fa-solid fa-house'
        >          
          <span style={{
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}> Home </span>
        </Link>
          {
            user?.email ? (
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 25
              }}>
                {
                  user?.role === "admin" && (
                    <Link style={{
                      color: 'white',
                      cursor: 'pointer',
                    }}
                    title='Edit Movies'
                    to='/admin'
                    className='fa-solid fa-pen-to-square' >
                      <span style={{
                        color: 'white',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                      }}
                      > Edit Movie </span>
                    </Link>
                  )
                }
                <Link>
                  <button style={{
                    cursor: 'pointer'
                  }} 
                    onClick={handleLogout} 
                    className='fa-solid fa-right-from-bracket' ></button>
                  <span style={{
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    }}
                    onClick={handleLogout} 
                    > Logout </span>
                </Link>
              </div>
              ) : (<>
              </>)
          }
        </div>
      </header>
      <main style={{
        padding: 1
      }}>
        <Outlet />
      </main>
    </>
  )
}

export default Layout