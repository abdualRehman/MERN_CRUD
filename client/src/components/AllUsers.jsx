import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, styled, Button } from '@mui/material';
import { getUsers , removeUser } from '../service/api';
import { Link } from 'react-router-dom';  


const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px auto
`;

const HeadTableRow = styled(TableRow)`
  background: #000000;
  color:#fff;
  & > th {
    color:#fff;
  }
`;


const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    let response = await getUsers();
    setUsers(response.data)
  }
  const removeUserData = async (id) => {
    await removeUser(id);
    getAllUsers();
  }


  return (
    <StyledTable>
      <TableHead>
        <HeadTableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Username</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Action</TableCell>
        </HeadTableRow>
      </TableHead>
      <TableBody>
        {
          users.map((user, index) => (
            <TableRow key={index} >
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <Button variant="contained" style={{ marginRight: 10 }} component={Link} to={`/edit/${user._id}`} >Edit</Button>
                <Button variant="contained" color="error" onClick={()=>{removeUserData(user._id)}} >Remove</Button>
              </TableCell>
            </TableRow>
          ))
        }

      </TableBody>
    </StyledTable>
  )
}

export default AllUsers