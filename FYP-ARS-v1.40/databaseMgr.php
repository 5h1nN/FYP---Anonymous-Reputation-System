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
	if($_POST["plain_text"] != "" && $_POST["blind_message"] != "" && $_POST["pubkey"] !="" && isset($_POST["plain_text"]) && isset($_POST["blind_message"]) && isset($_POST["pubkey"])){

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

		if(isset($_POST["pubkey"]) && $_POST["pubkey"] != ""){
			echo 'Public Key set no. used: ';
			echo $_POST["pubkey"];
			echo '<br/>';
		}

		$plain_text = $_POST["plain_text"];
		$blind_message = $_POST["blind_message"];
		$token = $_POST["token"];
		$prev_r = $_POST["prev_r"];
		$pubkey = $_POST["pubkey"];
		$TrustLevel = getTrustLevelBasedOnPubCertificate($pubkey);

		echo "Trusted Level is ".$TrustLevel."<br />";			

		if ($token != "" && $prev_r != "" && !TokenUsed($token)){  //with token and token is not used before 
			$connect = dbConnect();		
			$connect->query("INSERT into report_db values ('$plain_text','$blind_message','$token', '$prev_r', '$pubkey', '$TrustLevel');");
			if($connect)
				print "Success - subsequent";
			else{
				print "unsuccessful - Error inserting the report";
			}	
		}else if (($token == "" && $prev_r == "") || TokenUsed($token)){ //without token or with token that is used before, insert cert = 1 & trustlevel = 1 
			$connect = dbConnect();	
			$connect->query("INSERT into report_db values ('$plain_text','$blind_message','$token', '$prev_r', '1', '1');");
			if($connect)
				print "Success - first time";
			else{
				print "unsuccessful - Error inserting the report";
			}

		}else{
			print "Unsuccessful - You can only submit either both the token and the prev_r or none";
		}

	}else { //if one of the param is empty display which is empty 
		if(!isset($_POST["plain_text"]) || $_POST["plain_text"] == ""){	
			echo 'Plaintext is empty';		
		}
		if(!isset($_POST["blind_message"]) || $_POST["blind_message"] == ""){	
			echo 'Blind Message is empty';		
		}
		if(!isset($_POST["pubkey"]) || $_POST["pubkey"] == ""){	
			echo 'Public key set number is empty';		
		}
	}
}

//if send from Journalist.php
if (isset($_SERVER["HTTP_REFERER"]) && $_SERVER["HTTP_REFERER"] == "https://192.168.1.1/FYP-ARS/Journalist.php"){
	if($_POST["action"] == "sign" &&
		isset($_POST["signed_blind_message"]) && $_POST["signed_blind_message"] != "" &&
		isset($_POST["CertToUse"]) && $_POST["CertToUse"] != "" &&
		isset($_POST["AssignedTrustLevel"]) && $_POST["AssignedTrustLevel"] != "" &&
		isset($_POST["PrevTrustLevel"]) && $_POST["PrevTrustLevel"] != "" &&
		isset($_POST["blind_message"]) && $_POST["blind_message"] != ""		
	   )
	{
		echo 'Signed Blinded Message: ';
		echo $_POST["signed_blind_message"];
		echo '<br/>';

		echo 'Certificate to be used next: ';
		echo $_POST["CertToUse"];
		echo '<br/>';

		echo 'Assigned Trust level: ';
		echo $_POST["AssignedTrustLevel"];
		echo '<br/>';

		echo 'Previous Trust level: ';
		echo $_POST["PrevTrustLevel"];
		echo '<br/>';

		if($_POST["token"] != ""){
			echo 'Submitted token: ';
			echo $_POST["token"];
			echo '<br/>';
			print addTokenToUsedToken($_POST["token"]);
		}
		print saveToArticle($_POST["signed_blind_message"],$_POST["CertToUse"], $_POST["AssignedTrustLevel"], $_POST["PrevTrustLevel"]);
		print create_dummy_token();
		print removeFromReport($_POST["blind_message"]);
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

		print removeFromReport($_POST["blind_message"]);
	}
}	

