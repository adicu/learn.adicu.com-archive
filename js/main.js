$(function () {

    $.scrollUp({
        scrollName: 'scrollUp',
        scrollDistance: 300,
        scrollFrom: 'top', 
        scrollSpeed: 300, 
        easingType: 'linear', 
        animation: 'fade', 
        animationInSpeed: 200,
        animationOutSpeed: 200, 
        scrollText: 'Scroll to top',
        scrollTitle: false, 
        scrollImg: true, 
        activeOverlay: false, 
        zIndex: 2147483647 
    });

	$('.jumbotron h1, .jumbotron p').delay(100).animate({ opacity: 1 }, 800);

	var xhr = $.get("resources.json");
	xhr.done(function(data) { 
        var html = ''; 
        for (var i = 0; i < data.paths.length; i++) {
           	html += '<h2 class="path-name">' + data.paths[i].name + '</h2>';
            html += '<div class="path-topics-wrapper">';
           	for (var j = 0; j < data.paths[i].topics.length; j++) {
           		html += '<div class="path-topics">' + data.paths[i].topics[j] + '</div>';
            }
            html += '</div>';
        }
        $('.paths').append(html);

        html = '';
        for (var i = 0; i < data.topics.length; i++) {
        	html += '<h2 class="topic">' + data.topics[i].name + '</h2>';
        	html += '<div class="description">' + data.topics[i].description + '</div>';
        	html += '<div class="resources">';
        	for (var j = 0; j < data.topics[i].resources.length; j++) {
        		html += '<li><a target="_blank" href=' + data.topics[i].resources[j].url + '>' 
        		+ data.topics[i].resources[j].name + '</a> &#8212; ' +  data.topics[i].resources[j].description + '</li>';
        	}
        	html += '</div>';
        }
        $('.topics').append(html);

        $('.topic').on('click', function (event) {
            var topic = $(event.currentTarget);
            if (! topic.hasClass('active')){
              topic.addClass('active');
              topic.next('.description').next('.resources').slideDown("slow");
            } 
            else if (topic.hasClass('active')){
              topic.removeClass('active');
               topic.next('.description').next('.resources').slideUp("slow");
            }  
        });
    });	
	
});
