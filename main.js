
let start = '2023-03-09 14:40';
let end = '2023-04-09 16:40';

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let firstDateAndTime = start.split(' ');
let secondDateAndTime = end.split(' ');

let firstYearMonthDay = firstDateAndTime[0].split('-');
let firstHourMinutes = firstDateAndTime[1].split(':');

let secondYearMonthDay = secondDateAndTime[0].split('-');
let secondHourMinutes = secondDateAndTime[1].split(':');


let firstDate = new Date(+firstYearMonthDay[0], +firstYearMonthDay[1], +firstYearMonthDay[2],
    +firstHourMinutes[0], +firstHourMinutes[1]);

let secondDate = new Date(+secondYearMonthDay[0], +secondYearMonthDay[1], +secondYearMonthDay[2],
    +secondHourMinutes[0], +secondHourMinutes[1]);


console.log("Start: " + weekday[firstDate.getDay()] + " at " + firstDate.getHours() + ":" + firstDate.getMinutes());

//adding days
console.log(firstDate);
firstDate.setDate(firstDate.getDate() + 1);
console.log(firstDate);

for(let currentDay = firstDate.getTime(); currentDay < secondDate.getTime(); currentDay += 86_400_000){
    console.log(currentDay);
}

console.log("End: " + weekday[secondDate.getDay()] + " at " + secondDate.getHours() + ":" + secondDate.getMinutes())


