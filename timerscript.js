var workTimeLength = 45;
var pauseTimeLength = 15;
var interval;
var workFlag; //if workFlag is true, pause timer will start after work timer is done

window.onload = function() {
	let timerLength = workTimeLength < 10 ? "0" + workTimeLength + ":00" : workTimeLength + ":00";
	document.getElementById("timer").innerHTML = timerLength;
}

function startTimer(defaultTimer) {
	document.getElementById("startButton").disabled = true;

	let startTime = new Date().getTime();

	interval = setInterval(function() {
		let currentTime = new Date().getTime();
		
		let differenceTime = currentTime - startTime;

		let minutesString = Math.floor((defaultTimer * 60 - differenceTime / 1000) / 60);
		let secondsString = 60 - Math.floor((differenceTime % (60*1000)) / 1000);
		//console.log(secondsString);
		secondsString = secondsString === 60 ? "00" : secondsString < 10 ? "0" + secondsString : secondsString;
		minutesString = secondsString === "00" ? minutesString + 1 : minutesString;
		minutesString = minutesString < 10 ? "0" + minutesString: minutesString;

		document.getElementById("timer").innerHTML = minutesString + ":" + secondsString;

		if(minutesString === "00" && secondsString === "00") {
			clearInterval(interval);
			if(workFlag)
				pauseTimer();
			else
				document.getElementById("startButton").disabled = false;
		}
	}, 1000);
}

function stopTimer() {
	clearInterval(interval);
	document.getElementById("timer").innerHTML = "00:00";
	document.getElementById("startButton").disabled = false;

}

function workTimer() {
	workFlag = true;
	document.body.style.backgroundColor = "coral";
	startTimer(workTimeLength);
}

function pauseTimer() {
	workFlag = false;
	document.body.style.backgroundColor = "#89CFF0";
	startTimer(pauseTimeLength);
}

function openSettings() {
	document.querySelector(".settingsTab").style.visibility = "visible";
	document.querySelector(".settingsTab").style.opacity = 1;
}

function closeSettings() {
	document.querySelector(".settingsTab").style.visibility ="hidden";
}

function updateTime(id) {
	let inputTime = document.getElementById(id).value;
	inputTime = validateInputTime(inputTime, id);


	if(id === "workTimeInput") {
		workTimeLength = inputTime;
		document.getElementById("timer").innerHTML = workTimeLength < 10 ? "0" + workTimeLength + ":00" : workTimeLength + ":00";
	}
	else {
		pauseTimeLength = inputTime;
	}
}

function validateInputTime(input, id) {
	if(input === "") //if html input doesn't send anything because of wrong value ex: --5 send default value
		return id === "workTimeInput" ? workTimeLength : pauseTimeLength; 
	return input.replace(/[^0-9]/g,''); //strip string o any non-numeric character
}