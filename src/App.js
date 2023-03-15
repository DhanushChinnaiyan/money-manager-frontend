
import { useEffect, useState } from 'react';
import './App.css';
import HomeComponents from './home';
import { Route,Switch,Redirect } from 'react-router-dom';
import IncomeFullHistory from './home components/history/incomefullhistory';
import FullExpensesHistory from './home components/history/expensefullhistory';

function App() {
   const dates = new Date();
   console.log(dates.getHours())
  const[expensesData,setExpensesData]=useState([])
  const[incomesData,setIncomesData]=useState([])
  const [dummy,setDummy] = useState(false)
 
  useEffect(()=>{
       const getincome = async() => {
        try {
          const response =await fetch ("https://money-manager-backend-c6qn0shrs-dhanushchinnaiyan.vercel.app/income" , {
            method:"GET"
          });
          const data =await response.json();
          console.log(data.data)
          setIncomesData(data.data)
          console.log("incomes data :",incomesData)
        } catch (error) {
          console.log("Error Occure" , error)
        }
       }

       const getexpense = async() => {
        try {
          const response =await fetch ("https://money-manager-backend-c6qn0shrs-dhanushchinnaiyan.vercel.app/expense" , {
            method:"GET"
          });
          const data =await response.json();
          // console.log(data.data)
          setExpensesData(data.data)
          console.log("expense data :",expensesData)
        } catch (error) {
          console.log("Error Occure" , error)
        }
       }
       getincome()
       getexpense()
  },[dummy])

  return (
    <div className="App">
        <Switch>
        <Route exact path="/">
        <HomeComponents
        incomesData={incomesData}
        setIncomesData={setIncomesData}
        expensesData={expensesData}
        setExpensesData={setExpensesData}
        dummy={dummy}
        setDummy={setDummy}
        />
        </Route>
        <Route path="/incomehistory">
          <IncomeFullHistory 
          incomesData={incomesData}
          />
        </Route>
        <Route path="/expensehistory">
           <FullExpensesHistory
            expensesData={expensesData}
           />
        </Route>
        </Switch>
    </div>
  );
}

export default App;
