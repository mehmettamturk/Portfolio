<?php

class FavoriteTweetsList{
	private $username;
	const cache = "cache_tweets.ser";
	
	public function __construct($username){
		$this->username = $username;
	}
	
	/* The get method returns an array of tweet objects */
	
	public function get(){
		
		$cache = self::cache;
		$tweets = array();
		
		if(file_exists($cache) && time() - filemtime($cache) < 3*60*60){
			
			// Use the cache if it exists and is less than three hours old
			$tweets = unserialize(file_get_contents($cache));
		}
		else{
			
			// Otherwise rebuild it
			$tweets = json_decode($this->fetch_feed());
			file_put_contents($cache,serialize($tweets));			
		}
		
		if(!$tweets){
			$tweets = array();
		}
		
		return $tweets;
	}
	
	/* The generate method takes an array of tweets and build the markup */
	
	public function generate($limit=10, $className = 'tweetFavList'){

		echo "<ul class='$className'>";

		// Limiting the number of shown tweets
		$tweets = array_slice($this->get(),0,$limit);

		foreach($tweets as $t){

			$id			= $t->id_str;
			$text		= self::formatTweet($t->text);
			$time		= self::relativeTime($t->created_at);
			$username	= $t->user->screen_name;
			$retweets	= $t->retweet_count;
			
			?>
			
			<li>
				<p><?php echo $text ?></p>
				<div class="info">
					<a href="http://twitter.com/<?php echo $username ?>" class="user"
						title="Go to <?php echo $username?>'s twitter page"><?php echo $username ?></a>
						
					<?php if($retweets > 0):?>
						<span class="retweet" title="Retweet Count"><?php echo $retweets ?></span>
					<?php endif;?>

					<a href="http://twitter.com/<?php echo $username,'/status/',$id?>"
                    	class="date" target="_blank" title="Shared <?php echo $time?>"><?php echo $time?></a>
				</div>
                
                <div class="divider"></div>
                
            </li>
            
            <?php
		}
		
		echo "</ul>";
	}
	
	/* Helper methods and static functions */
	
	private function fetch_feed(){
		return file_get_contents("http://api.twitter.com/1/favorites/{$this->username}.json");
	}
	
	private static function relativeTime($time){
	
		$divisions	= array(1,60,60,24,7,4.34,12);
		$names		= array('second','minute','hour','day','week','month','year');
		$time		= time() - strtotime($time);
		
		$name = "";
		
		if($time < 10){
			return "just now";
		}
		
		for($i=0; $i<count($divisions); $i++){
			if($time < $divisions[$i]) break;
			
			$time = $time/$divisions[$i];
			$name = $names[$i];
		}
		
		$time = round($time);
		
		if($time != 1){
			$name.= 's';
		}
	
		return "$time $name ago";
	}
	
	
	private static function formatTweet($str){
		
		// Linkifying URLs, mentionds and topics. Notice that
		// each resultant anchor type has a unique class name.
		
		$str = preg_replace(
			'/((ftp|https?):\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/i',
			'<a class="link" href="$1" target="_blank">$1</a>',
			$str
		);

		$str = preg_replace(
			'/(\s|^)@([\w\-]+)/',
			'$1<a class="mention" href="http://twitter.com/#!/$2" target="_blank">@$2</a>',
			$str
		);

		$str = preg_replace(
			'/(\s|^)#([\w\-]+)/',
			'$1<a class="hash" href="http://twitter.com/search?q=%23$2" target="_blank">#$2</a>',
			$str
		);
		
		return $str;
	}
}

?>