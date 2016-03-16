<?php
// CREATING A MATCH
require "init.php";

$matchid = $_GET['matchid'];
/*
$sql = "SELECT * FROM engage_match WHERE match_id=$matchid";
$res = mysqli_query($conn, $sql);
if(mysqli_num_rows($res) != 0){
	$get = mysqli_fetch_array($res);
}

mysqli_close($conn);
*/
$findMatchDtl=array('id'=>$matchid);
$findMatchUrl='http://admin:1234@162.209.21.251/engage_cms/engage/api/quizsql/findMatchId/';
$findMatchDb=curlPost($findMatchDtl,$findMatchUrl);
$get=json_decode($findMatchDb,TRUE);
$players['a'] = array('name' => $get[0]['match_player_a'], 'badge' => 'Kulambo', 'place' => 'a', 'score' => 0);
$players['b'] = array('name' => $get[0]['match_player_b'], 'badge' => 'Magaling', 'place' => 'b', 'score' => 0);
$arr = array('players' => $players);
echo json_encode($arr);

?>