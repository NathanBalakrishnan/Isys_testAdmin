import React, { useEffect, useState } from 'react'
import Select from 'react-select';


// eslint-disable-next-line react/prop-types
const DropDownCommonNew = ({ url, handleInputChange, keyId, keyName, selectedOption ,color, disabled, isMulti}) => {
  const [items, setItems] = React.useState([]);
  // const [selectedOption, setSelectedOption] = useState(null);
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
      // console.log('common-drop-response', response)
      setItems(body.map((option) =>
      ({ id: option[keyId], value: option[keyName], label: option[keyName] }
      )));
    }
    getCharacters();
  }, []);



  function optionSelect(items) {
    // setSelectedOption(items)
    handleInputChange(items)
  }
  // {console.log('dropdown name', keyName)}
  // {console.log('dropdown slected', selectedOption)}
  return (
    <div className="App" style={{border: `${color}`}}  >
      <Select 
        isDisabled={disabled}
        value={selectedOption}
        onChange={optionSelect}
        options={items}
        isMulti={isMulti}
      />
    </div>
  )
}

export default DropDownCommonNew