import React  from 'react'
import Select from 'react-select';


// eslint-disable-next-line react/prop-types
const DropDownEmployDesignation = ({ url, handleInputChange, keyId, keyName,keyNo, selectedOption ,color, disabled}) => {
  const [items, setItems] = React.useState([]);
  // const [selectedOption, setSelectedOption] = useState(null);
  let AccessToken = localStorage.getItem("AccessToken");
  console.log('DEPARTMENT URL', url)
  React.useEffect(() => {
    async function getCharacters() {
      const response = await fetch(`http://localhost:8080/api/v1/${url}`, {
        method: "GET",
        headers: {
          "Authorization": AccessToken,
        },
      });
      const body = await response.json();
      // console.log('response', response)
      setItems(body.map((option) =>
      ({ id: option[keyId], value: option[keyName], label: option[keyName] , departmentNo: option[keyNo]}
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
        isDisabled={disabled}
        value={selectedOption}
        onChange={optionSelect}
        options={items}
      />
    </div>
  )
}

export default DropDownEmployDesignation