import React, { useState } from 'react'
import './userEntry.css'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';


const ForgotPassword = () => {
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
    <div className='forgotPasswordDiv'>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className='forgotPasswordInputDiv'
      >
        

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

        <TextField
          required
          id="outlined-password-input"
          label="Confirm Password"
          type="password"
          style={{ width: "calc(300px + 7vw)" }}
          inputProps={{ maxLength: 16 }}
        />


        <Button variant='contained' color='success' type='submit'  >reset password</Button>


      </Box>
    </div>
  )
}

export default ForgotPassword