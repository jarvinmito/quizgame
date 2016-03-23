/*!---------------------------------------------------------------------
 * ---------------------------------------------------------------------
 * ------------██╗---██╗-██████╗-███╗---██╗██████╗-██╗---██╗------------
 * ------------╚██╗-██╔╝██╔═══██╗████╗--██║██╔══██╗██║---██║------------
 * -------------╚████╔╝-██║---██║██╔██╗-██║██║--██║██║---██║------------
 * --------------╚██╔╝--██║---██║██║╚██╗██║██║--██║██║---██║------------
 * ---------------██║---╚██████╔╝██║-╚████║██████╔╝╚██████╔╝------------
 * ---------------╚═╝----╚═════╝-╚═╝--╚═══╝╚═════╝  ╚═════╝-------------
 * ---------------------------------------------------------------------
 * ----------------------Technology Made Human--------------------------
 * ---------------------------------------------------------------------
 * ---------------------------------------------------------------------
*/
// Project Name :: Project Engage
// App Core Functions

var App = (function(){

	// Start Setup
	// Purpose : Holds necessary information about the Game App
	var configMap = {
			plstore : {
				id : 'PLAYER__ID',
				name : 'PLAYER__NAME',
				match : 'MATCH__DETAILS',
				mode : 'OPEN__TYPE'
			},
			apis : {
				base : 'http://192.168.20.83/project_engage/app/api/',
				api : {
					'find' : 'fm.php',
					'create' : 'cm.php',
					'wait' : 'wm.php',
					'update-score' : 'update-score.php',
					'get-updates' : 'get-updates.php',
					'players' : 'players.php',
					'questions' : 'questions.php',
					'get-match-status' : 'get-match-status.php'
				}
			},
			// Questions
			// { questions : { question : question text, options : [ answer, answer etc. ], answer : correct answer } }
			qs : {},
			// Players
			// { players : { a : {name : name, badge : badge, place : place, score : score } } }
			ps : {},
			topic : {},
			match : {},
			player : {}, //current player
			playerLocalPos : {}, // location of players locally
			// Scoreboard
			// { round : { playera : { score : score, answer : answer }, playerb : { score : score, answer : answer } } }
			scores : {},
			matchid : 0,
			matchStatus : 'find', // find, create, wait
			playStatus : 0, // 0 = waiting a match, 1 = ongoing match, 2 = ended match
			waitTimer : { timing : null, delay : 1000, currentTime : 1},
			findMatchTimer : { timing : null, delay : 3000, maxTries : 30, currentTries : 1},
			matchTimer : { timing : null, delay : 5000 },
			roundTimer : { timing : null, delay : 2000 },
			questTimer : { timing : null, delay : 2000 },
			gameTimer : { timing : null, delay : 1000, points : 10 },
			roundEndTimer : {timing : null, delay : 3000 },
			maxScorePerRound : 10,
			currentRound : 1,
			currentRoundisFin : false,
			currentScore : {},
			hasAnswered : false,
			modal : {},
			// findmatch - finding a matching
			// waiting - waiting for other player's response
			// versus - display the versus page
			// round - display the current round
			// question - render players and scores, question and choices
			// result - display result page
			currentScreen : 'findmatch',
			audio : {
				files : {
					bg_random : ['assets/audio/bg_random1.mp3'],
					sfx_correct : ['assets/audio/sfx-correct.mp3'],
					sfx_incorrect : ['assets/audio/sfx-incorrect1.mp3'],
					sfx_versus : ['assets/audio/sfx-versus1.mp3']
				},
				sfx : {}
			}
		},
		jqueryMap = {
			$main : $('.engage'),
			$header : $('<div/>').addClass('engage__header'),
			$ingame : $('<div/>').addClass('engage__body')
		};
	// End Setup

	// Start Module /initSetup/
	// Purpose : Defaults all properties in the game
	var initSetup = function(){
		var match_details = localStorage[configMap.plstore.match];
		var match_json = stringToJSON(match_details);

		if( configMap.isStatic ){
			// Static
			configMap.game = {
				"id" : 1,
				"name" : "Quiz Game",
				"type" : "multiple choice"
			};

			configMap.topic = {
				"id" : 1,
				"name" : "Paborito ng mga Pinoy",
				"icon" : "assets/images/yeah.jpg"
			};

			configMap.match = {
				"id" : 1,
				"status" : "ongoing",
				"isactive" : {
				    "a" : true,
				    "b" : true
				}
			};

			configMap.qs = {
				"questions" : [
					{
						"id" : 1,
						"question" : "Question Text 1?",
						"options" : ["A" , "B" , "C" , "D"],
						"answer" : 0
					},
					{
						"id" : 2,
						"question" : "Question Text 2?",
						"options" : ["A" , "B" , "C" , "D"],
						"answer" : 2
					},
					{
						"id" : 3,
						"question" : "Question Text 3?",
						"options" : ["A" , "B" , "C" , "D"],
						"answer" : 1
					},
					{
						"id" : 4,
						"question" : "Question Text 4?",
						"options" : ["A" , "B" , "C" , "D"],
						"answer" : 3
					},
					{
						"id" : 5,
						"question" : "Question Text 5?",
						"options" : ["A" , "B" , "C" , "D"],
						"answer" : 1
					},
					{
						"id" : 6,
						"question" : "Question Text 6?",
						"options" : ["A" , "B" , "C" , "D"],
						"answer" : 2
					},
					{
						"id" : 7,
						"question" : "Question Text 7?",
						"options" : ["A" , "B" , "C" , "D"],
						"answer" : 3
					}
				]
			};

			configMap.ps = {
				"players" : {
					"a" : {
						"id" : 1,
						"name" : "Kalabaw",
						"badge" : "Badz",
						"place" : "a",
						"score" : 0,
						"isactive" : true
					},
					"b" : {
						"id" : 2,
						"name" : "Baka",
						"badge" : "Despicable",
						"place" : "b",
						"score" : 0,
						"isactive" : true
					}
				}
			};
		}else{
			// Server-Client-side
			configMap.game = match_json.game;
			configMap.topic = match_json.topic;
			configMap.match = match_json.match;
			configMap.qs = match_json.qs;
			configMap.ps = match_json.ps;
		}

		

		configMap.scores = {};

		// Client-side
		configMap.playerLocalPos = {};
		configMap.matchid = configMap.match.id;
		// configMap.matchStatus = 'find';
		configMap.matchStatus = configMap.match.status;
		configMap.currentRound = 1;
		configMap.currentRoundisFin = false;
		configMap.hasAnswered = false;

		// Set local storage value for player
		// later to be changed to localStorage[configMap.plstore.id]
		// if( !localStorage[configMap.plstore.name] ){
		// 	configMap.player.name = 'Kalabaw' + Math.random().toString(36).substr(2,5);
		// 	localStorage[configMap.plstore.name] = configMap.player.name;
		// }

		// uncomment this if using LOCALSTORAGE
		configMap.player.name = localStorage[configMap.plstore.name];

		// if( !sessionStorage[configMap.plstore.name] ){
			// comment next line if using LOCALSTORAGE
			// configMap.player.name = 'Kalabaw' + Math.random().toString(36).substr(2,5);
			// sessionStorage[configMap.plstore.name] = configMap.player.name;
		// }

		// configMap.player.name = sessionStorage[configMap.plstore.name];
	};
	// End Module /initSetup/

	// Start Module /resetSetup/
	// Purpose : resets the App settings
	var resetSetup = function(){
		configMap.game = {};
		configMap.topic = {};
		configMap.ps = {};
		configMap.qs = {};
	};
	// End Module /resetSetup/

	// Start Module /startTimer/
	// Purpose : Executes timer function depending on mode / page
	// Modes : versusDelay, roundDelay, questionDelay, timer
	var startTimer = function(mode){
		mode.timing = setTimeout(function(){
			mode.callback();
		}, mode.delay);
	};
	// End Module /startTimer/

	// Start Module /endTimer/
	// Purpose : Ends timer function depending on mode / page
	// Modes : versusDelay, roundDelay, questionDelay, timer
	var endTimer = function(mode){
		clearTimeout(mode.timing);
	};
	// End Module /endTimer/


	// Start Module /bind/
	// Purpose : Binds click on each option
	var bind = function(){
		// Main Play button
		if( $('.btn__play').length ){
			$('.btn__play').click(function(){
				configMap.player.name =  $('#name').val() || 'Kalabaw' + Math.random().toString(36).substr(2,5);
				findMatch();
			});
		}

		if( $('.options').length ){
			$('.options').click(function(){
				checkAnswer($(this));
			});
		}

		if( $('.btn__play-again').length ){
			$('.btn__play-again').click(function(){
				// Match for the same players
				findMatch();
			});
		}

		if( $('.btn__play-random').length ){
			$('.btn__play-random').click(function(){
				// Match for another random player
				findMatch();
			});
		}

		if( $('.btn__stats').length ){
			$('.btn__stats').click(function(){
				// Displays Statistics page
				renderStats();
			});
		}

		if( $('.btn__leave').length ){
			$('.btn__leave').click(function(){
				renderLanding();
			});
		}


		// Modal Section
		if( $('.pop-up__exit').length ){
			$('.pop-up__exit').click(function(){
				freeze();
				resetSetup();
				window.close();
			});
		}
	};
	// End Module /bind/

	// Start Module /bind/
	// Purpose : Binds click on each option
	var unbind = function(){
		if( $('.options').length ){
			$('.options').unbind('click');
		}
	};
	// End Module /bind/


	// Start Module /checkAnswer/
	// Purpose : Check current answer locally
	var checkAnswer = function(input){
		// console.log(input);
		var gq = configMap.qs.questions[configMap.currentRound - 1], // GameQuestion
			ga = gq.answer, // GameAnswer
			pa = (input) ? input.data('value') : null, // PlayerAnswer
			pts = configMap.gameTimer.points, // Points Earned
			isCorrect = false; // Answer Validation

		if(pa !== null){
			if(ga === pa){
				isCorrect = true;
				// Play sfx
				configMap.audio.sfx.sfx_correct.play();

				input.addClass('btn-success');
			}else{
				pts = 0;

				// Play sfx
				configMap.audio.sfx.sfx_incorrect.play();
				input.addClass('btn-danger');
			}
			// indicate my answer
			var newAnswer = $('<span/>');
			newAnswer.addClass('answer-me');
			input.append(newAnswer);
			// input.addClass('answer-me');
		}

		configMap.hasAnswered = true;
		// Update Database here
		updateScore(pa, pts, isCorrect);
		unbind();
	};
	// End Module /checkAnswer/

	// Start Module /updateScore/
	// Purpose : Updates score locally and server-side-ly lol!
	var updateScore = function(answer, points, isCorrect){
		// Update codes to server
		// update score locally
		 // score = configMap.player.score || 0, // The Score ... to be changed later
		var player = $('.header__player[data-id="'+configMap.player.place+'"]'); // Current Player Container

		// configMap.currentScore[configMap.currentRound - 1] = score;
		if(isCorrect){
			// Update score locally
			var players = configMap.ps.players[configMap.player.place],
				curRound = configMap.currentRound,
				rounds = configMap.qs.questions.length;

			// Double points if last 2 rounds
			points = (curRound >= rounds - 1) ? parseInt(points) * 2 : points ;

			// for(var key in players){
			if(players.place == configMap.player.place){
				configMap.player.score = configMap.player.score + points;
			}
			// }
			console.log(players.place, configMap.player.score);
			// Updates the Score container of the Player
			// var total = parseInt(player.find('.player__score').html()) + points;
			player.find('.player__score').html(configMap.player.score);

			// for(var idx in configMap.ps.players){
			// 	if(configMap.ps.players[idx].place == configMap.player.place){
			// 		console.log(configMap.ps.players[idx].score);
			// 		configMap.ps.players[idx].score = total;
			// 		console.log(configMap.ps.players[idx].score);
			// 	}
			// }
		}
		// reserve for later coding
		// insert server side request here hehe
		var pdata = {
				matchid : configMap.matchid,
				currRound : configMap.currentRound,
				position : configMap.player.place,
				score : points,
				answer : answer
			},
			durl = configMap.apis.base + configMap.apis.api['update-score'];

		$.ajax({
			url : durl,
			method : 'post',
			data : pdata,
			success : function(result){
				// configMap.currentRoundisFin = (result['score'].length == 2) ? true : false;
				// console.log('update happened', result);
			},
			error: function(xhr){
				console.log('error!');
			}
		});
		// update score here -- get score on the other side
		// if the update is complete (with player score and opponent score)
		// mark round as end
		// var complete = true; // this is just a sample
	};
	// End Module /updateScore/

	// Start Module /endRound/
	// Purpose : Mark as end round
	var endRound = function(){
		endTimer(configMap.gameTimer);
		configMap.gameTimer.timing = null;

		var questions = configMap.qs.questions,
			correctAnswer = questions[configMap.currentRound - 1].answer;

		// This shows the Correct answer
		$('.options[data-value="'+correctAnswer+'"]').addClass('btn-success');
		
		configMap.currentRound++;
		configMap.gameTimer.points = 10;
		configMap.roundEndTimer.callback = (configMap.currentRound <= questions.length) ? renderBattlefield : renderResults;
		startTimer(configMap.roundEndTimer);

	};
	// End Module /endRound/

	// Start Module /getPlayerProps/
	// Purpose : separated player
	var getPlayerProps = function(){
		var me = configMap.player,
			op = '';
		for(var p in configMap.ps.players){
			if(p != me.place){
				op = configMap.ps.players[p];
			}
		}

		return {
			me : me,
			op : op
		}
	};
	// End Module /getPlayerProps/

	// Start Module /renderStats/
	// Purpose : Displays the statistics of the match
	var renderStats = function(){

		jqueryMap.$main.html(App.Templates['statistics']({}));
	};
	// End Module /renderStats/


	// Start Module /renderResults/
	// Purpose : Displays the result of the match
	var renderResults = function(){
		var players = getPlayerProps(),
			me = players.me,
			op = players.op,
			status = 'Yehey!',
			result = 'win';

		if(me.score > op.score){
			status = 'Yehey!';
			result = 'win';
		}else if(me.score == op.score){
			status = 'It\' a tie!';
			result = 'win';
		}else{
			status = 'Boohoo!';
			result = 'lose';
		}

		var playerdata = { me : me, opponent : op, status : status, result : result };
		jqueryMap.$main.html(App.Templates['results']({ player : playerdata }));
		bind();
		
		// Reset States here
		initSetup();
	};
	// End Module /renderResults/

	// Start Module /renderModal/
	// Purpose : Displays an info modal
	var renderModal = function(){
		var $container = jqueryMap.$main;

		$container.append(App.Templates['modal']({ modal : configMap.modal }));
		bind();

	};
	// End Module /renderModal/

	// Start Module /renderWaiting/
	// Purpose : Displays the waiting page when the user has sent a challenge request
	var renderWaiting = function(){
		console.log('rendering Waiting Page ---->');

		var $container = jqueryMap.$main;
		var time = configMap.waitTimer.currentTime;

		$container.html(App.Templates['waiting']({time : time, topic : configMap.topic }));
		startTimer(configMap.waitTimer);
	};
	// End Module /renderWaiting/

	// Start Module /waitTimer/
	// Purpose : Increase time and format to minutes
	var renderTimer = function(){
		var time = configMap.waitTimer.currentTime;
		time++;
		configMap.waitTimer.currentTime = time;

		var $container = jqueryMap.$main;
		var $timer = $container.find('.waiting-screen__timer');

		$timer.html(App.Templates['waiting-timer']({ time : configMap.waitTimer.currentTime }));
		
		// Every 2 seconds get an update form server
		if(time % 2 == 0){
			getMatchStatus();
		}

		endTimer(configMap.waitTimer);
		startTimer(configMap.waitTimer);
	};
	// End Module /waitTimer/

	// Start Module /getMatchStatus/
	// Purpose : To get the match status
	// Access Mode : Challenger
	var getMatchStatus = function(){
		var data = {
			matchid : configMap.match.id,
			name : configMap.player.name
		};

		$.ajax({
			method : 'post',
			url : configMap.apis.base + configMap.apis.api['get-match-status'],
			data : data,
			success : function(result){
				console.log(result);
				if( result.status ){
					var status = result.status;

					if( status == 'ongoing' ){
						// Set to local configuration
						configMap.match.status = status;

						// End Timer
						endTimer(configMap.waitTimer);

						// Render VS
						renderVS();
					}else if( status == 'reject' ){

						// Set to local configuration
						configMap.match.status = status;

						// End Timer
						endTimer(configMap.waitTimer);

						// Render Modal
						configMap.modal.title = "Awww...";
						configMap.modal.message = "Your opponent did not accept your challenge."
						renderModal();
					}

				}else{
					console.log(result);
				}
			}
		});
	};
	// End Module /getMatchStatus/


	// Start Module /renderBattlefield/
	// Purpose : Displays the current round of the match
	// Modes : versusDelay, roundDelay, questionDelay, timer
	var renderBattlefield = function(){
		console.log('rendering Battlefield --->', configMap.currentRound);
		// render Header
		var $container = jqueryMap.$main,
			$header = jqueryMap.$header,
			$ingame = jqueryMap.$ingame,
			questions = configMap.qs.questions,
			round = (configMap.currentRound == questions.length) ? 'final' : configMap.currentRound;
			roundText = (configMap.currentRound == questions.length) ? 'Final Round' : 'Round '+configMap.currentRound;
		
		$container.html($header.html(App.Templates['header']({player : configMap.playerLocalPos, game : configMap.gameTimer})));
		
		configMap.hasAnswered = false;
		// render Round
		$container.append($ingame.html(App.Templates['round']({round : roundText, topic : configMap.topic })));
		
		// Play sound
		// roundCaller(round);

		endTimer(configMap.matchTimer);
		startTimer(configMap.roundTimer);
	};
	// End Module /renderBattlefield/


	// Start Module /renderVS/
	// Purpose : displays the Versus page
	// First Step that will happen after launching
	var renderVS = function(){
		console.log('rendering Versus ---->');

		var players = configMap.ps.players;
		var player = configMap.player.name;

		var player_a = configMap.ps.players.a;

		if( player_a.isactive ){
			// Render 

			// Find current player and set his place/position
			for(var key in players){
				if (players.hasOwnProperty(key)){
					if(players[key].name == player){
						configMap.playerLocalPos.left = players[key];
						configMap.player = players[key];
						// Set final value for player inside the local storage
						// include player id here later........
						// uncomment me later....
						// localStorage[configMap.plstore.name] = configMap.player.name;
						// sessionStorage[configMap.plstore.name] = configMap.player.name;
						configMap.player.place = players[key].place;
					}else{
						configMap.playerLocalPos.right = players[key];
					}
				}
			}

			jqueryMap.$main.html(App.Templates['versus']({player : configMap.playerLocalPos}));

			// Play sfx
			configMap.audio.sfx.bg_random.stop();
			configMap.audio.sfx.sfx_versus.play();

			startTimer(configMap.matchTimer);
		}


		if( !player_a.isactive && localStorage[configMap.plstore.mode] == "join"){
			// Render Modal
			configMap.modal.title = "Uh oh...";
			configMap.modal.message = "Your opponent has left the game."
			renderModal();
		}
	};
	// End Module /renderVS/

	// Start Module /renderQuestion/
	// Purpose : displays the Question
	var renderQuestion = function(){
		console.log('rendering Question ---->');
		var q = configMap.qs.questions[configMap.currentRound - 1],
			$container = jqueryMap.$ingame;

		var $question = $('<div class="ingamge__question" />');
		var $image = $('<div class="ingame__image" />');
		var $options = $('<div class="ingame__options" />');
		var $main = ( !q.image ) ? $question : $image;

		$main.html(App.Templates['question']({ data : q }));
		$container.html($main);
		$container.append($options);

		endTimer(configMap.roundTimer);
		startTimer(configMap.questTimer);
	};
	// End Module /renderQuestion/


	// Start Module /renderOptions/
	// Purpose : displays the choices for the question
	var renderOptions = function(){
		console.log('rendering Options ---->');
		var q = configMap.qs.questions[configMap.currentRound - 1],
			$container = jqueryMap.$ingame;

		var optionClass = (q.image) ? 'ingame__options--half' : 'ingame__options--full';

		$container.find('.ingame__options').addClass(optionClass).html(App.Templates['options']({ data : q }));
		bind();
		endTimer(configMap.questTimer);
		startTimer(configMap.gameTimer);
	};
	// End Module /renderOptions/

	// Start Module /renderLanding/
	// Purpose : Displays Initial Page
	var renderLanding = function(){
		jqueryMap.$main.html(App.Templates['landing']());
		bind();
	};
	// End Module /renderLanding/

	// Start Module /renderUpdatedScore/
	// Purpose : Displays the updated score that came from the server
	var renderUpdatedScore = function(){
		// Accumulate point updates from server
		for(var cpos in configMap.ps.players){
			var totalScore = 0;

			for(var rpos in configMap.scores ){
				for(var ipos in configMap.scores[rpos]){
					if(cpos == ipos){
						totalScore = totalScore + parseInt(configMap.scores[rpos][ipos].score);
					}
				}
			}

			configMap.ps.players[cpos].score = totalScore;
		}

		$.each($('.header__player'), function(){
			var id = $(this).data('id');
			// console.log('scores --->', id, configMap.ps.players[id].score);
			$(this).find('.player__score').html(configMap.ps.players[id].score);
		});
	};
	// End Module /renderUpdatedScore/


	// ====================== SERVER METHODS ======================
	// Start Module /getUpdates/
	// Purpose : Check server for updates
	var getUpdates = function(){
		// console.log('getUpdates ---->', configMap.scores);
		configMap.gameTimer.points = configMap.gameTimer.points - 1;

		endTimer(configMap.gameTimer);
		startTimer(configMap.gameTimer);

		if (configMap.gameTimer.points >= 0 && configMap.gameTimer.timing !== null){
			$('.header__points').html(App.Templates['header-points']({ game : configMap.gameTimer }));

			if(configMap.gameTimer.points == 0){
				if(!configMap.hasAnswered){
					checkAnswer();
				}
			}

		}else if(configMap.gameTimer.points < 0){
			unbind();
		}


		// Update from server here
		if( configMap.gameTimer.points % 2 == 0){
			var uurl = configMap.apis.base + configMap.apis.api['get-updates'],
				udata = {};

				udata.matchid = configMap.matchid;
				udata.currRound = configMap.currentRound;

			$.ajax({
				url : uurl,
				method : 'post',
				data : udata,
				dataType : 'json',
				success : function(result){


					configMap.scores[configMap.currentRound] = result;
					console.log(configMap.matchid, configMap.player.name);

					resLen = 0;
					for(var i in result){
						resLen++;
					}

					configMap.currentRoundisFin = (resLen == 2) ? true : false;
					
					// console.log('results and shit ---->');
					// console.log(result.score);
					// console.log(configMap.currentRoundisFin, configMap.scores);

					if( configMap.currentRoundisFin ){
						// show opponent's answer
						var oppP = configMap.playerLocalPos.right.place,
							oppA = configMap.scores[configMap.currentRound][oppP].answer,
							gq = configMap.qs.questions[configMap.currentRound - 1], // GameQuestion
							ga = gq.answer; // GameAnswer

						if( oppA != ""){
							var buttonAnswer = $('.options[data-value="'+oppA+'"]');
							if( ga == oppA ){
								buttonAnswer.addClass('btn-success');
							}else{
								buttonAnswer.addClass('btn-danger');
							}

							var newAnswer = $('<span/>');
							newAnswer.addClass('answer-opponent');

							buttonAnswer.append(newAnswer);
						}

						// show updated scores
						renderUpdatedScore();
						
						// ends the round and start a new
						endRound();
						// console.log('fudge!', configMap.currentRoundisFin);
					}
				},
				error : function(xhr){
					console.log('oh noe!');
				}
			});
		}
	};
	// End Module /getUpdates/

	// Start Module /initPlayers/
	// Purpose : set the states of the players
	// var initPlayers = function(){

	// };
	// End Module /initPlayers/

	// Start Module /getFile/
	// Purpose : retrieve json files depending on "mode"
	// Modes : ps -> players.json, qs -> questions.json etc. 
	var getFile = function(mode, callback){
		var urls = {
				'ps' : {
					url : configMap.apis.base + configMap.apis.api.players,
					udata : {
						matchid : configMap.matchid
					} 
				},
				'qs' : {
					// url : 'http://admin:1234@192.168.20.75/engage/api/mchoice/dtl/id/quiz/format/json',
					url : configMap.apis.base + configMap.apis.api.questions
				}
			},
			data = (urls[mode].udata) ? urls[mode].udata : {},
			url = urls[mode].url;

		$.ajax({
			url : url,
			method : 'get',
			data : data,
			success : function(result){
				configMap[mode] = result;
				console.log(mode, configMap[mode]);
				if(typeof callback == 'function'){
					callback();
				}
			},
			error : function(xhr){
				console.log('fudge on loading profiles! ', xhr);
			}
		});
	};
	// End Module /getFile/

	// Start Module /createMatch/
	// Purpose : started when no available room
	// var createMatch = function(){
	// 	console.log('Create a match ---->');

	// 	configMap.matchStatus = 'create';
	// 	// configMap.findMatchTimer.callback = waitCallback('create');
	// 	startTimer(configMap.findMatchTimer);
	// };
	// End Module /createMatch/

	// Start Module /findMatch/
	// Purpose : After Clicking play, creates/joins a match
	var findMatch = function(){
		console.log('Find a match ---->');
		configMap.matchStatus = 'find';

		// Play sound
		configMap.audio.sfx.bg_random.play();
		jqueryMap.$main.html(App.Templates['loading']());

		configMap.findMatchTimer.callback = waitCallback;
		startTimer(configMap.findMatchTimer);
	};
	// End Module  /findMatch/

	// Start Module /waitMatch/
	// Purpose : started when no available room
	var waitMatch = function(){
		console.log('waiting a match ---->');

		configMap.matchStatus = 'wait';
		// configMap.findMatchTimer.callback = waitCallback('create');
		startTimer(configMap.findMatchTimer);
	};
	// End Module /waitMatch/

	// Start Module /waitCallback/
	// Purpose : called when finding / creating a match
	var waitCallback = function(){
		var urls = configMap.apis.api,
			base = configMap.apis.base,
			data = {},
			timer = configMap.findMatchTimer;

		data.name = configMap.player.name;
		data.matchid = configMap.matchid;

		// console.log(configMap.player, localStorage.player);
		console.log(configMap.player.name);

		if(timer.currentTries <= timer.maxTries){
			$.ajax({
				url : base + urls[configMap.matchStatus],
				method : 'get',
				data : data,
				success : function(result){
					ajxCallback(result);
				},
				error : function(xhr){
					console.log('fudge on finding match! ', xhr);
				}
			});
			
		}else{
			console.log('end timer ---->');
			endTimer(configMap.findMatchTimer);
			configMap.findMatchTimer.currentTries = 1;
		}
	};
	// End Module /waitCallback/


	// Start Module /ajxCallback/
	// Purpose : async callback
	var ajxCallback = function(result){
		var maxTries = configMap.findMatchTimer.maxTries,
			curTries = configMap.findMatchTimer.currentTries;

		console.log(configMap.matchStatus, 'Match ID: ' + configMap.matchid, 'Player: ' + configMap.player.name);
		console.log(configMap.findMatchTimer.currentTries);

		configMap.matchid = result.matchid;

		if(result.isWaiting){
			
			if(result.matchid != 0){
				// Match is already created
				if(maxTries > curTries){
					// not met max tries.. still waiting
					configMap.findMatchTimer.currentTries = curTries + 1;
					console.log('Waiting...' + configMap.findMatchTimer.currentTries);
					waitMatch();
				}else{
					// abort waiting..
					configMap.findMatchTimer.currentTries = 1;
					console.log('Abort Waiting...');
					endTimer(configMap.findMatchTimer);
				}
			}
		}else{
			// Start game
			configMap.findMatchTimer.currentTries = 1;
			endTimer(configMap.findMatchTimer);
			console.log('Start the game......');
			
			// Initialize Game
			// initGame();
			// get questions
			getFile('qs');
			// get profiles
			getFile('ps', renderVS);
			// sh*t pants
		}

	};
	// End Module /ajxCallback/

	// Start Module /initGame/
	// Purpose : Initializes our Game
	var initGame = function(){
		configMap.waitTimer.callback = renderTimer;
		configMap.matchTimer.callback = renderBattlefield;
		configMap.roundTimer.callback = renderQuestion;
		configMap.questTimer.callback = renderOptions;
		configMap.gameTimer.callback = getUpdates;

		// Sounds
		// BG for Finding a Random Match
		configMap.audio.sfx.bg_random = new Howl({
			urls : configMap.audio.files.bg_random,
			loop: true,
			volume : 0.25
		});

		// SFX for Correct Answer
		configMap.audio.sfx.sfx_correct = new Howl({
			urls : configMap.audio.files.sfx_correct,
			volume : 0.5
		});

		// SFX for Incorrect Answer
		configMap.audio.sfx.sfx_incorrect = new Howl({
			urls : configMap.audio.files.sfx_incorrect,
			volume : 0.5
		});

		// SFX when displaying Versus Page
		configMap.audio.sfx.sfx_versus = new Howl({
			urls : configMap.audio.files.sfx_versus,
			volume : 0.5
		});


		// street fighter sfx
		configMap.audio.sfx.sfx_fight = new Howl({ urls : ['assets/audio/street_fighter/56H.wav'] });
		configMap.audio.sfx.sfx_round = new Howl({
			urls : ['assets/audio/street_fighter/5FH.wav'],
			onend : function(){
				configMap.audio.sfx['sfx_'+configMap.currentRound].play();
			}
		});
		configMap.audio.sfx.sfx_roundx = new Howl({ urls : ['assets/audio/street_fighter/5FH.wav'], onend : function(){ playFight(); } });
		configMap.audio.sfx.sfx_1 = new Howl({ urls : ['assets/audio/street_fighter/60H.wav'], onend : function(){ playFight(); } });
		configMap.audio.sfx.sfx_2 = new Howl({ urls : ['assets/audio/street_fighter/61H.wav'], onend : function(){ playFight(); } });
		configMap.audio.sfx.sfx_3 = new Howl({ urls : ['assets/audio/street_fighter/62H.wav'], onend : function(){ playFight(); } });
		configMap.audio.sfx.sfx_4 = new Howl({ urls : ['assets/audio/street_fighter/63H.wav'], onend : function(){ playFight(); } });
		configMap.audio.sfx.sfx_5 = new Howl({ urls : ['assets/audio/street_fighter/64H.wav'], onend : function(){ playFight(); } });
		configMap.audio.sfx.sfx_6 = new Howl({ urls : ['assets/audio/street_fighter/65H.wav'], onend : function(){ playFight(); } });
		configMap.audio.sfx.sfx_7 = new Howl({ urls : ['assets/audio/street_fighter/66H.wav'], onend : function(){ playFight(); } });
		configMap.audio.sfx.sfx_8 = new Howl({ urls : ['assets/audio/street_fighter/67H.wav'], onend : function(){ playFight(); } });
		configMap.audio.sfx.sfx_9 = new Howl({ urls : ['assets/audio/street_fighter/68H.wav'], onend : function(){ playFight(); } });
		configMap.audio.sfx.sfx_final = new Howl({
			urls : ['assets/audio/street_fighter/69H.wav'],
			onend : function(){
				configMap.audio.sfx.sfx_roundx.play();
			}
		});

		var playFight = function(){
			configMap.audio.sfx.sfx_fight.play();
		};


		console.log('Audio has been set');

	};
	// End Module /initGame/

	var roundCaller = function(round){
		if( round != "final" ){
			configMap.audio.sfx['sfx_round'].play();
		}else{
			configMap.audio.sfx['sfx_final'].play();
		}
	};

	
	// Start Module /initModule/
	// Purpose : Initializes our Environment App
	var initModule = function(){
		// mainit
		// initialization code for app here
		console.log('It\'s alive!!!');

		configMap.isStatic = true;

		initSetup();
		initGame();
		// for testing
		// renderLanding();

		var modes = {
			'random' : findMatch,
			'challenger' : renderWaiting,
			'join' : renderVS
		};

		var mode = localStorage['OPEN__TYPE'] || 'random';

		modes[mode]();

		console.log(mode);
		// Actual
		// localStorage.player.name = {};
	};

	var stringToJSON = function(str){
		return eval("(" + str + ")");
	};

	var jsonToString = function(json){
		return JSON.stringify(json);
	};

	// Jarvin utility functions
	// to be deleted on production

	var freeze = function(){
		endTimer(configMap.waitTimer);
		endTimer(configMap.roundTimer);
		endTimer(configMap.matchTimer);
		endTimer(configMap.questTimer);
		endTimer(configMap.gameTimer);
		endTimer(configMap.roundEndTimer);

		configMap.audio.sfx.bg_random.stop();
		configMap.audio.sfx.sfx_correct.stop();
		configMap.audio.sfx.sfx_incorrect.stop();
		configMap.audio.sfx.sfx_versus.stop();

		return false;
	};

	var setType = function(type){
		localStorage.setItem('OPEN__TYPE', type);
	};

	var setUser = function(user){
		localStorage.setItem('PLAYER__NAME', user);
	};

	var setStorage = function(){
		var data = {
			matchid : 0,
			ps : 'player1',
			qs : 'questions'
		};

		localStorage.setItem('ENGAGE__MATCH', JSON.stringify(data));
	};

	var getStorage = function(){
		var data = localStorage.getItem('ENGAGE__MATCH');
		var evaluate = eval("(" + data + ")");
		var json = JSON.stringify(evaluate);

		return evaluate;
	};


	return {
		initModule : initModule,
		freeze : freeze,
		setType : setType,
		setUser : setUser,
		setStorage : setStorage,
		getStorage : getStorage
	};

}());