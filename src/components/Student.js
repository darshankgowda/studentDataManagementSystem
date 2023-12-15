import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';

const paperStyle = {
  padding: '20px',
  width: '300px',
  margin: '20px auto',
};

export default function Student() {
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [students, setStudents] = React.useState([]);

  function handleClick() {
    const studentData = { name: name, address: address };

    fetch('http://localhost:8080/student/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    })
      .then(() => {
        alert('New Student Added');
        setName('');
        setAddress('');
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    fetch('http://localhost:8080/student/getAll')
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      })
      .catch((err) => console.log(err));
  }, [students]);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1>Add Student</h1>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Student Name"
            variant="standard"
            fullWidth
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Student Address"
            variant="standard"
            fullWidth
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          <Button onClick={handleClick} variant="outlined">
            Submit
          </Button>
        </Box>
      </Paper>
      <Paper elevation={3} style={paperStyle}>
        {students.map((student) => (
          <Paper
            elevation={6}
            style={{ margin: '10px', padding: '15px', textAlign: 'left' }}
            key={student.id}
          >
            Id: {student.id}
            <br />
            Name: {student.name}
            <br />
            Address: {student.address}
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
