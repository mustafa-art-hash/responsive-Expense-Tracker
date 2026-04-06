let transactions = JSON.parse(localStorage.getItem("transactions")) || []
let filter = "all"

function addTransaction() {
  let text = document.getElementById("text").value
  let amount = document.getElementById("amount").value

  if (text === "" || amount === "") return

  let transaction = {
    text: text,
    amount: Number(amount)
  }

  transactions.push(transaction)
  saveData()
  displayTransactions()
  updateBalance()

  document.getElementById("text").value = ""
  document.getElementById("amount").value = ""
}

function displayTransactions() {
  let list = document.getElementById("list")
  list.innerHTML = ""

  let filteredTransactions = transactions.filter(t => {
    if (filter === "income") return t.amount > 0
    if (filter === "expense") return t.amount < 0
    return true
  })

  filteredTransactions.forEach((t, index) => {
    let li = document.createElement("li")

    li.textContent = `${t.text} - $${t.amount}`

    if (t.amount > 0) {
      li.style.color = "green"
    } else {
      li.style.color = "red"
    }

    let btn = document.createElement("button")
    btn.textContent = "X"

    btn.onclick = function () {
      transactions.splice(index, 1)
      saveData()
      displayTransactions()
      updateBalance()
    }

    li.appendChild(btn)
    list.appendChild(li)
  })
}

function updateBalance() {
  let total = 0
  let income = 0
  let expense = 0

  transactions.forEach(t => {
    total += t.amount

    if (t.amount > 0) {
      income += t.amount
    } else {
      expense += t.amount
    }
  })

  document.getElementById("balance").textContent = `Balance: $${total}`
  document.querySelector(".income").textContent = `Income: $${income}`
  document.querySelector(".expense").textContent = `Expense: $${expense}`
}

function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions))
}

function setFilter(type) {
  filter = type
  displayTransactions()
}

displayTransactions()
updateBalance()