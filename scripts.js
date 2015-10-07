/*
 * 
 */
jQuery(document).ready(function($) {
  
  var $window = $(window),
      $body = $('body'),
      $header = $('#yoyo-header'),
      $navigation = $header.find('#navigation'),
      l_activeNavigation = '',
      $about = $header.find('#about'),
      $contact = $header.find('#contact'),
      $backButton = $navigation.find('.back'),
      $artworks = $('#artworks'),
      $contactForm = $header.find('#yoyo-contact-form'),
      $overlay = $('#artwork-overlay'),
      l_overlaying = false,
      l_narrow = false,
      l_focusHandler = function() {},
      l_blurHandler = function() {},
      l_iphone = checkIphone();
  
  
  
  /**
   * Scale an image to the max height given
   */
  function scaleImage($image, p_maxHeight) {
    
    var l_scale = p_maxHeight / $image.height(),
        l_newHeight = p_maxHeight,
        l_newWidth = $image.width() * l_scale;
    
    return $image.css({
      width: l_newWidth +'px',
      height: l_newHeight +'px'
    });
  }
  
  
  
  /**
   * shows the artwork overlay
   */
  $overlay.enable = function(p_callback) {
    
    var $this = this,
        $images = $this.find('img'),
//        l_startPosition = $window.scrollTop(),
        l_totalWidth = 300,
        w_height = $window.height(),
        l_imageHeight = 0;
    
    //add 65 to window height with iphones urghh
    if (l_iphone) w_height += 65;
    
    l_imageHeight = w_height - 135;
    
    if (! l_overlaying) {

      //resize height of images to fit in screen
      if (l_imageHeight > 800) l_imageHeight = 800;
      
      $images.each(function() {
        var $image = scaleImage($(this), l_imageHeight);
        l_totalWidth += $image.width() + 51;
      });
      
      //give the text height in case it needs to scroll
      $this.find('.artwork-details').height(l_imageHeight);

      //update width of the node element
      $this.find('.node').css({
        width: l_totalWidth +'px',
        height: w_height - 45 - 40
      });
      
      $body.addClass('overlayed');
      
      //position overlay
      $this.css({
        //top: l_startPosition + 45,
        height: w_height - 45
      })
      .fadeIn(500, function() {
      
        $backButton.show();
      
        //focus on it so we can use direction keys
        $this.focus();

        //enable horizontal scrolling
        $(document).bind('mousewheel.overlay MozMousePixelScroll.overlay', function(p_event) {
          var l_delta = (p_event.originalEvent.wheelDelta * -1) / 2 || p_event.originalEvent.detail;
          $overlay.get(0).scrollLeft += l_delta;
          p_event.preventDefault();
        });
        
        //close on esc 
        $(document).bind('keyup.overlay', function(p_event) {
          if (p_event.which == 27) {
            $overlay.disable();
          }
        });
        
        l_overlaying = true;
        
        if (p_callback != undefined) {
          p_callback();
        }
      });
      
      //reset left position
      setTimeout(function() {
        $overlay.get(0).scrollLeft = 0;
      }, 10);
    }
  };
  
  
  
  
  
  /**
   * hides the artwork overlay
   */
  $overlay.disable = function() {
    
    var $this = this;
    
    //TODO : get scroll top of window so we dont jump on close
    
    //close the overlay if its on
    if (l_overlaying) {
      $this.fadeOut(500, function() {
        $this.removeAttr('style');
        l_overlaying = false;
      });
      
      //clean the url
      if (history.pushState) {
        history.pushState(null, null, '#');
      }
      else {
        location.hash = '#';
      }
      
      $backButton.removeAttr('style');
      
      $body.removeClass('overlayed');
      $window.unbind('scroll.overlay');
      $(document).unbind('mousewheel.overlay MozMousePixelScroll.overlay');
    }
  };
  
  
  
  
  
  /**
   * navigation click handling
   */
  $navigation.bind('click', function(p_event) {
    
    var $target = $(p_event.target);
    
    if ($target.is('a')) {
      
      switch ($target.attr('href')) {
        //TODO : put these into functions with callbacks ya goose
        case '#home':
          $overlay.disable();
          switch (l_activeNavigation) {
            case '':
              $('html, body').animate({ scrollTop: 0 }, 500);
              break;
            
            case 'about':
              $about.slideUp(function() {
                $navigation.find('a').removeClass('active');
                l_activeNavigation = '';
                $('html, body').animate({ scrollTop: 0 }, 500);
              });
              $body.removeClass('header-open');
              break;
            case 'contact':
              $contact.slideUp(function() {
                $navigation.find('a').removeClass('active');
                l_activeNavigation = '';
                $('html, body').animate({ scrollTop: 0 }, 500);
              });
              $body.removeClass('header-open');
              break;
          }
          break;
        
        case '#about':
          switch (l_activeNavigation) {
            case '':
              $about.slideDown(function() {
                $target.addClass('active');
                l_activeNavigation = 'about';
                $body.addClass('header-open');
              });
              break;
            case 'about':
              $body.removeClass('header-open');
              $about.slideUp(function() {
                $target.removeClass('active');
                l_activeNavigation = '';
              });
              break;
            case 'contact':
              $body.removeClass('header-open');
              $contact.slideUp(function() {
                $navigation.find('a').removeClass('active');
                $about.slideDown(function() {
                  $target.addClass('active');
                  l_activeNavigation = 'about';
                  $body.addClass('header-open');
                });
              });
              break;
          }
          break;
          
        case '#contact':
          switch (l_activeNavigation) {
            case '':
              $contact.slideDown(function() {
                $target.addClass('active');
                l_activeNavigation = 'contact';
                $body.addClass('header-open');
              });
              break;
            case 'about':
              $body.removeClass('header-open');
              $about.slideUp(function() {
                $navigation.find('a').removeClass('active');
                $contact.slideDown(function() {
                  $target.addClass('active');
                  l_activeNavigation = 'contact';
                  $body.addClass('header-open');
                });
              });
              break;
            case 'contact':
              $body.removeClass('header-open');
              $contact.slideUp(function() {
                $target.removeClass('active');
                l_activeNavigation = '';
              });
              break;
          }
          break;
        
        case '#back':
          $overlay.disable();
          switch (l_activeNavigation) {
            case 'about':
              $about.slideUp(function() {
                $navigation.find('a').removeClass('active');
                l_activeNavigation = '';
              });
              $body.removeClass('header-open');
              break;
            case 'contact':
              $contact.slideUp(function() {
                $navigation.find('a').removeClass('active');
                l_activeNavigation = '';
              });
              $body.removeClass('header-open');
              break;
          }
          break;
      }
      
      p_event.preventDefault();
    }
  });
  
  
  
  
  
  /**
   * artworks click handling
   */
  $artworks.find('.artwork').bind('click', function(p_event) {
    
    var $this = $(this),
        l_href = $this.attr('href').replace('#', '');
    
    $this.addClass('loading');
    
    //load the node page by ajax and stick it inside overlay div
    $overlay.load(l_href +' .node', function() {
      $overlay.enable(function() {
        $this.removeClass('loading');
      });
    });
    
    //p_event.preventDefault();
  });
  
  
  
  
  
  /**
   * when the submit form is focussed
   */
  l_focusHandler = function() {
    var $this = $(this);
    if ($this.hasClass('empty')) {
      $this.val('');
      $this.removeClass('empty');
    }
  };
  
  
  
  
  
  /**
   * when the submit form is blurred
   */
  l_blurHandler = function() {
    var $this = $(this);
    if ($this.val() == '') {
      $this.addClass('empty');
      $this.val($this.parents('.form-item').find('label').html());
    }
  };
  
  
  
  
  
  /**
   * register contact form events
   */
  $contactForm.find('.form-item').each(function() {
    
    var $this = $(this),
        l_value = '',
        $item = [];
    
    if ($this.hasClass('form-type-textfield')) {
      l_value = $this.find('label').html();
      $item = $this.find('input');
      
      if ($item.attr('id') == 'edit-email') {
        //TODO : while we're here, check if browser supports html5 input types
        //if (l_iphone) {
          $item.get(0).type = 'email';
        //}
      }
    }
    else if ($this.hasClass('form-type-textarea')) {
      l_value = $this.find('label').html();
      $item = $this.find('textarea');
    }
    
    $item.val(l_value).addClass('empty').focus(l_focusHandler).blur(l_blurHandler);
  });
  
  
  
  
  /**
   * contact form validation
   */
  $contactForm.find('#edit-submit').click(function(p_event) {
    
    $contactForm.find('input.form-text, textarea').each(function() {
      
      var $this = $(this),
          l_emailExpression = '';
      
      $this.removeClass('error');
      
      //check for any empty values
      if ($this.hasClass('empty')) {
        $this.addClass('error animate');
        return p_event.preventDefault();
      }
      
      //check for something that resembles an email address
      if ($this.attr('id') == 'edit-email') {
        l_emailExpression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if (! l_emailExpression.test($this.val())) {
          $this.addClass('error animate empty');
          $this.val('Your email');
          return p_event.preventDefault();
        }
      }
    });
    
    setTimeout(function() {
      $contactForm.find('.animate').removeClass('animate');
    }, 1500);
  });
  
  
  
  
  /**
   * request an artwork button - click handler
   */
  $('.button-request').live('click', function() {
    
    var l_nid = $(this).attr('id').split('-').pop(),
        l_title = $('#node-'+ l_nid).find('.node-title h2').html();
    
    //fill in the contact form with some data about the artwork
    $contactForm.find('#edit-subject')
      .removeClass('empty')
      .val('Print request for "'+ l_title +'"');
    
//    $contactForm.find('#edit-message')
//      .removeClass('empty')
//      .val("Hi Yoannah,\r\nI was perusing your most excellent website and liked the look of your artwork called \""+ l_title +"\".\r\nI am very much interested in purchasing a print, so if you could reply to me with some information I would be most gracious.\r\nLooking forward to hearing from you...");
    
    //show the contact form
    $navigation.find('a.contact').trigger('click');
  });
  
  
  
  
  
  /**
   * browser resize handling
   */
  $window.resize(function() {

    if (l_overlaying) {
      //resize the overlay and images inside
      var w_height = $window.height(),
          l_imageHeight = 0,
          l_totalWidth = 300,
          $image = [];
          
      //add 65 to window height with iphones urghh
      if (l_iphone) w_height += 65;
      l_imageHeight = w_height - 135;
      
      //800 is the max height
      if (l_imageHeight > 800) l_imageHeight = 800;
      $overlay.find('.artwork-details').height(l_imageHeight);
      //add up the image widths and margin
      $overlay.find('img').each(function() {
        $image = scaleImage($(this), l_imageHeight);
        l_totalWidth += $image.width() + 51;
      });
      //update width of the node element
      $overlay.find('.node').css({
        width: l_totalWidth +'px',
        height: w_height - 45 - 40
      });
      $overlay.height(w_height - 45);
    }
    
    //min width of an art work should be about 250 with 2 columns
    if ($window.width() < 530) {
      if (! l_narrow) {
        $body.addClass('narrow');
        l_narrow = true;
      }
    }
    else {
      if (l_narrow) {
        $body.removeClass('narrow');
        l_narrow = false;
      }
    }
  });
  //invoke
  $window.trigger('resize');
  
  
//  /**
//   * Crawls node links and loads their pages and images into the browser
//   */
//  $artworks.find('.artwork').each(function(p_index, p_element) {
//    var l_href = p_element.href.replace('#', '');
//    $.ajax({
//      async: false,
//      type: 'GET',
//      url: l_href,
//      success: function(p_data) {
//        var $images = $(p_data).find('.artwork-images').find('img'),
//            l_images = [],
//            l_loadLoop = function() {};
//        
//        $images.each(function(p_index, p_element) {
//          l_images.push(p_element.src);
//        });
//        
//        l_loadLoop = function(p_index) {
//          if (p_index < l_images.length) {
//            var l_image = new Image();
//            l_image.onload = function() {
//              trace('loaded '+ this.src);
//              return l_loadLoop(p_index + 1);
//            };
//            l_image.src = l_images[p_index];
//            return true;
//          }
//          return false;
//        };
//        return l_loadLoop(0);
//      }
//    });
//  });
  
  
  
  /**
   * Checks if browser is iphone
   */
  function checkIphone() {
    var l_agent = navigator.userAgent;
    if (l_agent.match(/iPhone/i) || l_agent.match(/iPod/i)) {
      return true;
    }
    return false;
  }
  
  
  
  
  
  //check the url for a hash
  if (window.location.hash) {
    //check for the mail success
    if (window.location.hash == '#mail-sent') {
      var l_left = $navigation.find('.contact').offset().left;
      $('#email-confirm')
        .html('Email sent.')
        .css('left', l_left - 40)
        .addClass('sent')
        .fadeIn()
        .delay(5000)
        .fadeOut(function() {
          window.location.hash = '#';
        });
    }
    else if (window.location.hash == '#mail-failed') {
      var l_left = $navigation.find('.contact').offset().left;
      $('#email-confirm')
        .html('Email failed.')
        .css('left', l_left - 40)
        .addClass('fail')
        .fadeIn()
        .delay(5000)
        .fadeOut(function() {
          window.location.hash = '#';
        });
    }
    //else it was probably an artwork
    else {
      //loop through each artwork to match the url
      $artworks.find('.artwork').each(function() {

        var $this = $(this),
            l_position = $this.offset();

        if ($this.attr('href') == window.location.hash) {
          //found it!
          //give the user a second to register where they are
          setTimeout(function() {
            //now scroll the artwork into view
            $('html, body').animate({
              scrollTop: l_position.top - 120
            },
            1200,
            function() {
              //now envoke the click, showing the overlay
              $this.addClass('loading');
              setTimeout(function() {
                $this.trigger('click');
              }, 1500);
            });
          }, 500);
          //break the each loop
          return false;
        }
      });
    }
  }
});

//function trace(data) {
//  console.log(data)
//}
