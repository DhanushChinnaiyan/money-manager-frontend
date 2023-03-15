import React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import TimeAgo from "timeago-react";
import { Base } from "../../BASE/base";

const IncomeFullHistory = ({ incomesData}) => {

  

  // console.log(historyincomevalue)
  return (
    <Base>
   
    <div className="incomehistoryCard">
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{textAlign:"center"}}>
            INCOMES HISTORY
          </Typography>

          {incomesData.map((item, index) => {
            return (
              <CardActions
                key={index}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography >
                 {index+1}. INCOME : {item.income} .RS
                </Typography>
                <Typography color="grey" style={{fontSize:"14px"}}>
                 {item.day + "/" + item.month + "/" + item.year}
                </Typography>
                <TimeAgo style={{fontSize:"calc(7px + 0.5vw)",color:"grey",marginLeft:"15px"}} datetime={item.date} locale="vi" />
                
              </CardActions>
            );
          })}
        </CardContent>
        
      </Card>
    </div>
    </Base>
  );
};

export default IncomeFullHistory;
