<?php
// CREATING A MATCH
require "init.php";

$matchid = $_GET['matchid'];
$isWaiting = true;
$name = $_GET['name'];
$matchDtl=array('id'=>$matchid);
$match=curlPost($matchDtl,'http://admin:1234@162.209.21.251/engage_cms/engage/api/quizsql/findMatchId/');
$q_match=json_decode($match,TRUE);
$player=$q_match[0]['match_player_b'];
if($match)
{$isWaiting =($player!='')?false:true;}
$arr = array('matchid' => $matchid, 'isWaiting' => $isWaiting);
echo json_encode($arr);	

?>