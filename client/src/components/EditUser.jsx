import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormControl, FormGroup, InputLabel, Input, Typography, styled, Button } from '@mui/material';
import { getUser } from '../service/api';
import { editUser } from '../service/api';

const Container = styled(FormGroup)`
  width:50%;
  margin:5% auto;
  & > div {
    margin-top:20px;

  }
`;


const EditUser = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        loadUserDetails()
    }, [])
    

    const loadUserDetails = async () => {
        const response = await getUser(id);
        setUser(response.data)
    }



    const onValueChange = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async () => {
        await editUser(user , id);
        navigate('/all');
    }

    return (
        <Container>
            <Typography variant='h4' >Edit User</Typography>
            <FormControl>
                <InputLabel>Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="name"  value={user.name} />
            </FormControl>
            <FormControl>
                <InputLabel>Username</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="username" value={user.username} />
            </FormControl>
            <FormControl>
                <InputLabel>Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="email" value={user.email} />
            </FormControl>
            <FormControl>
                <InputLabel>Phone</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="phone" value={user.phone} />
            </FormControl>
            <FormControl>
                <Button variant='contained' onClick={() => handleSubmit()} >Update User</Button>
            </FormControl>
        </Container>
    )
}

export default EditUser