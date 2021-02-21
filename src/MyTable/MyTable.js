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

const UserSearch = ({ filter, sort, state, onReverse, onRender, filterBy }) => {

  // console.log('MyTable.js, UserSearch, filter =', filter);
  // console.log('MyTable.js, UserSearch, sort =', sort);
  // console.log('MyTable.js, UserSearch, state =', state);
  // console.log('MyTable.js, UserSearch, onReverse =', onReverse);
  // console.log('MyTable.js, UserSearch, filterBy =', filterBy);

  const [fetchResults, setFetchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [sortedResults, setSortedResults] = useState([]);

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
        const sortByName = userData.results.slice(0).sort(function (a, b) {

          if (a.name.last < b.name.last) {
            return -1;
          }
          if (a.name.last > b.name.last) {
            return 1;
          }
          return 0;
        });
        // format DOB
        userData.results.forEach(person => {
          // console.log('dob =', person.dob.date.slice(0,10));
          const formatDOB = person.dob.date.slice(0, 10);
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

    let resultsToFilter;
    if (sortedResults.length !== 0) {
      resultsToFilter = sortedResults;
    } else {
      resultsToFilter = fetchResults;
    }


    if (filter === '') {

      setFilteredResults([]);

    } else if (filterBy === 'name') {
      let filterEmployeeByName = resultsToFilter.filter((person) => {
        let name = (`${person.name.first} ${person.name.last}`).toString().toLowerCase();
        const condition = name.includes(filter);
        return condition;
      });
      // console.log('MyTable, filterEmployeeByName =', filterEmployeeByName);
      setFilteredResults(filterEmployeeByName);

    } else if (filterBy === 'age') {
      let filterEmployeeByAge = resultsToFilter.filter((person) => {
        let age = (person.dob.age).toString();
        const condition = age.includes(filter);
        return condition;
      });
      setFilteredResults(filterEmployeeByAge);

    } else if (filterBy === 'dob') {
      let numericMonth;
      // console.log('isNotANumber', isNaN(filter));
      if (isNaN(filter)) {
        const month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        const filterFormat = filter.substring(0, 3).toLowerCase();
        numericMonth = month.indexOf(filterFormat) + 1;
      } else {
        numericMonth = parseInt(filter);

      }


      let filterEmployeeByMonth = resultsToFilter.filter((person) => {
        const dob = (person.dob.date).toString().split('-');
        const month = parseInt(dob[1]);
        // console.log('month', month);
        const condition = month === numericMonth;
        // console.log('condition =', condition);
        return condition;
      });
      setFilteredResults(filterEmployeeByMonth);

    }

  }, [filter, filterBy]);

  useEffect(() => {

    let resultsToSort;
    if (filteredResults.length !== 0) {
      resultsToSort = filteredResults;
    } else {
      resultsToSort = fetchResults;
    }

    let sortedData;
    switch (sort) {
      case 'age':
        sortedData = resultsToSort.slice(0).sort(function (a, b) {
          return a.dob.age - b.dob.age;
        });
        // console.log(sortedData);
        setSortedResults(sortedData);
        break;
      case 'dob':
        sortedData = resultsToSort.slice(0).sort(function (a, b) {
          return new Date(a.dob.date) - new Date(b.dob.date);
        });
        // console.log(sortedData);
        setSortedResults(sortedData);
        break;
      case 'name':
        sortedData = resultsToSort.slice(0).sort(function (a, b) {
          if (a.name.last < b.name.last) {
            return -1;
          }
          if (a.name.last > b.name.last) {
            return 1;
          }
          return 0;
        });
        setSortedResults(sortedData);
        break;
      case 'sortBy':
        setSortedResults([]);
        break;
    }

  }, [sort]);

  useEffect(() => {

    if (state === 'filter') {
      setFilteredResults(filteredResults.reverse());
      return onRender(false);
    } else if (state === 'sort') {
      setSortedResults(sortedResults.reverse());
      return onRender(false);
    } else {
      setFetchResults(fetchResults.reverse());
      return onRender(false);
    }

  }, [onReverse]);

  // console.log('filteredResults.length !== 0', filteredResults.length !== 0 );
  // console.log('sortedResults.length !== 0', sortedResults.length !== 0 );

  let showResults;
  if (state === 'filter' && filteredResults.length !== 0 || sort === 'sortBy' && filteredResults.length !== 0) {
    showResults = filteredResults;
  } else if (state === 'sort' && sortedResults.length !== 0 || sortedResults.length !== 0 && filteredResults.length === 0) {
    showResults = sortedResults;
  } else {
    showResults = fetchResults;
  }

  if (filter.length !== 0 && filteredResults.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan='6'>No Match, Try Again ...</td>
        </tr>
      </tbody>
    )

  } else {
    return (
      showResults.map(result => (
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


const MyTable = ({ filter, sort, state, onReverse, onRender, filterBy }) => {

  // console.log('MyTable, filter =', filter);
  return (
    <table>
      <TableHead />
      <UserSearch
        filter={filter}
        sort={sort}
        state={state}
        onReverse={onReverse}
        onRender={onRender}
        filterBy={filterBy}
      />
    </table>
  );
}


export default MyTable
