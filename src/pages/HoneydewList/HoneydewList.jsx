import { useState, useEffect } from 'react'
import * as honeydewService from '../../services/honeydewService'
import CreateHoneydewForm from '../../components/CreateHoneydewForm/CreateHoneydewForm'
import styles from './HoneydewList.module.css'

function HoneydewList() {
  const [honeydews, setHoneydews] = useState([])

  useEffect(() => {
    const fetchAllHoneydews = async () => {
      const honeydewData = await honeydewService.getAll()
      setHoneydews(honeydewData.reverse())
    }
    fetchAllHoneydews()
  }, [])

  const handleCreateHoneydew = async newHoneydewData => {
    console.log("handleCreateHoneydew trigged")
    console.log("New Honeydew Data: ", newHoneydewData)
    const newHoneydew = await honeydewService.create(newHoneydewData)
    if (honeydews.length > 0 ) {
      setHoneydews([newHoneydew, ...honeydews])
    } else {
      setHoneydews([newHoneydew])
    }
  }

  return (
    <>
      <h1>Honeydews</h1>
      <CreateHoneydewForm handleCreateHoneydew={handleCreateHoneydew} />
      <div className={styles.container}>
        {honeydews?.length > 0 
        ?
          honeydews.map(honeydo =>
            <p key={honeydo._id}>{honeydo.task}</p>
          )
        :
        <p>No Tasks yet</p>
        }
      </div>
    </>
  )
}

export default HoneydewList