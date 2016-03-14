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
				name : 'PLAYER__NAME'
			},
			apis : {
				base : 'http://192.168.20.16/project_engage/app/api/',
				api : {
					'find' : 'fm.php',
					'create' : 'cm.php',
					'wait' : 'wm.php',
					'update-score' : 'update-score.php',
					'get-updates' : 'get-updates.php',
					'players' : 'players.php',
					'questions' : 'questions.php'
				}
			},
			// Questions
			// { questions : { question : question text, options : [ answer, answer etc. ], answer : correct answer } }
			qs : {},
			// Players
			// { players : { a : {name : name, badge : badge, place : place, score : score } } }
			ps : {},
			player : {}, //current player
			playerLocalPos : {}, // location of players locally
			// Scoreboard
			// { round : { playera : { score : score, answer : answer }, playerb : { score : score, answer : answer } } }
			scores : {},
			matchid : 0,
			matchStatus : 'find', // find, create, wait
			playStatus : 0, // 0 = waiting a match, 1 = ongoing match, 2 = ended match
			findMatchTimer : { timing : null, delay : 3000, maxTries : 10, currentTries : 1},
			matchTimer : { timing : null, delay : 5000 },
			roundTimer : { timing : null, delay : 2000 },
			questTimer : { timing : null, delay : 2000 },
			gameTimer : { timing : null, delay : 1000, points : 10 },
			roundEndTimer : {timing : null, delay : 3000 },
			maxScorePerRound : 10,
			currentRound : 1,
			currentRoundisFin : false,
			currentScore : {},
			hasAnswered : false
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
		configMap.qs = {};
		configMap.ps = {};
		configMap.scores = {};
		configMap.playerLocalPos = {};
		configMap.matchid = 0;
		configMap.matchStatus = 'find';
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
		// configMap.player.name = localStorage[configMap.plstore.name];

		// if( !sessionStorage[configMap.plstore.name] ){
			// comment next line if using LOCALSTORAGE
			configMap.player.name = 'Kalabaw' + Math.random().toString(36).substr(2,5);
			// sessionStorage[configMap.plstore.name] = configMap.player.name;
		// }

		// configMap.player.name = sessionStorage[configMap.plstore.name];
	};
	// End Module /initSetup/

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
				input.addClass('btn-success');
			}else{
				pts = 0;
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
			status = (me.score > op.score) ? 'You Win!' : (me.score == op.score) ? 'Draw' : 'You Lose!' ,
			playerdata = { me : me, opponent : op, status : status };

		jqueryMap.$main.html(App.Templates['results']({ player : playerdata }));
		bind();
		
		// Reset States here
		initSetup();
	};
	// End Module /renderResults/


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
			roundText = (configMap.currentRound == questions.length) ? 'Final Round' : 'Round '+configMap.currentRound;
		
		$container.html($header.html(App.Templates['header']({player : configMap.playerLocalPos, game : configMap.gameTimer})));
		
		configMap.hasAnswered = false;
		// render Round
		$container.append($ingame.html(App.Templates['round']({round : roundText})));
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
		startTimer(configMap.matchTimer);
	};
	// End Module /renderVS/

	// Start Module /renderQuestion/
	// Purpose : displays the Question
	var renderQuestion = function(){
		console.log('rendering Question ---->');
		var q = configMap.qs.questions[configMap.currentRound - 1],
			$container = jqueryMap.$ingame,
			$question = $container.html($('<div/>').addClass('ingame__question')),
			$options = $container.append($('<div/>').addClass('ingame__options'));

		$container.find('.ingame__question').html(App.Templates['question']({ data : q }));
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
		$container.find('.ingame__options').html(App.Templates['options']({ data : q }));
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

		// jqueryMap.$main.html('Finding a match... please wait...');
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
			initGame();
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
		configMap.matchTimer.callback = renderBattlefield;
		configMap.roundTimer.callback = renderQuestion;
		configMap.questTimer.callback = renderOptions;
		configMap.gameTimer.callback = getUpdates;
	};
	// End Module /initGame/

	
	// Start Module /initModule/
	// Purpose : Initializes our Environment App
	var initModule = function(){
		// mainit
		// initialization code for app here
		console.log('It\'s alive!!!');
		initSetup();
		// for testing
		// renderLanding();

		// actual
		// localStorage.player.name = {};
		findMatch();
	};

	var freeze = function(){
		endTimer(configMap.roundTimer);
		endTimer(configMap.matchTimer);
		endTimer(configMap.questTimer);
		endTimer(configMap.gameTimer);
		endTimer(configMap.roundEndTimer);

		return false;
	};


	return {
		initModule : initModule,
		freeze : freeze
	};

}());