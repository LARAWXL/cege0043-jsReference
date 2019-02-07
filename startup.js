function trackAndCircle() {
    getPort();
    addPointLinePoly();
    getEarthquakes();
    trackLocation();
}

function startup() {
    document.addEventListener('DOMContentLoaded', function () {
        trackAndCircle();
    }, false);
}