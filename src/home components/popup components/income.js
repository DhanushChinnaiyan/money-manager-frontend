import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";

const Incomepopup = ({
  newincome,
  setIncomepopup,
  setAddBtn,
  setNewincome,
  setOverAllLoading
}) => {
  const handleclicked = () => {
    setIncomepopup(false);
    setAddBtn(true);
    setNewincome("");
    setOverAllLoading(true)
  };
console.log(newincome)
 
  return (
    <div className="popup">
      <Card sx={{ width: 240 }}>
        <CardActionArea
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <CardContent>
            <Typography gutterBottom color="error" variant="h5" component="div">
              INCOME
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
              Your Income : {newincome} .RS
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Button onClick={handleclicked}>close</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Incomepopup;
