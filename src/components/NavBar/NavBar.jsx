import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import KeyIcon from '@mui/icons-material/Key';

const NavBar = ({ user, handleLogout }) => {
  return (
    <div className={styles.navbar}>
      {user ?
        <nav>
          <ul>
            <li><Link to="/honeydews">My Honeydews</Link></li>
            <span className={styles.buttons}>
            <li>
              <Link to="/changePassword">
                <KeyIcon sx={{transform: 'scale(1.5)'}}/>
              </Link>
            </li>
            <li>
              <Link to="" onClick={handleLogout}>
                <LogoutIcon sx={{transform: 'scale(1.5)'}}/>
              </Link>
            </li>
            </span>
          </ul>
        </nav>
      :
        <nav>
          <ul>
            <li><Link to="/login">Login <LoginIcon /></Link></li>
            <li><Link to="/signup">Register <AppRegistrationIcon /></Link></li>
          </ul>
        </nav>
      }
    </div>
  )
}

export default NavBar
