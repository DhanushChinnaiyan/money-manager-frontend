import React, { useEffect, useState } from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card, CircularProgress } from "@mui/material";
import TimeAgo from "timeago-react";
import { Base } from "../../BASE/base";

const IncomeFullHistory = ({
  incomesData,
  setOverAllLoading,
  overAllLoading,
}) => {

  useEffect(() => {  
      setOverAllLoading(true)

 
  },[]);

  // console.log(historyincomevalue)
  

  return (

    <Base>
      <div className="incomehistoryCard">
        
        <Card>
          <CardContent className={`${overAllLoading&&"loading"}`}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ textAlign: "center" }}
            >
              INCOMES HISTORY
            </Typography>

            {
              overAllLoading? <CircularProgress color='success' size="calc(20px + 2vw)"/>
      
              :
            
              incomesData.map((item, index) => {
              return (
                <CardActions key={index} sx={{display:"flex"}}>
                  <Typography style={{flex:4,fontSize:"calc(10px + 0.3vw)"}}>
                    {index + 1}. INCOME : {item.income} .RS
                  </Typography>
                  <Typography
                    color="grey"
                    style={{ flex:1,fontSize: "calc(8px + 0.3vw)", marginLeft: "calc(10px + 3vw)" }}
                  >
                    {item.day + "/" + item.month + "/" + item.year}
                  </Typography>
                  <TimeAgo
                    style={{
                      fontSize: "calc(7px + 0.5vw)",
                      color: "grey",
                      marginLeft: "calc(10px + 3vw)",
                      flex:1
                    }}
                    datetime={item.date}
                    locale="vi"
                  />
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
