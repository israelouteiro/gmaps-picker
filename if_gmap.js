/* Code based on Google Map APIv3 Tutorials */

var gmapdata;
var gmapmarker;
var infoWindow;

var def_zoomval = 10;
var def_longval = -47.892237; 
var def_latval = -15.791428;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
		if_gmap_init();
    }
}

function showPosition(position) {
	def_longval = position.coords.longitude;
	def_latval = position.coords.latitude; 
	if_gmap_init();
}



function if_gmap_init() {
		var curpoint = new google.maps.LatLng(def_latval,def_longval);

	gmapdata = new google.maps.Map(document.getElementById("mapitems"), {
		center: curpoint,
		zoom: def_zoomval,
		mapTypeId: 'roadmap'
	});

	gmapmarker = 
		new google.maps.Marker({
			map: gmapdata,
			position: curpoint,
		});

	infoWindow = new google.maps.InfoWindow;
	google.maps.event.addListener(gmapdata, 'click', function(event) {
		document.getElementById("longval").value = event.latLng.lng().toFixed(6);
		document.getElementById("latval").value = event.latLng.lat().toFixed(6);
		gmapmarker.setPosition(event.latLng);
		if_gmap_updateInfoWindow();
	});

	google.maps.event.addListener(gmapmarker, 'click', function() {
		if_gmap_updateInfoWindow();
		infoWindow.open(gmapdata, gmapmarker);
	});

	document.getElementById("longval").value = def_longval;
	document.getElementById("latval").value = def_latval;

	return false;
}

function if_gmap_updateInfoWindow() {
	infoWindow.setContent("Longitude: "+ gmapmarker.getPosition().lng().toFixed(6)+"<br>"+"Latitude: "+ gmapmarker.getPosition().lat().toFixed(6));
}  

