var p;
var q;
var N;// p*q i.e. p=23 q=43 must be two prime number (big enuff)
var r;// any random number such that gcd (r,N) = 1 
var e; //note that e has to be a value between 1 to (p-1)(q-1)
var d;// d = e^-1 mod (p-1)(q-1)
var r1;

function validateToken(){ //invoke by onload()
	/*
	var decrypt = new JSEncrypt();
	var e = document.getElementById("privkey");

	decrypt.setPrivateKey(e.options[e.selectedIndex].text);
	  
	var privkey = decrypt.getKey();
	 
	N = new BigInteger(""+privkey.n);
	p = new BigInteger(""+privkey.p);
	q = new BigInteger(""+privkey.q);
	d = new BigInteger(""+privkey.d);	
*/
	var list_of_token = document.getElementsByClassName("token");
	var list_of_prev_r = document.getElementsByClassName("prev_r");

	//for each row in the table perform a validation and check if the token is valid 
	for(i=0; i < list_of_token.length; i++){

		var validityID = "validity"+(i+1);		
		if(list_of_token[i].value != "" && list_of_prev_r[i].value != ""){
			
			//console.log("Validity ID is " + validityID);
			var CurrTrustLevel = document.getElementById(validityID).value; //based on the validity, we get the corresponding private key 
			console.log("CurrTrustLevel is " + CurrTrustLevel);

			var decrypt = new JSEncrypt();
			var privkeyval = document.getElementById(CurrTrustLevel).value;
			console.log("Private key used " + privkeyval);

			decrypt.setPrivateKey(privkeyval);
			  
			var privkey = decrypt.getKey();
			 
			N = new BigInteger(""+privkey.n);
			p = new BigInteger(""+privkey.p);
			q = new BigInteger(""+privkey.q);
			d = new BigInteger(""+privkey.d);	

			//console.log("n is " + N);
			//console.log("p is " + p);
			//console.log("q is " + q);
			//console.log("d is " + d);

			var cToken = computeToken(list_of_prev_r[i].value);
			
			if(cToken != list_of_token[i].value){
				//alert("testing");
				document.getElementById(validityID).value="1";
				document.getElementById("validitybox"+(i+1)).innerHTML="1";	

				//console.log("validitybox"+(i+1));			
				console.log(list_of_token[i].value+" != "+cToken);
			}else{
				//document.getElementById(validityID).innerHTML="True";
				console.log(list_of_token[i].value+" == "+cToken);
			}
		} else {
			document.getElementById(validityID).innerHTML="1";
		} //end of else statement 
	} //end of for loop 

	//a.sort(compareSecondColumn);
}

function computeToken(prev_r){
	//console.log(new BigInteger(md5(prev_r)+""));
	var hash = new BigInteger(md5(prev_r)+"");
	//console.log(typeof N);
	//console.log(typeof d);
	var encrypted_hash = hash.modPow(d, N);
	console.log(encrypted_hash);
	return encrypted_hash;
}

function sign(bm,PrevTrustLevel,AssignedTrustLevel){

	//document.getElementById("blind").value = "";
	//document.getElementById("sign").value ="";
	
	//fetch the decrypt object from the private certificate 
	var decrypt = new JSEncrypt();
	var privkeyval = document.getElementById(PrevTrustLevel).value;

	decrypt.setPrivateKey(privkeyval);
	  
	var privkey = decrypt.getKey();
	 
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
	document.body.innerHTML += '<form id="dynForm" action="databaseMgr.php" method="post"><input type="hidden" name="action" value="sign"><input type="hidden" name="blind_message" value="'+blind_message+'"><input type="hidden" name="CertToUse" value="'+CertToUseNext+'"><input type="hidden" name="AssignedTrustLevel" value="'+AssignedTrustLevel+'"><input type="hidden" name="PrevTrustLevel" value="'+PrevTrustLevel+'"><input type="hidden" name="signed_blind_message" value="'+signed_blind_message+'"></form>';
	document.getElementById("dynForm").submit();
		
	console.log("Done");
	
}

function deleteReport(bm,text){

	//send request to databaseMgr.php
	document.body.innerHTML += '<form id="dynForm" action="databaseMgr.php" method="post"><input type="hidden" name="action" value="delete"><input type="hidden" name="text" value="'+text+'"><input type="hidden" name="blind_message" value="'+bm+'"></form>';
	document.getElementById("dynForm").submit();
	
	alert("Record successfully deleted");	
	console.log("Done");
	
}

function calSignedBlindSignature(blind_message, d, N){
	return blind_message.modPow(d, N); 
}