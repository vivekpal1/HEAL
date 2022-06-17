var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));

var inputWeight = document.getElementById("yourWeight");
inputWeight.focus();
var tooltipInputWeight = new bootstrap.Tooltip(inputWeight, {trigger:"manual"});
tooltipInputWeight.hide();

var inputHigh = document.getElementById("yourHigh");
var tooltipInputHigh = new bootstrap.Tooltip(inputHigh, {trigger:"manual"});
tooltipInputHigh.hide();

var inputSleep = document.getElementById("hourSleep");
var tooltipInputSleep = new bootstrap.Tooltip(inputSleep, {trigger:"manual"});
tooltipInputSleep.hide();

var inputNumberStep = document.getElementById("numberStep");
var tooltipInputNumberStep = new bootstrap.Tooltip(inputNumberStep, {trigger:"manual"});
tooltipInputNumberStep.hide();
var inputTimeWalking = document.getElementById("timeWalking");

function clickCalculate() {
    // BMI percents
    var yourWeight = inputWeight.value;
    if (yourWeight == "") {
        inputWeight.focus();
        tooltipInputWeight.show();
        return false;
    }
    yourWeight = Number(yourWeight);

    var yourHigh = inputHigh.value;
    if (yourHigh == "") {
        inputHigh.focus();
        tooltipInputHigh.show();
        return false;
    }
    yourHigh = Number(yourHigh);
    yourHigh = yourHigh / 100;

    var bmi = yourWeight / yourHigh / yourHigh;
    var bmiPercent = 0;
    if (bmi <= 18.5) {
        bmiPercent = (40 / 18.5) * bmi;
    } else if (bmi > 18.5 && bmi <= 20.8) {
        bmiPercent = 60 + ((79 - 60) / (20.8 - 18.5)) * (bmi - 18.5);
    } else if (bmi > 20.8 && bmi <= 22.5) {
        bmiPercent = 80 + ((99 - 80) / (22.5 - 20.8)) * (bmi - 20.8);
    } else if (bmi > 22.5 && bmi <= 24.8) {
        bmiPercent =
            60 + (79 - 60) - ((79 - 60) / (24.8 - 22.5)) * (bmi - 22.5);
    } else {
        if (bmi > 100) {
            bmi = 100;
        }
        bmiPercent = 30 - (30 / (100 - 24.8)) * (bmi - 24.8);
    }

    // Hour Sleep percents
    var hourSleep = inputSleep.value;
    if (hourSleep == "") {
        inputSleep.focus();
        tooltipInputSleep.show();
        return false;
    }
    hourSleep = Number(hourSleep);

    var sleepPercent = 0;
    if (hourSleep <= 6) {
        sleepPercent = (30 / 6) * hourSleep;
    } else if (hourSleep > 6 && hourSleep <= 8) {
        sleepPercent = 60 + ((79 - 60) / (9 - 6)) * (hourSleep - 6);
    } else if (hourSleep > 8 && hourSleep <= 12) {
        sleepPercent = 80 + ((99 - 80) / (12 - 9)) * (hourSleep - 9);
    } else {
        if (hourSleep > 24) {
            hourSleep = 24;
        }
        sleepPercent = 40 - (40 / (24 - 13)) * (hourSleep - 13);
    }

    // Steps walking every day
    var numberStep = inputNumberStep.value;
    var timeWalking = inputTimeWalking.value;

    if (numberStep == "" && timeWalking == "") {
        inputNumberStep.focus();
        tooltipInputNumberStep.show()
        return false;
    }

    if (numberStep != undefined && numberStep != "") {
        numberStep = Number(numberStep);
    } else {
        numberStep = 0;
    }    
    var numberStepTime = 0;
    if (timeWalking != undefined && timeWalking != "") {
        timeWalking = Number(timeWalking);
        numberStepTime = timeWalking * 60 * 2;
    }

    var stepWalk = 0;
    if (numberStep > 0 && numberStepTime > 0) {
        stepWalk = (numberStep + numberStepTime) / 2;
    } else if (numberStep > 0) {
        stepWalk = numberStep;
    } else {
        stepWalk = numberStepTime;
    }

    var walkPercent = 0;
    if (stepWalk <= 4000) {
        walkPercent = (40 / 4000) * stepWalk;
    } else if (stepWalk > 4000 && stepWalk <= 6000) {
        walkPercent = 60 + ((79 - 60) / (6000 - 4000)) * (stepWalk - 4000);
    } else {
        if (stepWalk > 10000) {
            stepWalk = 10000;
        }
        walkPercent = 80 + ((99 - 80) / (10000 - 6000)) * (stepWalk - 6000);
    }

    // percents result
    document.getElementById("resultGood").setAttribute("style", "display:none");
    document.getElementById("resultNormal").setAttribute("style", "display:none");
    document.getElementById("resultBad").setAttribute("style", "display:none");
    document.getElementById("resultTerrible").setAttribute("style", "display:none");
    document.getElementById("advice").setAttribute("style", "display:none");
    document.getElementById("gw").setAttribute("style", "display:none");
    document.getElementById("lw").setAttribute("style", "display:none");
    document.getElementById("sm").setAttribute("style", "display:none");
    document.getElementById("sl").setAttribute("style", "display:none");
    document.getElementById("wm").setAttribute("style", "display:none");
    
    var percentsHealth = Math.round((bmiPercent + sleepPercent + walkPercent) / 3, 2);    
    if (percentsHealth >= 80) {
        document.getElementById("percentGood").innerHTML = percentsHealth;
        var result = document.getElementById("resultGood");
        result.removeAttribute("style");
    } else if (percentsHealth >= 60) {
        document.getElementById("percentNormal").innerHTML = percentsHealth;
        var result = document.getElementById("resultNormal");
        result.removeAttribute("style");
    } else if (percentsHealth >= 40) {
        document.getElementById("percentBad").innerHTML = percentsHealth;
        var result = document.getElementById("resultBad");
        result.removeAttribute("style");
    } else {
        document.getElementById("percentTerrible").innerHTML = percentsHealth;
        var result = document.getElementById("resultTerrible");
        result.removeAttribute("style");
    }

    if (bmiPercent < 80 && percentsHealth < 80) {
        document.getElementById("advice").removeAttribute("style");
        if (bmi < 20.8) {
            document.getElementById("gw").removeAttribute("style", "display:none");
        } else {
            document.getElementById("lw").removeAttribute("style", "display:none");
        }
    }

    if (sleepPercent < 80 && percentsHealth < 80) {
        document.getElementById("advice").removeAttribute("style");
        if (hourSleep > 12) {
            document.getElementById("sl").removeAttribute("style", "display:none");
        } else {
            document.getElementById("sm").removeAttribute("style", "display:none");
        }
    }

    if (walkPercent < 80 && percentsHealth < 80) {
        document.getElementById("advice").removeAttribute("style");
        document.getElementById("wm").removeAttribute("style", "display:none");
    }

    myModal.show();
    return true;
}

function hideTooltipInputWeight() {
    tooltipInputWeight.hide();
}
function hideTooltipInputHigh() {
    tooltipInputHigh.hide();
}
function hideTooltipInputSleep() {
    tooltipInputSleep.hide();
}
function hideTooltipInputNumberStep() {
    tooltipInputNumberStep.hide();
}