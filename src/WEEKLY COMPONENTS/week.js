import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const WeekComponent = ({ setDummy, dummy, incomesData, expensesData }) => {
  useEffect(() => {
    setDummy(!dummy);
    
  }, []);
  console.log(incomesData)
  const dates = new Date();
  const day = dates.getDate()-7;
  const month = dates.getMonth() + 1;
  console.log(month)
  console.log("day",day)
  let totalincome = 0;
  let totalexpense = 0;
  // console.log(emptyArr)

 for(let i =0;i<incomesData.length;i++){
    if(incomesData[i].month === month && day < incomesData[i].day){
       totalincome=totalincome+parseInt(incomesData[i].income)
    }
 }
 

 for (let i =0;i<expensesData.length;i++) {
    if(expensesData[i].month === month && day < expensesData[i].day){
   let total =
     parseInt(expensesData[i].fuel) +
     parseInt(expensesData[i].movie) +
     parseInt(expensesData[i].food) +
     parseInt(expensesData[i].loan) +
     parseInt(expensesData[i].medical) +
     parseInt(expensesData[i].others);
     
   totalexpense = totalexpense + parseInt(total);
    }
 }



  return (
  <div>
    <div >
    <h4 style={{textAlign:"center"}}>This Week Income = {totalincome} Rupees.</h4> 
    <h4 style={{textAlign:"center"}}>This Week Expenses = {totalexpense} Rupees.</h4> 
    <h4 style={{textAlign:"center"}}>This Week Saving = {totalincome-totalexpense} Rupees.</h4>
    </div>
    <div style={{ display: "flex", justifyContent: "center", borderTop:"1px solid black",marginTop:"10px" }}>
     <div
      style={{
        display: "flex",
        flexWrap:"wrap",
        justifyContent: "center",
        borderRight:"1px solid black"
      }}
    >
      
      {incomesData.map((item, id) => {

        
        return (
          <div key={id} style={{ display: "flex", justifyContent: "center" }}>
            {item.month === month && day < item.day && <Weekincomecardcomponent 
            
            income = {item.income}
            date={item.day + "/" + item.month + "/" +item.year}
            />}
          </div>
        );
      })}
    </div>
    
    
     <div
      style={{
        display: "flex",
        flexWrap:"wrap",
        justifyContent: "center",
      }}
    >
      {expensesData.map((item, id) => {
        return (
          <div key={id} style={{ display: "flex", justifyContent: "center" }}>
            {item.month === month && day < item.day && <Weekexpensecardcomponent 
            
            Total={ parseInt(item.fuel) +
              parseInt(item.movie) +
              parseInt(item.food) +
              parseInt(item.loan) +
              parseInt(item.medical) +
              parseInt(item.others)
}
date={item.day + "/" + item.month + "/" +item.year}
            />}
          </div>
        );
      })}
    </div>
   </div>
  </div>
  );
};

export default WeekComponent;

const Weekincomecardcomponent = ({income,date}) => {
  return (
    <Card sx={{ maxWidth: 345 ,margin:"10px",padding:"10px"}}>
      <CardActionArea>
        <CardContent>
          <Typography variant="body2" color="green">
            INCOME : {income} .RS
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{display:"flex",justifyContent:"center",margin:"10px 0 10px 0",fontSize:"calc(8px + 0.5vw)"}}>
            {date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};


const Weekexpensecardcomponent = ({Total,date}) => {
  return (
    <Card sx={{ maxWidth: 345 ,margin:"10px",padding:"10px"}}>
      <CardActionArea>
        <CardContent>
          <Typography variant="body2" color="red">
            EXPENSES : {Total} .RS
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{display:"flex",justifyContent:"center",margin:"10px 0 10px 0",fontSize:"calc(8px + 0.5vw)"}}>
            {date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

