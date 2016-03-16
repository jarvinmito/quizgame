<?php
// CREATING A MATCH
require "init.php";

$matchid = $_POST['matchid'];
$currentRound = $_POST['currRound'];
$scoreFindDtl=array('match_id'=>$matchid,'round'=>$currentRound);
$scoreFindUrl='http://admin:1234@162.209.21.251/engage_cms/engage/api/quizsql/findScoreId/';
$scoreFindDb=curlPost($scoreFindDtl,$scoreFindUrl);
$row=json_decode($scoreFindDb,TRUE);
//$score_position=serialize($row[0]['score_position']);
//$score_value=intval($row[0]['score_value']);
//$score_answer=intval($row[0]['score_answer']);
//$score = array();
//$score[$score_position]=array('score'=>$score_value,'answer'=>$score_answer);
$score = array();
foreach($row as $r):
	$sp=$r['score_position'];
	$sv=intval($r['score_value']);
	$sa=intval($r['score_answer']);
	$score[$sp]=array('score'=>$sv,'answer'=>$sa);
endforeach;
$status = 'success';
echo json_encode($score);
?>