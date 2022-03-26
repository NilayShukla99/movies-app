import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertComp = props => {
    const [show, setShow] = React.useState(true);
    return <div>
        {
            show ?
                <Alert variant={props.variant} onClose={() => setShow(false)} dismissible={props.dismissible}>
                    {/* <Alert.Heading>{props.hading}</Alert.Heading> */}
                    <p>
                        {props.description}
                    </p>
                </Alert> :
                null
        }
    </div>
};

export default AlertComp;