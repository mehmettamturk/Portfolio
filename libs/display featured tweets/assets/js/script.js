$(function(){
	var width = $('ul.tweetFavList p').outerWidth();
	
	// Looping through the p elements
	// and calling the splitLines plugin
	
	$('ul.tweetFavList p').each(function(){
		$(this).addClass('sliced').splitLines({width:width});
	});
});