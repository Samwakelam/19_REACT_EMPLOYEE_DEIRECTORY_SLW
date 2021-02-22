import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import TableHead from '../MyTable/TableHead';
import TableBody from '../MyTable/TableBody';

import MyCollapsible from '../MyCollapsible/MyCollapsible';


const UserData = ({ 
  filter, 
  sort, 
  lastStateUsed, 
  onReverse, 
  onRender, 
  filterBy 
}) => {

  // console.log('MyTable.js, UserSearch, onReverse =', onReverse);
  // console.log('MyTable.js, UserSearch, filterBy =', filterBy);

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 650px)' });
  const isFullScreen = useMediaQuery({ query: '(min-width: 650px)' });

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

    if (lastStateUsed === 'filter') {
      setFilteredResults(filteredResults.reverse());
      return onRender(false);
    } else if (lastStateUsed === 'sort') {
      setSortedResults(sortedResults.reverse());
      return onRender(false);
    } else {
      setFetchResults(fetchResults.reverse());
      return onRender(false);
    }

  }, [onReverse]);

  // console.log('MyTable, filter =', filter);
  return (
    <div id='wrapper'>
      {isFullScreen && 
        <table>
          <TableHead />
          <TableBody
            filter = {filter}
            sort = {sort}
            lastStateUsed = {lastStateUsed}
            fetchResults = {fetchResults}
            filteredResults = {filteredResults}
            sortedResults = {sortedResults}
          />
        </table>
      }
      {isTabletOrMobile && 
        <div className='collapsible-container'> 
          <MyCollapsible 
            filter = {filter}
            sort = {sort}
            lastStateUsed = {lastStateUsed}
            fetchResults = {fetchResults}
            filteredResults = {filteredResults}
            sortedResults = {sortedResults}
          /> 
        </div>
      }
    </div>
  );
}


export default UserData;
