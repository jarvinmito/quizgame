<?php
// CREATING A MATCH
require "init.php";
$matchid = 0;
$isWaiting = true;
$name = $_GET['name'];
$data=array('player'=>$name);
$url='http://admin:1234@162.209.21.251/engage_cms/engage/api/quizsql/createMatch/';
$result=curlPost($data,$url);
$matchid=($result>0)?$result:0;
$arr = array('matchid' => $matchid, 'isWaiting' => $isWaiting);
echo json_encode($arr);
?>