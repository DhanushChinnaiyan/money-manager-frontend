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
  const day = dates.getDate();
  const month = dates.getMonth() + 1;
  console.log(month)
  console.log(day)
  let totalincome = 0;
  let totalexpense = 0;
  // console.log(emptyArr)
 let totalvalue,totalexpensevalue;
  incomesData.length<7 ? (totalvalue = 0) : (totalvalue = incomesData.length-7)
 for(let i =incomesData.length-1;i>=totalvalue;i--){
    if(incomesData[i].day <= day && incomesData[i].day >= day-7 && incomesData[i].month === month){
  totalincome=totalincome+parseInt(incomesData[i].income)
    }
 }
 
 expensesData.length<7 ? (totalexpensevalue = 0) : (totalexpensevalue = expensesData.length-7)

 for (let i =expensesData.length-1;i>=totalexpensevalue;i--) {
    if(incomesData[i].day <= day && incomesData[i].day >= day-7 && incomesData[i].month === month){
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
            {item.day <= day && item.day >= day-7 && item.month === month &&<Weekincomecardcomponent 
            
            income = {item.income}
            date={item.date}
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
            {item.day <= day && item.day >= day-7 && item.month === month && <Weekexpensecardcomponent 
            
            Total={ parseInt(item.fuel) +
              parseInt(item.movie) +
              parseInt(item.food) +
              parseInt(item.loan) +
              parseInt(item.medical) +
              parseInt(item.others)
}
date = {item.date}
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

