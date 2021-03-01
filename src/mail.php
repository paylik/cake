<?php

$name = "name";

if(isset($_POST['name'])){
$name = $_POST['name']
}

$to_email = 'paylik@yandex.ru';
$subject = 'Заказ тортика';

$message = "<p>Hi!</p>";
$message .= "<p>Wazaaaaa $name</p>";

$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: Biloo <paylik@yandex.ru>';

mail($to_email, $subject, $message, implode("\r\n", $headers));

?>