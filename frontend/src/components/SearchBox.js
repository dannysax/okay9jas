import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';



function SearchBox(){

    let history = useHistory
    //let history = useNavigate

    const[keyword, setKeyword] = useState('')

    function submitHandler(e){
        e.preventDefault();
        if(history){
            history.push(`/?keyword=${keyword}`)
        }else{
            history.push(history.push(history.location.pathname))
        }
    }

    return (
        <React.Fragment>
                <Form onSubmit={submitHandler} inline>
                    <Form.Control
                    type = 'text'
                    value={keyword}
                    onChange = {(e)=>setKeyword(e.target.value)}
                    name = 'q'
                    >
                    </Form.Control>
                    <Button
                    type = "submit"
                    className = "success-sm">Search</Button>
                </Form>
        </React.Fragment>
    )
}
export default SearchBox