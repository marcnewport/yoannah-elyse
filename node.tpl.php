<div id="node-<?php print $node->nid; ?>" class="node">

  <div class="artwork-details">
    <div class="node-title">
      <h2><?php print $node->title; ?></h2>
    </div>

    <div class="node-description">
      <?php print yoyo_node_field($node->field_description); ?>
    </div>

    <div class="artwork-information">
      <?php
      print yoyo_node_field($node->field_medium);
      
      if (yoyo_node_field($node->field_dimensions)) {
        print ' - '. yoyo_node_field($node->field_dimensions);
      }
      ?>
    </div>

    <?php if ($node->field_prints_available['und'][0]['value']) : ?>
    <input id="button-request-<?php print $node->nid; ?>" class="yoyo-button button-request" type="button" value="Request print" />
    <?php endif; ?>
  </div>
  
  <div class="artwork-images">
    <?php
    foreach ($node->field_images['und'] as $image) {
      print theme_image_style(array(
        'style_name' => 'large',
        'path' => $image['uri'],
        'width' => $image['width'],
        'height' => $image['height']
      ));
    }
    ?>
  </div>

</div>