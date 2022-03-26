import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const ModalComp = props => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false); //to close the modal
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        style={{
          width: '100%',
        }}
        onClick={handleShow}
      >
        Details
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.headind}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            {/* Image */}
            <div
              variant="top"
              src={props.poster}
              style={{
                width: '15rem',
                height: '10rem',
                background: `url(${props.poster})`,
                backgroundColor: '#d3d3d32e',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                float: 'left',
                borderRadius: '7px',
              }}
            >{props.poster ? null : 'No image'}</div>
            {/* side details */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                width: '100%',
                margin: '0 10px',
                borderRadius: '7px',
              }}
            >
              <article
                style={{
                  background: '#d3d3d32e',
                  borderRadius: '7px',
                  padding: '10px',
                  flex: '1',
                  margin: '5px 0'
                }}
              >
                {props.desc}
              </article>
              <section title="Custom Rating" style={{
                  background: '#d3d3d32e',
                  borderRadius: '7px',
                  padding: '10px',
                  flex: '1',
                  margin: '5px 0'
                  }}>
                CR: <b>{props.rating}</b>
              </section>
            </div>
          </section>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success">
            <a href={`${props.downloadLink}`} style={{ color: 'white', textDecoration: 'none' }}>
              Download
            </a>
          </Button>
          {/* <Button variant="outline-info">
            <a href={`${props.imdb}`}>Movie Page IMDB</a>
          </Button> */}
          {/* when individiual page is ready */}
          {/* <Button variant="outline-info" as={Link} to={`/movie/${props.firebaseID}`}>
                        Movie Page
                    </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const TagsComp = props => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap'
      }}
    >
      {props.value ? (
        props.value.map((itm, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              background: '#c5c5c559',
              borderRadius: '5px',
              fontSize: '12px',
              margin: '3px',
              marginBottom: '7px',
              padding: '5px',
              maxWidth: '100%',
              letterSpacing: '0.8px'
            }}
          >
            {itm}
          </span>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
