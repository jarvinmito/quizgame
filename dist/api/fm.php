<?php
// FINDING MATCH
require "init.php";
$matchid = 0;
$isWaiting = true;
$name = $_POST['name'];
$qt_id = $_POST['qt_id'];
$topic_id = $_POST['topic_id'];
// $frRes=json_decode(file_get_contents('http://admin:1234@162.209.21.251/engage_cms/engage/api/quizsql/findMatch/find/match/format/json'),TRUE);
$frRes=json_decode(file_get_contents($basePath.'/findMatch/find/match/format/json'),TRUE);
if($frRes != 0)
{
	$matchid = $frRes[0]['match_id'];
	$updateDtl=array('player'=>$name,'id'=>$matchid);
	// $updateUrl='http://admin:1234@162.209.21.251/engage_cms/engage/api/quizsql/joinMatch/';
	$updateUrl=$basePath.'/joinMatch/';
	$updateDb=curlPost($updateDtl,$updateUrl);
	$isWaiting=(!empty($updateDb))?false:true;

	$q_match=json_decode($updateDb,TRUE);
	
	$match_result_details['id']=$q_match[0]['match_id'];
	$match_result_details['status']=$q_match[0]['match_status'];
	$match_result_details['isactive']=array('a'=>$q_match[0]['match_player_a_isactive'],'b'=>$q_match[0]['match_player_b_isactive']);
	//$result['rematch']="true";
	$result = array();
	$result['match']=$match_result_details;

	$arr = array('matchid' => $matchid, 'match' => $result, 'isWaiting' => $isWaiting);
}
else
{
	$createDtl=array('player'=>$name, 'topic_id'=>$topic_id, 'qt_id' => $qt_id);
	// $createUrl='http://admin:1234@162.209.21.251/engage_cms/engage/api/quizsql/createMatch/';
	$createUrl=$basePath.'/createMatch/';
	$createDb=curlPost($createDtl,$createUrl);
	$fromdb = json_decode($createDb);
	$matchid=$fromdb->match_id;
	$qs = $fromdb->qs;
	$arr = array('matchid' => $matchid, 'qs' => $qs, 'isWaiting' => $isWaiting);
}

echo json_encode($arr);

?>