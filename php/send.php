<?php

header('Access-Control-Allow-Origin: *');

require_once 'wp-config.php';

if (isset($_POST['telegram'])) {
    sendToTelegram($_POST['telegram']);
}

if (isset($_POST['email'])) {
    sendToEmail($_POST['email']);
}
