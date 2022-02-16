import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Message from '../components/Message.js'
import PreLoader from '../components/Loader.js';
import { listUsersAction } from '../actions/userActions.js';
import { Table, Button } from 'react-bootstrap'
import { Link } from '@mui/material';

function UsersListScreen({history}){

    const usersList = useSelector(state=>state.usersList)
    const {loading, users, error} = usersList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    function deleteHandler(id){
        if(window.confirm("Delete user?")){
               //e.preventDefault();
        console.log('delete item', id)
        }else{
            //history.push('users/')
        }
     
    }

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsersAction())
        }else{
            history.push('/login')
        }
        
    }, [dispatch, history, userInfo])


    return (

            <React.Fragment>
                    {
                        loading ? (<PreLoader />)
                        ? error : (<Message text = {error} />)
                        : (
                            <div>
                                <h2>Subscribers</h2>
                            <Table striped hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        users.map((user) =>
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                                <i className='fas fa-check' style={{ color: 'red' }}></i>
                                            )}</td>

                                         <td>
                                            <Link to={`/user/${user.id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </Link>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user.name)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>

                                    </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                            </div>
                        )
                    }
            </React.Fragment>
    )
};
export default UsersListScreen;