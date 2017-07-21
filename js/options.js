//Options.js
$(function(){

	chrome.storage.sync.get(function(data){ 
		if ((Object.keys(data).length > 0) && (data.filter)) {        
		// The data array already exists, add to it thenew server and nickname 
			t_html = ""        
			for(var i = 0, k = data.filter.length; i < k; i++){
				id = i;
			    html = '<li class="list-group-item justify-content-between filter_sites">' + data.filter[i].site + "<span class='badge badge-default'><button class='delete_button' id='"+id+"'>X</button></span></li>";
			    t_html = t_html + html;

			}
			$("#filter_list").html(t_html);

			$(".delete_button").click(function(event) {
				var id = this.id;
				console.log(id);
				var list = data.filter;
				list.splice(id, 1);
				data.filter = list;
				chrome.storage.sync.set(data, function(){
					console.log("Site Removed");
					location.reload();
				});
			});

		} else {
		// The data array doesn't exist yet, create it
			$("#filter_list").html('<li class="list-group-item justify-content-between filter_sites">No Iteam</li>');
		}
	});

	$("form").submit(function(event) {
		event.preventDefault();
		var addURL = $( "input:first" ).val();
		var addedTime = +new Date();
		chrome.storage.sync.get(function(items) {
			    if (Object.keys(items).length > 0 && items.filter) {
			        // The data array already exists, add to it the new server and nickn
			        items.filter.push({"site": addURL, "time": addedTime});
			        chrome.storage.sync.set(items, function() {
			        	console.log('Data successfully saved to the storage!');
			    	});
			    	location.reload();
			        
			    } else {
			        // The data array doesn't exist yet, create it
			        items.filter = [{"site": addURL, "time": addedTime}];
			        items.sitesBlocked = 0;
			        chrome.storage.sync.set(items, function() {
			        	console.log('Data successfully saved to the storage!');
			    	});
			    	location.reload();
			    }
			});
	});

});