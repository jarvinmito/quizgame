<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


$hostname = "localhost";
$dbname = "engage";
$dbuser = "root";
$dbpass = "";

// Create connection
$conn = mysqli_connect($hostname, $dbuser, $dbpass, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$matchid = 0;
$status = 0; // 0 = waiting, 1 = ongoing, 2 = ended

if(isset($_GET['name'])){
	$name = trim($_GET['name']);

	// FINDING OF MATCH IF IT IS ALREADY REGISTERED TO THE USER
	if(isset($_GET['matchid'])){
		$fq = "SELECT * FROM engage_match WHERE match_id=".$_GET['matchid'];
		$findMatch = mysqli_query($conn, $fq);
		if(mysqli_num_rows($findMatch) != 0){
			$get = mysqli_fetch_array($findMatch);
			if($get['match_player_b'] != "" && $get['match_player_a'] != $name){
				// start game
				$status = 1;
			}
			// wait
		}
	}

	// CREATION OF ROOM
	// FIND EXISTING ROOM
	$frq = "SELECT * FROM engage_match WHERE match_player_b=''";
	$frRes = mysqli_query($conn, $frq);
	if(mysqli_num_rows($frRes) != 0){
		// FOUND!! JOIN ROOM
		$gfr = mysqli_fetch_array($frRes);
		$matchid = $gfr['match_id'];
		// UPDATE DB
		$ufr = "UPDATE engage_match SET match_player_b='$name' WHERE match_id=$matchid";
		if( mysqli_query($conn, $ufr)){
			// START GAME
			$status = 1;
		}
	}else{
		// CREATE A ROOM
		$cr = "INSERT INTO engage_match VALUES ('','$name','','initial')";
		if( mysqli_query($conn, $cr) ){
			// SUCCESS
			$matchid = mysqli_insert_id($conn);
			// wait for an opponent
		}
	}
}

mysqli_close($conn);

$arr = array('matchid' => $matchid, 'status' => $status);

// $json = "{ 'matchid' : '".$matchid."', 'status' : '".$status."'}";
echo json_encode($arr);

?>