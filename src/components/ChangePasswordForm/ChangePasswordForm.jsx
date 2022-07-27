import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './ChangePasswordForm.module.css'
import * as authService from '../../services/authService'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const ChangePasswordForm = props => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    pw: '',
    newPw: '',
    newPwConf: '',
  })

  const handleChange = e => {
    props.updateMessage('')
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await authService.changePassword(formData)
      props.handleSignupOrLogin()
      navigate('/')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  const { pw, newPw, newPwConf } = formData

  const isFormInvalid = () => {
    return !(pw && newPw && newPw === newPwConf)
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <div className={styles.inputContainer}>
        <TextField 
          type="password"
          autoComplete="off"
          id="password"
          value={formData.pw}
          name="pw"
          onChange={handleChange}
          label="Current Password"
        />
      </div>
      <div className={styles.inputContainer}>
        <TextField 
          type="password"
          autoComplete="off"
          id="newPassword"
          value={newPw}
          name="newPw"
          onChange={handleChange}
          label="New Password"
        />
      </div>
      <div className={styles.inputContainer}>
        <TextField 
          type="password"
          autoComplete="off"
          id="newPasswordConf"
          value={newPwConf}
          name="newPwConf"
          onChange={handleChange}
          label="Confirm New Password"
        />
      </div>
      <div className={styles.inputContainer}>
      <Button 
          type="submit"
          variant="contained"
          disabled={isFormInvalid()}
        >
          Change Password
        </Button>

        <Link to="/honeydews">
          <Button 
              style={{marginLeft: '5px'}}variant="contained"
              color="error"
          >
          Cancel
          </Button>
        </Link>
      </div>
    </form>
  )
}

export default ChangePasswordForm