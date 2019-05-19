/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$( document ).ready( function () {

function createTweetElement (tweet) {
    //easier way to structure html dom in jquery. use below syntax
    // var html = `
    // <article class="tweet">
    //   <h1 class="username">${tweet.user.name}
    // `
    
    var $tweet = $("<article>").addClass("tweet");
    var $header = $("<header>");
    var $imgH = $("<img>").addClass("userImage");
    $imgH.attr("src", tweet.user.avatars.small);
    var $h1H = $("<h1>").addClass("username");
    var $pH = $("<p>").addClass("atuser");
    var $divB = $("<div>").addClass("bodyMain");
    var $divBI = $("<div>");
    var $footer = $("<footer>");
    var $pF = $("<p>").addClass("userTime");
    var $divF = $("<div>").addClass("icons");
    var $i1 = $("<i>").addClass("fas fa-flag");
    var $i2 = $("<i>").addClass("fas fa-retweet");
    var $i3 = $("<i>").addClass("fas fa-heart");

    

// ---------APPENDING-----------
    // console.log("Header", $header)

    $tweet.append($header);
    $header.append($imgH);
    $header.append($h1H);
    $h1H.append(tweet.user.name);;
    $pH.append(tweet.user.handle);
    $header.append($pH);

    $tweet.append($divB);
    $divB.append($divBI);
    $divBI.append(tweet.content.text);

    $tweet.append($footer);
    $footer.append($pF);
    $pF.append(tweet.created_at);
    $footer.append($divF);
    $divF.append($i1);
    $divF.append($i2);
    $divF.append($i3);

    return $tweet;

}

//console.log("$Tweet", $tweet[0]);

function loadTweets () {
  $.ajax({
    url: "http://localhost:8080/tweets/",
    type: "GET",
    dataType: "json",
    success: function(res) {
      renderTweets(res);
    }
  });
}

function renderTweets(tweets) {
  // loops through tweets
  for (let value of tweets) {
    $('#tweet-container').append(createTweetElement(value));
  }   
}

// Render the tweet from Database on refresh
loadTweets ();


// if this event happens
$('form').on('submit',function(event) {
  //too long
  if ($('textarea').val().length > 140) {
      alert ("error too long");
      
      //not submit the form   // event.preventDefault()
      // form should not be cleared //
      return false;
  }

  //empty   
  if ($('textarea').val().length === 0) {
      alert ("tweet is empty");
      // do not submit
      return false;
  }

  //else submit the form
  event.preventDefault();
  console.log($('form').serialize());    
  $.ajax({
  type: 'POST',
  url: "/tweets/",
  data: $('form').serialize(),
  dataType: "text",
  success: function(resultData) { 
    alert("You Tweeted :)")
    loadTweets ();
  }

  });

}) 






 











//$('#tweet-container').append($iterator);

  // var $tweet = createTweetElement(tweetData);
  
  // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $('#tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.


})