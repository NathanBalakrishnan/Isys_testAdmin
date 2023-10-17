import React from 'react'
import { AiOutlineConsoleSql } from 'react-icons/ai';
import Select from 'react-select';


// eslint-disable-next-line react/prop-types
const DropDownCompany = ({ url, handleInputChange, keyId, keyName, keyNo, selectedOption ,color}) => {
  const [items, setItems] = React.useState([]);
  // const [selectedOption, setSelectedOption] = useState(null);
  let AccessToken = localStorage.getItem("AccessToken");

  React.useEffect(() => {
    async function getCharacters() {
        console.log('DEPARTMENT URL', url)
      const response = await fetch(`${url}`, {
        method: "GET",
        headers: {
          "Authorization": AccessToken,
        },
      });
      const body = await response.json();
      console.log('response', response)
      setItems(body.map((option) =>
   
      ({ id: option[keyId], value: option[keyName], label: option[keyName], companyNo: option[keyNo] }
     
      )));
    }
    getCharacters();
  }, [url]);



  function optionSelect(items) {
    // setSelectedOption(items)
    handleInputChange(items)
  }
  // {console.log('dropdown name', keyName)}
  // {console.log('dropdown slected', selectedOption)}
  return (
    <div className="App" style={{border: `${color}`}}  >
      <Select 
        // styles={{
        //   control: (baseStyles, disabled) => ({
        //     ...baseStyles,
        //     backgroundColor: disabled ? '#d8dbe0' : 'red',
        //   }),
        // }}
        // isDisabled={disabled}
        value={selectedOption}
        onChange={optionSelect}
        options={items}
      />
    </div>
  )
}

export default DropDownCompany