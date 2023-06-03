import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './userEntry.css'
import CheckIcon from '@mui/icons-material/Check';
import { useSnackbar } from 'notistack';
import CircularProgress from '@mui/material/CircularProgress';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useHistory } from 'react-router-dom';





const Signup = ({handleMessage }) => {
  
  const history = useHistory()

  // states
  const [showPassword, setShowPassword] = useState(false);
  const [newpassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordInputClicked, setPasswordInputClicked] = useState(false)
  const [numericCharacter, setNumericCaracter] = useState(false)
  const [lowerCaseCharacter, setLowerCaseCaracter] = useState(false)
  const [upperCaseCharacter, setUpperCaseCaracter] = useState(false)
  const [specialCharacter, setSpecialCaracter] = useState(false)
  const [minimum8Character, setMinimum8Caracter] = useState(false)

  // progress loading state
  const [loading, setLoading] = useState(false)


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Password Validation

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // password validation elements
  useEffect(() => {
    const numericCharacterVerification = /(?=.*\d)/
    const lowerCaseCharacterVerification = /(?=.*[a-z])/
    const upperCaseCharacterVerification = /(?=.*[A-Z])/
    const specialCharacterVerification = /(?=.*[!@#$%^&*])/
    const minimum8CharacterVerification = /[0-9a-zA-Z!@#$%^&*]{8,}/

    setNumericCaracter(numericCharacterVerification.test(newpassword))
    setLowerCaseCaracter(lowerCaseCharacterVerification.test(newpassword))
    setUpperCaseCaracter(upperCaseCharacterVerification.test(newpassword))
    setSpecialCaracter(specialCharacterVerification.test(newpassword))
    setMinimum8Caracter(minimum8CharacterVerification.test(newpassword))
  }, [newpassword])


  // password validation
  const passwordvalidation = () => {
    const fullPasswordVerification = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,16}$/;
    return fullPasswordVerification.test(newpassword)

  }

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value)
    handleChange(event)
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
    handleChange(event)
  }

  const handlepasswordOnBlur = (event) => {
    setPasswordInputClicked(false)
    handleBlur(event)
  }

// validating fields using yup
  const userValidation = yup.object({
    firstName:yup.string().required('First name is required'),
    email:yup.string().email('Email is not valid').required('Email is required'),
    password:yup.string().required('Password is required').test('password', 'Invalid password',passwordvalidation),
    confirmPassword:yup.string().required('Confirm password is required').oneOf([yup.ref('password'),null],'Password must match')
    })

  // Signup method using formik
  const { values, handleSubmit, handleChange, handleBlur,touched,errors } = useFormik({
   
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema:userValidation,
    onSubmit: (newUser) => {
      
      setLoading(true)
      addNewUser(newUser)
    }
  })

  const addNewUser = async(newUser) => {
    try {
      const response = await fetch("https://money-manager-41h8.onrender.com/user/signup",{
        method:"post",
        body:JSON.stringify(newUser),
        headers:{
          "Content-Type":"application/json"
        }
      })

      const data = await response.json()
      if(data.message === "User signuped successfully ") {
        handleMessage(data.message,"success")
        history.push("/login")

      }else{
        handleMessage(data.message,"error")
      }  
      setLoading(false)
    } catch (error) {
      handleMessage("Please try again later","error")
      console.log("Signup error ", error)
      setLoading(false)
    }
  }


  return (

    <div className='signupDiv'>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        onSubmit={handleSubmit}
        className='signupInputDiv'

      >
        <TextField
          required
          id="outlined-required"
          label="First Name"
          style={{ width: "calc(300px + 7vw)" }}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
          name='firstName'
          error={Boolean(touched.firstName&& errors.firstName)}
          helperText={touched.firstName && errors.firstName}

        />
        <TextField
          id="outlined-lastname-input"
          label="Last Name"
          style={{ width: "calc(300px + 7vw)" }}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
          name='lastName'

        />
        <TextField
          required
          id="fullWidth-email-input"
          label="Email"
          type='email'
          style={{ width: "calc(300px + 7vw)" }}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          error={Boolean(touched.email&& errors.email)}
          helperText={touched.email && errors.email}
          name='email'

        />

        <FormControl  style={{ width: "calc(300px + 7vw)" }} sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel required htmlFor="outlined-adornment-password" error={newpassword.length>0 && !passwordvalidation()}>Password</InputLabel>
          <OutlinedInput
          
            inputProps={{ maxLength: 16 }}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={handlePasswordChange}
            onFocus={()=>setPasswordInputClicked(true)}
            onBlur={handlepasswordOnBlur}
            error={newpassword.length>0&&!passwordvalidation()}
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
          {newpassword.length>0 && !passwordvalidation() && <FormHelperText error>{errors.password}</FormHelperText>}
        </FormControl>
        {/* password validation elements */}
        {passwordInputClicked &&
          <div>
            {numericCharacter ? (<Typography variant='body1' style={{ color: "green", fontSize: "calc(11px + 0.3vw)" }} gutterBottom><CheckIcon sx={{ fontSize: "calc(12px + 0.3vw)" }} /> At least one numeric character(1-9)</Typography>) : (<Typography variant='body1' style={{ color: "red", fontSize: "calc(11px + 0.3vw)" }} gutterBottom>At least one numeric character(1-9)</Typography>)}
            {lowerCaseCharacter ? (<Typography variant='body1' style={{ color: "green", fontSize: "calc(11px + 0.3vw)" }} gutterBottom><CheckIcon sx={{ fontSize: "calc(12px + 0.3vw)" }} />At least one lowercase letter(a-z)</Typography>) : (<Typography variant='body1' style={{ color: "red", fontSize: "calc(11px + 0.3vw)" }} gutterBottom>At least one lowercase letter(a-z)</Typography>)}
            {upperCaseCharacter ? (<Typography variant='body1' style={{ color: "green", fontSize: "calc(11px + 0.3vw)" }} gutterBottom><CheckIcon sx={{ fontSize: "calc(12px + 0.3vw)" }} />At least one uppercase letter(A-Z)</Typography>) : (<Typography variant='body1' style={{ color: "red", fontSize: "calc(11px + 0.3vw)" }} gutterBottom>At least one uppercase letter(A-Z)</Typography>)}
            {specialCharacter ? (<Typography variant='body1' style={{ color: "green", fontSize: "calc(11px + 0.3vw)" }} gutterBottom><CheckIcon sx={{ fontSize: "calc(12px + 0.3vw)" }} />At least one special character(!@#$%^&*)</Typography>) : (<Typography variant='body1' style={{ color: "red", fontSize: "calc(11px + 0.3vw)" }} gutterBottom>At least one special character(!@#$%^&*)</Typography>)}
            {minimum8Character ? (<Typography variant='body1' style={{ color: "green", fontSize: "calc(11px + 0.3vw)" }} gutterBottom><CheckIcon sx={{ fontSize: "calc(12px + 0.3vw)" }} />A minimum of 8 characters</Typography>) : (<Typography variant='body1' style={{ color: "red", fontSize: "calc(11px + 0.3vw)" }} gutterBottom>A minimum of 8 characters</Typography>)}
          </div>
        }
        <TextField
          required
          id="fullWidth-password-input"
          label="Confirm Password"
          type="password"
          style={{ width: "calc(300px + 7vw)" }}
          inputProps={{ maxLength: 16 }}
          onChange={ handleConfirmPasswordChange }
          onBlur={handleBlur}
          value={values.confirmPassword}
          name='confirmPassword'
          error={confirmPassword.length > 0 && newpassword !== confirmPassword}
        />


        <Button variant='contained' sx={{ width: "calc(130px + 1vw)" }} disabled={loading && true} color='success' type='submit' > {loading ? <CircularProgress color='success' size="calc(20px + 0.5vw)" /> : "Signup now"}</Button>

        <div className="Links">  <Link href="/login" underline="hover" >
          Already registered User? Log in
        </Link></div>

      </Box>
    </div>


  )
}

export default Signup