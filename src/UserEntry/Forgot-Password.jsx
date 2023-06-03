import React, { useEffect, useState } from 'react'
import './userEntry.css'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, CircularProgress, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material';
import { Route, Switch, useHistory, useParams } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import * as yup from 'yup'
import { useFormik } from 'formik';

const ForgotPassword = ({ handleMessage }) => {

  return (
    <Switch>
      <Route exact path='/forgotpassword'>
        <EmailSendingComponent 
         handleMessage={handleMessage}
        />
      </Route>
      <Route path='/forgotpassword/:token'>
        <ResetPassword
          handleMessage={handleMessage}
        />
      </Route>
    </Switch>
  )
}

export default ForgotPassword


// If the email provided by the user is correct then the password reset url is sent to the user email
const EmailSendingComponent = ({ handleMessage}) => {

  // loadin state
  const [loading,setLoading] = useState(false)

  // email validation method using yup
  const validation = yup.object({
    email:yup.string().email("Email is not valid").required("Email is required")
  })

  // validating the fiels method using formik
  const {values,handleSubmit,handleChange,handleBlur,errors,touched} = useFormik({
    initialValues:{
      email:""
    },
    validationSchema:validation,
    onSubmit:(email) => {
      setLoading(true)
      forgotPasswordFuction(email)
    }
  })

  // mail sending to user
  const forgotPasswordFuction = async(email) => {
  try {
    const response = await fetch("https://money-manager-41h8.onrender.com/user/sendmail",{
      method:"post",
      body:JSON.stringify(email),
      headers:{
        "Content-Type":"application/json"
      }
    })

    const data = await response.json()
    if(data.message === "Mail has been sent to your email"){
      handleMessage(data.message,"success")
    }else{
      handleMessage(data.message,"error")
    }
    
    setLoading(false)
  } catch (error) {
    console.log("Email sending error in forgot password method ",error)
    setLoading(false)
  }
  }

  return (
    <div className='forgotPasswordDiv'>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        className='forgotPasswordInputDiv'
        onSubmit={handleSubmit}
      >

        <TextField
          required
          id="outlined-email-input"
          label="Confirm email"
          type="email"
          style={{ width: "calc(300px + 7vw)" }}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.email && errors.email)}
          helperText = {touched.email && errors.email}
          value={values.email}
          name='email'
        />


        <Button variant='contained' color='success' type='submit' sx={{ width: "calc(130px + 1vw)" }} disabled={loading && true} >{loading?<CircularProgress color='success' size="calc(20px + 0.5vw)" /> : "send mail"}</Button>

        <div className="Links">
          <Link href="/login" underline="hover">
            I remember my password? Login
          </Link>
        </div>

      </Box>
    </div>
  )
}


