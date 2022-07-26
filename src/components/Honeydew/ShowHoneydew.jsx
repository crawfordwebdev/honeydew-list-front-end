import { useState, useRef, useEffect } from "react"
import styles from './Honeydew.module.css'

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const ShowHoneydew = ({styleButtons, honeydew, handleDeleteHoneydew, handleUpdateHoneydew}) => {
  const formElement = useRef()
	const [validForm, setValidForm] = useState(false)
  const [formData, setFormData] = useState(honeydew)

	const handleChange = evt => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}

  const handleCheckbox = evt => {
		setFormData({ ...formData, [evt.target.name]: evt.target.checked })
    handleUpdateHoneydew(formData) // Calling this so it saves the checkbox
  }

  const handleSubmit = evt => {
		evt.preventDefault()
    handleUpdateHoneydew(formData)
	}


  useEffect(() => {
		formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
	}, [formData])

  return (
    <div className={formData.finished ? styles.containerFinished : styles.container}>

			<form ref={formElement} onSubmit={handleSubmit} > 
        <span className={styles.checkBox}>
          <Checkbox 
            name="finished"
            size="large"
            inputProps={{ 
              'aria-label': 'finished checkbox'
            }}
            onClick={handleCheckbox}
            checked={formData.finished}
          />
        </span>
        <TextField
          required
          name="task"
          id="task-input"
          className={styles.taskInput}
          label="Task"
          autoComplete="off"
          sx={{ 
            width: '100%',
          }}
          value={formData.task}
          onChange={handleChange}
          disabled={formData.finished}
        />
        <span className={styles.ttc}>
          <TextField
            name="estimatedTimeToComplete"
            id="estimatedTTCMinutes-input"
            type="number"
            autoComplete="off"
            label="Estimated Minutes"
            InputLabelProps={{ shrink: true }}
            InputProps={{ inputProps: { min: 0 } }}
            value={formData.estimatedTimeToComplete}
            onChange={handleChange}
            disabled={formData.finished}
          />
                    <TextField
            name="actualTimeToComplete"
            id="actualTTCMinutes-input"
            type="number"
            autoComplete="off"
            label="Actual Minutes"
            InputLabelProps={{ shrink: true }}
            InputProps={{ inputProps: { min: 0 } }}
            value={formData.actualTimeToComplete}
            onChange={handleChange}
            disabled={formData.finished}
          />
        </span>
        <span className={styles.buttons}>
          <Fab 
            type="submit"
            variant="extended" 
            id={styles.updateButton}
            color="primary" 
            aria-label="edit"
            sx={{ width: styleButtons.width }}
            disabled={!validForm || formData.finished}
          >
            <EditIcon 
              fontSize="large" 
            />
          </Fab>
          <Fab 
            variant="extended" 
            id={styles.deleteButton}
            color="primary" 
            aria-label="delete"
            sx={{ width: styleButtons.width }}
            onClick={() => handleDeleteHoneydew(formData._id)}
            disabled={formData.finished}
          >
            <DeleteForeverIcon 
              fontSize="large" 
            />
          </Fab>
        </span>
			</form>
    </div>
  )
}

export default ShowHoneydew