import { useState, useRef, useEffect } from "react"
import styles from './CreateHoneydewForm.module.css'

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
		estimatedTimeToComplete: {
			hours: 0,
			minutes: 0
		},
		actualTimeToComplete: {
			hours: 0,
			minutes: 0
		},
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
			estimatedTimeToComplete: {
				hours: 0,
				minutes: 0
			},
			actualTimeToComplete: {
				hours: 0,
				minutes: 0
			},
			finished: false
		})

	}

  useEffect(() => {
		formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
	}, [formData])

	// console.log(formData)

  return (
    <div className={styles.container}>
			<form ref={formElement} onSubmit={handleSubmit}>
				<span>
					<TextField
						required
						name="task"
						id="task-input"
						label="Task"
						autoComplete="off"
						sx={{ 
							width: '30vw',
						}}
						value={formData.task}
						onChange={handleChange}
					/>
				</span>
				{/* <span className="estimatedTTC">
					<TextField
						name="estimatedTTCHours"
						id="estimatedTTCHours-input"
						type="number"
						autoComplete="off"
						label="Hours"
						value={formData.estimatedTimeToComplete.hours}
						onChange={handleChange}
					/>
					<TextField
						name="estimatedTTCMinutes"
						id="estimatedTTCMinutes-input"
						type="number"
						autoComplete="off"
						label="Minutes"
						value={formData.estimatedTimeToComplete.minutes}
						onChange={handleChange}
					/>
				</span> */}
				<span>
					<Fab 
					variant="extended" 
					color="primary" 
					aria-label="add"
					type="submit"
					disabled={!validForm}
					// onClick={handleAddHoneyDew}
				><AddIcon sx={{ mr: 0.75 }} />Add Honeydew</Fab>
				</span>
			</form>
		</div>
  )
}

export default CreateHoneydewForm