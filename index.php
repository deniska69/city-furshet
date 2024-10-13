<?php include 'env.php' ?>

<!DOCTYPE html>
<html lang="ru">

<?php include($DIR_BLOCKS . "/head.php"); ?>

<body>
    <!-- Header: Mobile -->
    <?php include($DIR_BLOCKS . "/header_mobile.php"); ?>

    <!-- Header: Desktop -->
    <?php include($DIR_BLOCKS . "/header_desktop.php"); ?>

    <!-- Block #1 - Base -->
    <?php include($DIR_BLOCKS . "/base.php"); ?>

    <!-- Block #1 - Menu -->
    <?php include($DIR_BLOCKS . "/menu.php"); ?>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="<?= $DIR_JS ?>/header.js?ver=<?= $CACHE_V ?>"></script>
    <script src="<?= $DIR_JS ?>/menu.js?ver=<?= $CACHE_V ?>"></script>
    <!-- <script src="send.js"></script> -->
</body>

</html>