import React, { useState, useEffect } from 'react';
import Square from './Square'
import styles from './styles';

const GameTable = () => {
  const [gameContent, setGameContent] = useState([])

  useEffect(() => {
    (async () => {
      const req = await fetch('http://localhost:3001/gameJson');
      const gameContent = await req.json();
      setGameContent(gameContent)
    })()
  }, [])

  return (
    <div>
      {gameContent.map((theme, index) => {
        return (
          <div key={index} className={styles.grid}>
            <div className={styles.square}
              key={`t_${index}`}>{theme.collectionTitle}</div>
            {theme.collection.map((el, ind) => (
              <div key={`s_${ind}`} >
                <Square data={el} />
              </div>))}
          </div>)
      })}
    </div>
  );
}


export default GameTable;
