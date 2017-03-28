var watchId;

function successCallback(position) {
  document.getElementById("locationInfo").innerHTML = "Latitude: " +   
  position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
}

function errorCallback(error) {
  var errorInfo = document.getElementById("locationInfo");

  switch (error.code) {
    case error.PERMISSION_DENIED:         
      errorInfo.innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      errorInfo.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      errorInfo.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      errorInfo.innerHTML = "An unknown error occurred.";
      break;
   }
}

function oneShotFunc() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    document.getElementById("locationInfo").innerHTML =
           "Geolocation is not supported.";
  }
}

function watchFunc() {
  if (navigator.geolocation) {
    watchId = navigator.geolocation.watchPosition(successCallback,
          errorCallback);
  } else {
    document.getElementById("locationInfo").innerHTML =
           "Geolocation is not supported.";
  }
}

function stopWatchFunc() {
  if (navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId);
  } else {
    document.getElementById("locationInfo").innerHTML =
          "Geolocation is not supported.";
  }
}

function get_pos() {
 if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(loadData, errorCallback);
  }
}


var data = 0, i = 0, cur_img = 0, latest_img, img = 0;

function left() {
	if (i > 0) {
		i = i - 1;
	}
	show();
}

function right() {
	if (i < 100) {
		i = i + 1;
	}
	show();
}


function navigate(){
	var temp = JSON.parse(data[i]);
	var mylat = 55.8072;
	var myloc = 37.5435;
	var lat = temp.lat;
	var lon = temp.lon;
	
	
	
	
	var xhr = new XMLHttpRequest(); 
	 var debug_url = "https://maps.googleapis.com/maps/api/directions/json?origin=55.8072,37.5435&destination=";// + lat + "," + lon + "&key=AIzaSyBqjQb2Hi6FwAcN0LfQoWh2cirXPihbEjI";
	  
	  var temp1 = debug_url.concat(lat);
	  temp1 = temp1.concat(",");
	  temp1 = temp1.concat(lon);
	  temp1 = temp1.concat("&key=AIzaSyBqjQb2Hi6FwAcN0LfQoWh2cirXPihbEjI");
	 
	  xhr.open('GET', temp1, true);
	  
	  xhr.send();
	xhr.onreadystatechange = function() {
	    if (xhr.readyState != 4) {
	
	    	return;
	    }
	
	    if (xhr.status != 200) {
	      alert( xhr.status + ': ' + xhr.statusText );
	    } else {
	      try {
	       datanew = JSON.parse(xhr.responseText);
	       
	       
			
			
			var myRoute = datanew.routes[0];
        var txtDir = '';
        for (var i=0; i<2; i++) {
          txtDir += myRoute.legs[0].steps[i].html_instructions+"<br />" + "\n";
        }
			
			document.getElementById("Address").innerHTML = txtDir;
	
	      } catch (e) {
	        alert( "Некорректный ответ " + e.message );
	      }
	      
	      
	    }
	
	  };
  
  }


var current_displayed_events = 0;

function loadData(position) {

if (data == 0){
	  var xhr = new XMLHttpRequest(); 
	  
	  var debug_url = "http://40.68.192.112:8000/data_request/55.8072/37.5435";
	 
	  xhr.open('GET', debug_url, true);
	  
	  xhr.send();
	  
	  xhr.onreadystatechange = function() {
	    if (xhr.readyState != 4) {
	
	    	return;
	    }
	
	    if (xhr.status != 200) {
	      alert( xhr.status + ': ' + xhr.statusText );
	    } else {
	      try {
	       data = JSON.parse(xhr.responseText);
	       i = 0;
	       
	       for (var i = 0; i < 10; ++i){
	    	   
		    	   
		       var temp = JSON.parse(data[i]);
		  
		       var value = $("#item").val();
	
		       //var listItem = "<li>" + value + "</li>";
				var listItem = '<li data-icon="location" id = "' + i + '"><a target="_blank" href="navigation.html" target="_top"><div class="thumbContainer"> <img  src="' + temp.image + '"width="200" height="100"></div><h1 class="myHeader"> ' + temp.name +  ' </h1><p class="myParagraph">' + temp.address + '</p><span class="ui-li-count">' + temp.dist + ' km' + '</span></a></li>';
				$("#data_list").append(listItem);
	       }
			$("#data_list").listview("refresh");

	       current_displayed_events += 10;
	      } catch (e) {
	        alert( "Некорректный ответ " + e.message );
	      }
	      
	    }
	
	  };
  
  } else {
	  data = JSON.parse(xhr.responseText);
      i = 0;
      
      for (var i = 0; i < 10; ++i){
   	   
	    	   
	       var temp = JSON.parse(data[i]);
	  
	       var value = $("#item").val();

	       //var listItem = "<li>" + value + "</li>";
			var listItem = '<li data-icon="location" id = "' + i + '"><a target="_blank" href="navigation.html" target="_top"><div class="thumbContainer"> <img  src="' + temp.image + '"width="200" height="100"></div><h1 class="myHeader"> ' + temp.name +  ' </h1><p class="myParagraph">' + temp.address + '</p><span class="ui-li-count">' + temp.dist + ' km' + '</span></a></li>';
			$("#data_list").append(listItem);
			
      }
		$("#data_list").listview("refresh");

      current_displayed_events += 10;
  }
}



/* for demo only */


var end;


$(document).on("pagebeforecreate", "#home", function(e, ui) {
  var items = '';
  loadData(0);
});




	  
	var temp;
	  
	  $(document).on("click", "#data_list li" ,function (event) {
		  var id = $(this).attr("id"); // Get the ID
		     temp = JSON.parse(data[id]);
		     localStorage.setItem('id', id);
		     localStorage.setItem('temp_lat', temp.lat);
		     localStorage.setItem('temp_lon', temp.lon);//stored into localStorage
		}); 

	  
	  
/* check scroll function */
function checkScroll() {
  var activePage = $.mobile.pageContainer.pagecontainer("getActivePage"),
    screenHeight = $.mobile.getScreenHeight(),
    contentHeight = $(".ui-content", activePage).outerHeight(),
    header = $(".ui-header", activePage).outerHeight() - 1,
    scrolled = $(window).scrollTop(),
    footer = $(".ui-footer", activePage).outerHeight() - 1,
    scrollEnd = contentHeight - screenHeight + header + footer;
  if (activePage[0].id == "home" && scrolled >= scrollEnd) {
    console.log("adding...");
    addMore(activePage);
  }
}

/* add more function */
function addMore(page) {
  $(document).off("scrollstop");
  $.mobile.loading("show", {
    text: "Loading new places..",
    textVisible: true
  });
  setTimeout(function() {
    var items = '',
      last = $("li", page).length,
      cont = last + 5;
    
    
    for (var i = last; i < cont; i++) {
    	var temp = JSON.parse(data[i]);
		items += '<li data-rel="back" data-icon="location" id = "' + i + '"><a href="navigation.html" target="_top"><div class="thumbContainer"> <img  src="' + temp.image + '"width="200" height="100"></div><h1 class="myHeader"> ' + temp.name +  ' </h1><p class="myParagraph">' + temp.address + '</p><span class="ui-li-count">' + temp.dist + ' km' + '</span></a></li>';
			
    }
    
    current_displayed_events += 5;
   
    
    $("#data_list", page).append(items).listview("refresh");
    $.mobile.loading("hide");
    $(document).on("scrollstop", checkScroll);
  }, 500);
}

/* attach if scrollstop for first time */
$(document).on("scrollstop", checkScroll);

