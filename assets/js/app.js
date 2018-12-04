//////////// variables
const tweetList = document.getElementById('tweet-list');


//////////// event listeners
eventListeners();


function eventListeners() {
  //form submition
  document.querySelector('#form').addEventListener('submit', newTweet);
  //removing tweet
  tweetList.addEventListener('click', removeTweet);
  //document
  document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}


//////////// functions

function newTweet(e){
  e.preventDefault();

  //read the text area
  const tweet = document.getElementById('tweet').value;
  
  //create a remove button
  const removeBtn = document.createElement('a');
  removeBtn.classList = 'remove-tweet';
  removeBtn.textContent = 'x';

  //create an <li> element
  const li = document.createElement('li');
  li.textContent = tweet;
  

  //add the remove button to each tweet
  li.appendChild(removeBtn);

  //add to the list
  tweetList.appendChild(li);

  addTweetToStorage(tweet);
  
  this.reset();
}

function removeTweet(e){
  if(e.target.classList.contains('remove-tweet')){
    e.target.parentElement.remove();
  }
  
  removeTweetFromStorage(e.target.parentElement.textContent);
}

//add the tweets to local storage;
function addTweetToStorage(tweet){
    let tweets = getTweetsFromStorage();
     
    //add the tweet into the array;
    tweets.push(tweet);

    // Convert array into a String
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getTweetsFromStorage(){
    let tweets;
    //Get the values, if null is returned then we create a storage

    const TweetsLS = localStorage.getItem('tweets');

    if(TweetsLS===null) {
        tweets = [];
    } else {
        tweets = JSON.parse( TweetsLS );
    }

    return tweets;
}


//automatical getting tweets after loading the page

function localStorageOnLoad(){
  const tweets = getTweetsFromStorage();

  tweets.forEach(function(tweet){
        //create a remove button
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'x';

        //create an <li> element
        const li = document.createElement('li');
        li.textContent = tweet;
        

        //add the remove button to each tweet
        li.appendChild(removeBtn);

        //add to the list
        tweetList.appendChild(li);
  });
}

//remove the tweet from local storage
function removeTweetFromStorage(tweet){

  //get tweets from storage
  let tweets = getTweetsFromStorage();

  //remove 'x' from tweet
  const tweetDelete = tweet.substring(0,tweet.length-1);


  tweets.forEach((tweetLS, index) => {
    if(tweetDelete===tweetLS){
      tweets.splice(index, 1);
    }
  });

  localStorage.setItem('tweets', JSON.stringify(tweets));
}