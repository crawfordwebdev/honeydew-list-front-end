import styles from './Landing.module.css'

const Landing = ({ user }) => {
  return (
    <main className={styles.container}>
      <h1 className="logo">Honeydews</h1>
    </main>
  )
}

export default Landing