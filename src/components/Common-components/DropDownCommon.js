import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import Constants from 'src/constants/Constants'

// eslint-disable-next-line react/prop-types
const DropDownCommon = ({ url, handleInputChange, keyId, keyName, selectedOption ,color, disabled, isMulti}) => {
  const [items, setItems] = React.useState([]);
  // const [selectedOption, setSelectedOption] = useState(null);
  let AccessToken = localStorage.getItem("AccessToken");
let FullURL=Constants.URL + url;

  React.useEffect(() => {
    async function getCharacters() {
      const response = await fetch(`${FullURL}`, {
        method: "GET",
        headers: {
          "Authorization": AccessToken,
        },
      });
      const body = await response.json();
      // console.log(body);
      // console.log('common-drop-response', response)
      setItems(body.map((option) =>
      ({ id: option[keyId], value: option[keyName], label: option[keyName] }
      )));
    }
    getCharacters();
  }, [FullURL]);



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
        isMulti={isMulti ? isMulti : false}
      />
    </div>
  )
}

export default DropDownCommon