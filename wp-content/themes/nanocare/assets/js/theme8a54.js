( function( $ ) {
	"use strict";

	var $win = $(window), $doc = $(document), $body = $('body');

$.fn['contentGrid'] = function() {
	return this.each(function() {
		var $this = $(this);

		$this.imagesLoaded().then(function() {
			$this.isotope(
				$.extend({}, $this.data('grid'), {
					layoutMode: 'packery',
					percentPosition: true
				})
			);
		});
	});
};
$.fn['contentGridFilter'] = function() {
	return this.each(function() {
		var targetSelector = $(this).attr('data-filter-target'),
			target = $(targetSelector),
			filter = $(this);

		filter.on('click', 'a', function(e) {
			e.preventDefault();

			$('.active', filter).removeClass('active');
			$(this).closest('li').addClass('active');

			target.isotope({
				filter: $( this ).parent().attr( 'data-filter' )
			});
		});
	});
};
$.headerSticky = function() {
	$win.on( 'scroll load', function() {
		$win.scrollTop() > $( '#site-header' ).outerHeight()
			? $( '.site-header-sticky' ).addClass( 'active' )
			: $( '.site-header-sticky' ).removeClass( 'active' );
	} );
};

$.mobileMenu = function () {
  $('ul.menu li.menu-item-has-children').each(function () {
    var menuItem = $(this)
    var menuToggle = $('<span class="menu-item-toggle"><span></span></span>')

    menuToggle.insertAfter(menuItem.find('> a'))
      .on('click', function () {
        menuItem.toggleClass('menu-item-expand')
      })
  })
}

function NavSearch( element ) {
	this.element = $( element );
	this.toggler = $( '> a:first-child', this.element );
	this.input   = $( 'input', this.element );

	$doc.on( 'click', this.hide.bind( this ) );

	this.toggler.on( 'click', this.toggle.bind( this ) );
	this.element.on( 'click', function( e ) {
		e.stopPropagation();
	});

	this.element.on( 'keydown', ( function( e ) {
		if ( e.keyCode == 27 )
			this.hide();
	} ).bind( this ) );

	$.each( ['transitionend', 'oTransitionEnd', 'webkitTransitionEnd'], ( function( index, eventName ) {
		$( '> div', this.element ).on( eventName, ( function() {
			if ( this.element.hasClass( 'active' ) )
				this.input.get( 0 ).focus();
		} ).bind( this ) );
	} ).bind( this ) );
};

NavSearch.prototype = {
	toggle: function( e ) {
		e.preventDefault();
		e.stopPropagation();

		this.element.toggleClass( 'active' );
	},

	hide: function() {
		this.element.removeClass( 'active' );
	}
};

$.fn.navSearch = function( options ) {
	return this.each( function() {
		$( this ).data( '_navSearch', new NavSearch( this, options ) );
	} );
};

$.fn['offCanvasToggle'] = function() {
	return this.each(function() {
		var activeClass = $(this).attr('data-target') + '-active';

		$(this).on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			
			$('body').toggleClass(activeClass);
		});

		$doc.on('click', function() {
			$('body').removeClass(activeClass);
		});

		$('.off-canvas').on('click', function(e) {
			e.stopPropagation();
		});
	});
};

