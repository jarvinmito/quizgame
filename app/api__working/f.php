<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$matchid = 0;
$status = 0; // 0 = waiting, 1 = ongoing, 2 = ended
if(isset($_GET['name']))
{
	$name = trim($_GET['name']);
	// FINDING OF MATCH IF IT IS ALREADY REGISTERED TO THE USER
	if(isset($_GET['matchid']))
	{
		$match=curlPost($_GET['match_id'],'http://admin:1234@162.209.21.251/engage_cms/engage/api/quizsql/findMatchId/');
		if($match>0)
		{
			if($match[0]['match_player_b']!='' && $match[0]['match_player_b']!=$name)
			{
				$status=1;
			}
		}
	}
	$frRes=json_decode(file_get_contents('http://admin:1234@162.209.21.251/engage_cms/engage/api/quizsql/findMatch/find/match/format/json'),TRUE);
	if($frRes != 0)
	{
		$matchid = $frRes[0]['match_id'];
		$updateDtl=array('player'=>$name,'id'=>$matchid);
		$updateUrl='http://admin:1234@162.209.21.251/engage_cms/engage/api/quizsql/joinMatch/';
		$updateDb=curlPost($updateDtl,$updateUrl);
		$status=($updateDb==true)?1:"";
	}
	else
	{
		$createDtl=array('player'=>$name);
		$createUrl='http://admin:1234@162.209.21.251/engage_cms/engage/api/quizsql/createMatch/';
		$createDb=curlPost($createDtl,$createUrl);
		$matchid=$createDb;
	}
}
$arr = array('matchid' => $matchid, 'status' => $status);

echo json_encode($arr);

?>