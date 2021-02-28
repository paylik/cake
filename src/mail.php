<?php

$to_email = 'paylik@yandex.ru';
$subject = 'Заказ тортика';

$_POST = json_decode(file_get_contents('php://input'), true);

foreach($_POST as $key => $value)
{ $fields .= $key.": ".$value." \r\n"; }
$message = $subject." \r\n".$fields;

$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: Biloo <noreply@ydomain.com>';

mail($to_email, $subject, $message, implode("\r\n", $headers));

?>