$.fn['swiperSlider'] = function() {
	return this.each(function() {
		$(this).swiper($.extend({}, $(this).data('swiper'), {
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev'
		}));
	});
};
$.gotop = function() {
	$('.go-to-top a').on('click', function() {
		$( 'html, body' ).animate({ scrollTop: 0 });
	});

	$win.on('scroll', function() {
		if ($win.scrollTop() > 0) $('.go-to-top').addClass('active');
		else $('.go-to-top').removeClass('active');
	}).on('load', function() {
		$win.trigger('scroll');
	});
};
$.fn['googleMaps'] = function() {
  return this.each(function() {
    var
    elm       = $(this),
    elmCanvas = this,
    locations = {},
    geocoder  = {},
    elmConfig = $.extend({
      locations: encodeURIComponent('[]'),
      zoomable: 'yes',
      zoomlevel: 15,
      draggable: 'yes',
      type: 'roadmap',
      style: 'default'
    }, elm.data('options'));

    if (elmConfig.locations) {
      elmConfig.locations = decodeURIComponent(elmConfig.locations);
    }

    try {
      var mapStyles = {
        'subtle-grayscale': [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}],
        'pale-dawn':        [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}],
        'blue-warter':      [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}],
        'light-monochrome': [{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#2c2e33"},{"saturation":7},{"lightness":19},{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":-2},{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#e9ebed"},{"saturation":-90},{"lightness":-8},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":10},{"lightness":69},{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":-78},{"lightness":67},{"visibility":"simplified"}]}],
        'shades-of-gray':   [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
      };

      var mapTypes = {
        'roadmap'  : google.maps.MapTypeId.ROADMAP,
        'satellite': google.maps.MapTypeId.SATELLITE,
        'hybrid'   : google.maps.MapTypeId.HYBRID,
        'terrain'  : google.maps.MapTypeId.TERRAIN
      };

      var createMarker = function(map, location, image) {
        return new google.maps.Marker({
          map: map,
          position: location,
          icon: image
        });
      };
      
      locations = $.parseJSON(elmConfig.locations);
      geocoder = new google.maps.Geocoder();

      if (locations.length && locations.length > 0) {
        var centerLocation = locations.shift();
        var map = {};

        geocoder.geocode({ 'address': centerLocation.address }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            map = new google.maps.Map(elmCanvas, {
              center     : results[0].geometry.location,
              zoom       : parseInt(elmConfig.zoomlevel || 12),
              mapTypeId  : mapTypes[elmConfig.type || 'roadmap'],
              scrollwheel: elmConfig.zoomable == 'yes',
              styles     : mapStyles[elmConfig.style],
              panControl: true,
              scaleControl: true,
              streetViewControl: true,
              zoomControl: true,
              draggable: elmConfig.draggable == 'yes'
            });

            if (centerLocation.marker != '') {
              var centerMarker = createMarker(map, results[0].geometry.location, centerLocation.marker);

              if (centerLocation.content != '') {
                var infoWindow = new google.maps.InfoWindow({
                  content: centerLocation.content
                });

                centerMarker.addListener('click', function() {
                  infoWindow.open(map, centerMarker);
                });
              }
            }

            if (locations.length > 0) {
              $.map(locations, function(location) {
                geocoder.geocode({ 'address': location.address }, function(results, status) {
                  if (results.length > 0) {
                    if (location.marker != '') {
                      var marker = createMarker(map, results[0].geometry.location, location.marker);

                      if (location.content != '') {
                        var infoWindow = new google.maps.InfoWindow({
                          content: location.content
                        });
                        
                        marker.addListener('click', function() {
                          infoWindow.open(map, marker);
                        });
                      }
                    }
                  }
                });
              });
            }
          }
        });
      }
    }
    catch(e) {}
  });
};

$(function() {
	// Initialize the header sticky
	$.headerSticky();

  // Initialize the menu mobile
  $.mobileMenu();

	// Initialize go-to-top button
	$.gotop();

	// Initialize scroll down arrow
	$('.content-header .down-arrow a').on('click', function() {
		var stickyHeaderHeight = $('#site-header-sticky').height() || 0;
		var adminbarHeight = $('#wpadminbar').height() || 0;
		var contentOffset = $('.content-header').offset().top + $('.content-header').outerHeight();

		$( 'html, body' ).animate({
			scrollTop: contentOffset - (stickyHeaderHeight + adminbarHeight)
		});
	});

	// Initialize the off-canvas toggler
	$('.off-canvas-toggle').offCanvasToggle();

	// Initialize the search box toggler on the
	// navigation bar
	$('.navigator .search-box').navSearch();

	// Initialize the grid component
	$('[data-grid]').contentGrid();

	// Initialize the grid items filter
	$('[data-filter-target]').contentGridFilter();

	// Initialize swiper slider
	$('[data-swiper]').swiperSlider();

	// Initialize lightbox
	$('[rel^="prettyPhoto"]').prettyPhoto({
		social_tools: ''
	});
});

$(window).on('load', function() {
  $('.elm-google-maps[data-options]').googleMaps();
});


} ).call( this, jQuery )