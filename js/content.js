//Content.js
$(function(){
	currentURL = window.location.hostname;
	siteURLJson = "http://myjson.com/16od7z";
	console.log(currentURL);

	$.ajax({
		type: "GET",
		url: siteURLJson,
		crossDomain: true,
		contentType: "application/json; charset=utf-8",
		success: function(data){
			for(var i = 0, len = data.sites.length; i < len; i++){
				if(currentURL == data.sites[i]){
					alert("Stop");
					window.location.replace("http://advocate-ant-28114.bitballoon.com/blocked.html");

					chrome.storage.sync.get(function(dat){
						if(dat.sitesBlocked){
							dat.sitesBlocked += 1;
							chrome.storage.sync.set(dat, function(){
								console.log("+1");
							});
						} else {
							dat.sitesBlocked = 1;
							chrome.storage.sync.set(dat, function(){
								console.log("+1");
							});
						}
					});
				}
			}
		}
	});

	chrome.runtime.onMessage.addListener(function(msg, sender, response){
		console.log("I ran l23 contentjs");
		if((msg.sender == "popup") && (msg.subject == "hostname")){
			times = +new Date();
			console.log("i ran l25 contentjs");
			hostname = {
				site: currentURL,
				time: times
			};
			console.log(hostname);
			response(hostname);
		}

		if((msg.sender == "popup") && (msg.subject == "openexthome")){
			var win = window.open('http://localhost', '_blank');
			if (win) {
    			//Browser has allowed it to be opened
    			win.focus();
			} else {
    			//Browser has blocked it
    			alert('Please allow popups for this website');
			}
			response();
		}

		if((msg.sender == "popup") && (msg.subject == "openextoption")){
			id = msg.data;
			url = "chrome-extension://"+id+"/options.html"
			console.log(url);
			var win = window.open("http://advocate-ant-28114.bitballoon.com", '_blank');
			if (win) {
    			//Browser has allowed it to be opened
    			win.focus();
			} else {
    			//Browser has blocked it
    			alert('Please allow popups for this website');
			}
			response();
		}
	});

	chrome.storage.sync.get(function(data){
		console.log(data);
		if(data.filter){
			for(var i = 0, v = data.filter.length; i < v; i++){
				if(currentURL == data.filter[i].site){
					alert("Stop");
					window.location.replace("http://advocate-ant-28114.bitballoon.com/blocked.html");

					data.sitesBlocked += 1;
					chrome.storage.sync.set(data, function(){
						console.log("+1");
					});
				}
			}
		}
	});
});
