var slick = require('slick-carousel-browserify');
console.log(slick);

$( document ).ready(function() {
    console.log( "new!" );

    //Slick Slider 
    slick($('.single-item'));

    //Mobile Nav
    $('#hamburger').click(function(){
	 	$('header ul').slideToggle();
	});

});


