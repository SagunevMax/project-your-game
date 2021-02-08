import { useState, useEffect } from 'react'
import styles from "./styles";
import logo from './logo.svg'
import { useSelector } from 'react-redux'

function Header() {
  const teamsFromRedux = useSelector(({ auth }) => auth)
  console.log(teamsFromRedux)
  const [teams, setTeams] = useState({});
  useEffect(() => {
    setTeams(teamsFromRedux)
  }, [])

  return (
    <div className={styles.header}>
      <div className='pr-6'>{teams?.team1 || ''} : {teams?.rating1 || ''} </div>
      <img src={logo} className='h-20' alt="" />
      <div>{teams?.team2 || ''} : {teams?.rating2 || ''}</div>
    </div>
  );
}
export default Header;
