import React, { useState, useEffect } from 'react';
import Loader from './generic_comps/loader';
import { get, isUndefined, size } from 'lodash';
// component
import MovieCard from './Card';
import Alert from './generic_comps/Alert';

// image
import noDataAvailablePoster from '../dummy/slide-3.jpg';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getMovies, saveMoviesListArr } from '../redux/actions';

const Home = () => {
  const dispatch = useDispatch();
  // data from store
  const moviesData = useSelector(store => store._movie);
  const tempArr = moviesData.moviesListArr;
  const filteredMoviesListArr = moviesData.filteredMoviesListArr;
  const searchTerm = moviesData.searchTerm;

  // saving data in local state
  // const [moviesListRaw, setMovieListRaw] = useState([]);
  const [moviesListArr, setMovieListArr] = useState(tempArr);
  //   const [filteredMoviesListArr, setfilteredMoviesListArr] = useState(filtered_data);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const apiCall = async () => {
    try {
      const res = await dispatch(getMovies());

      // alternative way for fetching data instead of redux store
      const _payload = await res.payload;
      const movies = _payload.data;

      // moviesData from store - have some issue
      // const moviesList = await moviesData.moviesList;
      // const movies = await moviesList.data;
      // setMovieListRaw(await moviesList.data);
      setLoading(false);
      setErrorMsg('');
      await convertToArray(movies);
    } catch (e) {
      setErrorMsg(e.message);
    }
  };

  // for stop loading and show no data availble
  if (loading) {
    setTimeout(() => {
      setLoading(false);
      alertFunction('danger', 0, 'time out!')
    }, 5000);
  }

  const convertToArray = data => {
    const arr = [];
    if (data && data !== undefined && !isUndefined(data)) {
      for (const [key, value] of Object.entries(data)) {
        //alternatively: for (let itm in dataInObj) //will return keys of obj
        value['firebaseID'] = key;
        arr.push(value);
      }
    }
    setMovieListArr(arr);
    dispatch(saveMoviesListArr(arr));
    return arr;
  };
  const alertFunction = (className, num, msg) => {
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
    return <Alert variant={`${className}`} description={`${num} ${msg}`} />;
  }

  useEffect(() => {
    apiCall();
  }, [loading]);

  useEffect(() => {
    setMovieListArr(tempArr);
  }, [tempArr]);

  // return (
  //   <>
  //     {loading ? (
  //       <Loader />
  //     ) : (
  //       <>
  //         <Searchbar addBtn placeholder="Movies/ Category" title="at least two words of long movie name separated by spaces"/>
  //         {showAlert && alertMoviesCount()}
  //         <div
  //           style={{
  //             display: 'flex',
  //             flexWrap: 'wrap',
  //             justifyContent: 'center',
  //           }}
  //         >
  //           {searchTerm && size(searchTerm) > 0 ? (
  //             filteredMoviesListArr.length > 0 ? (
  //               filteredMoviesListArr.map((itm, i) => {
  //                 return (
  //                   <Card
  //                     key={i}
  //                     downloadLink={itm.downloadLink}
  //                     poster={itm.poster}
  //                     name={itm.name}
  //                     rating={itm.rating}
  //                     addDate={itm.addDate}
  //                     id={itm.id}
  //                     firebaseID={itm.firebaseID}
  //                     tags={itm.tags}
  //                     desc_movie={itm.desc_movie}
  //                   />
  //                 );
  //               })
  //             ) : (
  //               <h3>No data available</h3>
  //             )
  //           ) : moviesListArr.length > 0 ? (
  //             moviesListArr.map((itm, i) => {
  //               return (
  //                 <Card
  //                   key={i}
  //                   downloadLink={itm.downloadLink}
  //                   poster={itm.poster}
  //                   name={itm.name}
  //                   rating={itm.rating}
  //                   addDate={itm.addDate}
  //                   id={itm.id}
  //                   firebaseID={itm.firebaseID}
  //                   tags={itm.tags}
  //                   desc_movie={itm.desc_movie}
  //                 />
  //               );
  //             })
  //           ) : (
  //             <h3>No data available</h3>
  //           )}
  //         </div>
  //       </>
  //     )}
  //   </>
  // );
  return (
    <main className="main-content">
      <div className="container">
        <div className="page">
          {/* <div className="breadcrumbs">
							<a href="index.html">Home</a>
							<span>Movie Review</span>
						</div> */}
          <div className="movie-list">
            {loading ? (
              <Loader />
            ) : (
              <>
                {searchTerm && size(searchTerm) > 0 && <h5 style={{ color: 'grey' }}>{`${size(filteredMoviesListArr)} fetched for "${searchTerm}"`}</h5>}
                {/* <Searchbar addBtn placeholder="Movies/ Category" title="at least two words of long movie name separated by spaces"/> */}
                {showAlert && alertFunction('success', moviesListArr.length, 'movies to enjoy!')}
                {size(errorMsg) > 0 ? alertFunction('danger', '', errorMsg ) : null}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  {searchTerm && size(searchTerm) > 0 ? (
                    filteredMoviesListArr.length > 0 ? (
                      filteredMoviesListArr.map((itm, i) => {
                        return (
                          <MovieCard
                            key={i}
                            downloadLink={itm.downloadLink}
                            poster={itm.poster}
                            name={itm.name}
                            rating={itm.rating}
                            addDate={itm.addDate}
                            id={itm.id}
                            firebaseID={itm.firebaseID}
                            tags={itm.tags}
                            desc_movie={itm.desc_movie}
                          />
                        );
                      })
                    ) : (
                      // <h4>No data available</h4>
                      <MovieCard
                        // downloadLink={itm.downloadLink}
                        poster={noDataAvailablePoster}
                        name={searchTerm}
                        tags={['no_data!', 'try_again']}
                        editable
                      />
                    )
                  ) : moviesListArr.length > 0 ? (
                    <>
                      {moviesListArr.map((itm, i) => {
                        return (
                          <MovieCard
                            key={i}
                            downloadLink={itm.downloadLink}
                            poster={itm.poster}
                            name={itm.name}
                            rating={itm.rating}
                            addDate={itm.addDate}
                            id={itm.id}
                            firebaseID={itm.firebaseID}
                            tags={itm.tags}
                            desc_movie={itm.desc_movie}
                            editable
                          />
                        );
                      })}
                      <button>Load More</button>
                    </>
                  ) : (
                    // <h4>No data available</h4>
                    <MovieCard
                      // downloadLink={itm.downloadLink}
                      poster={noDataAvailablePoster}
                      name='No Movies Availble'
                      tags={['network_problem', 'no_data!', 'try_again', 'refresh_the_page']}
                      editable={false}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
};

export default Home;
