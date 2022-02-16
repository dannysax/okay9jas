import React from 'react';
import Alert from '@mui/material/Alert';

function Message({text}){
    return (
        <React.Fragment>
            <Alert severity="error">{text}</Alert>
        </React.Fragment>
    )
}
export default Message;