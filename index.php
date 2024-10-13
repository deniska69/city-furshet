<?php
include 'env.php';
?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, viewport-fit=cover, initial-scale=1, maximum-scale=1, user-scalable=0, interactive-widget=resizes-content" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?= $DIR_CSS ?>/_framework.css?ver=<?= $CACHE_V ?>" />
    <link rel="stylesheet" href="<?= $DIR_CSS ?>/_style.css?ver=<?= $CACHE_V ?>" />
    <title><?= $TITLE ?></title>
</head>

<body>

    <!-- Header: Mobile -->
    <div id="header-mobile" class="noselect">
        <a href="/" id="header-mobile-logo-wrap">
            <img id="header-mobile-logo" src="<?= $DIR_IMAGES ?>/header/logo_250w.png?ver=<?= $CACHE_V ?>" alt="logo_white_250w">
        </a>

        <div class="hstack gap-x-4">
            <a href="" id="header-mobile-basket-wrap">
                <img id="header-mobile-basket" src="<?= $DIR_IMAGES ?>/header/icon_basket_64w.png?ver=<?= $CACHE_V ?>" alt="icon_basket_64w">
                <div id="header-mobile-basket-badge-wrap">
                    <span id="header-mobile-basket-badge-counter">0</span>
                </div>
            </a>

            <a href="" id="header-mobile-burger-wrap">
                <img id="header-mobile-burger" src="<?= $DIR_IMAGES ?>/header/icon_burger_64w.png?ver=<?= $CACHE_V ?>" alt="icon_burger_64w">
            </a>
        </div>
    </div>

    <!-- Header: Desktop -->
    <div id="header-desktop" class="noselect">
        <a href="#block_2">Меню</a>
        <a href="">Акции</a>
        <a href="">Доставка и оплата</a>
        <a href="">Контакты</a>
        <a href="" id="header-basket-wrap">
            <span>Корзина</span>
            <div id="header-basket-badge-wrap">
                <span id="header-basket-badge-counter">0</span>
            </div>
        </a>
    </div>

    <!-- Block #1 - Base -->
    <div id="block_1" class="noselect">
        <div id="block_1-container">
            <img id="block_1-container-logo" src="<?= $DIR_IMAGES ?>/block_1/logo_color_500w.png?ver=<?= $CACHE_V ?>" alt="logo_color_500w">
            <div id="block_1-container-description_first-wrap">
                <span id="block_1-container-description_first">Вкуснее, чем дома</span>
            </div>
            <span id="block_1-container-description_second">Быстрее, чем у плиты</span>
            <a id="block_1-container-button" href="#block_2">Посмотреть меню</a>
        </div>
    </div>

    <!-- Block #1 - Menu -->
    <div id="block_2">
        <div class="container">
            <div id="block_2-aside-left"></div>

            <div id="block_2-main">
                <h1 id="block_2-main-title"></h1>
                <div id="block_2-main-grid">

                </div>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="<?= $DIR_JS ?>/header.js"></script>
    <script src="<?= $DIR_JS ?>/price.js"></script>
    <!-- <script src="send.js"></script> -->
</body>

</html>