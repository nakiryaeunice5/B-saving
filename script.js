
    let members = [];
let total = 0;
let requests = [];

let walletAddress = "";
let requiredApprovals = 2;

// ---------------- MEMBERS ----------------
function addMember() {
    let name = document.getElementById("memberName").value;

    if (!name) return;

    members.push(name);

    let option = document.createElement("option");
    option.text = name;
    document.getElementById("memberList").add(option);

    document.getElementById("memberName").value = "";
}

// ---------------- CONTRIBUTION ----------------
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

// ---------------- WALLET QR ----------------
function createWallet() {
    walletAddress = document.getElementById("walletInput").value;

    if (!walletAddress) return;

    document.getElementById("qrcode").innerHTML = "";

    new QRCode(document.getElementById("qrcode"), {
        text: walletAddress,
        width: 150,
        height: 150
    });
}

// ---------------- WITHDRAW REQUEST ----------------
function requestWithdrawal() {
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

// ---------------- APPROVAL (MULTISIG SIMULATION) ----------------
function approveRequest(index) {
    let member = document.getElementById("memberList").value;
    let req = requests[index];

    if (req.approvedBy.includes(member)) {
        alert("You already approved this request");
        return;
    }

    req.approvedBy.push(member);
    req.approvals++;

    if (req.approvals >= requiredApprovals) {
        total -= req.amount;
        document.getElementById("total").innerText = total;

        alert("Withdrawal Approved!");

        requests.splice(index, 1);
    }

    displayRequests();
}

// ---------------- DISPLAY REQUESTS ----------------
function displayRequests() {
    let list = document.getElementById("requestsList");
    list.innerHTML = "";

    requests.forEach((req, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <strong>${req.requestedBy}</strong> requests ${req.amount}<br>
            Approvals (${req.approvals}/${requiredApprovals}): ${req.approvedBy.join(", ") || "None"}<br>
            <button onclick="approveRequest(${index})">Approve</button>
        `;

        list.appendChild(li);
    });
}

// ---------------- WITHDRAW QR ----------------
let withdrawRequestId = "WITHDRAW_REQUEST_SYSTEM";

new QRCode(document.getElementById("withdrawQR"), {
    text: withdrawRequestId,
    width: 150,
    height: 150
});
