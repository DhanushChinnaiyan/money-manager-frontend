import React from 'react'
import './userEntry.css'
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField } from '@mui/material';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("working")
  }
  return (
    <div className='loginDiv'>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className='loginInputDiv'
      >

        <TextField
          required
          id="outlined-email-input"
          label="Email"
          type='email'
          style={{ width: "calc(300px + 7vw)" }}

        />

        <FormControl style={{ width: "calc(300px + 7vw)" }} sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel required htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            inputProps={{ maxLength: 16 }}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button variant='contained' color='success' type='submit'  >LOGIN NOW</Button>
        <div className='Links'>
          <Link href="#" underline="hover">
            Forgot password?
          </Link>
          <Link href="#" underline="hover">
            Don't have an acoount? Signup
          </Link>
        </div>

      </Box>
    </div>
  )
}

export default Login