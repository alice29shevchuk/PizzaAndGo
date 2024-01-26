import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {setDepartments,selectDepartment } from '../redux/slices/departmentSlice';
import { useDispatch,useSelector } from 'react-redux';
export const Department = () => {
  const [departments, setDepartment] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const {selectedCityId} = useSelector((state) => state.city);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`http://alisa000077-001-site1.htempurl.com/api/Department/GetDepartmentByID?id=${selectedCityId}`); 
        setDepartment(response.data);
        dispatch(setDepartments(response.data));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [selectedCityId]);

  const handleDepartmentSelect = (department) => {
    dispatch(selectDepartment(department));
  };
  return (
    <div>
      {loading ? (
         <div className="loader">
         <svg className="circular" viewBox="25 25 50 50">
           <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
         </svg>
       </div>
      ) : (
        <div className='select-container'>
        <h3>Выберите магазин</h3>
        <select onChange={(e) => handleDepartmentSelect(parseInt(e.target.value))} value={departments.name}>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>
      </div>
      )}
    </div>
  );
};
