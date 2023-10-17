import React, { useEffect, useState } from 'react'
import Select from 'react-select';

// eslint-disable-next-line react/prop-types
const Role = ({ url, handleInputChange, isMulti = false ,color}) => {
  const [items, setItems] = React.useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [responce, setResponce] = useState([])
  let AccessToken = localStorage.getItem("AccessToken");

  React.useEffect(() => {
    async function getCharacters() {
      const response = await fetch(`http://localhost:8080/api/v1/${url}`, {
        method: "GET",
        headers: {
          "Authorization": AccessToken,
        },
      });
      const body = await response.json();
      setResponce(body)
      console.log('response', body)
      setItems(body.map(({ roleName, roleId }) => ({ id: roleId, value: roleName, label: roleName })));
    }
    getCharacters();
  }, []);
  const options = items
  function optionSelect(items) {
    console.log("opition", items)
    setSelectedOption(items)
    const roleIds = items.map((item) => item.id)
    const role = roleIds.join(",");
    const roles =responce.filter((item) => roleIds.includes(item.roleId))
    console.log("rolee id",role)
    console.log("rolesss",roles)
  
    handleInputChange(role, roles);
  }
  
return (
    <div className="App" style={{border: `${color}`}}  >
      <Select style={{ width: "100%" }}
        defaultValue={selectedOption}
        onChange={optionSelect}
        options={options}
        isMulti={isMulti}
      />
    </div>
  )
}

export default Role