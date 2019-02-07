// define the global variable to process the AJAX request
var xhr;

function callDivChange() {
    xhr = new XMLHttpRequest();
    // get the content of the text box and send it to the server
    var filename = document.getElementById("filename").value;
    xhr.open("GET", filename, true);
    xhr.onreadystatechange = processDivChange;
    try {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    } catch (e) {
        // this only works in internet explorer
    }
    xhr.send();
}

function processDivChange() {
    // while waiting response from the server
    if (xhr.readyState < 4) {
        document.getElementById('div1').innerHTML = "Loading...";
    }
    // 4 = Response from server has been completely
    else if (xhr.readyState === 4) {
        // http status between 200 to 299 are all successful
        if (xhr.status == 200 && xhr.status < 300) {
            document.getElementById('div1').innerHTML = xhr.responseText;
        }
    }
}
