import React from 'react';
import { Alert } from 'react-bootstrap';

const Footer = props => {
    const [show, setShow] = React.useState(true);
    return <footer className="site-footer" style={{
        background: '#131a20'
    }}>
        <div className="container">
            <div className="row">
                {/* <div className="col-md-2">
                    <div className="widget">
                        <h3 className="widget-title">About Us</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia tempore vitae mollitia nesciunt saepe cupiditate</p>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="widget">
                        <h3 className="widget-title">Recent Review</h3>
                        <ul className="no-bullet">
                            <li>Lorem ipsum dolor</li>
                            <li>Sit amet consecture</li>
                            <li>Dolorem respequem</li>
                            <li>Invenore veritae</li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="widget">
                        <h3 className="widget-title">Newsletter</h3>
                        <form action="#" className="subscribe-form">
                            <input type="text" placeholder="Email Address" />
                        </form>
                    </div>
                </div> */}
            </div>

            <div className="colophon" style={{color: 'white'}}>Copyright 2021 Cube Inifinity, <small>Designed by Themezy.</small></div>
        </div>

    </footer>
};

export default Footer;