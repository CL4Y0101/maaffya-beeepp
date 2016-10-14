$(document).ready(function(){
    $(".dagger3").click(function(){
        $(".login-box").fadeOut(1); 
        $(".play-box").fadeOut(1);
        $(".highscore-box").fadeOut(1);
        $(".control-box").fadeOut(1);
        $(".intro-box").fadeToggle(500);
   });
     $(".dagger2").click(function(){
        $(".intro-box").fadeOut(1); 
        $(".play-box").fadeOut(1);
        $(".login-box").fadeOut(1); 
        $(".control-box").fadeOut(1);
        $(".highscore-box").fadeToggle(500);
    });
     $(".dagger4").click(function(){ 
        $(".play-box").fadeOut(1);
        $(".intro-box").fadeOut(1);
        $(".highscore-box").fadeOut(1);
        $(".control-box").fadeOut(1);
        $(".login-box").fadeToggle(500); 
    });
      $(".dagger").click(function(){
        $(".intro-box").fadeOut(1);
        $(".highscore-box").fadeOut(1);
        $(".login-box").fadeOut(1);
        $(".control-box").fadeToggle(500); 
        $(".play-box").fadeToggle(500); 
    });

    var Memory = {

		init: function(cards){
			this.$game = $(".container-card");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.binding();
			this.paused = true;
     		this.guess = null;
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
			}, 1000);
			timer.pause();
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- http://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front" style="background-image: url(' + v.img + '); background-size: cover; background-repeat: no-repeat;"></div>\
				<div class="back"></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "php",
			img: "src/images/bird1.png",	
			id: 1,
		},
		{
			name: "css3",
			img: "src/images/bird2.png",
			id: 2
		},
		{
			name: "html5",
			img: "src/images/bird3.png",
			id: 3
		},
		{
			name: "jquery",
			img: "src/images/bird4.png",
			id: 4
		}, 
		{
			name: "javascript",
			img: "src/images/bird5.png",
			id: 5
		},
		{
			name: "node",
			img: "src/images/bird6.png",
			id: 6
		},
		{
			name: "photoshop",
			img: "src/images/bird7.png",
		},
		{
			name: "python",
			img: "src/images/bird8.png",
			id: 8
		},
	];


	Memory.init(cards);

	/**
		Ini buat kepentingan login
	*/
	$( ".input" ).focusin(function() {
		$( this ).find( "span" ).animate({"opacity":"0"}, 200);
		});
		
		$( ".input" ).focusout(function() {
	  $( this ).find( "span" ).animate({"opacity":"1"}, 300);
	});

	var logged_on = false;
	var userSpanned = "";

	 $(".submit").click(function(){
	   $.ajax({
		   url:"src/js/users.json", type: "get", dataType: "json", success: function(data){
			   console.log("GET", data);
			   $.each(data.users, function(i,d){
				   if($("#username").val() == d.username && $("#password").val() == d.password) {
					   console.log("LOGIN", "login success");
					   localStorage.setItem("namaUser", d.username);
					   logged_on = true;
					   $('.input').css("display", "none"); 
					   $('.sucess-login').css("display", "block");
					   userSpanned = "<span class='user'>" + d.username + "</span>"
					   $('.login-first').css("display", "block");
					   document.getElementById("log-in-user").innerHTML = userSpanned;
				   } 
			   });
		   }
	   });
   });


	/**
		Ini buat kepentingan stopwatchnya	
	*/
	var m = 0,
    s = 0,
    startTime = 0,
    timerOn;

	$('.timer').html('0:00:00');

	var timer = {
  		start : function () {
            $('#start').css('display', 'none');
               startTime = 0 + startTime;
             //Start interval
               timerOn = setInterval(function() {
               startTime += 1;
               // Add seconds
               if (startTime == 100) {
                 startTime = 0;
                 s += 1;
               }  
               // Add minutes
               if (s == 60) {
                 startTime = 0;
                 s = 0;
                 m += 1;
               } 
               // Add extra zeroes
               (startTime < 10 && s < 10) ? $('.timer').html(m + ':' + '0' + s + ':' + '0' +     startTime) : 
               (startTime < 10 && s > 10) ? $('.timer').html(m + ':' + s + ':' + '0' + startTime) :
               (s < 10) ? $('.timer').html(m + ':' + '0' + s + ':' + startTime) :
                          $('.timer').html(m + ':' + s + ':' + startTime);
           }, 10);
        },

  		pause : function () {
            $('#start').css('display', 'none');
            setTimeout(function() {
              clearInterval(timerOn);
            }, 0);
        },
  		reset : function () {
 	        $('#start').css('display', 'inline');
            setTimeout(function() {
              clearInterval(timerOn);
              $('.timer').html('0:00:00');
              startTimer = 0;
              s = 0;
              m = 0;
        	}, 0);
  		}
	}

	var imgs = $('.clockNeedle'),
    playState = '-webkit-animation-play-state';

	$('#start').click(function() {
		Memory.paused = false;
		$('.timer').html(timer.start());
	    imgs.css(playState, function(i, v) {
        	return 'running';        
	    });      
		$('body').toggleClass('paused', $(this).css(playState) === 'paused'); 
	});

	$('#reset').click(function() {
	    timer.reset();
	 	imgs.css(playState, function(i, v) {
	        return 'paused';        
	    });      
	    $('body').toggleClass('paused', $(this).css(playState) === 'paused');
		Memory.shuffleCards(this.cardsArray);
		Memory.setup();
		Memory.$game.show("slow");    
	});

});