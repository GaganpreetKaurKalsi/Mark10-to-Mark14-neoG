const initialPrice = document.getElementById("initial-price")
const stockQuantity = document.getElementById("quan-stocks")
const currentPrice = document.getElementById("current-price")
const message = document.querySelector(".message");

const btn = document.getElementById("btn").addEventListener("click", () => {

    if (initialPrice.value == '' || currentPrice.value == '' || stockQuantity.value == '') {
        alert("Please fill out all fields!")
    }
    else {
        var initial = Number(initialPrice.value);
        var current = Number(currentPrice.value);
        var quantity = Number(stockQuantity.value);

        console.log(initial, current, quantity);
        if (!isNaN(initial) && !isNaN(current) && !isNaN(quantity)) {
          calculateProfitAndLoss(initial, current, quantity);
        } else {
          setMessage("Please enter information in digits");
        }
    }
    
})


function profit(sp, cp) {
    return sp - cp;
}

function loss(sp, cp) {
    return cp - sp;
}
function profitPercent(profit, cp) {
    return (profit / cp * 100).toFixed(2);
}
function lossPercent(loss, cp) {
    return (loss / cp * 100).toFixed(2);
}

function calculateProfitAndLoss(initial, current, quantity) {
    if (initial > current) {
        const lossVal = loss(current, initial)*quantity
        const lossPer = lossPercent(lossVal, initial)
        setMessage(
          `Hey! Your loss 😔 is ${lossVal} and the percentage is ${lossPer}%`
        );
        message.style.color = "#DC2626";
        message.style.backgroundColor = "#FECACA";
    }
    else if (current > initial) {
        const profitVal = profit(current, initial)*quantity;
        const profitPer = profitPercent(profitVal, initial);
        setMessage(
          `Hey! Your profit 😀 is ${profitVal} and the percentage is ${profitPer}%`
        );
        message.style.color = "#15803D";
        message.style.backgroundColor = "#BBF7D0";
    }
    else {
        setMessage(
          `You have a damn consistent graph 📈! Congratulations on begin neutral 👏`
        );
        message.style.color = "#CA8A04";
        message.style.backgroundColor = "#FEF08A";
        
    }
}

function setMessage(msg) {
  message.style.display = "block";
  message.innerText = msg;
}
function removeMessage() {
  message.style.display = "none";
}