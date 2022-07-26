import { useState, useEffect } from 'react'
import * as honeydewService from '../../services/honeydewService'
import CreateHoneydewForm from '../../components/Honeydew/CreateHoneydewForm'
import ShowHoneydew from '../../components/Honeydew/ShowHoneydew'
import styles from './HoneydewList.module.css'

function HoneydewList() {
  // Sorting an array of objects by a boolean property
  // https://bobbyhadz.com/blog/javascript-sort-array-of-objects-by-boolean-property
  // Needed to cast the boolean to a number and compare those numbers
  // Now the finished tasks will be listed at the bottom

  const [honeydews, setHoneydews] = useState([])
  const styleButtons ={
    width: '50px',
    height: '50px',
  }

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
    console.log(updatedHoneydewData)
    const updatedHoneydew = await honeydewService.update(updatedHoneydewData)
    const newHoneydewArray = honeydews.map(honeydew => 
      honeydew._id === updatedHoneydew._id ? updatedHoneydew : honeydew
    )
    setHoneydews(newHoneydewArray)
  }

  return (
    <div className={styles.container}>
      <h1>Honeydews</h1>
      <CreateHoneydewForm 
        styleButtons={styleButtons}
        handleCreateHoneydew={handleCreateHoneydew} 
      />
      <div className={styles.list}>
        {honeydews?.length > 0 
        ?
          honeydews
          .sort((a, b) => Number(a.finished) - Number(b.finished))
          .map(honeydew =>
            <ShowHoneydew 
              key={honeydew._id} 
              styleButtons={styleButtons}
              honeydew={honeydew} 
              handleUpdateHoneydew={handleUpdateHoneydew}
              handleDeleteHoneydew={handleDeleteHoneydew}
            />
          )
        :
        <p>No Honeydew Tasks Yet</p>
        }
      </div>
    </div>
  )
}

export default HoneydewList