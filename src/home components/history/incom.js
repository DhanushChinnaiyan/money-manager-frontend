import React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import TimeAgo from "timeago-react";
import { useHistory } from "react-router-dom";

const IncomeHistory = ({ incomesData, expensesData }) => {
  const history = useHistory();
  let incomevalue;
  const historyincomevalue = [];
  incomesData.length > 5
    ? (incomevalue = incomesData.length - 5)
    : (incomevalue = 0);
  for (let index = incomesData.length - 1; index >= incomevalue; index--) {
    historyincomevalue.push(incomesData[index]);
  }

  let expensevalue;
  const historyexpensevalue = [];
  expensesData.length > 5
    ? (expensevalue = expensesData.length - 5)
    : (expensevalue = 0);
  for (let index = expensesData.length - 1; index >= expensevalue; index--) {
    historyexpensevalue.push(expensesData[index]);
  }
  // console.log(historyincomevalue)
  return (
    <div className="historyCard">
     {incomesData.length>0 && 
      <Card>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          INCOMES HISTORY
        </Typography>

        {historyincomevalue.map((item, index) => {
          return (
            <CardActions
              key={index}
              sx={{ display: "flex" }}
            >
              <Typography style={{ fontSize: "calc(9px + 0.5vw)" }}>
                Income : {item?.income} .RS
              </Typography>
              <TimeAgo
                style={{
                  fontSize: "calc(7px + 0.3vw)",
                  color: "grey",
                  marginLeft: "7px",
                }}
                datetime={item.date}
                locale="vi"
              />
            </CardActions>
          );
        })}
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button size="small" onClick={() => history.push("/incomehistory")}>
          show full history
        </Button>
      </CardActions>
    </Card>
     }

      {
        expensesData.length>0 &&
        <Card>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            EXPENSES HISTORY
          </Typography>

          {historyexpensevalue.map((item, index) => {
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
              <CardActions
                key={index}
                sx={{ display: "flex" }}
              >
                <Typography style={{ fontSize: "calc(9px + 0.5vw)" }}>
                  Expense : {Total} .RS
                </Typography>
                <TimeAgo
                  style={{
                    fontSize: "calc(7px + 0.3vw)",
                    color: "grey",
                    marginLeft: "7px",
                  }}
                  datetime={item.date}
                  locale="vi"
                />
              </CardActions>
            );
          })}
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button size="small" onClick={() => history.push("/expensehistory")}>
            show full history
          </Button>
        </CardActions>
      </Card>
      }
    </div>
  );
};

export default IncomeHistory;
