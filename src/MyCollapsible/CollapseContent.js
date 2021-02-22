import { useEffect, useRef, useState } from 'react';

const CollapseContent = ({person, sort}) => {

  console.log('ColapseContent.js, UserSearch, sort =', sort);

  const [activeState, setActiveState] = useState('');
  const [contentHeight, setContentHeight] = useState('');
  const [sortedAttr, setSortedAttr] = useState({ 
    title: '',
    data: '',
  });
  
  const content = useRef(null);

  const toggelCollapse = () => {

    setActiveState(activeState === '' ? 'active' : '');
    // console.log(content.current.scrollHeight);

    // if setActive is equal to active. If it is the function will change setHeight to 0px. 
    // Else, if it’s already 0px it will change to the value of the contentscrollHeight.
    setContentHeight(
      activeState === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
  }
  
  console.log('person.dob.age =', person.dob.age);
  console.log('sortedAttr.title =', sortedAttr.title);

  useEffect(()=> {
    if(sort === 'age'){
      setSortedAttr({ 
        title: 'Age',
        data: person.dob.age,
      })
    } else if(sort === 'dob'){
      setSortedAttr({ 
        title: 'DOB',
        data: person.dob.date,
      })
    } else if(sort === 'sortBy' || '' || 'name') {
      setSortedAttr({ 
        title: '',
        data: '',
      })
    }
  }, [sort]);

  return (
    <article>
      <button className={`collapsible ${activeState}`} onClick={toggelCollapse}>
        <span>{`${person.name.title} ${person.name.first} ${person.name.last}`}</span> 
        <span> {`${sortedAttr.title} ${sortedAttr.data}`} </span> 
      </button>
      <div ref={content} style={{ maxHeight: `${contentHeight}` }} className="content">
        <img className='user-img' src={person.picture.thumbnail} alt="employee image" />
        <div>
          <div className='info-item'>
            <h3 className='info-heading'>Email:</h3>
            <p className='user-info'>{person.email}</p>
          </div>
          <div className='info-item'>
            <h3 className='info-heading'>Phone:</h3>
            <p className='user-info'>{person.cell}</p>
          </div>
          <div className='info-item'>
            <h3 className='info-heading'>DOB:</h3>
            <p className='user-info'>{person.dob.date}</p>
          </div>
          <div className='info-item'>
            <h3 className='info-heading'>Age:</h3>
            <p className='user-info'>{person.dob.age}</p>
          </div>
        </div>
      </div>
    </article>
  )

}

export default CollapseContent;

// REFERENCES

// Brecton,H. (2019). Build a React Accordion Component from Scratch Using React Hooks. Medium. 
// https://medium.com/skillthrive/build-a-react-accordion-component-from-scratch-using-react-hooks-a71d3d91324b. 
// accessed(22.02.2021).