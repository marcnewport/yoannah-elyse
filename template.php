<?php



function yoyo_preprocess_html(&$vars) {
  $viewport = array(
    '#tag' => 'meta',
    '#attributes' => array(
      'name' => 'viewport',
      'content' => 'initial-scale=1.0'
    )
  );
  drupal_add_html_head($viewport, 'viewport');
  
  $image_src = array(
    '#tag' => 'link',
    '#attributes' => array(
      'rel' => 'image_src',
      'href' => 'sites/all/themes/yoyo/images/fbimage.jpg'
    )
  );
  drupal_add_html_head($image_src, 'image_src');
  
//  $webapp = array(
//    '#tag' => 'meta',
//    '#attributes' => array(
//      'name' => 'apple-mobile-web-app-capable',
//      'content' => 'yes'
//    )
//  );
//  drupal_add_html_head($webapp, 'webapp');
}




function yoyo_get_nodes($type, $limit = 20, $offset = 0) {
  
  $query = new EntityFieldQuery();
  $query->entityCondition('entity_type', 'node')
    ->entityCondition('bundle', $type)
    ->range($offset, $limit);
  
  $results = $query->execute();
  
  return node_load_multiple(array_keys($results['node']));
}



function yoyo_contact_form() {
  $form = array();
  
  $form['name'] = array(
    '#type' => 'textfield',
    '#title' => 'Your name'
  );
  $form['email'] = array(
    '#type' => 'textfield',
    '#title' => 'Your email'
  );
  $form['subject'] = array(
    '#type' => 'textfield',
    '#title' => 'Subject'
  );
  $form['message'] = array(
    '#type' => 'textarea',
    '#title' => 'Message'
  );
  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => 'Send mail',
    '#attributes' => array('class' => array('yoyo-button'))
  );
  
  return $form;
}


function yoyo_contact_form_submit($form, &$form_state) {
  
  $sender_name = $form_state['values']['name'];
  $sender_email = $form_state['values']['email'];
  $sender_subject = $form_state['values']['subject'];
  $sender_message = $form_state['values']['message'];
  
  $to = 'Yoannah Elyse Dieudonne <yoannahelyse@gmail.com>';
  $subject = $sender_subject;
  
  $message = '<img src="http://yoannahelyse.com/sites/all/themes/yoyo/images/emailheader.jpg" alt="" />';
  $message .= '<h2>You have received mail from '. $sender_name .'</h2>';
  $message .= '<h3 style="font-style:italic;color:#303335;margin-bottom:0.3em;">'. $sender_subject .'</h3>';
  $message .= '<div style="font-style:italic;color:#303335">';
  $message .= $sender_message;
  $message .= '</div>';
  $message .= '<h5>Mailed from www.yoannahelyse.com</h5>';
  
  $headers  = 'MIME-Version: 1.0'."\r\n";
  $headers .= 'Content-type: text/html; charset=iso-8859-1'."\r\n";
  //$headers .= 'To: marcnewport@gmail.com'."\r\n";
  $headers .= 'From: '. $sender_name .'<'. $sender_email .'>'."\r\n";
  $headers .= 'Reply-To: '. $sender_email ."\r\n";
  
  if (mail($to, $subject, $message, $headers)) {
    $fragment = 'mail-sent';
  }
  else {
    $fragment = 'mail-failed';
  }
  
  drupal_goto('', array('fragment' => $fragment));
  
}

function yoyo_node_field($field, $index = 0) {
  if (empty($field)) {
    return '';
  }
  else {
    return $field['und'][$index]['value'];
  }
}



