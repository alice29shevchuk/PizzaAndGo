import React, { useState } from 'react';
import Modal from 'react-modal';
import { City } from './City';
import { Department } from './Department';
import { useSelector } from 'react-redux';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const CityDepartmentModal = ({ isOpen, onRequestClose, onUpdateAddress }) => {
  const {departments} = useSelector((state) => state.department);
  const [selectDepartment, setSelectDepartment] = useState(null);
  const [map, setMap] = useState(null);
  React.useEffect(()=>{
    setSelectDepartment(departments.length > 0 ? departments[0] : null);
  },[departments]);
  const containerStyle = {
    width: '100%',
    height: '400px',
  };
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBX66V-x-Rij75rBOw3nKuPWTuTAvv4zPQ',
  });

  const handleUpdateAddress = () => {
    onUpdateAddress && onUpdateAddress(selectDepartment);
    onRequestClose();
  };

  const onLoad = (map) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };
  
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
      <h2 className='header'>Выберите город и магазин</h2>
      <div className='content'>
        <div className='city-department'>
        <City></City>
        <Department onSelectDepartment={(department) => setSelectDepartment(department)}></Department>
          <div className='footer'>
          <button onClick={onRequestClose} className='closeButton'>Закрыть</button>
          <button onClick={handleUpdateAddress}>Подтвердить адрес</button>
        </div>
        </div>
        <div className='google-map-container'>
        {isLoaded && selectDepartment && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={10}
            center={{lat:parseFloat(selectDepartment.cordN),lng:parseFloat(selectDepartment.cordE)}}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker position={{ lat: parseFloat(selectDepartment.cordN), lng: parseFloat(selectDepartment.cordE) }}/>
          </GoogleMap>
        )}
        </div>
      </div>
    </Modal>
  );
};

export default CityDepartmentModal;
