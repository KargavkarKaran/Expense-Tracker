const form = document.getElementById("expense-form");
const list = document.getElementById("list");
const balanceEl = document.getElementById("balance");
const summaryEl = document.getElementById("summary");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const amount = +document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const type = document.getElementById("type").value;

    const transaction = {
        id: Date.now(),
        title,
        amount,
        category,
        type,
        date: new Date().toLocaleDateString()
    };

    transactions.push(transaction);
    saveToLocalStorage();
    updateUI();
    form.reset();
});
function updateUI() {
    list.innerHTML = "";

    let balance = 0;

    transactions.forEach(tr => {
        const sign = tr.type === "expense" ? "-" : "+";
        balance += tr.type === "expense" ? -tr.amount : tr.amount;

        const li = document.createElement("li");
        li.classList.add(tr.type);

        li.innerHTML = `
            ${tr.title} (${tr.category})
            <span>${sign}₹${tr.amount}</span>
        `;

        list.appendChild(li);
    });

    balanceEl.innerText = `Balance: ₹${balance}`;
    updateSummary();
}
function updateSummary() {
    let income = 0;
    let expense = 0;

    transactions.forEach(tr => {
        if (tr.type === "income") income += tr.amount;
        else expense += tr.amount;
    });

    summaryEl.innerText = `Monthly Income: ₹${income} | Expense: ₹${expense}`;
}
function saveToLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

updateUI();
