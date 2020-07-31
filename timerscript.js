var workkTimer = 1;
var pauseeTimer = 2;
var interval;
var workFlag; //if workFlag is true, pause will start after timer is done

window.onload = function() {
	let timerLength = workkTimer + ":00";
	document.getElementById("timer").innerHTML = timerLength;
}

function startTimer(defaultTimer) {
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
			document.getElementById("timer").innerHTML = "00:00";
			if(workFlag)
				pauseTimer();
		}
	}, 1000);
}

function stopTimer() {
	clearInterval(interval);
	document.getElementById("timer").innerHTML = "00:00";
}

function workTimer() {
	workFlag = true;
	startTimer(workkTimer);
	//pauseTimer();
}

function pauseTimer() {
	workFlag = false;
	document.body.style.backgroundColor = "#89CFF0";
	startTimer(pauseeTimer);
}

function openSettings() {
	document.querySelector(".settingsTab").style.visibility = "visible";
	document.querySelector(".settingsTab").style.opacity = 1;
}

function closeSettings() {
	document.querySelector(".settingsTab").style.visibility ="hidden";
}