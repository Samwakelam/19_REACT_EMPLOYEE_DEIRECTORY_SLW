import './App.css';
import { useState } from 'react';
import MyForm from '../MyForm/MyForm.js';
import MyTable from '../MyTable/MyTable.js';

function App() {

  const [inputFilter, setInputFilter] = useState('');
  const [selectFilter, setSelectFilter] = useState('');

  const handleInputChange = (value) => {
    setInputFilter(value);
    // console.log('App.js, value =',value);
  }

  const handleSelectChange = (value) => {
    console.log('App.js, value =',value);
    setSelectFilter(value);
  }

  return (
    <div className="App">
      <MyForm onInputChange={handleInputChange} onSelectChange={handleSelectChange} sort={selectFilter} />
      <MyTable filter={inputFilter} sort={selectFilter} />
    </div>
  );
}

export default App;
