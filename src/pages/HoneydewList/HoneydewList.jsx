import { useState, useEffect } from 'react'
import * as honeydewService from '../../services/honeydewService'
import CreateHoneydewForm from '../../components/CreateHoneydewForm/CreateHoneydewForm'
import ShowHoneydew from '../../components/ShowHoneydew/ShowHoneydew'
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

  const handleDeleteHoneydew = async id => {
    const deletedHoneydew = await honeydewService.deleteOne(id)
    setHoneydews(honeydews.filter(honeydew => honeydew._id !== deletedHoneydew._id))
  }


  const handleUpdateHoneydew = async (updatedHoneydewData) => {
    const updatedHoneydew = await honeydewService.update(updatedHoneydewData)
    const newHoneydewArray = honeydews.map(honeydew => 
      honeydew._id === updatedHoneydew._id ? updatedHoneydew : honeydew
    )
    setHoneydews(newHoneydewArray)
  }

  return (
    <>
      <h1>Honeydews</h1>
      <CreateHoneydewForm handleCreateHoneydew={handleCreateHoneydew} />
      <div className={styles.container}>
        {honeydews?.length > 0 
        ?
          honeydews.map(honeydew =>
            <ShowHoneydew 
              key={honeydew._id} 
              honeydew={honeydew} 
              handleUpdateHoneydew={handleUpdateHoneydew}
              handleDeleteHoneydew={handleDeleteHoneydew}
            />
          )
        :
        <p>No Tasks yet</p>
        }
      </div>
    </>
  )
}

export default HoneydewList