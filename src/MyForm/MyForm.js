import './MyForm.css';
import { useState } from 'react';

const MyForm = ({onInputChange}) => {

  // const [inputFilter, setInputFilter] = useState('');

  const InputChange = (event) => {
    // console.log(event.target.value);
    onInputChange(event.target.value);
  }

  return (
    <form>
      <label>Filter Employees:</label>
      <input type="text" onChange={InputChange}/>
    </form>
  );
}

export default MyForm;