let members = [];
let total = 0;

function addMember() {
    let name = document.getElementById("memberName").value;

    if (name === "") return;

    members.push(name);

    let option = document.createElement("option");
    option.text = name;
    document.getElementById("memberList").add(option);

    document.getElementById("memberName").value = "";
}
function scanWithdrawQR() {
    alert("Withdrawal request opened. Members must approve.");
}
function contribute() {
    let member = document.getElementById("memberList").value;
    let amount = parseFloat(document.getElementById("amount").value);

    if (!member || !amount) return;

    total += amount;
    document.getElementById("total").innerText = total;

    let li = document.createElement("li");
    li.textContent = member + " contributed " + amount;

    document.getElementById("transactions").appendChild(li);

    document.getElementById("amount").value = "";
}

let walletAddress = "GROUP_WALLET_123"; // simulated wallet

function generateQR() {
    new QRCode(document.getElementById("qrcode"), {
        text: walletAddress,
        width: 150,
        height: 150
    });
}

generateQR();

function deposit(amount, member) {
    total += amount;
    document.getElementById("total").innerText = total;

    let li = document.createElement("li");
    li.textContent = member + " deposited " + amount + " BTC";

    document.getElementById("transactions").appendChild(li);
}

let requests = [];

function requestWithdrawal() {
    let amount = document.getElementById("amount").value;

    let request = {
        amount: amount,
        approvals: 0
    };

    requests.push(request);
}

function requestWithdrawal() {
    let walletAddress = "GROUP_WALLET_123";
let withdrawRequestId = "WITHDRAW_REQUEST_SYSTEM";
    let requiredApprovals = 2; // 2-of-N system
    let amount = parseFloat(document.getElementById("withdrawAmount").value);
    let member = document.getElementById("memberList").value;

    if (!amount || !member) return;

    let request = {
        amount: amount,
        requestedBy: member,
        approvals: 0,
        approvedBy: []
    };

    requests.push(request);
    displayRequests();
}

function approveRequest(index) {
    let member = document.getElementById("memberList").value;
    let req = requests[index];

    // Prevent same person approving twice
    if (req.approvedBy.includes(member)) {
        alert("You already approved this request");
        return;
    }

    req.approvedBy.push(member);
    req.approvals++;

    // Example: need 2 approvals
    if (req.approvals >= 2) {
        total -= req.amount;
        document.getElementById("total").innerText = total;

        alert("Withdrawal Approved!");
        requests.splice(index, 1);
    }

    displayRequests();
}

function displayRequests() {
    let list = document.getElementById("requestsList");
    list.innerHTML = "";

    requests.forEach((req, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            ${req.requestedBy} requested ${req.amount} 
            | Approvals: ${req.approvals}
            <button onclick="approveRequest(${index})">Approve</button>
        `;

        list.appendChild(li);
    });
}

new QRCode(document.getElementById("withdrawQR"), {
    text: withdrawRequestId,
    width: 150,
    height: 150
});

function displayRequests() {
    let list = document.getElementById("requestsList");
    list.innerHTML = "";

    requests.forEach((req, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <strong>${req.requestedBy}</strong> requests ${req.amount}  
            <br>
            Approvals (${req.approvals}/2): ${req.approvedBy.join(", ") || "None"}
            <br>
            <button onclick="approveRequest(${index})">Approve</button>
        `;

        list.appendChild(li);
    });
}

li.innerHTML = `
    ${req.requestedBy} requests ${req.amount} BTC  
    | Approvals: ${req.approvals}/${requiredApprovals}
    <button onclick="approveRequest(${index})">Approve</button>
`;
