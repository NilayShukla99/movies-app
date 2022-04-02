import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies, deleteMovie } from '../redux/actions';
// import { Button, Card, Container } from 'react-bootstrap';
// import { Button, Card, Container, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

// Component
import { ModalComp, TagsComp } from './generic_comps/SubCompForCard';

const CardComponent = (props) => {
    const { downloadLink, poster, name, rating, addDate, id, tags, firebaseID, desc_movie, editable } = props;

    //redux
    const dispatch = useDispatch();

    // functinos for CArd component
    const handleDelete = (id, name, firebaseID) => {
        Swal.fire({
            title: `${name}`,
            text: `Delete the movie`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(getMovies());
                dispatch(deleteMovie(firebaseID, id));
                Swal.fire(
                    'Deleted!',
                    'Movie has been deleted.',
                    'success'
                );
            } else {
                dispatch(getMovies());
            }
        })
    }

    // return (
    //     <>
    //         <Card style={{ width: '11.5rem' }} className='m-2' >
    //             <Card.Img variant="top" src={poster} style={{ height: '10rem' }} />
    //             <Card.Body>
    //                 <Card.Title style={{ fontSize: '1rem' }}>
    //                     {name.length < 30 ? name : name.slice(0, 30) + '...'}
    //                 </Card.Title>
    //                 <TagsComp value={tags} />
    //                 <ModalComp
    //                     headind={name}
    //                     desc={desc_movie}
    //                     poster={poster}
    //                     rating={rating}
    //                     downloadLink={downloadLink}
    //                     imdb={`https://developer.imdb.com/`}
    //                     firebaseID
    //                 />
    //                 <div className='mt-2' style={{
    //                     display: 'flex',
    //                     justifyContent: 'space-between',
    //                 }}>
    //                     {/* we can use useNavigate(to='add-movie', {state: {}}) instead */}
    //                     {/* unlike in class comp. we have to use useLocation hook for accessing this state, (and other props) in the comp. */}
    //                     <Button variant="outline-success" size="sm" as={Link} to='/add-movie' state={{
    //                         downloadLink,
    //                         poster,
    //                         name,
    //                         desc_movie,
    //                         rating,
    //                         addDate,
    //                         id,
    //                         tags,
    //                         firebaseID
    //                     }}
    //                     style={{
    //                         flex: '1',
    //                         margin: '0 2px 0 0'
    //                     }}
    //                     >
    //                         Modify
    //                     </Button>{' '}
    //                     <Button variant="outline-danger" size="sm" onClick={() => handleDelete(id, name, firebaseID)}
    //                     style={{
    //                         flex: '1',
    //                         margin: '0 0 0 2px'
    //                     }}
    //                     >
    //                         Delete
    //                     </Button>
    //                 </div>
    //             </Card.Body>
    //         </Card>
    //     </ >
    // )

    return (
        <>
            <div className="movie" data-fire_id={firebaseID} id={id}>
                <figure className="movie-poster"><img src={poster} alt={name} /></figure>
                <div className="movie-title" style={{display: 'flex', justifyContent: 'space-between'}}>
                    {/* <a href={downloadLink}>{name}</a> */}
                    <Link
                // style={{
                //     color: '#000',
                //     textDecoration: 'none',
                //     display: 'block',
                //     backgroundColor: '#ffaa3c',
                //     padding: '7px',
                //     borderRadius: '5px',
                //     width: 'fit-content'
                // }}
                to={`/movie/${firebaseID}`} state={{
                downloadLink,
                poster,
                name,
                desc_movie,
                rating,
                addDate,
                id,
                tags,
                firebaseID
            }}>{name}</Link>
                    <span style={{
                        color: '#616368',
                        fontSize: '1rem'
                    }}>{rating}</span>
                    </div>
                    <TagsComp value={tags} />
                {/* <p>{desc_movie}</p> */}
            
            {/* {editable && <Link
                style={{
                    color: '#000',
                    textDecoration: 'none',
                    display: 'block',
                    backgroundColor: '#ffaa3c',
                    padding: '7px',
                    borderRadius: '5px',
                    width: 'fit-content'
                }}
                to='/add-movie' state={{
                downloadLink,
                poster,
                name,
                desc_movie,
                rating,
                addDate,
                id,
                tags,
                firebaseID
            }}>
                {(editable && downloadLink) ? 'Modify' : 'Add this'}
            </Link>} */}
            </div>
        </>
    )
};

export default CardComponent;