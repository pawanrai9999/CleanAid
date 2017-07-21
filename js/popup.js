//Popup.js
$(function(){
	$("#site_to_filter").click(function(){
		currentURL = "Nothing";
		addedTime = 0;

		message = {sender: "popup", subject: "hostname"};

		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function(tabs){
			chrome.tabs.sendMessage(
			tabs[0].id,
			message,
			setData);
		});

		function setData(info){
			currentURL = info.site;
			addedTime = info.time;

			chrome.storage.sync.get(function(items) {
			    if (Object.keys(items).length > 0 && items.filter) {
			        // The data array already exists, add to it the new server and nickname
			        console.log(currentURL);
			        items.filter.push({"site": currentURL, "time": addedTime});
			        
			    } else {
			        // The data array doesn't exist yet, create it
			        items.filter = [{"site": currentURL, "time": addedTime}];
			        items.sitesBlocked = 0;
			    }

			    // Now save the updated items using set
			    chrome.storage.sync.set(items, function() {
			        console.log('Data successfully saved to the storage!');
			    });
			});

			$("#site_to_filter").text("Site Added!!!")
		}
	});

	$("#filter_reset").click(function(){
		chrome.storage.sync.clear(cleared);
		function cleared(){
			chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function(tabs){
			$("#filter_reset").text("Filter Has Been Reset")
		});
		}
	});

	$("#open_options").click(function(){

		if (chrome.runtime.openOptionsPage) {
    		// New way to open options pages, if supported (Chrome 42+).
    		chrome.runtime.openOptionsPage();
  		} else {
    		// Reasonable fallback.
    		window.open(chrome.runtime.getURL('options.html'));
  		}
	});

	$("#visit_ext_home").click(function() {
		message = {sender: "popup", subject: "openexthome"};

		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function(tabs){
			chrome.tabs.sendMessage(
			tabs[0].id,
			message,
			function(){});
		});
	});

	//Showing no. of sites blocked
	chrome.storage.sync.get("sitesBlocked", function(data){
		console.log(data);

		if (Object.keys(data).length > 0 && data.sitesBlocked) {
	        // The data array already exists, add to it the new server and nickname
	        $("#sites_blocked_no").text(data.sitesBlocked);
	    } else {
	        // The data array doesn't exist yet, create it
	        data.sitesBlocked = 0;
	        chrome.storage.sync.set(data, function() {
	        	console.log('Data successfully saved to the storage!');
	        	$("#sites_blocked_no").text(data.sitesBlocked);
			});
	    }
	});
});