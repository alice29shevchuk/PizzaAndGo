import React, { useState } from 'react';
import Modal from 'react-modal';
import { City } from './City';
import { Department } from './Department';
import { useSelector, useDispatch } from 'react-redux';

const CityDepartmentModal = ({ isOpen, onRequestClose,onUpdateAddress}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
      <h2 className='header'>Выберите город и магазин</h2>
      <div className='content'>
      <City></City>
      <Department></Department>
      </div>
      <div className='footer'>
      <button onClick={onRequestClose} className='closeButton'>Закрыть</button>
      <button onClick={onUpdateAddress}>Подтвердить адрес</button>
      </div>
    </Modal>
  );
};

export default CityDepartmentModal;
