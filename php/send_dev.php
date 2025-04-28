<?php

header('Access-Control-Allow-Origin: *');

require_once 'wp-config.php';

if (isset($_POST['telegram'])) {
    sendToTelegramDev($_POST['telegram']);
}

if (isset($_POST['email'])) {
    sendToEmailDev($_POST['email']);
}
