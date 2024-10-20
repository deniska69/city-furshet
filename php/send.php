<?php

header('Access-Control-Allow-Origin: *');

require_once 'wp-config.php';

$TOKEN_TELEGRAM = TOKEN_TELEGRAM;
$CHAT_ID = CHAT_ID;

fopen("https://api.telegram.org/bot{$TOKEN_TELEGRAM}/sendMessage?chat_id={$CHAT_ID}&parse_mode=html&text={$_POST['message']}", "r");
