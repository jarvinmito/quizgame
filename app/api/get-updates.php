<?php
// CREATING A MATCH
require "init.php";

$matchid = $_POST['matchid'];
$currentRound = $_POST['currRound'];

$sql = "SELECT * FROM engage_scoreboard WHERE match_id=$matchid AND score_id=$currentRound";
$res = mysqli_query($conn, $sql);

$score = array();

if(mysqli_num_rows($res) != 0){
	while($row = mysqli_fetch_array($res)){
		// Create array
		$score[$row['score_position']] = array('score' => $row['score_value'], 'answer' => $row['score_answer']);
	}
	// Yes inserted
	$status = 'success';
}

mysqli_close($conn);

// $arr = array('score' => $score);
echo json_encode($score);

?>