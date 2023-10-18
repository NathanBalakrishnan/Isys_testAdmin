import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { setAuthToken } from './setAuthToken'
import Constants from '../constants/Constants'
import { createSlice } from '@reduxjs/toolkit';

const loginslice = createSlice({
  name:"login",
  initialState:{user:{emailId:"",passWord:"",success:false}},
  reducers:{
    loginUser:(state,action)=>{
          state.user = action.payload
          state.user.success=true
    }
  }
})
export const apiConfig = (emailId, passWord) =>async(dispatch) => {
  //reqres registered sample user
  const loginPayload = {
    emailId: emailId,
    password: passWord,
  }
  console.log("loginpayload",loginPayload)
  axios.post('http://localhost:8080/adminservices/adminorch/v1/login/admin', loginPayload, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log('Response:', response.data);
     
      if(response.data.message === "Login Successful"){
        alert(response.data.message)
         //get token from response
      // const token = response.data.data.accessToken
      // console.log('token-staus', JSON.stringify(response.data.responsibilityDTO))
      // console.log('Access-token-login', token)
      // console.log('Login successful:', response.data);
      // set JWT token to local
       // localStorage.setItem('AccessToken', token)
       // localStorage.setItem('AccessTokenPermissions', JSON.stringify(response.data.responsibilityDTO))
 
       // //set token to axios common header
       // setAuthToken(token)
 
       // //dispatch action to update state with token
       // dispatch(setAccessToken(token))
 
       //redirect user to home page
        window.location.href = '/#/dashboard'
      }
      else{
        window.alert('Username or Password is incorrect')
        window.location.href = ''
      }
    })
    .catch(error => {
      window.alert('Username or Password is incorrect',error)
      console.error('Error:', error);
    });

}

export const MakeApiCall = ({ url }) => {
  // console.log('contract url api', url)
  let link = `http://localhost:8080/api/v1/${url}`
  // console.log('link', link)
  let AccessToken = localStorage.getItem('AccessToken')
  useEffect(async () => {
    await axios
      .get(`http://localhost:8080/api/v1/${url}`, {
        headers: {
          Authorization: AccessToken,
        },
      })
      .then((response) => {
        //get token from response
        const token = response
        // console.log('myrespo', response.data)
      })
      .catch((err) => {
        console.log('errr')
        console.log(err)
      })
  }, [])
}

