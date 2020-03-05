/* Scroll */

var lastScrollT = 0,
	header = $('body').find('header'),
	toggleNav = $('.toggleNav');

$(window).scroll(function(event){
	var scrollT = $(this).scrollTop();
	if (scrollT > lastScrollT){
    	header.addClass("headerUp");
    	toggleNav.css({height: "0px"}).hide();
	}
	else {
		header.removeClass("headerUp");
	}
	lastScrollT = scrollT;

});

	
	console.log($('.photonav').css('top'));
	if ($(".photonav")) {
var hideMore = parseInt($('.photonav').css('top'),10),
	hideyourself = $('.aboutpalko').offset().top-hideMore-40;
}	else
var	hideyourself = $('.aboutpalko').offset().top-351;

$(window).scroll(function(event){
	if ($(this).scrollTop()>hideyourself) $('.photonav').hide();
	else $('photonav').show();

});
$(window).scroll(function(event){
	if ($(this).scrollTop()<hideyourself) $('.photonav').show();
});
var toggleNav = $('.toggleNav');
	
toggleNav.css({height: "0px"}).hide();


$('#menuButton').on('click', function(event){
	
	if (toggleNav.css('height') === "0px" ) {
		toggleNav.show()
				 .animate({height: "63.2px"}, 300 ,"easeOutCubic");
		//$('html,body').animate({ scrollTop: $(this).offset().top-"37" });
	} 
	else	{
		toggleNav.animate({height: "0px"}, 300, "easeInCubic", function() {
			toggleNav.hide();
		})
				 ;
	};
	event.preventDefault();
});

/* Photo Slider */

var	li = $('.photos').find('li'),
	removeid = $('.photonav').find('i');

function presunSa( animate ){
	removeid.removeAttr('id', 'black');
	console.log($(this).find('li'));
	$(this).attr('id', 'black');
	li.animate({top: "-"+ animate+"vh"},1000, "easeInOutQuart");
}

$('.im1').attr('id', 'black');
$('.im1').on('click', function(){
	presunSa(.001);

	});

$('.im2').on('click', function(){
	presunSa(100);
	});

$('.im3').on('click', function(){
	presunSa(200);
	});

$('.im4').on('click', function(){
	presunSa(300);
	});

/* ScrollTop */

$('.scrolltop').find('a').on('click', function(event){
	$('html,body').animate({
		scrollTop: 0
	}),
	event.preventDefault();
});

/* Gallery */
 

var photonumber,
	nextSrc,
	overlay = $('.overlay'),
	overlay2 = $('.overlay2'),
	k,l,a;
	a=1;
	a=parseInt(a);



function komentare() { 
	$('.komentare').empty();
		$.ajax({ method: "GET", url: "./assets/database/connjq.php", })
        	.done(function( data ) { 
          var result = JSON.parse(data); 

          var string;
      var username = $('.username').text();    
        $.each( result, function( key, value ) { 
             if (value['id_obrazka']== k) {
             	if (username == 'admin') {
             		string = '<div class="coment"><p><strong>'+value['name']+'</strong> &nbsp;'+value['text']+'<a onclick="document.myform'+a+'.submit()" href="#"> vymazat</a><form style="float: right;" name="myform'+a+'" action="deletecomment.php" method="get"><input type="hidden" name="komentarik" value="'+value['ID']+'"></form></p><hr></div>';
             	} else if (username == value['name']) {
					string = '<div class="coment"><p><strong>'+value['name']+'</strong> &nbsp;'+value['text']+'<a onclick="document.myform'+a+'.submit()" href="#"> vymazat</a><form style="float: right;" name="myform'+a+'" action="deletecomment.php" method="get"><input type="hidden" name="komentarik" value="'+value['ID']+'"></form></p><hr></div>';
             	} else {
			        string = '<div class="coment"><p><strong>'+value['name']+'</strong> &nbsp;'+value['text']+'</p><hr></div>'; 
             	}
          $('.komentare').append(string); 
          a=a+1;
         	}
         }); 

        
 
       })
}
function prepniObrazok(k) {
	nextSrc = $('.photo'+k).find('img').attr('src');
 	photonumber.find('img').attr('src', nextSrc);
 	$('.hidden').attr({value: k});
}



$('.gallery').find('li').on('click', function(){
	overlay.show();
	overlay2.show();
	var thisimg = $(this).find('img');
		photonumber = $(this);

		if (thisimg.hasClass('imgUp')== false) {
			thisimg.parent().clone(true).insertBefore($(this));
			thisimg.addClass("imgUp");
			l = photonumber.attr('class').substr(5,2);
 			k = parseInt(l);
 			$('html,body').animate({ scrollTop: 0});	

 				$('.hidden').attr({value: k});

 // responsive 
 
 	var winh = $(window).height()*0.21;
	var imguph = $('.imgUp').height()+winh;
	$('.comentary').css({top: imguph});
	var imgh = ($('.imgUp').height()/2)+winh;
	$('.right').css({top: imgh});
	$('.left').css({top: imgh});
				
//komentar 
    komentare();
}
});
var countimg = $('article').attr('class'),
	countImg = parseInt(countimg);
	countImg = countImg-1;

$(document).keyup(function(e) {
// escape
     if (e.keyCode == 27) { 
       photonumber.find('img').unwrap().remove();
	overlay.hide();
	overlay2.hide(); 
    }		
// ľavá klavesa
    else if (e.keyCode == 37)	{
    	k=k-1;	
	if (k<0) {k=countImg};
	prepniObrazok(k);
	komentare();
    }
// pravá klavesa
    else if (e.keyCode == 39) {
    	k=k+1;	
	if (k>countImg) {k=0};
	prepniObrazok(k);
    komentare();
    }
});
	
// krížik
	
$('.close').on('click', function(){
	photonumber.find('img').unwrap().remove();
	overlay.hide();
	overlay2.hide();
	});

// Pravý button

$('.right').on('click', function(){
	k=k+1;	
	if (k>countImg) {k=0};
	prepniObrazok(k);
    komentare();
	});
	/*	$('.hidden').attr({value: k});*/

// Ľavý button

$('.left').on('click', function(){
	k=k-1;	
	if (k<0) {k=countImg};
	prepniObrazok(k);
    komentare();    
	});

// responsive 

$(window).resize(function() {
	var winh = $(window).height()*0.21;
	var imguph = $('.imgUp').height()+winh;
	$('.comentary').css({top: imguph});
	var imgh = ($('.imgUp').height()/2)+winh;
	$('.right').css({top: imgh});
	$('.left').css({top: imgh});
	if ($(window).width()< 500 ) {
		$(".toggleNav").addClass("smallToggleNav");
	} else $(".toggleNav").removeClass("smallToggleNav");
});

$(document).ready(function() {
//	var vyska = $('.aboutpavel').height()+$('.news').height();
//	$('.responsive').css({height: vyska});
	if ($(window).width()< 500) {
		$(".toggleNav").addClass("smallToggleNav");
	}

})
