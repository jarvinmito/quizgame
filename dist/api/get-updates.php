<?php
// CREATING A MATCH
// require "init.php";

// $matchid = $_POST['matchid'];
// $currentRound = $_POST['currRound'];

// $scoreFindDtl=array('match_id'=>$matchid,'round'=>$currentRound);
// // $scoreFindUrl='http://admin:1234@162.209.21.251/engage_cms/engage/api/quizsql/findScoreId/';
// $scoreFindUrl='http://admin:1234@192.168.20.75/engage/api/quizsql/findScoreId/';
// $scoreFindDb=curlPost($scoreFindDtl,$scoreFindUrl);
// $row=json_decode($scoreFindDb,TRUE);
// $score = array();
// $score[$row[0]['score_position']] = array('score' => $row[0]['score_value'], 'answer' => $row[0]['score_answer']);
// echo json_encode($score);

// CREATING A MATCH
// require "init.php";

// $matchid = $_POST['matchid'];
// $currentRound = $_POST['currRound'];
// $scoreFindDtl=array('match_id'=>$matchid,'round'=>$currentRound);
// $scoreFindUrl=$basePath.'/findScoreId/';
// $scoreFindDb=curlPost($scoreFindDtl,$scoreFindUrl);
// $row=json_decode($scoreFindDb,TRUE);
// //$score_position=serialize($row[0]['score_position']);
// //$score_value=intval($row[0]['score_value']);
// //$score_answer=intval($row[0]['score_answer']);
// //$score = array();
// //$score[$score_position]=array('score'=>$score_value,'answer'=>$score_answer);
// // $score = array();
// $player = array();
// if($row != "No Result"){

// 	foreach($row as $r):
// 		$sp=$r['score_position'];
// 		$sv=intval($r['score_value']);
// 		$sa=intval($r['score_answer']);
// 		$isA=$r['match_player_a_isactive'];
// 		$isB=$r['match_player_b_isactive'];
// 		// $actives = array('a' => $isA, 'b' => $isB);
// 		// $score[$sp]=array('score'=>$sv,'answer'=>$sa, 'isactive' => $actives);
// 		$player[$sp]=array('score'=>$sv,'answer'=>$sa);
// 		// $match_player_isactive=($sp=='a') ? $isA : $isB;
// 		// switch( $sp ){
// 		// 	case 'a': $match_player_isactive = $isA; break;
// 		// 	default: $match_player_isactive = $isB; break;
// 		// }
// 		$player['isactive'][$sp] = ($sp=='a') ? $isA : $isB;
// 	endforeach;
// }else{
// 	$player['isactive']['a'] = true;
// 	$player['isactive']['b'] = true;
// }

// // $status = 'success';
// // echo $scoreFindDb;
// echo json_encode($player);

// CREATING A MATCH
require "init.php";

$matchid = $_POST['matchid'];
$currentRound = $_POST['currRound'];
$scoreFindDtl=array('match_id'=>$matchid,'round'=>$currentRound);
$scoreFindUrl=$basePath.'/findScoreId/';
$scoreFindDb=curlPost($scoreFindDtl,$scoreFindUrl);
// $row=json_decode($scoreFindDb,TRUE);
// $score = array();
// foreach($row as $r):
// 	$sp=$r['score_position'];
// 	$sv=intval($r['score_value']);
// 	$sa=intval($r['score_answer']);
// 	$score[$sp]=array('score'=>$sv,'answer'=>$sa);
// endforeach;
// $status = 'success';
// echo json_encode($score);
echo $scoreFindDb;

?>