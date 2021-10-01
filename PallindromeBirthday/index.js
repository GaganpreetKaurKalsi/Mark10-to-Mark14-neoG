var message = document.querySelector(".message")

function check() {
  removeMessage();
  let DOB = document.getElementById("dob").value;
  const str = DOB.split("-")
  if (str.length < 3) {
    setMessage("Please enter a valid date !!!")
  }
  else {
    let dob = { year: str[0], month: str[1], date: str[2] };
    const list = getVariations(dob);
    const isPalin = list.map((str) => isPalindrome(str));
    if (isPalin.includes(true)) {
      setMessage("Your birthday is a Palindrome");
    } else {
      let foundNext = false;
      let nextPalin;
      let count = 0;
      let dobNext = dob;
      let dobPrev = dob;
      while (!foundNext) {
        dobNext = getNextDate({
          date: parseInt(dobNext.date),
          month: parseInt(dobNext.month),
          year: parseInt(dobNext.year),
        });
        dobPrev = getPrevDate({
          date: parseInt(dobPrev.date),
          month: parseInt(dobPrev.month),
          year: parseInt(dobPrev.year),
        });
        count++;
        console.log("Next Date : ", dobNext);
        console.log("Prev Date : ", dobPrev);
        let variationsNext = getVariations(dobNext);
        let variationsPrev = getVariations(dobPrev);
        let isPalin = variationsNext.map((str) => isPalindrome(str));
        if (isPalin.includes(true)) {
          foundNext = true;
          nextPalin = dobNext;
        }
        isPalin = variationsPrev.map((str) => isPalindrome(str));
        if (isPalin.includes(true)) {
          foundNext = true;
          nextPalin = dobPrev;
        }
      }
      console.log(nextPalin);
      const newDate =
        nextPalin.date + "-" + nextPalin.month + "-" + nextPalin.year;
      setMessage(
        `The nearest palindrome date is ${newDate}. You missed by ${count} days.`
      );
    }
  }
}

function getString({ year, month, date }) {
  console.log(date, month, year)
  if (date < 10) {
    date = '0' + date.toString();
  }
  else {
    date = date.toString()
  }
  if (month < 10) {
    month = '0' + month.toString();
  }
  else {
    month = month.toString();
  }
  if (year < 10) {
    year = '0' + year.toString();
  }
  else {
    year = year.toString();
  }
  return {year, month, date}
}

function getVariations(dob) {
  const { date, month, year } = dob;
  const ddmmyyyy = date + month + year;
  const mmddyyyy = month + date + year;
  const yyyymmdd = year + month + date;
  const ddmmyy = date + month + year.slice(-2);
  const mmddyy = month + date + year.slice(-2);
  const yymmdd = year.slice(-2) + month + date;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function isPalindrome(str) {
  const reverse = str.split("").reverse().join("")
  return str===reverse
}

function setMessage(msg) {
    message.style.display = "block";
    message.innerText = msg;
}
function removeMessage() {
    message.style.display = "none"; 
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  else if (year % 4 === 0 && year % 100 !== 0) {
    return true;
  }
  else {
    return false;
  }
}

function getPrevDate({ date, month, year }) {
  date = date - 1;
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (month < 1) {
    month = 12;
    year--;
  }
  if (date < 1) {
    console.log("Date : ", date, month - 1, days[month - 1]);
    date = days[month - 1];
    month--;
  }

  return getString({date, month, year})
}

function getNextDate({ date, month, year }) {
  date = date + 1;
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month == 2) {
    if (isLeapYear(year)) {
      if (date > 29) {
        date = date - 29;
        month++;
      }
    } else {
      if (date > 28) {
        date = date - 28;
        month++;
      }
    }
  } else {
    if (date > days[month - 1]) {
      date = date - days[month - 1];
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }

  return getString({ date, month, year });
}