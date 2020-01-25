var triviaQuestions = [{
	question: "Guitarist Jimmy Page migrated from The Yardbirds into one of the most popular rock bands of all time. Which was this group?",
	answerList: ["The Beatles", "Led Zeppelin", "AC/DC", "The Who"],
	answer: 1
},{
	question: "Reggae artist Bob Marley's back-up band was called:",
	answerList: ["The Moaners", "The Wailers", "The Weepers", "The Night Walkers"],
	answer: 1
},{
	question: "'Demons and Wizards' was a popular album by this 70's band:",
	answerList: ["Badfinger", "T.Rex", "Mott the Hoople", "Uriah Heep"],
	answer: 3
},{
	question: "Featuring Ozzy Osbourne on vocals, this heavy metal group released the successful album 'Paranoid'",
	answerList: ["Black Sabbath", "Deep Purple", "Cream", "Blue Cheer"],
	answer: 0
},{
	question: "This progressive rock group had hits with 'Karn Evil 9' and 'Lucky Man'",
	answerList: ["Jethro Tull", "King Crimson", "Emerson Lake and Palmer", "Yes"],
	answer: 2
},{
	question: "Jeff Lynne and Roy Wood were behind this British rock band, who used a wide variety of instruments:",
	answerList: ["Trans-Siberian Orchestra", "Mahavishnu Orchestra", "Electric Light Orchestra", "Traffic"],
	answer: 2
},{
	question: "This guitarist, formerly of Hunble Pie, recorded some songs using the talkbox guitar effect",
	answerList: ["Joe Walsh", "Jackson Browne", "Lindsey Buckingham", "Peter Frampton"],
	answer: 3
},{
	question: "Lead guitar Tom Scholz played the majority of instruments on this American rock band's debut album in 1976, featuring classic songs 'More than a Feeling' and 'Long Time'",
	answerList: ["Journey", "Pink Floyd", "Boston", "Steely Dan"],
	answer: 2
},{
	question: "This glam rock bank had its biggest hit with 'All the Young Dudes' written for them by David Bowie",
	answerList: ["Slade", "Mott the Hoople", "Sweet", "Roxy Music"],
	answer: 1
},{
	question: "This punk band contained the members Joey, Johnny, Dee Dee and Tommy",
	answerList: ["The Replacements", "The Sex Pistols", "The Clash", "The Ramones"],
	answer: 3
},{
	question: "'Just What I Needed' and 'My Best Friend's Girl' were songs by which new wave artist?",
	answerList: ["The Cars", "The Police", "Autobus", "Devo"],
	answer: 0
},{
	question: "Paul Rodgers of Free, and Mick Ralphs of Mott the Hoople were part of this English supergroup:",
	answerList: ["Cream", "Bad Company", "Whitesnake", "Foreigner"],
	answer: 1
},{
	question: "This rock band released the song '(Don't Fear) the Reaper' off their album, Agents of Fortune",
	answerList: ["Aerosmith", "Nazareth", "Blue Oyster Cult", "Pink Floyd"],
	answer: 2
},{
	question: "This English pianist released poplular albums like 'Goodbye Yellowbrick Road' and 'Don't Shoot Me, I'm Only the Piano Player'",
	answerList: ["Billy Joel", "Elton John", "Elvis Costello", "Stevie Wonder"],
	answer: 1
},{
	question: "Billy Gibbons fronted this blues rock band from Texas, known for their long beards",
	answerList: ["Black Oak Arkansas", "Ozark Mountain Daredevils", "Lynyrd Skynyrd", "ZZ Top"],
	answer: 3
},{
	question: "'Kick it Out', 'Magic Man' and 'Crazy on You' were among the hits delivered by this rock band:",
	answerList: ["Fleetwood Mac", "Heart", "The Rolling Stones", "Bachman Turner Overdrive" ],
	answer: 1
}, {
	question: "KC and the Sunshine Band brightened the 1970's with hits like 'Get Down Tonight' and 'That's the Way I Like It'. Where does the KC name come from?",
	answerList: ["Band founded in Kansas City", "Band founded by Casey Kasem", "Band founded by Harry Casey", "Tribute to Nat King Cole"],
	answer: 2		
}, {
	question: "This English singer-songwriter converted to Islam in 1977 and changed his name to Yusef Islam.", 
	answerList: ["Don Henley", "Cat Stevens", "Van Morrison", "Dave Mason"],
	answer: 1		
},{
	question: "What California-based rock band released the single 'Take it to the Limit' in 1975?",
	answerList: ["The Moody Blues", "The Beach Boys", "Jefferson Starship", "The Eagles"],
	answer: 3
},{
	question: "What colorful heavy metal pioneers gave the world 'MachineHead' in 1972?",
	answerList: ["King Crimson", "Pink Floyd", "Deep Purple", "Black Sabbath"],
	answer: 2

}];

var imgArray = ['question1.jpg', 'question2.jpg', 'question3.jpg', 'question4.jpg', 'question5.jpg', 'question6.jpg', 'question7.jpg', 'question8.jpg', 'question9.jpg', 'question10.jpg', 'question11.jpg', 'question12.jpg', 'question13.jpg','question14.jpg','question15.jpg', 'question16.jpg','question17.jpg','question18.jpg','question19.jpg','question20.jpg'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}
var answered = true


$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#img').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr('data-index', i );
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 10;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;

		
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
		//$('#img').html("assets/images/'+ imgArray[currentQuestion]");
		$('#img').html('<img src = "assets/images/'+ imgArray[currentQuestion] +'.jpg" width = "400px">');

	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#img').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html(' Rock on.  Start Over?');
}
