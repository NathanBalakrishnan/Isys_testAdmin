import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import {
  CRow,
  CCol,
  CModal,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CButton,
  CContainer,
} from '@coreui/react'
import styles from '../../components/Styles/DashboardStyles/DashboardStyles.module.css';

const RunningNotifications = () => {
  const [apiData, setApiData] = useState([''])
  const [visible, setVisible] = useState(false)
  const [specificIdData, setSpecificIdData] = useState({})

  const notificationAPiCall = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/get_All_Notification');
      // Handle the response data here
      console.log('respo', response.data);
      setApiData(response.data);
    } catch (error) {
      // Handle error if the API call fails
      console.error(error);
    }
  };

  useEffect(() => {
    notificationAPiCall(); // Call the API function
  }, []);

  const messagesEndRef = useRef(null);
  
  const handleClick = (noteId, noteName, noteDescription) => {
    try {
      const response = axios.get(`http://localhost:8080/api/v1/notification_By_Id/${noteId}`);
      console.log('Notification id clicked');
    } catch (error) {
      console.error(error);
    }
    setSpecificIdData({
      id: noteId,
      name: noteName,
      description: noteDescription,
    })
    setVisible(true)
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <>
    <div className={styles.scrollContainer}>
      {apiData.map(({ notificationId, notificationName, notificationDescription, isViewed }) => (
        <div className={styles.scrollText} key={`${notificationId}_${notificationName}`}>
          <a className={styles.linkTxt} href={'#'} onClick={(e) => { e.preventDefault(); handleClick(notificationId, notificationName, notificationDescription); }}>
            {notificationName}
          </a>
          {isViewed ? '' : (<span className={styles.newTxt}>NEW</span>)}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>

      <CModal 
        visible={visible} 
        onClose={() => (setVisible(false))}
      >
        <CModalHeader>
        <CModalTitle>
          {specificIdData && specificIdData.name ? specificIdData.name.toUpperCase() : ''}
        </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p style={{fontSize: '25px'}}>{specificIdData.description}</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="info" onClick={() => (setVisible(false))}>
            OK
          </CButton>
        </CModalFooter>
      </CModal>
    
    </>
  );
};

export default RunningNotifications;
