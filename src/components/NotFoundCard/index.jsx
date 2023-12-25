import React from 'react';
import styles from './NotFoundCard.module.scss';
export const NotFoundCard = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>🙁</span>
        <br></br>
        Ничего не найдено :(
      </h1>
      <p className={styles.desc}>К сожалению на странице нет данных подходящих под ваш запрос</p>
    </div>
  )
}
