$(function () {

	$(".jumbotron").delay(100).animate({ opacity: 1 }, 500);


	var xhr = $.get("resources.json");
	xhr.done(function(data) { 
        console.log("success got data", data);
        var html = ''; 
        console.log(data.paths[0].name);
        for (var i = 0; i < data.paths.length; i++) {
           	html += '<h2>' + data.paths[i].name + '</h2>';
           	for (var j = 0; j < data.paths[i].topics.length; j++) {
           		html += '<p class="path-topics">' + data.paths[i].topics[j] + '</div>';
            }
        }
        $('.paths').append(html);

        html = '';
        for (var i = 0; i < data.topics.length; i++) {
        	html += '<h2>' + data.topics[i].name + '</h2>';
        	html += '<p class="description">' + data.topics[i].description + '</div>';
        	html += '<ul class="resources">';
        	for (var j = 0; j < data.topics[i].resources.length; j++) {
        		html += '<li><a target="_blank" href=' + data.topics[i].resources[j].url + '>' 
        		+ data.topics[i].resources[j].name + '</a> &#8212; ' +  data.topics[i].resources[j].description + '</li>';
        	}
        	html += '</ul>';
        }
        $('.topics').append(html);
    });	
	
});
