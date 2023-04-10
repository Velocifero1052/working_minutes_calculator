
function defineIfInInterval(intervalStart, intervalEnd, time){
    return intervalStart.getTime() <= time.getTime() && intervalEnd.getTime() >= time.getTime()
}

function defineIfLeftFromInterval(intervalStart, intervalEnd, time){
    return time.getTime() > intervalStart.getTime() && intervalEnd.getTime() >= time.getTime();
}

function defineIfRightFromInterval(intervalStart, intervalEnd, time){
    return time.getTime() > intervalEnd.getTime() && intervalStart.getTime() <= time.getTime();
}

function defineNumberOfMinutes(start_, end_){
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let startDateAndTime = start_.split(' ');
    let endDateAndTime = end_.split(' ');

    let startYearAndMonth = startDateAndTime[0].split('-');
    let startHourMinutes = startDateAndTime[1].split(':');

    let endYearAndMonth = endDateAndTime[0].split('-');
    let endHourMinutes = endDateAndTime[1].split(':');


    let startDate = new Date(+startYearAndMonth[0], +startYearAndMonth[1], +startYearAndMonth[2],
        +startHourMinutes[0], +startHourMinutes[1]);

    let endDate = new Date(+endYearAndMonth[0], +endYearAndMonth[1], +endYearAndMonth[2],
        +endHourMinutes[0], +endHourMinutes[1]);

    console.log("Start: " + weekday[startDate.getDay()] + " at " + startDate.getHours() + ":" + startDate.getMinutes());
    console.log("End: " + weekday[endDate.getDay()] + " at " + endDate.getHours() + ":" + endDate.getMinutes());

    let minutesCount = 0;

    const numberOfMillisecondsInDay = 1000 * 60 * 60 * 24;
    const numberOfMinutesInWorkingDay = 540;

    let startInterval = new Date(startDate);
    startInterval.setHours(9, 0, 0, 0);
    let endInterval = new Date(startDate);
    endInterval.setHours(18, 0, 0, 0);

    while(-1){
        let startInInterval = defineIfInInterval(startInterval, endInterval, startDate);
        let endInInterval = defineIfInInterval(startInterval, endInterval, endDate);
        let startLeftFromInterval = defineIfLeftFromInterval(startInterval, endInterval, startDate);
        let endLeftFromInterval = defineIfLeftFromInterval(startInterval, endInterval, endDate);
        let startRightFromInterval = defineIfRightFromInterval(startInterval, endInterval, startDate);
        let endRightFromInterval = defineIfRightFromInterval(startInterval, endInterval, endDate);
        console.log("Start in interval: " + startInInterval);
        console.log("End in interval: " + endInInterval);
        console.log("Start left from interval: " + startLeftFromInterval);
        console.log("End left from interval: " + endLeftFromInterval);
        console.log("Start right from interval: " + startRightFromInterval);
        console.log("End right from interval: " + endRightFromInterval);

        break;
    }

    return minutesCount;
}

class Interval {
    constructor(start, end, expected) {
        this.start = start;
        this.end = end;
        this.expected = expected;
    }
}

let testData = [];
testData.push(new Interval('2023-04-10 09:00',  '2023-04-10 18:00', 540));
testData.push(new Interval('2023-04-10 16:40',  '2023-04-10 17:45', 65));
testData.push(new Interval('2023-04-10 08:40', '2023-04-10 09:20', 20));
testData.push(new Interval('2023-04-10 09:20', '2023-04-10 18:00', 520));
testData.push(new Interval('2023-04-10 17:40', '2023-04-11 10:00', 80));
testData.push(new Interval('2023-04-10 18:50', '2023-04-11 18:30', 540));

let passed = 0;
let notPassed = 0;

for(let i = 0; i < testData.length; i++){
    let actual = defineNumberOfMinutes(testData[i].start, testData[i].end);
    console.log(testData[i].start + " - " + testData[i].end + "\nExpected: " + testData[i].expected + " minutes\nActual: " + actual + " minutes");
    let testRes = actual === testData[i].expected
    console.log("Passed: " + testRes + "\n");
    testRes ? passed++ : notPassed++;
}

console.log("Total: " + testData.length + "\nPassed: " + passed + "\nNot passed: " + notPassed);



