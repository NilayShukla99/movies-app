import React, { useState, useEffect } from "react";
import { Button, Form, Container } from "react-bootstrap";
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, updateMovie, getMovies } from "../redux/actions/index";
import { Typeahead } from "react-bootstrap-typeahead";

const FormComponent = props => {

    // dispatcher
    const dispatch = useDispatch();
    const location = useLocation();

    // states
    const [movieDetails, setMovieDetails] = useState({
        id: "",
        title: "",
        poster_url: "",
        desc_movie: "",
        rating: 5,
        download_url: "",
        tags: ''
    });
    const isNew = location.state ? false : true;
    const [errors, setErrors] = useState({ errors: false, errorMsg: "" });
    const [dataSubmitted, setDataSubmitted] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(false);
    const [defaultStyle, setDefaultStyle] = useState({
        width: window.innerWidth > 600 ? "50%" : "auto",
        margin: "10px auto",
    });

    // didMount
    const moviesData = useSelector(store => store._movie);
    // id data submitted then get latest movies
    useEffect(() => {
        dispatch(getMovies());
        // console.log(moviesData)
    }, [dataSubmitted]);

    useEffect(() => {
        if (location && location.state !== null) {
            setMovieDetails({
                id: location.state.id,
                title: location.state.name,
                desc_movie: location.state.desc_movie,
                rating: location.state.rating,
                poster_url: location.state.poster,
                download_url: location.state.downloadLink,
                tags: location.state.tags ? location.state.tags.join(' ') : ''
            });
        }
    }, []);

    // for range slider bubble
    useEffect(() => {
        const ele = document.querySelector('.buble');
        if (ele) {
            ele.style.left = `${Number(movieDetails.rating * 45)}px`;
        }
    }, [movieDetails.rating])
    // functions
    const onChangeHandle = e => {
        console.log(typeof e, e);
        if (e.hasOwnProperty('target')) {
            const name = e.target.name;
            let value = e.target.value;
            if (name === 'title' || name === 'tags') {
                value = value.replace(/ +/g, ' ');
            }
            setMovieDetails({
                ...movieDetails,
                [name]: value
            })
        } else {
            setMovieDetails({
                ...movieDetails,
                tags: e
            })
        }
    };
    const handleValidate = e => {
        e.preventDefault();
        const { title, download_url } = movieDetails;

        // console.log(movieDetails)
        if ((title === "" || undefined || null) || download_url.length === 0) {
            setErrors({
                errors: true,
                errorMsg: "this field is mandatory"
            });
        } else {
            setErrors({
                errors: false,
                errorMsg: ""
            });
            setDisabledBtn(true);
            handleSubmit();
        };
    };
    const handleSubmit = async () => {
        if (!errors.exist) {
            let res, entity = {};
            if (isNew) {
                const id = Math.round((Math.random() * 10000) / Math.ceil(Math.random()));
                entity = {
                    id,
                    name: movieDetails.title,
                    desc_movie: movieDetails.desc_movie,
                    poster: movieDetails.poster_url,
                    downloadLink: movieDetails.download_url,
                    rating: movieDetails.rating,
                    tags: typeof movieDetails.tags === 'string' ? movieDetails.tags.split(' ') : movieDetails.tags,
                    addDate: new Date().toLocaleDateString(),
                };
                res = await dispatch(addMovie(entity));
                const status_code = await res.payload
                if (status_code.status === 200 || status_code.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Record saved',
                        showConfirmButton: false,
                    });
                    setMovieDetails({
                        title: "",
                        rating: 1,
                        poster_url: "",
                        download_url: "",
                        tags: '',
                    });
                    setDataSubmitted(true);
                    setDisabledBtn(false);
                } else {
                    alert('try again!')
                }
            } else {
                entity = {
                    id: movieDetails.id,
                    name: movieDetails.title,
                    desc_movie: movieDetails.desc_movie,
                    poster: movieDetails.poster_url,
                    downloadLink: movieDetails.download_url,
                    rating: movieDetails.rating,
                    tags: movieDetails.tags.split(' '),
                    addDate: new Date().toLocaleDateString(),
                };
                res = await dispatch(updateMovie(location.state.firebaseID, movieDetails.id, entity));
                const status_code = await res.payload
                if (status_code.status === 200 || status_code.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Record saved',
                        showConfirmButton: false,
                    });
                    setMovieDetails({
                        title: "",
                        rating: 1,
                        poster_url: "",
                        download_url: "",
                        desc_movie: "",
                        tags: '',
                    });
                    setDataSubmitted(true);
                    setDisabledBtn(false);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'unable to upload! try again',
                        showConfirmButton: false,
                    });
                }
            }
        }
    }
    return (
        // <Container>
        //     <Form onSubmit={handleValidate} style={defaultStyle} >

        //         <Form.Group className="mb-3" controlId="formBasicTitle" >
        //             <Form.Label>Movie Title</Form.Label>
        //             <Form.Control
        //                 type="text"
        //                 name="title"
        //                 value={movieDetails.title}
        //                 onChange={onChangeHandle}
        //                 className={`${errors.errors ? 'border-danger' : ''}`}
        //                 placeholder="movie name"
        //                 disabled={disabledBtn}
        //             />
        //         </Form.Group>
        //         <Form.Group className="mb-3" controlId="formBasicMovieUrl" >
        //             <Form.Label>Movie Download Link</Form.Label>
        //             <Form.Control
        //                 type="url"
        //                 name="download_url"
        //                 value={movieDetails.download_url}
        //                 onChange={onChangeHandle}
        //                 autoComplete='off'
        //                 className={`${errors.errors ? 'border-danger' : ''}`}
        //                 placeholder="paste movie link"
        //                 disabled={disabledBtn}
        //             />
        //         </Form.Group>
        //         <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        //             <Form.Label>Describe Movie</Form.Label>
        //             <Form.Control as="textarea" rows={3}
        //                 placeholder="Optional"
        //                 name="desc_movie"
        //                 value={movieDetails.desc_movie}
        //                 onChange={onChangeHandle}
        //                 disabled={disabledBtn}
        //             />
        //         </Form.Group>
        //         <Form.Group className="mb-3">
        //             <Form.Label>Online Poster Link</Form.Label>
        //             <Form.Control
        //                 type="url"
        //                 name="poster_url"
        //                 value={movieDetails.poster_url}
        //                 onChange={onChangeHandle}
        //                 autoComplete='off'
        //                 placeholder="paste poster url"
        //                 disabled={disabledBtn}
        //             />
        //             {/* <Form.Text className="text-muted">
        //                 We"ll never share your email with anyone else.
        //             </Form.Text> */}
        //         </Form.Group>



        //         <Form.Group className="mb-3" controlId="formBasicRating" >
        //             <Form.Label>Rating</Form.Label>
        //             <Form.Control
        //                 name="rating"
        //                 value={movieDetails.rating}
        //                 onChange={onChangeHandle}
        //                 max={10} min={1} step={0.1}
        //                 type="number"
        //                 placeholder="rate the movie as per you"
        //                 disabled={disabledBtn}
        //             />
        //         </Form.Group>

        //         <Form.Group className="mb-3" controlId="formBasicRating" >
        //             <Form.Label>Tags/ Category</Form.Label>
        //             <Form.Control
        //                 name="tags"
        //                 value={movieDetails.tags}
        //                 onChange={onChangeHandle}
        //                 type="text"
        //                 title="separate by space"
        //                 maxLength="30"
        //                 placeholder="add tags here/ category"
        //                 disabled={disabledBtn}
        //             />
        //         </Form.Group>
        //         {/* <Form.Group className="mb-3" controlId="formBasicCheckbox" >
        //             <Form.Check type="checkbox" label="Check me out" />
        //         </Form.Group> */}
        //         <Button variant="success" type="submit" style={{
        //             width: "100%",
        //         }} disabled={disabledBtn}>
        //             {isNew ? 'Update' : 'Upload'}
        //         </Button>
        //     </Form>
        // </Container>
        <div className="container" style={{
            color: disabledBtn && '#fff'
        }}>
            <div className="page">
                <div className="content">
                    <div className="row">
                        <div className="col-md-4">
                            <h2 style={{color: '#fff'}}>Add Movie</h2>
                            <form className="contact-form" method="post" onSubmit={handleValidate}>
                                <input className="name"
                                    type="text"
                                    name="title"
                                    value={movieDetails.title}
                                    onChange={onChangeHandle}
                                    placeholder="movie name"
                                    disabled={disabledBtn}
                                />
                                <input className="website"
                                    type="url"
                                    name="download_url"
                                    value={movieDetails.download_url}
                                    onChange={onChangeHandle}
                                    autoComplete='off'
                                    placeholder="paste movie link"
                                    disabled={disabledBtn}
                                />
                                <input className="website"
                                    type="url"
                                    name="poster_url"
                                    value={movieDetails.poster_url}
                                    onChange={onChangeHandle}
                                    autoComplete='off'
                                    placeholder="paste poster url"
                                    disabled={disabledBtn}
                                />
                                <textarea className="message"
                                    placeholder="Optional"
                                    name="desc_movie"
                                    value={movieDetails.desc_movie}
                                    onChange={onChangeHandle}
                                    disabled={disabledBtn}>
                                </textarea>
                                
                                    {/* <input className="rating"
                                        name="rating"
                                        id='rating'
                                        value={movieDetails.rating}
                                        onChange={onChangeHandle}
                                        max={10} min={1} step={0.1}
                                        type="range"
                                        disabled={disabledBtn}
                                    /> */}
                                    <Typeahead
                                        id="typeaheadForTags"
                                        name='tags'
                                        placeholder="add tags.."
                                        options={['qwe', 'qwe', 'wer', 'ert', 'rty']}
                                        allowNew
                                        multiple
                                        onChange={onChangeHandle}
                                    />
                                <label style={{color: '#fff'}} htmlFor='rating'>Rate the movie . . . </label>
                                <div className="slider-parent ratings">
                                    <input
                                        id='rating'
                                        name="rating" className="rating"
                                        type="range"
                                        value={movieDetails.rating}
                                        max={10} min={1} step={0.1}
                                        onChange={onChangeHandle}
                                            // e => {
                                            // ({target: {value}})
                                            // console.log(e.target.value)}
                                        disabled={disabledBtn}
                                    />
                                    <div className="buble">
                                        {movieDetails.rating}
                                    </div>
                                </div>
                                <input type="submit" value="Update" style={{width: '100%', color: '#000'}} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FormComponent;