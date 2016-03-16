<?php
// GET QUESTIONS
require "init.php";

$questions[] = array(
	'question' => 'Who is the National Hero of the Philippines?',
	// 'image' => 'http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png',
	'options' => array('Jose Rizal', 'Jose Santos', 'Reynier Niebres', 'James Domingo'),
	'answer' => 0
	);

$questions[] = array(
	'question' => 'Who is the greatest Filipino Painter?',
	'options' => array('Arley Carig', 'Ronald Diata', 'Juan Luna', 'Eden Morales'),
	'answer' => 2
	);

$questions[] = array(
	'question' => 'Who is the Founder of the Katipunan?',
	'options' => array('Don Bencilao', 'Andres Bonifacio', 'Gabriel Domingo', 'Marko Anson'),
	'answer' => 1
	);

$questions[] = array(
	'question' => 'What is the color of the 1,000 peso bill?',
	'options' => array('Fuschia Fink', 'Blue', 'Green', 'Yellow'),
	'answer' => 1
	);

$questions[] = array(
	'question' => 'What is the title of the Philippine National Anthem?',
	'options' => array('Bayang Magiliw', 'Ed Sheeran', 'Twerk it like maling', 'Lupang Hinirang'),
	'answer' => 3
	);

$questions[] = array(
	'question' => 'Kilala bilang "Huseng Batute"',
	'options' => array('Apolinario Mabini', 'Jose Corazon de Hesus', 'Gregorio H. del Pilar', 'Melchora Aquino'),
	'answer' => 1
	);

$questions[] = array(
	'question' => 'What is the national flower of the Philippines?',
	'options' => array('Sampaguita', 'Rose', 'Ilang Ilang', 'Daisy'),
	'answer' => 0
	);

$questions[] = array(
	'question' => 'Who of the following explorers arrived in the Philippines in 1521?',
	'options' => array('Aubrey', 'Jaynard', 'Elaine', 'Marko'),
	'answer' => 0
	);

$arr = array('questions' => $questions);
echo json_encode($arr);

?>