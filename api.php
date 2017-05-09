<?php
/**
 * Created by PhpStorm.
 * User: DanxilL
 * Date: 08.05.2017
 * Time: 16:37
 */
/**
 * Very very very simple API ;)
 */
if (isset($_GET['put'])){
    $data = json_decode(file_get_contents('php://input'), true);
    file_put_contents('data.php', json_encode($data), LOCK_EX);
}else if (isset($_GET['read'])){
    echo file_get_contents('data.php');
}