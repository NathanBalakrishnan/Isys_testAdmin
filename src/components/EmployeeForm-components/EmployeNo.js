import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { CFormInput } from '@coreui/react';

const EmployeeNo = ({ url }) => {
  const [contractNo, setContractNo] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const accessToken = localStorage.getItem('AccessToken');
        const response = await axios.get(`http://localhost:8080/${url}`, {
          headers: {
            Authorization: accessToken,
          },
        });
        setContractNo(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [url]);

  return (
    <CFormInput
      style={{ opacity: '0.7' }}
      type="text"
      id="contractNo"
      disabled
      placeholder="Employee No"
      name="contractNo"
      value={contractNo}
    />
  );
};

EmployeeNo.propTypes = {
  url: PropTypes.string.isRequired,
};

export default EmployeeNo;
