import { useState, useRef, useEffect } from "react"
import styles from './ShowHoneydew.module.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const ShowHoneydew = (props) => {
	const [edit, setEdit] = useState(false)
  console.log(props.honeydew)


  return (
    <div className={styles.container}>
      {edit 
      ?
        <form>

        </form>
      :
        <>
          <span>
            {props.honeydew.task}
          </span>

        </>
      }
      <Fab 
        variant="extended" 
        color="primary" 
        aria-label="add"
        onClick={() => props.handleDeleteHoneydew(props.honeydew._id)}
        sx={{ width: '50px' }}

      >
        <DeleteForeverIcon 
          fontSize="large" 
        />
      </Fab>

		</div>
  )
}

export default ShowHoneydew