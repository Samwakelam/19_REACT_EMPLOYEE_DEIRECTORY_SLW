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


const UserSearch = ({ filter, sort }) => {

  // console.log('MyTable.js, UserSearch, filter =', filter);
  // console.log('MyTable.js, UserSearch, sort =', sort);

  const [ fetchResults, setFetchResults ] = useState([]);
  const [ filteredResults, setFilteredResults ] = useState([]);
  const [ sortedResults, setSortedResults ] = useState([]);

  useEffect(() => {
    // define the code
    const fetchData = async () => {
      const queryURL = 'https://randomuser.me/api/?results=10&nat=gb'
      // console.log('UserSearch, queryURL =', queryURL);

      const response = await fetch(queryURL);
      if (response.ok) {
        // console.log('UserSearch, fetch, response =', response);

        
        // call setResults here to put the results into state, to cause a re-render
        const userData = await response.json();
        const sortByName = userData.results.slice(0).sort(function(a,b){
          
          if ( a.name.last < b.name.last ){
            return -1;
          }
          if ( a.name.last > b.name.last ){
            return 1;
          }
          return 0;
        });
        // format DOB
        userData.results.forEach(person => {
          // console.log('dob =', person.dob.date.slice(0,10));
          const formatDOB = person.dob.date.slice(0,10);
          person.dob.date = formatDOB;
        });
        
        // console.log('UserSeach, userData =', userData); 
        // console.log('UserSeach, sortName =', sortByName); 
        setFetchResults(sortByName);
      } else {
        console.log('fetch error', response.status);

      }
    }
    // call it now to auto run - fetch data is a function! 
    fetchData();

  }, []);
  // what is the extra [] for ? - 
  // explicitly that there are no dependencies, we only want this to fire once, onMount.
  // you can have it dependent on multiple things passd in to the array.

  useEffect(() => {
    
    if( filter === '') {

      setFilteredResults([]);

    } else {

      let filterEmployeeByName = fetchResults.filter((person) => {
        let name = (`${person.name.first} ${person.name.last}`).toString().toLowerCase();
        const condition = name.includes(filter);
        return condition;
      });
      // console.log('MyTable, filterEmployeeByName =', filterEmployeeByName);
      setFilteredResults(filterEmployeeByName);

    }

  }, [filter]);

  useEffect(() => {
    let sortedData;
      switch (sort) {
        case 'age':
          sortedData = fetchResults.slice(0).sort(function(a,b){
            return a.dob.age - b.dob.age;
          });
          // console.log(sortedData);
          setSortedResults(sortedData);
        break;
        case 'dob' :
          sortedData = fetchResults.slice(0).sort(function(a,b){
            return new Date(a.dob.date) - new Date(b.dob.date);
          });
          // console.log(sortedData);
          setSortedResults(sortedData);
        break;
        case 'name' :
          setSortedResults([]);
        break;
      }
    

  }, [sort]);

  // console.log('filteredResults.length !== 0', filteredResults.length !== 0 );
  // console.log('sortedResults.length !== 0', sortedResults.length !== 0 );

  if(filteredResults.length !== 0){
    return (
      filteredResults.map(result => (
        <tbody key={result.login.uuid} id={result.login.uuid}>
          <tr>
            <td><img src={result.picture.thumbnail} alt="employee image" /></td>
            <td>{`${result.name.title} ${result.name.first} ${result.name.last}`}</td>
            <td>{result.email}</td>
            <td>{result.cell}</td>
            <td>{result.dob.date}</td>
            <td>{result.dob.age}</td>
          </tr>
        </tbody>
      ))
    );
  } else if(sortedResults.length !== 0) {
    return (
      sortedResults.map(result => (
        <tbody key={result.login.uuid} id={result.login.uuid}>
          <tr>
            <td><img src={result.picture.thumbnail} alt="employee image" /></td>
            <td>{`${result.name.title} ${result.name.first} ${result.name.last}`}</td>
            <td>{result.email}</td>
            <td>{result.cell}</td>
            <td>{result.dob.date}</td>
            <td>{result.dob.age}</td>
          </tr>
        </tbody>
      ))
    );
  } else {
    return(
      fetchResults.map(result => (
        <tbody key={result.login.uuid} id={result.login.uuid}>
          <tr>
            <td><img src={result.picture.thumbnail} alt="employee image" /></td>
            <td>{`${result.name.title} ${result.name.first} ${result.name.last}`}</td>
            <td>{result.email}</td>
            <td>{result.cell}</td>
            <td>{result.dob.date}</td>
            <td>{result.dob.age}</td>
          </tr>
        </tbody>
      ))
    );
  }

}


const MyTable = ({ filter, sort }) => {

  // console.log('MyTable, filter =', filter);
  return (
    <table>
      <TableHead />
      <UserSearch filter={filter} sort ={sort} />

    </table>
  );
}


export default MyTable
