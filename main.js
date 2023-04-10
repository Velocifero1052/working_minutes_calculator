
let start = '2023-04-10 18:50';
let end = '2023-04-11 10:40';

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
console.log("End: " + weekday[secondDate.getDay()] + " at " + secondDate.getHours() + ":" + secondDate.getMinutes());

let first = true;
let last = false;

let minutesCount = 0;
const numberOfMillsInDay = 86_400_000;
const numberOfMinutesInWorkingDay = 540;

for(let currentDay = firstDate.getTime(); currentDay < secondDate.getTime(); currentDay += numberOfMillsInDay){

    if(currentDay.getDay === 0 || currentDay.getDay === 6)
        continue;

    if(first) {
        if(firstDate.getHours() < 9){
            minutesCount += numberOfMinutesInWorkingDay;
        }else if(firstDate.getHours() >= 9 && firstDate.getHours() < 18) {
            minutesCount += (18 - firstDate.getHours()) * 60 - firstDate.getMinutes();
        }else{
            minutesCount += numberOfMinutesInWorkingDay;
        }
        first = false;
    }

    last = (currentDay + numberOfMillsInDay) >= secondDate.getTime();
    if(last){
        if(secondDate.getHours() < 9){
            minutesCount -= numberOfMinutesInWorkingDay;
        }else if(secondDate.getHours() >= 9 && secondDate.getHours() < 18) {
            minutesCount -= (18 - secondDate.getHours()) * 60 - secondDate.getMinutes();
        }
        break;
    }
    minutesCount += numberOfMinutesInWorkingDay;
}

console.log("Working minutes spent on work: " + minutesCount);



