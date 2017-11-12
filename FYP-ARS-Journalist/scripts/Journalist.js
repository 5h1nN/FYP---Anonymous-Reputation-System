function validateToken(){ //invoke by onload()

	var list_of_token = document.getElementsByClassName("token");
	var list_of_prev_r = document.getElementsByClassName("prev_r");
	var list_of_prev_pubkey = document.getElementsByClassName("prev_pubkey");
	

	//for each row in the table perform a validation and check if the token is valid 
	for(i=0; i < list_of_token.length; i++){

		var validityID = "validity"+(i+1);	
		console.log("Validity ID is " + validityID);
	
		if(list_of_token[i].value != "" && list_of_prev_r[i].value != ""){
			
			//console.log("Validity ID is " + validityID);
			//var CurrTrustLevel = document.getElementById(validityID).value; //based on the validity, we get the corresponding private key 
			//console.log("CurrTrustLevel is " + CurrTrustLevel);

			//validation have to be done using the previous pub key
			console.log("index is " + i);		
			console.log("length of prev_pubkey is " + list_of_prev_pubkey.length);
			console.log("prev_pubkey is " + list_of_prev_pubkey[i].value);
			
			var prev_pubkey = list_of_prev_pubkey[i].value;
			
			if (prev_pubkey != ""){
			
			var decrypt = new JSEncrypt();

			//Get the respective private key value
			var certNo = parseInt(prev_pubkey) +1;
			console.log("certNo is " + certNo);			
			
			var privkeyval = document.getElementById(certNo).value;
			console.log("Private key used " + privkeyval);

			decrypt.setPrivateKey(privkeyval);
			  
			var privkey = decrypt.getKey();
			 
			var N = new BigInteger(""+privkey.n);
			var p = new BigInteger(""+privkey.p);
			var q = new BigInteger(""+privkey.q);
			var d = new BigInteger(""+privkey.d);	

			console.log("n is " + N);
			//console.log("p is " + p);
			//console.log("q is " + q);
			console.log("d is " + d);

			var cToken = computeToken(list_of_prev_r[i].value, d, N);

			console.log("cToken is " + cToken);
			console.log("Token is " + list_of_token[i].value);		

			if(cToken != list_of_token[i].value){
				//alert("testing");
				//document.getElementById(validityID).value="1";
				//document.getElementById("validitybox"+(i+1)).innerHTML="1";	

				//console.log("validitybox"+(i+1));			
				console.log(list_of_token[i].value+" != "+cToken);
			}else{
				//document.getElementById(validityID).innerHTML="True";
				console.log(list_of_token[i].value+" == "+cToken);
			}
			}
		} //end of if statement that checks submission with token  
	} //end of for loop 

	//a.sort(compareSecondColumn);
}

function computeToken(prev_r, d, N){
	//console.log("prev_r is " + prev_r); 
	//console.log("md5 of prev_ r is " + md5(prev_r));
	var sum = md5(prev_r);
	var hash = new BigInteger(sum);
	//console.log(hash);
	//console.log(typeof N);
	//console.log(typeof d);
	console.log("Value of N : " + N);
	console.log("Value of d : " + d);	
	var encrypted_hash = hash.modPow(d, N);
	console.log("encrypted_hash : " + encrypted_hash);
	return encrypted_hash;
}

//sign('$report["blind_message"]','$report["TrustLevel"]','2','$report["token"])
function sign(bm,PrevTrustLevel,AssignedTrustLevel,token){

	//document.getElementById("blind").value = "";
	//document.getElementById("sign").value ="";
	
	//fetch the decrypt object from the private certificate 
	var decrypt2 = new JSEncrypt();
	var privkeyval = document.getElementById(PrevTrustLevel).value;

	decrypt2.setPrivateKey(privkeyval);
	  
	var privkey = decrypt2.getKey();
	 
	N = new BigInteger(""+privkey.n);
	p = new BigInteger(""+privkey.p);
	q = new BigInteger(""+privkey.q);
	d = new BigInteger(""+privkey.d);	

	var blind_message= new BigInteger(bm);	

	//sign the message
	signed_blind_message = calSignedBlindSignature(blind_message, d, N);
	
	alert("Success! Signed Blind Message: " + signed_blind_message);
	
	CertToUseNext = AssignedTrustLevel;
	//send request to databaseMgr.php
	document.body.innerHTML += '<form id="dynForm" action="databaseMgr.php" method="post"><input type="hidden" name="action" value="sign"><input type="hidden" name="blind_message" value="'+blind_message+'"><input type="hidden" name="CertToUse" value="'+CertToUseNext+'"><input type="hidden" name="AssignedTrustLevel" value="'+AssignedTrustLevel+'"><input type="hidden" name="PrevTrustLevel" value="'+PrevTrustLevel+'"><input type="hidden" name="signed_blind_message" value="'+signed_blind_message+'"><input type="hidden" name="token" value="'+token+'"></form>';
	document.getElementById("dynForm").submit();
		
	console.log("Done");
	
}

function deleteReport(bm,text){
	alert("Record successfully deleted");	

	//send request to databaseMgr.php	
	document.body.innerHTML += '<form id="dynForm" action="databaseMgr.php" method="post"><input type="hidden" name="action" value="delete"><input type="hidden" name="text" value="'+text+'"><input type="hidden" name="blind_message" value="'+bm+'"></form>';
	document.getElementById("dynForm").submit();
		console.log("Done");
	
}

function calSignedBlindSignature(blind_message, d, N){
	return blind_message.modPow(d, N); 
}