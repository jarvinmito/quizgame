<?php
// CREATING A MATCH
require "init.php";

$matchid = $_POST['matchid'];
$isWaiting = true;
$name = $_POST['name'];
$matchDtl=array('id'=>$matchid);
// $match=curlPost($matchDtl,'http://admin:1234@162.209.21.251/engage_cms/engage/api/quizsql/findMatchId/');
$match=curlPost($matchDtl,$basePath.'/findMatchId/');
$q_match=json_decode($match,TRUE);
if($q_match){
	// $rmatch = $q_match;
	$isWaiting =($q_match['match_player_b']!='') ? false : true;
}

if($isWaiting === false){

/*foreach($query_match as $q_match):
	$match_id=$q_match->match_id;
	$match_status=$q_match->match_status;
	$match_player_a_isactive=$q_match->match_player_a_isactive;
	$match_player_b_isactive=$q_match->match_player_b_isactive;
endforeach;*/

	$match_result_details['id']=$q_match['match_id'];
	$match_result_details['status']=$q_match['match_status'];
	$match_result_details['isactive']=array('a'=>$q_match['match_player_a_isactive'],'b'=>$q_match['match_player_b_isactive']);
	//$result['rematch']="true";
	$result = array();
	$result['match']=$match_result_details;
	$arr = array('matchid' => $matchid, 'match' => $result, 'isWaiting' => $isWaiting);

}else{
	$arr = array('matchid' => $matchid, 'isWaiting' => $isWaiting);
}

echo json_encode($arr);
?>