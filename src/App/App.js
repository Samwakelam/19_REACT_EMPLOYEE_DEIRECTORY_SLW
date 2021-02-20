import './App.css';
import { useState } from 'react';
import MyForm from '../MyForm/MyForm.js';
import MyTable from '../MyTable/MyTable.js';

function App() {

  const [inputFilter, setInputFilter] = useState('');
  const [selectFilter, setSelectFilter] = useState('');
  const [stateThatChanged, setStateThatChanged] = useState('');

  const handleInputChange = (value, input) => {
    setInputFilter(value);
    setStateThatChanged(input);
    // console.log('App.js, input, value =',value);
    // console.log('App.js, input, input =',input);
  }

  const handleSelectChange = (value, select) => {
    setSelectFilter(value);
    setStateThatChanged(select);
    // console.log('App.js, select, value =',value);
    // console.log('App.js, select, select =',select);
  }

  return (
    <div className="App">
      <MyForm onInputChange={handleInputChange} onSelectChange={handleSelectChange} sort={selectFilter} />
      <MyTable filter={inputFilter} sort={selectFilter} state={stateThatChanged} />
    </div>
  );
}

export default App;
