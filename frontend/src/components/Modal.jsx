import { useState } from 'react'
import AnswerForm from './AnswerForm'
import styles from './styles.js'
import { useDispatch } from 'react-redux'

const Modal = (props) => {
  const dispatch = useDispatch();
  const [result, setResult] = useState('')
  const handleAnswer = (e) => {
    e.preventDefault()
    if (e.target?.answer.value === props.data?.answer) {
      setResult('Правильный ответ')
      dispatch({
        type: 'AUTH',
        payload: { ...JSON.parse(localStorage.getItem('redux'))?.auth, rating1: JSON.parse(localStorage.getItem('redux'))?.auth.rating1 + props.data.value }
      });
      console.log(JSON.parse(localStorage.getItem('redux'))?.auth)
    } else {
      setResult('Неправильный ответ')
    }
  }
  return (<div className='modal'>
    <div className='modal-content'>
      {result ? result : props.data.question}<br />
      {result ? <button className={styles.btn} onClick={props.toggleWindow}>Закрыть</button> : <AnswerForm handleAnswer={handleAnswer} toggleWindow={props.toggleWindow} />}
    </div>
  </div >);
}

export default Modal;


// let timer;

// const ThirdComponent = () => {
//   let [counter, setCounter] = useState(3);
//   const startProcess = () => {
//     timer = setInterval(() => {
//       console.log("set time");
//       if (counter <= 1) {
//         clearInterval(timer);
//       }
//       setCounter(--counter);
//     }, 1000);
//   };

//   useEffect(() => {
//     startProcess();
//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//  return (<>
// {counter === 0?
//   <div>Время вышло</div>: <div>счетчик = {counter}</div>} 
//  </>)
// }