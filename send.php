<?php

//В переменную $token нужно вставить токен, который нам прислал @botFather
$token = "7167492675:AAG15NrkGIUxmzo98S8hViW9sUwSe8Ghy_Q";

//Сюда вставляем chat_id
$chat_id = "350603018";

$data = json_decode(stripslashes($_POST['data']));

//Передаем данные боту
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$_POST['data']}","r");

//Выводим сообщение об успешной отправке
if ($sendToTelegram) {
    echo $_POST['data'];
    // echo 'Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.';
}

//А здесь сообщение об ошибке при отправке
else {
    echo 'Что-то пошло не так. ПОпробуйте отправить форму ещё раз.';
}
?>