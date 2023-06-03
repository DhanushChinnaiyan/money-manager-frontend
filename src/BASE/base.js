import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";


export const Base = ({children}) => {

  const history = useHistory()

   const logoutFunction = () => {
    localStorage.removeItem("userToken")
    history.replace("/login")
   }


  return (
    <div className="base">
      <AppBar position="static">
        <Toolbar variant="dense" style={{display:"flex",justifyContent:"center"}} >
        
          <Typography sx={{textAlign:"center"}} variant="h6" color="inherit" component="div" >
            MONEY MANAGER
          </Typography>
         <Typography component="div" sx={{display:"flex",justifyContent:"flex-end",position:"absolute",right:10}}> <Button onClick={logoutFunction} sx={{fontWeight:"bold"}} color="inherit">LOGOUT</Button></Typography>
        </Toolbar>
      </AppBar>
      
      <div className="children">
        {children}
      </div>
    </div>
  );
};