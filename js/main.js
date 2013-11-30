/**
 * Parallax Scrolling Tutorial
 * For Smashing Magazine
 * July 2011
 *   
 * Author: Richard Shepherd
 *                 www.richardshepherd.com
 *                 @richardshepherd   
 */

var startDate = new Date();

//loading mask
$(window).load(function() {
  var loadDate = new Date();
  if(loadDate.getTime() - startDate.getTime() < 700) {
    $('#loading').hide();
  }
  else {
    $('#loading').fadeOut(1000);
  }
});

// On your marks, get set...
$(document).ready(function(){
  
        //bubbles
         $('[data-type="bubble-sprite"] img').click( function() {
            var sprite = $(this);
            sprite.fadeOut(200, function() { 
               $(this).remove();  
               if($('[data-type="bubble-sprite"] img').length == 0)
                 alert('Mes bubulles !!!');
            });
        });
         
         
//          function bubbleMove(bubble_) {
//               //var bubble_ = $('#bubble-'+i);
//               var yPos = -($window.scrollTop() / bubble_.data('speed')) + (Math.random() - 0.5) * 20;  
//               if(yPos < -1700) //do not go too high
//                 yPos = -1700;
//               var yCoord = (yPos + bubble_.data('offsetY')) + 'px';
//               var xPos = parseInt(bubble_.data('Xposition')) + (Math.random() - 0.5) * 30;
//               var xCoord = xPos + '%';
//               bubble_.css({ top: yCoord, left: xCoord});
//               console.log(bubble_);
//          }
//          
//         //xxx
//         var page2 = $('#second');
//         var konami = new Konami(function() {
//           for(var i=0; i<1; i++) {
//             var bubble = $('<div id="bubble-'+i+'" class="bubble" data-type="bubble-sprite" data-offsetY="1900" data-Xposition="75" data-speed="0.7"><img src="img/bubble.png" alt="bubble" width="120" /></div>');
//             page2.prepend(bubble);
// 
//             $(window).scroll(bubbleMove, $('#bubble-'+i));
//           }
//         });
         
        //carousel
        var carousel = $('.carousel');
        carousel.carousel('cycle');
        $('audio').on('play', function () {
          carousel.carousel('pause');
        });
        $('audio').on('pause', function () {
          carousel.carousel('cycle');
        });
        carousel.on('slide', function() {
          $('audio').trigger('pause');
        });
         
  
        // Bouton acheter
        $('.acheter img').mouseenter(function() { $(this).attr('src', 'img/boutonover.png'); });
        $('.acheter img').mouseleave(function() { $(this).attr('src', 'img/bouton.png'); });
  
        
        // Cache the Window object
        $window = $(window);
        
        // Cache navbar object
        var navbar = $('.navbar'),
                  firstnav = $('#first-nav'),
                  secondnav = $('#second-nav'),
                  thirdnav = $('#third-nav'),
                  fourthnav = $('#fourth-nav'),
                  theendnav = $('#theend-nav');
                  
        // Smooth scroll navbar
        navbar.find('a').click(function (e) { 
            e.preventDefault(); 
           $("html, body").animate({scrollTop: $($(this).attr('href')).offset().top+"px"}, 1000); 
        });
        
        // Cache the Y offset and the speed of each sprite
        $('[data-type]').each(function() {      
                $(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
                $(this).data('Xposition', $(this).attr('data-Xposition'));
                $(this).data('speed', $(this).attr('data-speed'));
        });
        
               
        // For each element that has a data-type attribute
        $('section[data-type="background"]').each(function(){
        
        
                // Store some variables based on where we are
                var $self = $(this),
                        offsetCoords = $self.offset(),
                        topOffset = offsetCoords.top;
                
                // When the window is scrolled...
            $(window).scroll(function() {
              
                        //custom scrollspy
                        if($window.scrollTop() < 1000) {
                          if(! firstnav.hasClass('active')) {
                            navbar.find('a').removeClass('active');
                            firstnav.addClass('active');
                          }
                        }
                        else if($window.scrollTop() < 2000) {
                          if(! secondnav.hasClass('active')) {
                            navbar.find('a').removeClass('active');
                            secondnav.addClass('active');
                          }
                        }
                        else if($window.scrollTop() < 3000) {
                          if(! thirdnav.hasClass('active')) {
                            navbar.find('a').removeClass('active');
                            thirdnav.addClass('active');
                          }
                        }
                        else if($window.scrollTop() < 4000) {
                         if(! fourthnav.hasClass('active')) {
                            navbar.find('a').removeClass('active');
                            fourthnav.addClass('active');
                          }
                        }
                        else {
                          if(! theendnav.hasClass('active')) {
                            navbar.find('a').removeClass('active');
                            theendnav.addClass('active');
                          }
                        }
                        
                        
        
                        // If this section is in view
                        if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
                                 ( (topOffset + $self.height()) > $window.scrollTop() ) ) {
        
                                // Scroll the background at var speed
                                // the yPos is a negative value because we're scrolling it UP!                                                          
                                var yPos = -($window.scrollTop() / $self.data('speed')); 
                                
                                // If this element has a Y offset then add it on
                                if ($self.data('offsetY')) {
                                        yPos += $self.data('offsetY');
                                }
                                
                                // Put together our final background position
                                var coords = '50% '+ yPos + 'px';

                                // Move the background
                                $self.css({ backgroundPosition: coords });
                                
                                // Check for other sprites in this section      
                                $('[data-type="sprite"]', $self).each(function() {
                                        
                                        // Cache the sprite
                                        var $sprite = $(this);
                                        
                                        // Use the same calculation to work out how far to scroll the sprite
                                        var yPos = -($window.scrollTop() / $sprite.data('speed'));
                                        var coords = $sprite.data('Xposition') + ' ' + (yPos + $sprite.data('offsetY')) + 'px';
                                        
                                        $sprite.css({ backgroundPosition: coords });                                                                                                    
                                        
                                }); // sprites
                                
                                // Check for other text sprites in this section      
                                $('[data-type="text-sprite"]', $self).each(function() {
                                        
                                        // Cache the sprite
                                        var $sprite = $(this);
                                        
                                        // Use the same calculation to work out how far to scroll the sprite
                                        var yPos = -($window.scrollTop() / $sprite.data('speed'));                                      
                                        var coords = (yPos + $sprite.data('offsetY')) + 'px';
                                        
                                        $sprite.css({ top: coords, left: $sprite.data('Xposition') });       
                                        
                                }); // text-sprites
                                
                                // Check for other bubble sprites in this section      
                                $('[data-type="bubble-sprite"]', $self).each(function() {
                                        
                                        // Cache the sprite
                                        var $sprite = $(this);
                                        
                                        // Use the same calculation to work out how far to scroll the sprite
                                        var yPos = -($window.scrollTop() / $sprite.data('speed')) + (Math.random() - 0.5) * 20;  
                                        if(yPos < -1700) //do not go too high
                                          yPos = -1700;
                                        var yCoord = (yPos + $sprite.data('offsetY')) + 'px';
                                        var xPos = parseInt($sprite.data('Xposition')) + (Math.random() - 0.5) * 30;
                                        var xCoord = xPos + '%';
                                        
                                        $sprite.css({ top: yCoord, left: xCoord});
                                        
                                }); // bubble-sprites
                        
                        }; // in view
        
                }); // window scroll
                        
        });     // each data-type
        
}); // document ready