//get list of articles 
function getListofArticles(){
	
	$connect = dbConnect();
	$query = "select Signed_Blinded_Signature, CertToUse from article_db";
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
			$Signed_Blinded_Signature = $row["Signed_Blinded_Signature"];
			$CertToUse = $row["CertToUse"];

			$list_of_articles[$i] = [
				'Signed_Blinded_Signature' => $Signed_Blinded_Signature,
				'CertToUse' => $CertToUse
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
	$query = "select * from report_db order by TrustLevel desc";
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
			$TrustLevel = $row["TrustLevel"];

			$list_of_reports[$i] = [
				'text' => $text,
				'blind_message' => $blind_message,
				'token' => $token,
				'prev_r' => $prev_r,
				'TrustLevel' => $TrustLevel
				];
			$i++;
		}

	
		mysqli_free_result($result);
	}else{
		print "no result found";
	}

	return $list_of_reports; 
}


function saveToArticle($signed_blind_message, $CertToUse, $TrustLevel, $PrevTrustLevel){

	$connect = dbConnect();	
	$connect->query("INSERT into article_db values ('$signed_blind_message', '$CertToUse', '$TrustLevel', '$PrevTrustLevel');");
	if($connect)
		print "successfully save article to article_db <br />";
	else{
		print "unsuccessfully  save article to article_db <br />";
	}	
}

function removeFromReport($blind_message){
	$connect = dbConnect();		
	$connect->query("DELETE FROM report_db where blind_message like '$blind_message';");
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
	
	$randCertNo=rand(1,5);

	$connect->query("INSERT into article_db values ('$dummy', '$randCertNo', '$randCertNo', '');");
	if($connect)
		print "successfully save dummy token ".$dummy." to article_db <br />";
	else{
		print "unsuccessfully save dummy token to article_db <br />";
	}
	
}

function getTrustLevelBasedOnPubCertificate($cert){
	$connect = dbConnect();	
	$query= "select TrustLevel from signingkey_db where CertNo like '$cert';";
	$List_TrustLevel = array();	
	$result = $connect->query($query);
	$i =0;

	if ($result == false){
		echo "No search found!";
		die;
	}
	
	if (!empty($result) && $result->num_rows > 0)	// if the number of result is greater than 0
	{	
		
		while ($row = mysqli_fetch_assoc($result)) {
			$TrustLevel = $row["TrustLevel"];

			$List_TrustLevel[$i] = [
				'TrustLevel' => $TrustLevel
				];
			$i++;
		}
	
		mysqli_free_result($result);
	}else{
		print "no result found";
	}

	return $List_TrustLevel[0]["TrustLevel"]; 
}

function getAllPrivateKeys(){
	$connect = dbConnect();
	$query = "select * from signingkey_db order by CertNo asc";
	$privatekeys = array();
	$i =0;

	$result = $connect->query($query);
	if ($result == false){
		echo "No search found!";
		die;
	}
	
	if (!empty($result) && $result->num_rows > 0)	// if the number of result is greater than 0
	{	
		
		while ($row = mysqli_fetch_assoc($result)) {
			$TrustLevel = $row["TrustLevel"];
			$PrivateKey = $row["private_key"];
			$PublicKey = $row["public_key"];
			$CertNo = $row["CertNo"];

			$privatekeys[$i] = [
				'TrustLevel' => $TrustLevel,
				'PrivateKey' => $PrivateKey,
				'PublicKey' => $PublicKey,
				'CertNo' => $CertNo
				];
			$i++;
		}

	
		mysqli_free_result($result);
	}else{
		print "no result found";
	}

	return $privatekeys; 
}

function TokenUsed($token){
	$connect = dbConnect();
	$query = "select * from used_token_db where token likes $token";
	//$exist = array();
	//$i =0;

	$result = $connect->query($query);
	if ($result == false){
		return false;
	}

	return true;
}

function addTokenToUsedToken($token){
	$connect = dbConnect();		
	$connect->query("INSERT into used_token_db values ('$token');");
	if($connect)
		print "Success - subsequent <br/>";
	else{
		print "unsuccessful - Error inserting the report <br/>";
	}	
}
?>