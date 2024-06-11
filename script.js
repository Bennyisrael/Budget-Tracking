document.addEventListener('DOMContentLoaded', () => {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  
    document.getElementById('expForm').addEventListener('submit', addTransaction);
    showTransactions();
    updateBalance();
  
    function addTransaction(e) {
      e.preventDefault();
  
      const type = document.getElementById('type').value;
      const name = document.getElementById('name').value;
      const amount = parseFloat(document.getElementById('amount').value);
  
      if (type !== 'chooseOne' && name && amount) {
        const transaction = {
          type,
          name,
          amount,
          id: transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1,
        };
  
        transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));
      }
  
      document.getElementById('expForm').reset();
      showTransactions();
      updateBalance();
    }
  
    function showTransactions() {
      const transactionTable = document.getElementById('transactionTable');
  
      transactionTable.innerHTML = '';
  
      transactions.forEach(transaction => {
        transactionTable.innerHTML += `
          <tr>
            <td>${transaction.type}</td>
            <td>${transaction.name}</td>
            <td>₹${transaction.amount.toFixed(2)}</td>
            <td><a class="deleteButton" onclick="deleteTransaction(${transaction.id})">Delete</a></td>
          </tr>
        `;
      });
    }
  
    function updateBalance() {
      let balance = 0;
  
      transactions.forEach(transaction => {
        if (transaction.type === "income") {
          balance += transaction.amount;
        } else if (transaction.type === "expense") {
          balance -= transaction.amount;
        }
      });
  
      document.querySelector(".balance").textContent = `₹${balance.toFixed(2)}`;
    }
  
    function deleteTransaction(id) {
      const index = transactions.findIndex(transaction => transaction.id === id);
      if (index !== -1) {
        transactions.splice(index, 1);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        showTransactions();
        updateBalance();
      }
    }
  });
  