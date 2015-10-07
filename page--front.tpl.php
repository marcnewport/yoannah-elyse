<?php
$site_name = variable_get('dash_main_title', '');
$about_info = variable_get('dash_about_text', 'There is no about info.');
$artworks = yoyo_get_nodes('art_work');
?>

<div id="yoyo-header">
  <div id="navigation">
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <?php if (variable_get('dash_show_contact', 1)) : ?>
      <li><a href="#contact" class="contact">Contact</a></li>
      <?php endif; ?>
    </ul>
    <a href="#back" class="back hidden"><span class="cross">&#x2715;</span> &nbsp; Close</a>
  </div>

  <div id="about">
      <h2>About Yoannah</h2>
    <?php print $about_info; ?>
  </div>
  
  <?php if (variable_get('dash_show_contact', 1)) : ?>
  <div id="contact">
    <div class="contact-text">
      <h2>Contact Yoannah</h2>
      <?php print variable_get('dash_contact_text', ''); ?>
    </div>
    <div class="contact-form">
      <?php print drupal_render(drupal_get_form('yoyo_contact_form')); ?>
    </div>
  </div>
  <?php endif; ?>
</div>


<div id="yoyo-page">


  <?php if ($site_name): ?>
    <div id="main-title">
      <h1><?php print $site_name; ?></h1>
    </div>
  <?php endif; ?>

  <div id="artworks">

  <?php
  $i = 0;
  $sequence = '';
  foreach ($artworks as $node) {
    $sequence = (($i % 2) == 0) ? 'even' : 'odd';

    print '<a href="#'. url('node/'. $node->nid) .'" class="artwork '. $sequence .'">';
    print theme_image_style(array(
      'style_name' => 'front',
      'path' => $node->field_images['und'][0]['uri'],
      'title' => $node->title,
      'width' => null,
      'height' => null
    ));
    print '<span class="loader"></span>';
    print '</a>';
    $i++;
  }
  ?>
  </div>
</div>

<div id="artwork-overlay"></div>

<div id="email-confirm">Email sent.</div>

<div id="yoyo-footer">
  <div id="footer-wrap">
    <div class="copyright-text">
      &copy; <?php print date('Y'); ?> Yoannah Elyse Dieudonne
    </div>
    
    <div class="social-links">
      <?php
      $theme_path = drupal_get_path('theme', 'yoyo');
      $icons = array(
        'tumblr' => array(
          'image' => '<img src="'. $theme_path .'/images/icon-tumblr.png" alt="" />',
          'link' => 'http://yoannahelyse.tumblr.com/',
          'title' => 'Yoannah on Tumblr'
        ),
        'behance' => array(
          'image' => '<img src="'. $theme_path .'/images/icon-behance.png" alt="" />',
          'link' => 'http://behance.net/yedieudonne',
          'title' => 'Yoannah on Behance'
        ),
        'facebook' => array(
          'image' => '<img src="'. $theme_path .'/images/icon-facebook.png" alt="" />',
          'link' => 'http://www.facebook.com/pages/Yoannah-Elyse-Dieudonne-Illustration/185175110745',
          'title' => 'Yoannah on Facebook'
        ),
//        'email' => array(
//          'image' => '<img src="'. $theme_path .'/images/icon-email.png" alt="" />',
//          'link' => 'mailto:yoannahelyse@gmail.com',
//          'title' => 'Email me directly'
//        )
      );

      foreach ($icons as $icon) {
        print '<a href="'. $icon['link'] .'" title="'. $icon['title'] .'" target="_blank">'. $icon['image'] .'</a>';
      }
      ?>
    </div>
  </div>
  <img src="<?php print $theme_path; ?>/images/background-dark-opacity92.png" alt="" width="1" height="1" />
</div>

<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-43776259-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>
