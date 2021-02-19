import './App.css';
import { useState } from 'react';
import MyForm from '../MyForm/MyForm.js';
import MyTable from '../MyTable/MyTable.js';

function App() {

  const [inputFilter, setInputFilter] = useState('');

  const handleInputChange = (value) => {
    setInputFilter(value);
    // console.log('App.js, value =',value);
  }

  return (
    <div className="App">
      <MyForm onInputChange={handleInputChange}/>
      <MyTable filter={inputFilter}/>
    </div>
  );
}

export default App;
