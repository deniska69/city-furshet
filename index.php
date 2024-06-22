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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <link rel="stylesheet" href="<?= $DIR_CSS ?>/_framework.css?ver=1" />
    <link rel="stylesheet" href="<?= $DIR_CSS ?>/_style.css?ver=1" />
    <title><?= $TITLE ?></title>
</head>

<body>

    <!-- Header -->
    <div id="header" class="noselect">
        <!-- Header: Desktop -->
        <div id="header-menu_desktop">
            <a href="">Меню</a>
            <a href="#block_2">Акции</a>
            <a href="">Доставка и оплата</a>
            <a href="">Контакты</a>
            <a href="" id="header-basket-wrap">
                <span>Корзина</span>
                <div id="header-basket-badge-wrap">
                    <span id="header-basket-badge-counter">0</span>
                </div>
            </a>
        </div>

        <!-- Header: Mobile -->
        <div id="header-menu_mobile">
            <a href="" id="header-menu_mobile-logo_wrap">
                <img id="header-menu_mobile-logo" src="<?= $DIR_IMAGES ?>/header/logo_white_250w.png" alt="logo_white_250w">
            </a>

            <div class="hstack gap-x-4">
                <a href="" id="header-menu_mobile-basket_wrap">
                    <img id="header-menu_mobile-basket" src="<?= $DIR_IMAGES ?>/header/icon_basket_64w.png" alt="icon_basket_64w">
                    <div id="header-menu_mobile-basket-badge-wrap">
                        <span id="header-menu_mobile-basket-badge-counter">0</span>
                    </div>
                </a>

                <a href="" id="header-menu_mobile-burger_wrap">
                    <img id="header-menu_mobile-burger" src="<?= $DIR_IMAGES ?>/header/icon_burger_64w.png" alt="icon_burger_64w">
                </a>
            </div>
        </div>
    </div>

    <!-- Block #1 - Base -->
    <div id="block_1" class="noselect">
        <div id="block_1-container">
            <img id="block_1-container-logo" src="<?= $DIR_IMAGES ?>/block_1/logo_color_500w.png" alt="logo_color_500w">
            <div id="block_1-container-description_first-wrap">
                <span id="block_1-container-description_first">Вкуснее, чем дома</span>
            </div>
            <span id="block_1-container-description_second">Быстрее, чем у плиты</span>
            <button id="block_1-container-button">Посмотреть меню</button>
        </div>
    </div>

    <!-- Block #2 - Promotions -->
    <div id="block_2" class="noselect">
        <!-- Swiper -->
        <div class="swiper mySwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide"></div>
                <div class="swiper-slide"></div>
                <div class="swiper-slide"></div>
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="<?= $DIR_JS ?>/header.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script src="<?= $DIR_JS ?>/swiper.js"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> -->
    <!-- <script src="send.js"></script> -->
</body>

</html>