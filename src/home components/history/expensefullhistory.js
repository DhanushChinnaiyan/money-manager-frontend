import React, { useEffect, useState } from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card, CircularProgress } from "@mui/material";
import TimeAgo from "timeago-react";
import { Base } from "../../BASE/base";

const FullExpensesHistory = ({
  expensesData,
  setOverAllLoading,
  overAllLoading,
}) => {

  useEffect(()=>{
    setOverAllLoading(true)
  },[])
  return (
    <Base>
      <div className="expensehistoryCard">
        <Card>
          <CardContent className={overAllLoading && "loading"}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ textAlign: "center" }}
            >
              EXPENSES HISTORY
            </Typography>

           <div className="expenses">
           {overAllLoading ? (
              <CircularProgress color="success" size="calc(20px + 2vw)" />
            ) : (
              expensesData.map((item, index) => {
                const convertToNumber = (value) => {
                  return value ? Number(value) : 0;
                };

                const Total =
                  convertToNumber(item?.food) +
                  convertToNumber(item?.movie) +
                  convertToNumber(item?.fuel) +
                  convertToNumber(item?.loan) +
                  convertToNumber(item?.medical) +
                  convertToNumber(item?.others);

                return (
                  <div className="expensecard">
                    <CardActions
                      key={index}
                      sx={{ display: "flex" }}
                    >
                      <Typography style={{fontSize:"calc(10px + 0.5vw)"}}>
                        {index + 1}. Total Expense : {Total} .RS
                      </Typography>
                      <Typography color="grey" style={{ fontSize: "calc(10px + 0.5vw)" }}>
                        {item.day + "/" + item.month + "/" + item.year}
                      </Typography>
                      <TimeAgo
                        style={{
                          fontSize: "calc(5px + 0.5vw)",
                          color: "grey",
                          marginLeft: "15px",
                        
                        }}
                        datetime={item.date}
                        locale="vi"
                      />
                    </CardActions>
                    <div className="expensecardbody">
                      <ul>
                      <li>Fuel Expense : {item.fuel}</li>
                      <li>Movie Expense : {item.movie}</li>
                      <li>Food Expense : {item.food}</li>
                      <li>Loan Expense : {item.loan}</li>
                      <li>Medical Expense : {item.medical}</li>
                      <li>Others Expense : {item.others}</li>
                      </ul>
                    </div>
                  </div>
                );
              })
            )}
           </div>
          </CardContent>
        </Card>
      </div>
    </Base>
  );
};

export default FullExpensesHistory;
