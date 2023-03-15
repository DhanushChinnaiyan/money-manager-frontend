import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";

const Expensepopup = ({
  newexpenses,
  setExpensepopup,
  setAddBtn,
  setNewexpense,
}) => {
  const handleclicked = () => {
    setExpensepopup(false);
    setAddBtn(true);
    setNewexpense([]);
  };

  const Total =
    parseInt(newexpenses.fuel) +
    parseInt(newexpenses.movie) +
    parseInt(newexpenses.food) +
    parseInt(newexpenses.loan) +
    parseInt(newexpenses.medical) +
    parseInt(newexpenses.others);

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
              Expense
            </Typography>
            {newexpenses.fuel && (
              <Typography variant="body2" color="text.secondary">
                Fuel : {newexpenses.fuel} .RS
              </Typography>
            )}
            {newexpenses.movie && (
              <Typography variant="body2" color="text.secondary">
                Movie : {newexpenses.movie} .RS
              </Typography>
            )}
            {newexpenses.food && (
              <Typography variant="body2" color="text.secondary">
                Food : {newexpenses.food} .RS
              </Typography>
            )}
            {newexpenses.loan && (
              <Typography variant="body2" color="text.secondary">
                Loan : {newexpenses.loan} .RS
              </Typography>
            )}
            {newexpenses.medical && (
              <Typography variant="body2" color="text.secondary">
                Medical : {newexpenses.medical} .RS
              </Typography>
            )}
            {newexpenses.others && (
              <Typography variant="body2" color="text.secondary">
                Others : {newexpenses.others} .RS
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              Total Expenses : {Total} .RS
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

export default Expensepopup;
