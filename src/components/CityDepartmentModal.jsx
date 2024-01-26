import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { City } from './City';
import { Department } from './Department';

const CityDepartmentModal = ({ isOpen, onRequestClose }) => {

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
      <h2 className='header'>Выберите город и магазин</h2>
      <div className='content'>
      <City></City>
      <Department></Department>
      </div>
      <div className='footer'>
      <button onClick={onRequestClose} className='closeButton'>Закрыть</button>
      <button>Подтвердить адрес</button>
      </div>
    </Modal>
  );
};

export default CityDepartmentModal;
