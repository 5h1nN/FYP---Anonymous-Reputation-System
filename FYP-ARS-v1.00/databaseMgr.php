<?php 
//extra: need to perform some validation 

function dbConnect()
{
	$servername = "127.0.0.1";
	$username = "root";
	$password = "";
	$database = "fyp";	

	// Create connection
	$conn = new mysqli($servername, $username, $password, $database);

	// Check connection
	if ($conn->connect_error)
	    die("Connection failed: " . $conn->connect_error);

	return $conn;
}

//if send from WhistleBlower.html
if (isset($_SERVER["HTTP_REFERER"]) && $_SERVER["HTTP_REFERER"] == "https://192.168.1.1/FYP-ARS/WhistleBlower.html"){
	if(isset($_POST["plain_text"]) && $_POST["plain_text"] != ""){
		echo 'Plain-text: ';
		echo $_POST["plain_text"];
		echo '<br/>';
	}

	if(isset($_POST["blind_message"]) && $_POST["blind_message"] != ""){
		echo 'Blind-message: ';
		echo $_POST["blind_message"];
		echo '<br/>';
	}

	if(isset($_POST["token"]) && $_POST["token"] != ""){
		echo 'Token: ';
		echo $_POST["token"];
 		echo '<br/>';
	}


	if(isset($_POST["prev_r"]) && $_POST["prev_r"] != ""){
		echo 'Previous r: ';
		echo $_POST["prev_r"];
		echo '<br/>';
	}

	$plain_text = $_POST["plain_text"];
	$blind_message = $_POST["blind_message"];
	$token = $_POST["token"];
	$prev_r = $_POST["prev_r"];
	
	if(($token != "" && $prev_r != "") || ($token == "" && $prev_r == "")){
		if(isset($_POST["plain_text"]) && $_POST["plain_text"] != "" && isset($_POST["blind_message"]) && $_POST["blind_message"] != "" ){
			$connect = dbConnect();	
			$connect->query("INSERT into report_db values ('$plain_text','$blind_message','$token', '$prev_r');");
			if($connect)
				print "success";
			else{
				print "unsuccessful - Error inserting the report";
			}	
		}else{
			print "Unsucessful - Either plain-text, blind_message is empty";
		}
	}else{
		print "Unsuccessful - You can only submit either both the token and the prev_r or none";
	}
}

//if send from Journalist.php
if (isset($_SERVER["HTTP_REFERER"]) && $_SERVER["HTTP_REFERER"] == "https://192.168.1.1/FYP-ARS/Journalist.php"){

	if($_POST["action"] == "sign" &&
		isset($_POST["text"]) && $_POST["text"] != "" && 
		isset($_POST["blind_message"]) && $_POST["blind_message"] != "" && 
		isset($_POST["signed_blind_message"]) && $_POST["signed_blind_message"] != "")
	{
		echo 'text: ';
		echo $_POST["text"];
		echo '<br/>';

		echo 'Blind Message: ';
		echo $_POST["blind_message"];
		echo '<br/>';

		echo 'Signed Blind Message: ';
		echo $_POST["signed_blind_message"];
		echo '<br/>';

		print saveToArticle($_POST["signed_blind_message"]);
		print create_dummy_token();
		print removeFromReport($_POST["text"], $_POST["blind_message"]);
	}

	else if($_POST["action"] == "delete" &&
		isset($_POST["text"]) && $_POST["text"] != "" && 
		isset($_POST["blind_message"]) && $_POST["blind_message"] != "")
	{
		echo 'text: ';
		echo $_POST["text"];
		echo '<br/>';

		echo 'Blind Message: ';
		echo $_POST["blind_message"];
		echo '<br/>';

		print removeFromReport($_POST["text"], $_POST["blind_message"]);
	}
	
}

//get list of articles 
function getListofArticles(){
	
	$connect = dbConnect();
	$query = "select * from article_db";
	$list_of_articles = array();
	$i =0;

	$result = $connect->query($query);
	if ($result == false){
		echo "No search found!";
		die;
	}
	
	if (!empty($result) && $result->num_rows > 0)	// if the number of result is greater than 0
	{	
		/* fetch associative array */
		while ($row = mysqli_fetch_assoc($result)) {
			$token = $row["token"];
			
			$list_of_articles[$i] = [
				'token' => $token
				];
				
			$i++;
		}
			
		/* free result set */
		mysqli_free_result($result);
	}else{
		print "no result found";
	}
		
	return $list_of_articles; 
}
//old way of fetching data from db 

function getListofReports(){
	
	$connect = dbConnect();
	$query = "select * from report_db order by token desc";
	$list_of_reports = array();
	$i =0;

	$result = $connect->query($query);
	if ($result == false){
		echo "No search found!";
		die;
	}
	
	if (!empty($result) && $result->num_rows > 0)	// if the number of result is greater than 0
	{	
		
		while ($row = mysqli_fetch_assoc($result)) {
			$text = $row["text"];
			$blind_message = $row["blind_message"];
			$token = $row["token"];
			$prev_r = $row["prev_r"];

			$list_of_reports[$i] = [
				'text' => $text,
				'blind_message' => $blind_message,
				'token' => $token,
				'prev_r' => $prev_r
				];
			$i++;
		}

	
		mysqli_free_result($result);
	}else{
		print "no result found";
	}

	return $list_of_reports; 
}


function saveToArticle($token){

	$connect = dbConnect();	
	$connect->query("INSERT into article_db values ('$token');");
	if($connect)
		print "successfully save article to article_db <br />";
	else{
		print "unsuccessfully  save article to article_db <br />";
	}	
}

function removeFromReport($text, $blind_message){
	$connect = dbConnect();		
	$connect->query("DELETE FROM report_db where text like '$text' AND blind_message like '$blind_message';");
	if($connect)
		print "successfully remove report form report_db <br />";
	else{
		print "unsuccessfully remove report form report_db <br />";
	}
}

function create_dummy_token(){
	$connect = dbConnect();	
	$dummy=rand(1,9);
	for ($x=0; $x<1232; $x++){
		$dummy.=rand(0,9);
	}
	
	$connect->query("INSERT into article_db values ('$dummy');");
	if($connect)
		print "successfully save dummy token -".$dummy." to article_db <br />";
	else{
		print "unsuccessfully save dummy token to article_db <br />";
	}
	
}

?>