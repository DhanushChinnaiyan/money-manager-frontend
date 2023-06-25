import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const YearComponent = ({ setDummy, dummy, incomesData, expensesData }) => {
  useEffect(() => {
    setDummy(!dummy);
  }, []);

  const dates = new Date();
  const year = dates.getFullYear();
  let totalincome = 0;
  let totalexpense = 0;
  // console.log(emptyArr)
  for (let i = 0; i < incomesData.length; i++) {
    if (incomesData[i].year === year) {
      totalincome = totalincome + parseInt(incomesData[i].income);
    }
  }
  for (let i = 0; i < expensesData.length; i++) {
    if (incomesData[i].year === year) {
      const convertToNumber = (value) => {
        return value ? Number(value) : 0;
      };
  
      const total =
        convertToNumber(expensesData[i].food) +
        convertToNumber(expensesData[i].movie) +
        convertToNumber(expensesData[i].fuel) +
        convertToNumber(expensesData[i].loan) +
        convertToNumber(expensesData[i].medical) +
        convertToNumber(expensesData[i].others);

      totalexpense = totalexpense + parseInt(total);
    }
  }
  return (
    <div>
      <div>
        <h4 style={{ textAlign: "center" }}>
          This Year Income = {totalincome} Rupees.
        </h4>
        <h4 style={{ textAlign: "center" }}>
          This Year Expenses = {totalexpense} Rupees.
        </h4>
        <h4 style={{ textAlign: "center" }}>
          This Year Saving = {totalincome - totalexpense} Rupees.
        </h4>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 10px 30px 10px",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0 0 10px grey",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            borderRight: "1px solid black",
            flex:1
          }}
        >
          {incomesData.map((item, id) => {

            return (
              <div
                key={id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {item.year === year && (
                  <Monthincomecardcomponent
                    income={item.income}
                    date={item.day + "/" + item.month + "/" +item.year}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            flex:1
          }}
        >
          {expensesData.map((item, id) => {
             const convertToNumber = (value) => {
              return value ? Number(value) : 0;
            };
        
            const Total =
              convertToNumber(item.food) +
              convertToNumber(item.movie) +
              convertToNumber(item.fuel) +
              convertToNumber(item.loan) +
              convertToNumber(item.medical) +
              convertToNumber(item.others);
            return (
              <div
                key={id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {item.year === year && (
                  <Monthexpensecardcomponent
                    Total={Total}
                    date={item.day + "/" + item.month + "/" +item.year}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default YearComponent;

const Monthincomecardcomponent = ({ income, date }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: "10px", padding: "10px" }}>
      <CardActionArea>
        <CardContent>
          <Typography variant="body2" color="green">
            INCOME : {income} .RS
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 0 10px 0",
              fontSize: "calc(8px + 0.5vw)",
            }}
          >
            {date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const Monthexpensecardcomponent = ({ Total, date }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: "10px", padding: "10px" }}>
      <CardActionArea>
        <CardContent>
          <Typography variant="body2" color="red">
            EXPENSES : {Total} .RS
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 0 10px 0",
              fontSize: "calc(8px + 0.5vw)",
            }}
          >
            {date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
