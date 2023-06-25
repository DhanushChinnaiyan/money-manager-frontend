import { useEffect, useState } from "react";
import "./App.css";
import HomeComponents from "./home components/home";
import { Route, Switch, useHistory } from "react-router-dom";
import IncomeFullHistory from "./home components/history/incomefullhistory";
import FullExpensesHistory from "./home components/history/expensefullhistory";
import Signup from "./UserEntry/Signup.jsx";
import ForgotPassword from "./UserEntry/Forgot-Password.jsx";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { decodeToken } from "react-jwt";
import Login from "./UserEntry/LoginComponent.jsx";
import { CircularProgress } from "@mui/material";

function App() {
  const [expensesData, setExpensesData] = useState([]);
  const [incomesData, setIncomesData] = useState([]);
  const [dummy, setDummy] = useState(false);

  // snak bar
  const handleMessage = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  // overAllLoading state
  const [overAllLoading, setOverAllLoading] = useState(true);

  const history = useHistory();

  // checking if user is already logedIn
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      // verifying user token
      const user = decodeToken(token);
      if (!user) {
        localStorage.removeItem("userToken");
        history.replace("/login");
      }
    }
  }, []);

  useEffect(() => {
  
    const getincome = async () => {
      try {
        const response = await fetch(
          "https://money-manager-41h8.onrender.com/income",
          {
            method: "GET",
            headers:{
              "x-auth-user":localStorage.getItem("userToken")
            }
          }
        );
        const data = await response.json();
        data.data && setIncomesData(data.data);
      } catch (error) {
        console.log("Error Occure", error);
      }
    };

    const getexpense = async () => {
      try {
        const response = await fetch(
          "https://money-manager-41h8.onrender.com/expense",
          {
            method: "GET",
            headers:{
              "x-auth-user":localStorage.getItem("userToken")
            }
          }
        );
        const data = await response.json();
        data.data && setExpensesData(data.data);
        // turn off overAllLoading
        setOverAllLoading(false)
      } catch (error) {
        console.log("Error Occure", error);
      }
    };
    getincome();
    getexpense();
  }, [overAllLoading]);

  return (
    <SnackbarProvider
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      maxSnack={3}
    >
      <div className="App">
        <Switch>
          <Route exact path="/">
            <HomeComponents
              incomesData={incomesData}
              setIncomesData={setIncomesData}
              expensesData={expensesData}
              setExpensesData={setExpensesData}
              overAllLoading={overAllLoading}
              setOverAllLoading={setOverAllLoading}
              dummy={dummy}
              setDummy={setDummy}
            />
          </Route>
          <Route path="/incomehistory">
            <IncomeFullHistory
              incomesData={incomesData}
              overAllLoading={overAllLoading}
              setOverAllLoading={setOverAllLoading}
            />
          </Route>
          <Route path="/expensehistory">
            <FullExpensesHistory
              expensesData={expensesData}
              overAllLoading={overAllLoading}
              setOverAllLoading={setOverAllLoading}
            />
          </Route>
          <Route path="/signup">
            <Signup handleMessage={handleMessage} />
          </Route>
          <Route path="/login">
            <Login handleMessage={handleMessage} />
          </Route>
          <Route path="/forgotpassword">
            <ForgotPassword handleMessage={handleMessage} />
          </Route>
        </Switch>
      </div>
    </SnackbarProvider>
  );
}

export default App;
