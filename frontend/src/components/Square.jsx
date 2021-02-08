import React, { useState } from 'react';
import styles from './styles'
import Modal from './Modal'

const Square = ({ data }) => {
  const [available, setAvailable] = useState(true)
  const [style, setStyle] = useState(styles.active)
  const [showModal, setShowModal] = useState(false)

  const toggleWindow = () => {
    setShowModal(false)
  }
  const handleClick = () => {
    setShowModal(true);
    setAvailable(false)
    setStyle(styles.checked)
  }


  return (<div className={style} onClick={available ? handleClick : (() => { })}>
    {data.value}
    {showModal ? <Modal toggleWindow={toggleWindow} data={data} /> : ''}
  </div>);
}

export default Square;
