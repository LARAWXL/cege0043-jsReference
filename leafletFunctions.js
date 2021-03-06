//write a function that when called will add a point, line and polygon to the map.
function addPointLinePoly() {
    // add a point
    L.marker([51.5, -0.09]).addTo(mymap)
        .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
// add a circle
    L.circle([51.508, -0.11], 500, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(mymap).bindPopup("I am a circle.");
// add a polygon with 3 end points (i.e. a triangle)
    var myPolygon = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
    ], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(mymap).bindPopup("I am a polygon.");

    // change the map zoom so that all the data is shown
    mymap.setView([51.505, -0.09], 13);
}


// Add the getDistance, getDistanceFromPoint and calculateDistance functions
function getDistance() {
    //alert('getting distance');
    // getDistanceFromPoint is the function called
    // once the distance has been found
    navigator.geolocation.getCurrentPosition(getDistanceFromMultiplePoints)
}

// Add functionality to allow the user to click on a menu option that gives them the
// distance to a fixed point (e.g. Warren Street Station)
// also adding an Proximity Alert if user is close to this location
function getDistanceFromPoint(position) {
    // find the coordinates of a point using this website:
    // these are the coordinates for Warren Street
    var lat = 51.5246;
    var lng = -0.1382;
    // return the distance in kilometers
    var distance = calculateDistance(position.coords.latitude, position.coords.longitude, lat, lng, 'K');
    // put an IF statement to check whether the distance is within 100m
    // and pop up an alert message.
    if (distance < 0.1) {
        alert("You are within 100m of Warren Street Station!!")
    } else {
        alert("You are at " + distance + " km away from Warren Street Station!! ")
    }
}

// code adapted from
// https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-in-your-web-apps.html
function calculateDistance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var radlon1 = Math.PI * lon1 / 180;
    var radlon2 = Math.PI * lon2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    subAngle = Math.acos(subAngle);
    // convert the degree value returned by acos back to degrees from radians
    subAngle = subAngle * 180 / Math.PI;
    // ((subtended angle in degrees)/360) * 2 * pi * radius )
    // where radius of the earth is 3956 miles
    dist = (subAngle / 360) * 2 * Math.PI * 3956;
    // convert miles to km
    if (unit == "K") {
        dist = dist * 1.609344;
    }
    // convert miles to nautical miles
    if (unit == "N") {
        dist = dist * 0.8684;
    }
    return dist;
}

// every time the user location is changed/tracked –
// check the distance of the user from each Earthquake in the data
// and pop up an alert
function getDistanceFromMultiplePoints(position) {
    var minDistance = 100000000000;
    var closestQuake = "";
    for (var i = 0; i < earthquakes.features.length; i++) {
        var obj = earthquakes.features[i];
        var distance = calculateDistance(position.coords.latitude,
            position.coords.longitude, obj.geometry.coordinates[0], obj.geometry.coordinates[1], 'K');
        if (distance < minDistance) {
            minDistance = distance;
            closestQuake = obj.properties.place;
        }
    }
    alert("Earthquake: " + closestQuake + " is distance " + minDistance + "away");
}


// take the leaflet formdata layer (in xhrFormData.js)
// go through each point one by one
// and measure the distance to Warren Street
// for the closest point show the pop up of that point
function closestFormPoint() {
    var minDistance = 100000000000;
    var closestFormPoint = 0;
    // for this example, use the latitude/longitude of warren street
    // in your assignment replace this with the user's location
    var userlat = 51.524048;
    var userlng = -0.139924;
    formLayer.eachLayer(function (layer) {
        var distance = calculateDistance(userlat,
            userlng, layer.getLatLng().lat, layer.getLatLng().lng, 'K');
        if (distance < minDistance) {
            minDistance = distance;
            closestFormPoint = layer.feature.properties.id;
        }
    });
    // for this to be a proximity alert, the minDistance must be
    // closer than a given distance - you can check that here
    // using an if statement
    // show the popup for the closest point
    formLayer.eachLayer(function (layer) {
        if (layer.feature.properties.id == closestFormPoint) {
            layer.openPopup();
        }
    });
}