import React from 'react'
import './userEntry.css'
import { Box, Button, CircularProgress, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useHistory } from 'react-router-dom';


const Login = ({ handleMessage }) => {
  const history = useHistory()
  const [showPassword, setShowPassword] = useState(false);
  // Loading state
  const [loading, setLoading] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  // validation method using yup
  const userValidation = yup.object({
    email: yup.string().email("Email is not valid").required("Email is required"),
    password: yup.string().required("Password is required")
  })

  // validate and login method using formik
  const { values, handleSubmit, handleBlur, handleChange, touched, errors } = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: userValidation,
    onSubmit: (userDetails) => {
      setLoading(true)
      userLogin(userDetails)
    }
  })

  // user login method
  const userLogin = async (userDetails) => {
    try {
      const response = await fetch("https://money-manager-41h8.onrender.com/user/login", {
        method: "post",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await response.json()

      if (data.message === "User successfully logged in") {
        handleMessage(data.message, "success")
        localStorage.setItem("userToken", data.Token)
        history.replace("/")

      } else {
        handleMessage(data.message, "error")
      }
      setLoading(false)

    } catch (error) {
      handleMessage("Please try again later", "error")
      setLoading(false)
      console.log("login error ", error)
    }
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
        <Typography sx={{width:"90%",color:"green",fontWeight:"bold"}}>Email : dhanushmd4021@gmail.com</Typography>
        <Typography sx={{width:"90%",color:"green",fontWeight:"bold"}}>Password : Password@123</Typography>
        <TextField
          required
          id="outlined-email-input"
          label="Email"
          type='email'
          style={{ width: "calc(300px + 7vw)" }}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          name='email'
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}

        />

        <FormControl style={{ width: "calc(300px + 7vw)" }} sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel required htmlFor="outlined-adornment-password" error={Boolean(touched.password && errors.password)}>Password</InputLabel>
          <OutlinedInput
            inputProps={{ maxLength: 16 }}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            error={Boolean(touched.password && errors.password)}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            name='password'
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
          {touched.password && <FormHelperText error={Boolean(touched.password && errors.password)}>{errors.password}</FormHelperText>}
        </FormControl>
        <Button variant='contained' color='success' type='submit' sx={{ width: "calc(130px + 1vw)" }} disabled={loading && true} >{loading ? <CircularProgress color='success' size="calc(20px + 0.5vw)" /> : "LOGIN NOW"}</Button>
        <div className='Links'>
          <Link href="/forgotpassword" underline="hover">
            Forgot password?
          </Link>
          <Link href="/signup" underline="hover">
            Don't have an acoount? Signup
          </Link>
        </div>

      </Box>
    </div>
  )
}

export default Login