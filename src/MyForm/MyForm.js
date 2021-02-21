import './MyForm.css';
import { useEffect, useState } from 'react';

const MyForm = ({ 
  onInputChange, 
  onSelectChange, 
  onChangeFilter, 
  sort, 
  onReverse, 
  filterBy
}) => {

  // const [inputFilter, setInputFilter] = useState('');
  const [field, setField] = useState('Name');

  const inputChange = (event) => {
    // console.log(event.target.value);
    onInputChange(event.target.value, 'filter');
  }

  const selectChange = (event) => {
    onSelectChange(event.target.value, 'sort');
  }

  const changeFilter = (event) => {
    onChangeFilter(event.target.value, 'filterBy');
    // console.log(event.target.value);
    if(event.target.value === 'name') {
      setField('Name');
    }
    if(event.target.value === 'age') {
      setField('Age');
    }
    if(event.target.value === 'dob') {
      setField('Month');
    }
  }

  const reverseButton = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('click');
    onReverse(true);
  }

  

  return (
    <form>
      <label htmlFor='filter-text' >Filter Employees By:</label>
      <label htmlFor='sort-category' className='hide'>Sort Employees:</label>
      <select id="sort-filter" value={filterBy} name="filter-by" onChange={changeFilter}>
        <option value="name">Name</option>
        <option value="dob">DOB</option>
        <option value="age">Age</option>
      </select>
      <input id='filter-text' type="text" onChange={inputChange} placeholder={`Search ${field}`} />

      <label htmlFor='sort-category' className='hide'>Sort Employees:</label>
      <select id="sort-category" value={sort} name="sort-by" onChange={selectChange}>
        <option value="sortBy">Sort By:</option>
        <option value="age">Age</option>
        <option value="dob">DOB</option>
        <option value="name">Name</option>
      </select>

      <button id='up-down' type="button"><img src={`${process.env.PUBLIC_URL}/assets/img/up-down.png`} alt='up-down arrows' onClick={reverseButton} /></button>

    </form>
  );
}

export default MyForm;