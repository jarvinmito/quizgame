<?php
// CREATING A MATCH
require "init.php";
/*
$url = 'http://admin:1234@192.168.20.75/engage/api/mchoice/quizCreateMatch/';
$fields = array(
	'player' => urlencode('Player1'),
	'fname' => urlencode('b'),
	'title' => urlencode('c'),
	'company' => urlencode('d'),
	'age' => urlencode('e'),
	'email' => urlencode('f'),
	'phone' => urlencode('g')
);

//url-ify the data for the POST
$fields_string="";
foreach($fields as $key=>$value) 
{$fields_string .= $key.'='.$value.'&'; }
rtrim($fields_string, '&');

//open connection
$ch = curl_init();

//set the url, number of POST vars, POST data
curl_setopt($ch,CURLOPT_URL, $url);
curl_setopt($ch,CURLOPT_POST, count($fields));
curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);

//execute post
$result = curl_exec($ch);

//close connection
curl_close($ch);
$matchid=$result;
*/
$matchid = 0;
$isWaiting = true;
$name = $_GET['name'];

$sql = "INSERT INTO engage_match VALUES ('','$name','','waiting')";
if(mysqli_query($conn, $sql)){
	// ROOM CREATED
	// NOW WHAT?
	$matchid = mysqli_insert_id($conn);
	// WE WAIT...
}

mysqli_close($conn);

$arr = array('matchid' => $matchid, 'isWaiting' => $isWaiting);
echo json_encode($arr);

?>