// Password reset component
const ResetPassword = ({ handleMessage}) => {
  // states
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordInputClicked, setPasswordInputClicked] = useState(false)
  const [numericCharacter, setNumericCaracter] = useState(false)
  const [lowerCaseCharacter, setLowerCaseCaracter] = useState(false)
  const [upperCaseCharacter, setUpperCaseCaracter] = useState(false)
  const [specialCharacter, setSpecialCaracter] = useState(false)
  const [minimum8Character, setMinimum8Caracter] = useState(false)

  // loading state
  const [loading,setLoading] = useState(false)

  // url token validation loading state
  const [tokenLoading,setTokenLoading] = useState(false)

  const history = useHistory()
  // password show function
  const handleClickShowPassword = () => setShowPassword((show) => !show);

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

    setNumericCaracter(numericCharacterVerification.test(password))
    setLowerCaseCaracter(lowerCaseCharacterVerification.test(password))
    setUpperCaseCaracter(upperCaseCharacterVerification.test(password))
    setSpecialCaracter(specialCharacterVerification.test(password))
    setMinimum8Caracter(minimum8CharacterVerification.test(password))
  }, [password])
  
  // onBlur method
  const handlePasswordBlur = (event) => {
    setPasswordInputClicked(false)
    handleBlur(event)
  }
  // onChange method
  const handlepasswordonchange = (event) => {
    setPassword(event.target.value)
    handleChange(event)
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
    handleChange(event)
  }

  // password validation
  const passwordvalidation = () => {
    const fullPasswordVerification = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,16}$/;
    return fullPasswordVerification.test(password)

  }

  const params = useParams()
  // useEffect method for verifying url token
  useEffect(()=>{
    const urlToken = async() => {
      setTokenLoading(true)
      const response = await fetch(`https://money-manager-41h8.onrender.com/user/urltoken/${params.token}`,{
        method:"get"
      })

      const data = await response.json()
      if(data.message === "You can reset your password now"){
        handleMessage(data.message,"success")
        localStorage.setItem("userMail",data.user.email)
        setTokenLoading(false)
      }else{
        handleMessage(data.message,"error")
        setTokenLoading(false)
        history.replace("/forgotpassword")
      }
    }


    urlToken()
  },[])

  // password validation method using yup
  const validation = yup.object({
    password:yup.string().test(passwordvalidation).required("Password is required"),
    confirmPassword:yup.string().oneOf([yup.ref("password"),null],"password must match").required("Confirm password is required")
  })

  // fiels validation method using formik
  const {values,handleSubmit,handleChange,handleBlur,errors,touched} = useFormik({
    initialValues:{
      password:"",
      confirmPassword:""
    },
    validationSchema:validation,
    onSubmit:(password)=>{
      setLoading(true)
      resetPasswordFunction(password)
    }
  })

  // Password resetting function
  const resetPasswordFunction = async(password) => {
try {
  const id = localStorage.getItem("userMail")
   const response = await fetch(`https://money-manager-41h8.onrender.com/user/resetpassword/${id}`,{
    method:"put",
    body:JSON.stringify(password),
    headers:{
      "Content-Type":"application/json"
    }
   })
   const data = await response.json()
   if(data.message === "Your password has been successfully changed"){
    handleMessage(data.message,"success")
    localStorage.removeItem("userMail")
    history.replace('/login')
   }else{
    handleMessage(data.message,"error")
   }
  setLoading(false)
} catch (error) {
  handleMessage("We encountered an error resetting your password","error")
  console.log("Password reseting error ",error)
  setLoading(false)
}
  }

  return (
    <div className='forgotPasswordDiv'>
      {tokenLoading ? <CircularProgress /> :
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      onSubmit={handleSubmit}
      className='forgotPasswordInputDiv'
    >


      <FormControl style={{ width: "calc(300px + 7vw)" }} sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel required htmlFor="outlined-adornment-password" error={password.length > 0 ? !passwordvalidation() :touched.password && !passwordvalidation()}>Password</InputLabel>
        <OutlinedInput
          inputProps={{ maxLength: 16 }}
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          onChange={handlepasswordonchange}
          onFocus={() => setPasswordInputClicked(true)}
          onBlur={handlePasswordBlur}
          error={password.length > 0 ? !passwordvalidation() :touched.password && !passwordvalidation()}
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
        {password.length > 0 ? !passwordvalidation() && <FormHelperText  error={password.length > 0 ? !passwordvalidation() : touched.password && !passwordvalidation()}>{errors.password}</FormHelperText> : touched.password && !passwordvalidation() && <FormHelperText  error={password.length > 0 ? !passwordvalidation() :touched.password && !passwordvalidation()}>{errors.password}</FormHelperText>}
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
        id="outlined-password-input"
        label="Confirm Password"
        type="password"
        style={{ width: "calc(300px + 7vw)" }}
        inputProps={{ maxLength: 16 }}
        onChange={handleConfirmPasswordChange}
        onBlur={handleBlur}
        error={Boolean(confirmPassword.length > 0 ? errors.confirmPassword : touched.confirmPassword && errors.confirmPassword)}
        value={values.confirmPassword}
        name='confirmPassword'
        helperText = {confirmPassword.length > 0 ? errors.confirmPassword : touched.confirmPassword && errors.confirmPassword}
      />


      <Button variant='contained' color='success' type='submit' sx={{ width: "calc(170px + 1vw)" }} disabled={loading && true}  >{loading ? <CircularProgress color='success' size="calc(20px + 0.5vw)" /> : "reset password"}</Button>


    </Box>
      }
    </div>
  )
}