export const searchEmployeeApiCall = (values, callback) => {
  const AuthToken = localStorage.getItem('AccessToken')
  let data = JSON.stringify(values)
  let FullURL = Constants.URL + Constants.resource_search
  axios
    .post(FullURL, data, {
      headers: {
        Authorization: AuthToken,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      callback(response.data)
    })
    .catch((error) => {
      console.log('error ' + error)
    })
}

export const searchFormsApiCall = (values, callback, search_URL) => {
  const AuthToken = localStorage.getItem('AccessToken')
  let data = JSON.stringify(values)
  let FullURL = Constants.URL + `${search_URL}`
  axios
    .post(FullURL, data, {
      headers: {
        Authorization: AuthToken,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      // console.log('apisearch-response', response)
      callback(response.data)
    })
    .catch((error) => {
      console.log('error ' + error)
    })
}
//axios.get('http://localhost:8085/services/data/v1/listCompanies', {timeout:5000} )
  //https://jsonplaceholder.typicode.com/users
// export const searchCompanyApiCall = (callback, search_URL) => {
  
//   axios.get("http://10.0.2.2:8085/services/data/v1/listCompanies")
//   .then(response => {
//     // Handle the successful response
//     console.log('Successfull', response)
//   })
//   .catch(error => {
//     if (error.response) {
//       // The request was made, but the server responded with an error status code
//       console.error('Server Error:', error.response.data);
//     } else if (error.request) {
//       // The request was made, but no response was received
//       console.error('No Response from Server');
//     } else {
//       // Something else happened while setting up the request
//       console.error('Error:', error.message);
//     }
//   });
// }




// export const searchCompanyApiCall=()=>{
 
//   const apiUrl = 'http://localhost:8085/services/data/v1/listCompanies';
//    console.log("URL",apiUrl)

//   // Make a GET request to the API
//   axios.get(apiUrl)
//   .then((response) => {
//     // Successful response
    
//   })
//   .catch((err) => {
//     // Handle different types of errors
//     if (err.response) {
//       // The request was made and the server responded with a status code
//       console.log(`Server Error: ${err.response.status}`);
//     } else if (err.request) {
//       // The request was made but no response was received
//       console.log('Network Error',err);
//     } else {
//       // Something else happened while setting up the request
//       console.log('Error: ' + err.message);
//     }
   
//   });

// }
export const searchRoleApiCall=(callback,search_URL)=>{
  
  let FullURL = Constants.URL + `${search_URL}`
  console.log(FullURL)
  axios.get(FullURL,  {
   
      headers: {
        //Authorization: AuthToken,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    })
    .then((response) => {
      //console.log("responce",response)
       callback(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}
export const searchCompanyGroupApiCall = (callback, search_URL) => {
  let FullURL = Constants.URL + `${search_URL}`
 
   axios.get(FullURL,  {
    
       headers: {
         //Authorization: AuthToken,
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Headers': '*',
       },
     })
     .then((response) => {
       //console.log("responce",response)
        callback(response.data)
     })
     .catch((error) => {
       console.log(error)
     })
 }
export const searchCompanyApiCall = (callback, search_URL) => {
 // const AuthToken = localStorage.getItem('AccessToken')
  //let data = JSON.stringify()

  let FullURL = Constants.URL + `${search_URL}`
  axios.get(FullURL,  {
   
      headers: {
        //Authorization: AuthToken,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    })
    .then((response) => {
      //console.log("responce",response)
       callback(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}
export const getSheetApiCall = (values, callback, search_URL, resource_No = null) => {
  const AuthToken = localStorage.getItem('AccessToken');
  let FullURL = Constants.URL + `${search_URL}`+'?startDate='+values.fromDate+'&endDate='+values.toDate;
  if (resource_No) {
    FullURL += '&resourceNo='+`${resource_No}`;
  }
  console.log('FULL-URL', FullURL)
  axios
    .get(FullURL, {
      headers: {
        Authorization: AuthToken,
      },
    })
    .then((response) => {
      // console.log('GetSheet-response', response.data)
      callback(response.data)
    })
    .catch((error) => {
      console.log('error ' + error)
    })
}


export const getTimeSheetTaskApiCall = (values, callback, search_URL) => {
  const AuthToken = localStorage.getItem('AccessToken')
  let FullURL = Constants.URL + `${search_URL}`
  axios
    .post(FullURL, {
      headers: {
        Authorization: AuthToken,
      },
      body: values,
    })
    .then((response) => {
      // console.log('ALL-TASK', response.data)
      callback(response.data)
    })
    .catch((error) => {
      console.log('error ' + error)
    })
}

export const getHolidayApiCall = (callback, search_URL) => {
  const AuthToken = localStorage.getItem('AccessToken')
  let FullURL = Constants.URL + `${search_URL}`
  axios
    .get(FullURL, {
      headers: {
        Authorization: AuthToken,
      },
    })
    .then((response) => {
      console.log('GetSheet-response', response.data)
      callback(response.data)
    })
    .catch((error) => {
      console.log('error ' + error)
    })
}

export const requirementFormApiCall = (values, callback) => {
  const AuthToken = localStorage.getItem('AccessToken')
  let data = JSON.stringify(values)
  let FullURL = Constants.URL + Constants.requirement_table_api
  axios
    .post(FullURL, data, {
      headers: {
        Authorization: AuthToken,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      callback(response.data)
    })
    .catch((error) => {
      console.log('error ' + error)
    })
}

// export function accessFunctionNew(responsibleName, accessName) {
//   let AccessPermissions = localStorage.getItem('AccessTokenPermissions');
//   // console.log('AccessPermissions', AccessPermissions)
//   if (AccessPermissions) {
//     let AccessPermission = localStorage.getItem('AccessTokenPermissions');
//     let arrayValues = JSON.parse(AccessPermission);
//     var access = '';
//     var filteredArray = arrayValues.filter(function (requiredName) {
//       return requiredName.responsibilityName == responsibleName
//     });
//     access = filteredArray[0]?.[accessName];
//     return access; 
//     // return access = true; //Finaly remove this
//   } else {
//     window.href= '/#/login'
//   }
// }

export function accessFunctionNew(responsibleName, accessName) {
  const AccessPermissions = localStorage.getItem('AccessTokenPermissions');
  if (AccessPermissions) {
    const arrayValues = JSON.parse(AccessPermissions);
    const filteredArray = arrayValues ? arrayValues.filter(permission => permission.responsibilityName === responsibleName) : [];
    const access = filteredArray.length ? filteredArray[0]?.actionDTOS?.[accessName] : false;
    // console.log('returning-access-page-name', responsibleName)
    // console.log('returning-access-name', accessName)
    // console.log('returning-access', access)
    return access; 
  } else {
    // window.location.href = '/#/forms/company-data';
    return false;
  }
}

export function accessFunctionUser(responsibleName) {
  const AccessPermissions = localStorage.getItem('AccessTokenPermissions');
  if (AccessPermissions) {
    const arrayValues = JSON.parse(AccessPermissions);
    const filteredArray = arrayValues ? arrayValues.filter(permission => permission.responsibilityName === responsibleName) : [];
    const user = filteredArray.length ? filteredArray[0]?.roleName : 'something went wrong';
    // console.log('ACCESS-USER', user)
    return user; 
  } else {
    window.location.href = '/#/login';
    return null;
  }
}


export const {loginUser} = loginslice.actions;
export const loginState = (state) => state.loginData;
export default loginslice.reducer;