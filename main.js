
function defineIfInInterval(intervalStart, intervalEnd, time){
    return intervalStart.getTime() <= time.getTime() && intervalEnd.getTime() >= time.getTime()
}

function defineIfLeftFromInterval(intervalStart, time){
    return time.getTime() < intervalStart.getTime();
}

function defineIfRightFromInterval(intervalEnd, time){
    return intervalEnd.getTime() < time.getTime();
}

function defineIfSameDay(startLeft, startRight, endLeft, endRight){
    return startLeft.getTime() === endLeft.getTime() && startRight.getTime() === endRight.getTime();
}

function isWeekEnd(date){
    return date.getDay() === 6 || date.getDay() === 0;
}

function runTests(testData, testTitle){
    console.log("================================")
    console.log("# " + testTitle);
    console.log("================================")
    let passed = 0;
    let notPassed = 0;

    for(let i = 0; i < testData.length; i++){
        let actual = defineNumberOfMinutes(testData[i].start, testData[i].end);
        console.log(testData[i].start + " - " + testData[i].end + "\nExpected: " + testData[i].expected + " minutes\nActual: " + actual + " minutes");
        let testRes = actual === testData[i].expected
        console.log("Passed: " + testRes + "\n");
        testRes ? passed++ : notPassed++;
    }
    console.log("================================");
    console.log("Total: " + testData.length + "\nPassed: " + passed + "\nNot passed: " + notPassed);
    console.log("================================");
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

    const numberOfMinutesInWorkingDay = 540;

    let startLeft = new Date(startDate);
    startLeft.setHours(9, 0, 0, 0);
    let startRight = new Date(startDate);
    startRight.setHours(18, 0, 0, 0);

    let endLeft = new Date(endDate);
    endLeft.setHours(9, 0, 0, 0);
    let endRight = new Date(endDate);
    endRight.setHours(18, 0, 0, 0);


    let startInInterval = defineIfInInterval(startLeft, startRight, startDate);
    let endInInterval = defineIfInInterval(endLeft, endRight, endDate);
    let startLeftFromInterval = defineIfLeftFromInterval(startLeft, startDate);
    let endRightFromInterval = defineIfRightFromInterval(endRight, endDate);
    let sameDay = defineIfSameDay(startLeft, startRight, endLeft, endRight);

    if (sameDay) {
        if(startInInterval && endInInterval){
              minutesCount += ((18 - startDate.getHours()) * 60 - startDate.getMinutes());
              minutesCount -= ((18 - endDate.getHours()) * 60 - endDate.getMinutes());
        }else if(startLeftFromInterval && endInInterval){
            minutesCount += ((18 - startLeft.getHours()) * 60 - startLeft.getMinutes());
            minutesCount -= ((18 - endDate.getHours()) * 60 - endDate.getMinutes());
        }else if(startInInterval && endRightFromInterval){
            minutesCount += ((18 - startDate.getHours()) * 60 - startDate.getMinutes());
        }else{
            minutesCount += numberOfMinutesInWorkingDay;
        }
    }else{
        if(!isWeekEnd(startDate)){
            if(startInInterval){
                minutesCount += ((18 - startDate.getHours()) * 60 - startDate.getMinutes());
            }
            if(startLeftFromInterval){
                minutesCount += numberOfMinutesInWorkingDay;
            }
        }

        if(!isWeekEnd(endDate)) {
            if (endInInterval) {
                minutesCount += ((endDate.getHours() - 9) * 60 + endDate.getMinutes());
            }

            if (endRightFromInterval) {
                minutesCount += numberOfMinutesInWorkingDay;
            }
        }

        startLeft.setDate(startLeft.getDate() + 1);

        while(startLeft.getTime() < endLeft.getTime()){
            if(!isWeekEnd(startLeft))
                minutesCount += numberOfMinutesInWorkingDay;
            startLeft.setDate(startLeft.getDate() + 1);
        }

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

let sameDayTestData = [];
let nextDayTestData = [];
let daysWithIntervalTestData = [];

sameDayTestData.push(new Interval('2023-04-10 09:00','2023-04-10 18:00',540));
sameDayTestData.push(new Interval('2023-04-10 08:50','2023-04-10 18:10',540));
sameDayTestData.push(new Interval('2023-04-10 16:40','2023-04-10 17:45',65));
sameDayTestData.push(new Interval('2023-04-10 08:40','2023-04-10 09:20',20));
sameDayTestData.push(new Interval('2023-04-10 17:40','2023-04-10 18:20',20));
sameDayTestData.push(new Interval('2023-04-10 09:20','2023-04-10 18:00',520));

nextDayTestData.push(new Interval('2023-04-10 08:40', '2023-04-11 09:20', 560));
nextDayTestData.push(new Interval('2023-04-10 09:00','2023-04-11 18:00',1080));
nextDayTestData.push(new Interval('2023-04-10 17:40','2023-04-11 10:00',80));
nextDayTestData.push(new Interval('2023-04-10 18:50','2023-04-11 18:30',540));
nextDayTestData.push(new Interval('2023-04-10 15:00', '2023-04-11 08:00', 180));
nextDayTestData.push(new Interval('2023-04-10 19:00', '2023-04-11 10:00', 60));

daysWithIntervalTestData.push(new Interval('2023-04-10 08:40', '2023-04-12 09:20', 1100));
daysWithIntervalTestData.push(new Interval('2023-04-10 08:40', '2023-04-13 09:20', 1620));
daysWithIntervalTestData.push(new Interval('2023-04-12 17:40', '2023-04-15 09:20', 40));
daysWithIntervalTestData.push(new Interval('2023-04-12 17:40', '2023-04-16 09:20', 580));

runTests(sameDayTestData, "Tests for same day intervals");
runTests(nextDayTestData, "Tests for next day intervals");
runTests(daysWithIntervalTestData, "Tests for days with intervals");


