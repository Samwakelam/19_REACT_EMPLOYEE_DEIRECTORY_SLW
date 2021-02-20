import './MyForm.css';
import { useState } from 'react';

const MyForm = ({ onInputChange, onSelectChange, sort, onReverse }) => {

  // const [inputFilter, setInputFilter] = useState('');

  const inputChange = (event) => {
    // console.log(event.target.value);
    onInputChange(event.target.value, 'filter');
  }

  const selectChange = (event) => {
    onSelectChange(event.target.value, 'sort');
  }

  const reverseButton = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('click');
    onReverse(true); 
  }

  return (
    <form>
      <label htmlFor='filter-text' >Filter Employees:</label>
      <input id='filter-text' type="text" onChange={inputChange} placeholder='Search Name' />

      <label htmlFor='sort-category' className='hide'>Sort Employees:</label>
      <select value={sort} name="Sort By:" id="sort-category" onChange={selectChange}>
        <option value="sortBy">Sort By:</option>
        <option value="age">Age</option>
        <option value="dob">DOB</option>
        <option value="name">Name</option>
      </select>

      <button id='up-down' type="button"><img src={`${process.env.PUBLIC_URL}/assets/img/up-down.png`} alt='up-down arrows' onClick={reverseButton}/></button>

    </form>
  );
}

export default MyForm;