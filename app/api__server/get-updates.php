<?php
// CREATING A MATCH
require "init.php";

$matchid = $_POST['matchid'];
$currentRound = $_POST['currRound'];

$scoreFindDtl=array('match_id'=>$matchid,'round'=>$currentRound);
$scoreFindUrl='http://admin:1234@162.209.21.251/engage_cms/engage/api/quizsql/findScoreId/';
$scoreFindDb=curlPost($scoreFindDtl,$scoreFindUrl);
$row=json_decode($scoreFindDb,TRUE);
$score = array();
$score[$row[0]['score_position']] = array('score' => $row[0]['score_value'], 'answer' => $row[0]['score_answer']);
echo json_encode($score);

?>