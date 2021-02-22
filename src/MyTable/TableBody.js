import './MyTable.css';
import './MyTable-media.css';


const TableBody = ({
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
  
  // console.log('TableBody, sortedResults =', sortedResults);
  // console.log('TableBody, filteredResults =', filteredResults);

  // console.log('filteredResults.length !== 0', filteredResults.length !== 0 );
  // console.log('sortedResults.length !== 0', sortedResults.length !== 0 );

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

export default TableBody;