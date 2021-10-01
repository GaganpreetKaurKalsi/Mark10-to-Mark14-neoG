var message = document.querySelector(".message")
const availableNotes = [2000, 500, 100, 20, 10, 5, 1]

function check() {
    removeMessage();
    let DOB = document.getElementById("dob").value;
    const luckyNum = document.getElementById("luckyNumber").value;
  let num = 0;
  if (DOB === '' || luckyNum === '') {
    setMessage("Please input values")
  }
  else {
    DOB = parseInt(DOB.replaceAll("-", ""));
    console.log(DOB);
    while (DOB > 0) {
      num += DOB % 10;
      console.log(DOB % 10, DOB / 10);
      DOB = Math.trunc(DOB / 10);
    }
    if (num % luckyNum === 0) {
      setMessage("WoW! Your birthday is lucky 😍");
    } else {
      setMessage("Sorry! Your birthday is not lucky 😔");
    }
  }

}

function setMessage(msg) {
    message.style.display = "block";
    message.value = msg;
}
function removeMessage() {
    message.style.display = "none"; 
}
function clearTable() {
    const cell = document.querySelectorAll('.cell')
    cell.forEach((c)=>{c.innerText = ''})
}