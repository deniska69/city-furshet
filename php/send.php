<?php

header('Access-Control-Allow-Origin: *');

require_once 'wp-config.php';

if (isset($_POST['message'])) {
    sendToTelegram($_POST['message']);
}
