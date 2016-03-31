<?php
// FINDING MATCH
require "init.php";
$matchid = 0;
$isWaiting = true;
$name = $_GET['name'];
// $frRes=json_decode(file_get_contents('http://admin:1234@162.209.21.251/engage_cms/engage/api/quizsql/findMatch/find/match/format/json'),TRUE);
$frRes=json_decode(file_get_contents('http://admin:1234@192.168.20.75/engage/api/quizsql/findMatch/find/match/format/json'),TRUE);
if($frRes != 0)
{
	$matchid = $frRes[0]['match_id'];
	$updateDtl=array('player'=>$name,'id'=>$matchid);
	// $updateUrl='http://admin:1234@162.209.21.251/engage_cms/engage/api/quizsql/joinMatch/';
	$updateUrl='http://admin:1234@192.168.20.75/engage/api/quizsql/joinMatch/';
	$updateDb=curlPost($updateDtl,$updateUrl);
	$isWaiting=($updateDb==true)?false:"";
}
else
{
	$createDtl=array('player'=>$name);
	// $createUrl='http://admin:1234@162.209.21.251/engage_cms/engage/api/quizsql/createMatch/';
	$createUrl='http://admin:1234@192.168.20.75/engage/api/quizsql/createMatch/';
	$createDb=curlPost($createDtl,$createUrl);
	$matchid=$createDb;
}	
$arr = array('matchid' => $matchid, 'isWaiting' => $isWaiting);
echo json_encode($arr);

?>