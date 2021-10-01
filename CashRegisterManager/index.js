var message = document.querySelector(".message")
const availableNotes = [2000, 500, 100, 20, 10, 5, 1]

function calculate() {
    removeMessage();
    clearTable();
    const billAmount = parseInt(document.getElementById("bill-amount").value);
    const cashGiven = parseInt(document.getElementById("cash-given").value);
    console.log(isNaN(billAmount) || isNaN(cashGiven));
    if (isNaN(billAmount) || isNaN(cashGiven) ) {
        setMessage("Amount entered needs to be a number")
    }
    else {
        if (billAmount > cashGiven) {
          setMessage("Give me more money!!!");
        } else {
          let returnValue = cashGiven - billAmount;
          if (returnValue == 0) {
            setMessage("No return");
          } else {
            for (let i = 0; i < availableNotes.length; i++) {
              const numOfNotes = Math.trunc(returnValue / availableNotes[i]);
              if (numOfNotes !== 0) {
                document.querySelector(`.note-${availableNotes[i]}`).innerText =
                  numOfNotes;
              }
              returnValue %= availableNotes[i];
            }
          }
        }
    }
      
}

function setMessage(msg) {
    message.style.display = "block";
    message.innerText = msg;
}
function removeMessage() {
    message.style.display = "none"; 
}
function clearTable() {
    const cell = document.querySelectorAll('.cell')
    cell.forEach((c)=>{c.innerText = ''})
}