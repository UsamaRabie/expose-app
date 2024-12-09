import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import axios from 'axios';
import { addExpense, DeleteExpense , UpdateExpense } from '../requests/httpRequest';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Error from '../components/UI/Error';

function ManageExpense({ route, navigation }) {
  const [loading , setLoading] = useState(false)
  const [error , setError]=useState()
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setLoading(true)
    try{
      await DeleteExpense(editedExpenseId)
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    }catch(err){
      setError(err + 'Could not delete expense - please try again later!')
      setLoading(false)

    }
  }

  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    setLoading(true)
    try{
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await UpdateExpense(editedExpenseId, expenseData);
      } else {
        const id = await addExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      setError(null)
      navigation.goBack();
    }
    catch(err){
      setError(err + ' Could not Submit expense - please try again later! ')

      setLoading(false)
    }
  }

    if(error && !loading){
      return <Error message={error}/>
    }
  if(loading){
    return <LoadingSpinner/>
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});