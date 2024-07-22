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
            padding: 10,
            borderRadius: 4,
            minWidth: 100,
            marginLeft: 15,
            backgroundColor: '#EFEFEF',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
            <button style={{
            cursor: 'pointer',
            fontSize: 16,
            color: '#FF4500',
            border: 'none',
            }} 
            title='Home'
            to={user ? "/" : "/login"}
            className='fa-solid fa-house'></button>          
            <span style={{
              color: '#FF4500',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: 20,
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
                      padding: 10,
                      borderRadius: 4,
                      minWidth: 100,
                      marginLeft: 15,
                      backgroundColor: '#EFEFEF',
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}>
                      <span style={{
                        color: '#FF4500',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}
                      > Edit Movie </span>
                      <button style={{
                      cursor: 'pointer',
                      fontSize: 16,
                      color: '#FF4500',
                      border: 'none',
                    }}
                    title='Edit Movies'
                    to='/admin'
                    className='fa-solid fa-pen-to-square'>
                      </button>
                    </Link>
                  )
                }
                <Link style={{
                  padding: 10,
                  borderRadius: 4,
                  minWidth: 100,
                  marginLeft: 15,
                  backgroundColor: '#EFEFEF',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                  
                  <span style={{
                    color: '#FF4500',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: 20,
                    }}
                    onClick={handleLogout} 
                    > Log out </span>
                    <button style={{
                    cursor: 'pointer',
                    fontSize: 16,
                    color: '#FF4500',
                    border: 'none',
                  }} 
                    onClick={handleLogout} 
                    className='fa-solid fa-right-from-bracket' ></button>
                </Link>
              </div>
              ) : (<>
              </>)
          }
        </div>
      </header>
      <main style={{
        padding: 20
      }}>
        <Outlet />
      </main>
    </>
  )
}

export default Layout