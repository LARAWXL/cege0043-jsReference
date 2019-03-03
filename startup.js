function loadW3HTML() {
    w3.includeHTML();
}


// functions to run as the page loaded
function trackAndCircle() {
    loadW3HTML()
    getPort()
    trackLocation()
    //addPointLinePoly()
    //getEarthquakes()
    getFormdata()
}


function startup() {
    document.addEventListener('DOMContentLoaded', function () {
        trackAndCircle();
    }, false);
}