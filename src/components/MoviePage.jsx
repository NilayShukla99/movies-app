import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMovie } from '../redux/actions/index';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { TagsComp } from './generic_comps/SubCompForCard';
import { get, isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

const Movie = props => {

    const dispatch = useDispatch();
    const store = useSelector(store => store._movie);
    const _movie = store.movie;
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [movie, setMovie] = useState(null);
    const [style, setStyle] = useState({
        linkBtn: {
            color: '#000',
            textDecoration: 'none',
            display: 'block',
            backgroundColor: '#ffaa3c',
            padding: '7px',
            borderRadius: '5px',
            width: '100%',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px'
        },
        flex: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        linkToBtn: {
            color: '#000',
            textDecoration: 'none',
            backgroundColor: '#ffaa3c',
            padding: '7px',
            borderRadius: '5px'
        },
        movieMeta: {
            color: '#484848',
            textDecoration: 'underline #ffaa3c 2px',
            fontWeight: '600'
        }
    });

    // dispatching fn with id
    // const getMovie = id => {
    //     console.log(params);
    //     console.log(location);
    // }
    useEffect(async () => {
        const { id } = params;
        const res = await getMovie(id);
        const payload = await res.payload;
        setMovie(get(payload, 'data', {}));
    }, []);

    const movieData = {
        addDate: get(movie, 'addDate', ''),
        desc_movie: get(movie, 'desc_movie', ''),
        id: get(movie, 'id', ''),
        name: get(movie, 'name', ''),
        poster: get(movie, 'poster', ''),
        rating: get(movie, 'rating', ''),
        tags: get(movie, 'tags', []),
        downloadLink: get(movie, 'downloadLink', '')
    }
    return (
        <main className="main-content">
            <div className="container">
                {!isEmpty(movieData) && <div className="page">
                    <Link to='/home' style={style.linkToBtn}>&#10229; Back</Link> {/* &#10229; back arrow html code*/}
                    {/* <div className="breadcrumbs">
                        <a href="index.html">Home</a>
                        <a href="review.html">Movie Review</a>
                        <span>The Croods</span>
                    </div> */}

                    <div className="content">
                        <div className="row">
                            <div className="col-md-6">
                                <figure className="movie-poster"><img src={`${movieData.poster}`} alt="#" /></figure>
                            </div>
                            <div className="col-md-6" data-key={movieData.id}>
                                <h2 className="movie-title">{movieData.name}</h2>
                                <div className="movie-summary">
                                    <p>{movieData.desc_movie}</p>
                                </div>
                                <ul className="movie-meta">
                                    <li>
                                        {/* adds stars for rating but somehow it crashes */}
                                        {/* <div className="star-rating" title="Rated 4.00 out of 5">
                                        <span style="width:80%">
                                        <strong className="rating">4.00</strong> out of 5</span>
                                        </div> */}
                                        <span style={style.movieMeta}>Rating:</span> {movieData.rating} out of 10
                                    </li>
                                    <li><span style={style.movieMeta}>Name:</span> {movieData.name}</li>
                                    <li><span style={style.movieMeta}>Added/ Updated:</span> {movieData.addDate}</li>
                                    <li><span style={style.movieMeta}>Category:</span> Add karenge tab k tab dekh lenge</li>
                                    <li><span style={style.movieMeta}>Tags:</span>
                                        <TagsComp value={movieData.tags} />
                                    </li>
                                </ul>
                                <a href={`${movieData.downloadLink}`} style={style.linkBtn}>Download</a>
                                {console.log(window.innerWidth)}
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </main>
    )
}

export default Movie;