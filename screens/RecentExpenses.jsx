import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { useContext, useEffect, useState } from 'react';
import { getExpenses } from '../requests/httpRequest';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Error from "../components/UI/Error"
function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const [loading , setLoading]=useState(false)
  const [error , setError]=useState();
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    
    return expense.date >= date7DaysAgo && expense.date <= today;
  });
  
  useEffect(() => {
    async function fetchExpenses() {
      setLoading(true)
      try{
        const expenses = await getExpenses();
        expensesCtx.setExpenses(expenses);
        setError(null)
      }catch(err){
        setError(err + ' Could not fetch expenses!');   
         }
      setLoading(false)
    }

    fetchExpenses();
  }, []);

  if(error && !loading ){
    return <Error message={error}/>

  }

  if(loading){
    return <LoadingSpinner/>
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;