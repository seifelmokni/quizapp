//Generic purpose

(function($){

	$.fn.explosion = function(options){
		
		var settings = $.extend({          		
          		particleClass: "particle",
          		origin: {x:0,y:0},
          		particles: 50,
          		radius: 100,
          		complete: function() {}
      		},options);
		    
		return this.each(function() {	
			for(i=0;i<settings.particles;i++){
				var particle = $("<div />").addClass(settings.particleClass);
				$(particle).css("position","absolute");
				// add a particle
				$(this).append($(particle));
				// offset from center
      				$(particle).offset({
				 	top:settings.origin.y-$(particle).height()/2,
					left:settings.origin.x-$(particle).width()/2
				});
				// css animation
				var pos = {
					x: (Math.floor(Math.random()*settings.radius)-settings.radius/2),
					y: (Math.floor(Math.random()*settings.radius)-settings.radius/2),
					z: (Math.floor(Math.random()*settings.radius)-settings.radius/2)
				};
				var duration = (Math.floor(Math.random()*1000)+1000)/1000;
				$(particle).css(
					{
						'-webkit-transition-duration': duration +"s", 
						'-o-transition-duration': duration +"s", 
						'-ms-transition-duration': duration +"s", 
						'-moz-transition-duration': duration +"s", 
						'transition-duration': duration +"s", 
						
						'-webkit-transform': "translate3d("+ pos.x +"px,"+ pos.y +"px,"+ pos.z +"px)",
						'-o-transform': "translate3d("+ pos.x +"px,"+ pos.y +"px,"+ pos.z +"px)",
						'-ms-transform': "translate3d("+ pos.x +"px,"+ pos.y +"px,"+ pos.z +"px)",
						'-moz-transform': "translate3d("+ pos.x +"px,"+ pos.y +"px,"+ pos.z +"px)",
						'transform': "translate3d("+ pos.x +"px,"+ pos.y +"px,"+ pos.z +"px)",
						'opacity': 0
					}
				);
				$(particle).on('transitionend webkitTransitionEnd oTransitionEnd', function () {
					$(this).remove();
				});
			}
      			settings.complete.call(this);
  			});
  			
	};
    $(document).ready(function () {
        $('.btn').on(
            'touchstart click', function (e) {
            var xClick = e.clientX;
            var yClick = e.clientY;
            $("body").explosion({
            origin: {
                x: xClick,
                y: yClick
            },
            particles: 10,
            radius: 300,
            particleClass: "particle"
            });
        });
    });
}(jQuery));