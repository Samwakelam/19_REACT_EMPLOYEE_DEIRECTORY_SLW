import './App.css';
import { useState } from 'react';
import MyForm from '../MyForm/MyForm.js';
import UserData from '../UserData/UserData.js';

function App() {

  const [inputFilter, setInputFilter] = useState('');
  const [selectFilter, setSelectFilter] = useState('');
  const [stateThatChanged, setStateThatChanged] = useState('');
  const [reverseData, setReverseData] = useState(false);
  const [changeFilter, setChangeFilter] = useState('name');

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

  const handleReverseData = (state) => {
    // console.log('reverse state =', state);
    setReverseData(state);
  }

  const handleChangeFilter = (value, select) => {
    setChangeFilter(value);
  }

  return (
    <div className="App">
      <MyForm 
      onInputChange={handleInputChange} 
      onSelectChange={handleSelectChange} 
      sort={selectFilter} 
      onReverse={handleReverseData} 
      filterBy={changeFilter} 
      onChangeFilter={handleChangeFilter}
      />

      <UserData 
      filter={inputFilter} 
      sort={selectFilter} 
      lastStateUsed={stateThatChanged} 
      onReverse={reverseData} 
      onRender={handleReverseData}
      filterBy={changeFilter} 
      />
    </div>
  );
}

export default App;
