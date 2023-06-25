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
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Typography>
                        {index + 1}. Total Expense : {Total} .RS
                      </Typography>
                      <Typography color="grey" style={{ fontSize: "14px" }}>
                        {item.day + "/" + item.month + "/" + item.year}
                      </Typography>
                      <TimeAgo
                        style={{
                          fontSize: "calc(7px + 0.3vw)",
                          color: "grey",
                          marginLeft: "15px",
                        }}
                        datetime={item.date}
                        locale="vi"
                      />
                    </CardActions>
                    <div className="expensecardbody">
                      <div>Fuel Expense : {item.fuel}</div>
                      <div>Movie Expense : {item.movie}</div>
                      <div>Food Expense : {item.food}</div>
                      <div>Loan Expense : {item.loan}</div>
                      <div>Medical Expense : {item.medical}</div>
                      <div>Others Expense : {item.others}</div>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    </Base>
  );
};

export default FullExpensesHistory;
