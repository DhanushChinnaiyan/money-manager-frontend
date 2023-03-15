import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


export const Base = ({children,dashChange}) => {

   


  return (
    <div className="base">
      <AppBar position="static">
        <Toolbar variant="dense" style={{display:"flex",justifyContent:"center"}} >
        
          <Typography variant="h6" color="inherit" component="div" >
            MONEY MANAGER
          </Typography>
        </Toolbar>
      </AppBar>
      
      <div className="children">
        {children}
      </div>
    </div>
  );
};