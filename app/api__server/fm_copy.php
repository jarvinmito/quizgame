<?php
/*
mongodb-src-r3.2.3
mongod.exe --install --config C:\wamp\bin\mongodb\mongodb-latest\conf\mongodb.conf --logpath C:\wamp\bin\mongodb\mongodb-latest\logs\mongodb.log
mongod.exe --install --config C:\wamp\bin\mongodb\mongodb-win32-x86_64-2008plus-ssl-3.2.2-117-ge7ec545\conf\mongodb.conf --logpath C:\wamp\bin\mongodb\mongodb-win32-x86_64-2008plus-ssl-3.2.2-117-ge7ec545\logs\mongodb.log
;C:\wamp\bin\mongodb\mongodb-win32-x86_64-2008plus-ssl-3.2.2-117-ge7ec545\bin;C:\wamp\bin\php\php5.5.12
*/
// FINDING MATCH
require "init.php";

$matchid = 0;
$isWaiting = true;
$name = $_GET['name'];

$frq = "SELECT * FROM engage_match WHERE match_player_b=''";
$frRes = mysqli_query($conn, $frq);

if(mysqli_num_rows($frRes) != 0){
	// FOUND!! JOIN ROOM
	$gfr = mysqli_fetch_array($frRes);
	$matchid = $gfr['match_id'];
	// UPDATE DB
	$ufr = "UPDATE engage_match SET match_player_b='$name', match_status='ongoing' WHERE match_id=$matchid";
	if( mysqli_query($conn, $ufr)){
		// START GAME
		$isWaiting = false;
	}
}else{
	// CREATE A ROOM NOW!
	$sql = "INSERT INTO engage_match VALUES ('','$name','','waiting')";
	if(mysqli_query($conn, $sql)){
		$matchid = mysqli_insert_id($conn);
	}
}

mysqli_close($conn);

$arr = array('matchid' => $matchid, 'isWaiting' => $isWaiting);
echo json_encode($arr);

?>