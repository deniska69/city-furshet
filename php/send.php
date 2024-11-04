<?php

header('Access-Control-Allow-Origin: *');

require_once 'wp-config.php';

sendToTelegram($_POST['message']);
