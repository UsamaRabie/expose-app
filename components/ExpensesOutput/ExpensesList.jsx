import { FlatList, StyleSheet } from 'react-native';

import ExpenseItem from './ExpenseItem';

function renderExpenseItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
      style={styles.container}
    />
  );
}

export default ExpensesList;
const styles = StyleSheet.create({
  container:{
    marginBottom:16,
  }
})