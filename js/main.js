document.addEventListener('tizenhwkey', function(e) {
    if(e.keyName == "back") {
        try {
        	//console.log(window.location.pathname);
        	if (window.location.pathname.search('index.html') == -1){
        		window.open("index.html","_self");
        	} else {
        		
        		tizen.application.getCurrentApplication().exit();
        	}
        } catch (error) {	
            console.error("getCurrentApplication(): " + error.message);
        }
    }
});



var options = {enableHighAccuracy: true, maximumAge: 600000, timeout: 0};

function successCallback(position)
{
	console.log(position);
}

function errorCallback(error)
{
	console.log(error);
}

navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);