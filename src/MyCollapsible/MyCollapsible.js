import { useEffect, useState } from 'react';
import './MyCollapsible.css';
import CollapseContent from './CollapseContent';

const MyCollapsible = ({
  filter,
  sort,
  lastStateUsed,
  fetchResults,
  filteredResults,
  sortedResults,
}) => {

  // console.log('MyTable.js, UserSearch, filter =', filter);
  // console.log('MyTable.js, UserSearch, sort =', sort);
  // console.log('MyTable.js, UserSearch, lastStateUsed =', lastStateUsed);

  // console.log('sortedResults.length =', sortedResults);
  // console.log('filteredResults.length =', filteredResults);

  let showResults;
  if (lastStateUsed === 'filter' && filteredResults.length !== 0 || sort === 'sortBy' && filteredResults.length !== 0) {
    showResults = filteredResults;
  } else if (lastStateUsed === 'sort' && sortedResults.length !== 0 || sortedResults.length !== 0 && filteredResults.length === 0) {
    showResults = sortedResults;
  } else {
    showResults = fetchResults;
  }

  if (filter.length !== 0 && filteredResults.length === 0) {
    return (
      <div>
          <p>No Match, Try Again ...</p>
      </div>
    )

  } else {
    return (
      showResults.map(result => (
        <CollapseContent person={result} sort={sort} key={result.login.uuid} id={result.login.uuid}/>
      ))
    );
  }

}

export default MyCollapsible;