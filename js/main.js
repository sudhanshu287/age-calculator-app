const inputBox = document.getElementsByClassName("input__box");
const errorBox = document.getElementsByClassName("input__error");
const day = document.getElementById("day-value");
const month = document.getElementById("month-value");
const year = document.getElementById("year-value");

const setDays=document.getElementById('days-count');
const setMonths=document.getElementById('months-count');
const setYears=document.getElementById('years-count');

const validateInput = (day, month, year) => {
    let date = new Date();
    if (day === "" && month === "" && year === "") {
        if (day === "") {
            errorBox[0].innerHTML = "This field is required";
            inputBox[0].classList.add("error");
        }
        if (month === "") {
            errorBox[1].innerHTML = "This field is required";
            inputBox[1].classList.add("error");
        }
        if (year === "") {
            errorBox[2].innerHTML = "This field is required";
            inputBox[2].classList.add("error");
        }
    } else {
        if (day > 31 || day < 1) {
            errorBox[0].innerHTML = "Must be a valid day";
            inputBox[0].classList.add("error");
        }
        if (month > 12 || month < 1) {
            errorBox[1].innerHTML = "Must be a valid month";
            inputBox[1].classList.add("error");
        }
        if (year > date.getFullYear()) {
            errorBox[2].innerHTML = "Must be in the past";
            inputBox[2].classList.add("error");
        }
    }
    if (
        day > 0 &&
        day <= 31 &&
        month > 0 &&
        month <= 12 &&
        year < date.getFullYear()
    ) {
        return true;
    }
    return false;
};

const validateDate=(dateString)=>{
    let dateformat = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;

    // Match the date format through regular expression
    if(dateString.match(dateformat)){
        let operator = dateString.split('/');

        // Extract the string into month, date and year
        let datepart = [];
        if (operator.length>1){
            datepart = dateString.split('/');
        }
        let month= parseInt(datepart[0]);
        let day = parseInt(datepart[1]);
        let year = parseInt(datepart[2]);

        // Create list of days of a month
        let ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
        if (month==1 || month>2){
            if (day>ListofDays[month-1]){
                ///This check is for Confirming that the date is not out of its range
                return false;
            }
        }else if (month==2){
            let leapYear = false;
            if ( (!(year % 4) && year % 100) || !(year % 400)) {
                leapYear = true;
            }
            if ((leapYear == false) && (day>=29)){
                return false;
            }else
            if ((leapYear==true) && (day>29)){
                // console.log('Invalid date format!');
                errorBox[0].innerHTML = "Must be a valid date";
                inputBox[0].classList = "input__box error";
                errorBox[1].innerHTML = "";
                inputBox[1].classList = "input__box error";
                errorBox[2].innerHTML = "";
                inputBox[2].classList = "input__box error";
                return false;
            }
        }
    }else{
        // console.log("Invalid date format!");
        errorBox[0].innerHTML = "Must be a valid date";
        inputBox[0].classList = "input__box error";
        errorBox[1].innerHTML = "";
        inputBox[1].classList = "input__box error";
        errorBox[2].innerHTML = "";
        inputBox[2].classList = "input__box error";
        return false;
    }
    return true;
}
const getCalculatedAge = (inputDay, inputMonth, inputYear) => {
    const currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();
    let days = 0;
    let months = 0;
    let years = 0;
    if (currentDay > inputDay) {
        days = currentDay - inputDay;
    } else {
        currentMonth--;
        days = currentDay + 30 - inputDay;
    }

    // get months
    if (currentMonth > inputMonth) {
        months = currentMonth - inputMonth;
    } else {
        currentYear--;
        months = currentMonth + 12 - inputMonth;
    }
    // get years
    years = currentYear - inputYear;

    return [days,months,years];
};
// getCalculatedAge(5, 6, 2009);
// console.log(validateDate(new Date('31/4/2022')));
const calculateAge = () => {
    let dateString = String(day.value + "/" + month.value + "/" + year.value);
    console.log(validateInput(day.value,month.value,year.value));
    console.log(validateDate(dateString));
    if (
        validateInput(day.value, month.value, year.value) &&
        validateDate(dateString)
    ) {
        let age=getCalculatedAge(day.value,month.value,year.value);
        console.log(age);
        setDays.innerHTML=age[0];
        setMonths.innerHTML=age[1];
        setYears.innerHTML=age[2];
    } else {
        console.log("not valid");
    }
    day.value="";
    month.value="";
    year.value="";
};