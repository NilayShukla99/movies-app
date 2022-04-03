import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { filteredMoviesListArr } from '../redux/actions';
import { Typeahead } from 'react-bootstrap-typeahead';
import { size, get } from 'lodash';
import { getMovies } from '../redux/actions'

const Searchbar = props => {
  const dispatch = useDispatch();
  const moviesData = useSelector(store => store._movie);
  const typeaheadRef = useRef(null);
  const [value, setValue] = useState('');
  const [originalMoviesArr, setOriginalMoviesArr] = useState(moviesData.moviesListArr);
  const handleChange = e => {
    // setValue(e.target.value);
    // e.target.value === '' && dispatch(filteredMoviesListArr([]));
    const selected = get(typeaheadRef, 'current.state');
    if (selected) {
      setValue(get(selected, 'text', get(selected, 'name', '')));
      (selected.name === '') || (selected.name === undefined) && dispatch(filteredMoviesListArr([]));
      // if selected we run handleSearch using useEffect
    }
  };
  const handleInput = e => {
    setValue(e);
  };

  useEffect(() => {
    handleSearch();
  }, [value]);

  if (size(originalMoviesArr) === 0){
      const res = getMovies();
      res.payload.then(e => {
        const temp = [];
        for (const [key, value] of Object.entries(e.data)) {
          value['firebaseId'] = key;
          temp.push(value);
        }
        setOriginalMoviesArr(temp);
      });
  }
  const handleSearch = () => {
    // e.preventDefault();
    // const originalMoviesArr = moviesData.moviesListArr;
    const searchTerm = value.toLowerCase().trim();
    if (value) {
      const filteredArr = originalMoviesArr.filter((itm, i) => {
        const itmName = itm.name.toLowerCase().trim();
        const tags = itm.tags;
        // const regExVal = new RegExp(`.*${_val}.*`, 'i'); // /.*${_val}.*/i
        if (searchTerm.includes(itmName) || tags.includes(searchTerm.trim())) return true;
        if (searchTerm.split(' ').length > 1) {
            const _valArr = searchTerm.split(' ');
          for (let i of _valArr) {
            return itmName.includes(i) || tags.includes(i);
          }
        } 
      });
      dispatch(filteredMoviesListArr(filteredArr, searchTerm));
    } else if (value === '' || value === undefined || value.length === 0) {
      dispatch(filteredMoviesListArr([], searchTerm));
    }
  };

  return (
    <form
      // style={{
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center'
      // }}
      // onSubmit={handleSearch}
    >
      {/* <div className="mb-3" id="formGroupEmail">
        <input
          type="search"
          placeholder={props.placeholder}
          style={{
            transform: 'translateY(20%)',
            width: '400px',
            border: '2px solid #ffaa3c'
          }}
          value={value}
          onChange={handleChange}
        />
      </div> */}
      <div id="formGroupEmail">
      <Typeahead
        className='typeahead'
        allowNew
        id="public-methods-example"
        labelKey="name"
        options={originalMoviesArr}
        renderMenuItemChildren={(option, props, index) => {
          const styleImg = {
            width: '25px',
            height: '30px',
            borderRadius: '3px',
            marginRight: '7px'
          };
          const styleParent = {
            display: 'flex'
          };
            return (
              <figure style={styleParent}>
              <img src={get(option, 'poster')} alt={get(option, 'name')} style={styleImg} />
              <figcaption>{get(option, 'name', '')}</figcaption>
            </figure>
            )
        }}
        placeholder="Search a moive..."
        ref={typeaheadRef}
        onChange={handleChange}
        onInputChange={handleInput}
      />
      </div>
      {props.addBtn && (
        <Button
          variant="success"
          as={Link}
          to="/add-movie"
          style={{
            width: '110px',
            margin: '10px',
          }}
        >
          Add
        </Button>
      )}

      {props.searchBtn && (
        <button
          variant="success"
          type="submit"
          onClick={handleSearch}
          style={{
            width: '110px',
            margin: '10px',
          }}
        >
          Search
        </button>
      )}
    </form>
  );
};

export default Searchbar;
