import { useState, useRef, useEffect } from "react"
import styles from './Honeydew.module.css'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const CreateHoneydewForm = (props) => {
  const formElement = useRef()
	const [validForm, setValidForm] = useState(false)
  const [formData, setFormData] = useState({
		tags: [],
		task: '',
		estimatedTimeToComplete: 0,
		actualTimeToComplete: 0,
		finished: false
	})

	const handleChange = evt => {
		console.log(evt)
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}

  const handleSubmit = evt => {
		evt.preventDefault()
    props.handleCreateHoneydew({...formData})
		setFormData({
			tags: [],
			task: '',
			estimatedTimeToComplete: 0,
			actualTimeToComplete: 0,
			finished: false
		})
	}

  useEffect(() => {
		formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
	}, [formData])


  return (
    <div className={styles.container}>
			<form ref={formElement} onSubmit={handleSubmit}>
				<span className={styles.checkBox}>&nbsp;</span>
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
					/>
				</span>
				<span className={styles.buttons}>
					<Fab 
						variant="extended"
						id={styles.addButton}
						color="primary" 
						aria-label="add"
						type="submit"
						sx={{ width: props.styleButtons.width }}
						disabled={!validForm}
						onClick={props.handleAddHoneyDew}
					>
						<AddIcon />
					</Fab>
				</span>
			</form>
		</div>
  )
}

export default CreateHoneydewForm