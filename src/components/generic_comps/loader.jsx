import React from 'react'
import { Grid } from 'react-loader-spinner';

const Loader = () => {
    return <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
        <Grid
            color="#ffaa3c"
            height={150}
            width={150}
            ariaLabel='loading'
        />
    </div>
};

export default Loader;