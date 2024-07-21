import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import './Register.scss'
import { register } from '../../redux/auth/authSlice'

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = await dispatch(register({ ...formData }))
    if (data?.payload) {
      navigate('/login')
    }
    setLoading(false)
  }
  
  return (
    <section>
      <div className="register">
        <div className="content">
          <h2>Register</h2>
          <form className="form" onSubmit={handleRegister}>
            <div className="inputBox">
              <input 
                type="email" 
                placeholder='Email' 
                className='input' 
                autoFocus 
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value })} />
              <i>Username</i>
            </div>
            <div className="inputBox">
              <input 
                type='password'
                placeholder='Password'
                className='input'
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
              />
              <i>Password</i>
            </div>
            <div className="inputBox">
              <input type="submit" value="Sign Up"  />
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Register