<?php
// CREATING A MATCH
require "init.php";

$matchid = $_POST['matchid'];
/*
$sql = "SELECT * FROM engage_match WHERE match_id=$matchid";
$res = mysqli_query($conn, $sql);
if(mysqli_num_rows($res) != 0){
	$get = mysqli_fetch_array($res);
}

mysqli_close($conn);
*/
$findMatchDtl=array('id'=>$matchid);
// $findMatchUrl='http://admin:1234@162.209.21.251/engage_cms/engage/api/quizsql/findMatchId/';
$findMatchUrl=$basePath.'/findMatchId/';
$findMatchDb=curlPost($findMatchDtl,$findMatchUrl);
$get=json_decode($findMatchDb,TRUE);

$playera = $get['match_player_a'];
$playeraa =  $get['match_player_a_isactive'];
$playera_un =  $get['match_player_username_a'];
$playeraicon = $get['player_a_photo'];
$playerabadge = $get['player_a_badge'];
// $playerabadge = 'Handa';
$playerb = $get['match_player_b'];
$playerab =  $get['match_player_b_isactive'];
$playerb_un =  $get['match_player_username_b'];
$playerbicon = $get['player_b_photo'];
$playerbbadge = $get['player_b_badge'];
// $playerbbadge = 'Handa';

$players['a'] = array('username' => $playera_un , 'name' => $playera, 'icon' => $playeraicon, 'badge' => $playerabadge, 'place' => 'a', 'score' => 0, 'isactive' => $playeraa);
$players['b'] = array('username' => $playerb_un , 'name' => $playerb, 'icon' => $playerbicon, 'badge' => $playerbbadge, 'place' => 'b', 'score' => 0, 'isactive' => $playerab);
$arr = array('players' => $players);
echo json_encode($arr);

?>