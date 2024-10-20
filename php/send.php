<?php

header('Access-Control-Allow-Origin: *');

$sendToTelegram = fopen("https://api.telegram.org/bot{$TOKEN_TELEGRAM}/sendMessage?chat_id={$CHAT_ID}&parse_mode=html&text={$_POST['message']}", "r");
