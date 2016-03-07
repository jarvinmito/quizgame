<?php
// CREATING A MATCH
require "init.php";

$matchid = $_GET['matchid'];
$isWaiting = true;
$name = $_GET['name'];
$matchDtl=array('matchid'=>$matchid);
$match=curlPost($_GET['match_id'],'http://admin:1234@192.168.20.75/engage/api/quizsql/findMatchId/');
if($match>0)
{$isWaiting =($match[0]['match_player_b']!='')?false:"";}
$arr = array('matchid' => $matchid, 'isWaiting' => $isWaiting);
echo json_encode($arr);	

?>