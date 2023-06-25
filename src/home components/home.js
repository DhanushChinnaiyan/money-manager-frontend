import { Base } from "../BASE/base";
import MonthComponent from "../MONTHLY COMPONENTS/month.js";
import WeekComponent from "../WEEKLY COMPONENTS/week";
import YearComponent from "../YEARLY COMPONENTS/year";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import AddIncome from "./addingIncomeAndExpense/addincome";
import Addexpense from "./addingIncomeAndExpense/addexpense";
import Expensepopup from "./popup components/expense";
import Incomepopup from "./popup components/income";
import IncomeHistory from "./history/incom";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {decodeToken} from "react-jwt"

const HomeComponents = ({
  dummy,
  setDummy,
  incomesData,
  setIncomesData,
  expensesData,
  setExpensesData,
  setOverAllLoading,
  overAllLoading
}) => {
  //  States
  const [newexpenses, setNewexpense] = useState([]);
  const [newincome, setNewincome] = useState("");
  const [expensepopup, setExpensepopup] = useState(false);
  const [addBtn, setAddBtn] = useState(true);
  const [addincome, setAddincome] = useState(false);
  const [incomepopup, setIncomepopup] = useState(false);
  const [addexpense, setAddexpense] = useState(false);
  const [alignment, setAlignment] = useState("week");
  const history = useHistory()


  // checking if user is already logedIn
  useEffect(() => {
    setOverAllLoading(true)
    const token = localStorage.getItem("userToken");
    if (!token) {
      history.replace("/login");
    } else {
      // verifying user token
      const user = decodeToken(token);
      if (!user) {
        localStorage.removeItem("userToken");
        history.replace("/login");
      }
    }
  }, []);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const addincomebtnClick = () => {
    setAddincome(true);
    setAddBtn(false);
  };
  const addexpensebtnClick = () => {
    setAddexpense(true);
    setAddBtn(false);
  };
  return (
    <div className={overAllLoading?"App loading" : "App"}>
      {
overAllLoading? <CircularProgress color='success' size="calc(20px + 2vw)"/> :

    
      <Base dashChange="month">
        {addBtn && (
          <div className="homeBtns">
            <Button
              color="success"
              variant="outlined"
              onClick={addincomebtnClick}
            >
              Add Income
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={addexpensebtnClick}
            >
              Add Expense
            </Button>
          </div>
        )}
        {
          <div className="inputarea">
            {addincome && (
              <AddIncome
                setAddBtn={setAddBtn}
                setAddincome={setAddincome}
                incomesData={incomesData}
                setIncomesData={setIncomesData}
                setIncomepopup={setIncomepopup}
                setNewincome={setNewincome}
              />
            )}

            {addexpense && (
              <Addexpense
                setAddBtn={setAddBtn}
                setExpensepopup={setExpensepopup}
                setAddexpense={setAddexpense}
                expensesData={expensesData}
                setExpensesData={setExpensesData}
                newexpense={newexpenses}
                setNewexpense={setNewexpense}
              />
            )}
          </div>
        }
        {expensepopup && (
          <Expensepopup
            newexpenses={newexpenses}
            setExpensepopup={setExpensepopup}
            setAddBtn={setAddBtn}
            setNewexpense={setNewexpense}
            setOverAllLoading={setOverAllLoading}
          />
        )}
        {incomepopup && (
          <Incomepopup
            setIncomepopup={setIncomepopup}
            newincome={newincome}
            setNewincome={setNewincome}
            setAddBtn={setAddBtn}
            setOverAllLoading={setOverAllLoading}
          />
        )}

        {incomepopup
          ? ""
          : expensepopup
          ? ""
          : addBtn && (
              <IncomeHistory
                incomesData={incomesData}
                expensesData={expensesData}
                dummy={dummy}
                setDummy={setDummy}
              />
            )}
      {
        addincome === false && addexpense === false && incomepopup === false && expensepopup === false &&
        <div>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ToggleButtonGroup
            style={{ border: "1px solid grey" }}
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="week">Week</ToggleButton>
            <ToggleButton value="month">Month</ToggleButton>
            <ToggleButton value="year">Year</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div>
          {alignment === "month" && (
            <MonthComponent
              incomesData={incomesData}
              expensesData={expensesData}
              dummy={dummy}
              setDummy={setDummy}
            />
          )}
          {alignment === "week" && (
            <WeekComponent
              incomesData={incomesData}
              expensesData={expensesData}
              dummy={dummy}
              setDummy={setDummy}
            />
          )}
          {alignment === "year" && (
            <YearComponent
              incomesData={incomesData}
              expensesData={expensesData}
              dummy={dummy}
              setDummy={setDummy}
            />
          )}
        </div>
        </div>
      }
      </Base>
}
    </div>
  );
};

export default HomeComponents;
