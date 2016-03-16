<?php
// CREATING A MATCH
require "init.php";

$matchid = $_POST['matchid'];
$round = $_POST['currRound'];
$position = $_POST['position'];
$score = $_POST['score'];
$answer = $_POST['answer'];
$status = 'pending';

$scoreInsertDtl=array('matchid'=>$matchid,'round'=>$round,'position'=>$position,'score'=>$score,'answer'=>$answer);
$scoreInsertUrl='http://admin:1234@162.209.21.251/engage_cms/engage/api/quizsql/insertScore/';
$scoreInsertDb=curlPost($scoreInsertDtl,$scoreInsertUrl);
$status=($scoreInsertDb==true)?"success":"pending";
$arr = array('status' => $status);
echo json_encode($arr);

?>