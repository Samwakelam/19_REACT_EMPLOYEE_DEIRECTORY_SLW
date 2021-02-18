import { useEffect, useState } from 'react';
import './MyTable.css';

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th>Photo</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>DOB</th>
        <th>Age</th>
      </tr>
    </thead>  
  )
}


const UserSearch  = () => {

  const [ fetchResults, setFetchResults ] = useState([]);

  useEffect(() => {
    // define the code
    const fetchData = async () => {
      const queryURL = 'https://randomuser.me/api/?results=10'
      console.log('UserSearch, queryURL =', queryURL);

      const response = await fetch(queryURL);
      if(response.ok){
        // console.log('UserSearch, fetch, response =', response);
        // call setResults here to put the results into state, to cause a re-render
        const userData = await response.json();
        // console.log('UserSeach, userData =', userData); 
        setFetchResults(userData.results);
      } else {
        console.log('fetch error', response.status);
        
      }
    }
    // call it now to auto run - fetch data is a function! 
    fetchData();

  },[]); // what is the extra [] for ? -
  
  console.log('UserSearch, fetchResults =', fetchResults); 

  return (
    <tbody>
      {
        fetchResults.map(result => (
        <tr key={result.login.uuid} id={result.login.uuid}>
          <td><img src={result.picture.thumbnail} alt="employee image"/></td>
          <td>{`${result.name.title} ${result.name.first} ${result.name.last}`}</td>
          <td>{result.email}</td>
          <td>{result.cell}</td>
          <td>{result.dob.date}</td>
          <td>{result.dob.age}</td>
        </tr>
        ))
      }
      
    </tbody>
  )
}



const MyTable = () => {
  return (
    <table>
      <TableHead />
      <UserSearch />
        
    </table>
  );
}

export default MyTable