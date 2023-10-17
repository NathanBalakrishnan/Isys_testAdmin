import React, { useState, useEffect } from 'react'
import { MakeApiCall } from 'src/api/apiConfig'
import { CFormInput } from '@coreui/react'
import axios from 'axios'
import PropTypes from 'prop-types';

const GetLastid = ({ url }) => {
    const [lastId, setLastId] = useState('')
    let AccessToken = localStorage.getItem("AccessToken")   ; 

    useEffect(() => {
        async function fetchData() {
            try {
                const AccessToken = localStorage.getItem("AccessToken");
                const response = await axios.get(`http://localhost:8080/api/v1/${url}`, {
                    headers: {
                        Authorization: AccessToken, 
                    },
                })
                setLastId(response.data)
            }
            catch (error) {
                console.log('error', error)
            }
        }
        fetchData();
    }, [url])

    return (
        <CFormInput
            style={{opacity: '0.7'}}
            type="text"
            id="lastId"
            disabled
            placeholder="Last Id"
            name="lastId"
            value={lastId}
        />
    )
}

GetLastid.propTypes = {
    url: PropTypes.string.isRequired,
}

export default GetLastid