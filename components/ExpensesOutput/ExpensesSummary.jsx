import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function ExpensesSummary({ expenses, periodName }) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.periodName}>{periodName}</Text>
      <Text style={styles.expensesSum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    flexDirection:'row',
    justifyContent:"space-around",

  },
  periodName: {
    fontSize: 18,
    fontWeight: '600',
    color: GlobalStyles.colors.primary800,
    marginBottom: 8,
  },
  expensesSum: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GlobalStyles.colors.accent500,
  },
});

export default ExpensesSummary;
