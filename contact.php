<?php
  $subject= $_REQUEST['contact-subject'];
  $sender= $_REQUEST['contact_name'];
  $email_address = $_REQUEST['contact_email'] ;
  $message = $_REQUEST['contact_message'] ;

  mail("jonwhuang@gmail.com", $subject, $message, "From: $sender <$email_address>");
?>
