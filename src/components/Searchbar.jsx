import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { filteredMoviesListArr } from '../redux/actions';

const Searchbar = props => {
  const dispatch = useDispatch();
  const moviesData = useSelector(store => store._movie);
  const [value, setValue] = useState('');
  const handleChange = e => {
    setValue(e.target.value);
    e.target.value === '' && dispatch(filteredMoviesListArr([]));
  };

  const handleSearch = e => {
    e.preventDefault();
    const originalMoviesArr = moviesData.moviesListArr;
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
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onSubmit={handleSearch}
    >
      <div className="mb-3" id="formGroupEmail">
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
