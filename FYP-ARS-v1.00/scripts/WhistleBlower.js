var p;
var q;
var N;// p*q i.e. p=23 q=43 must be two prime number (big enuff)
var r; 
var b;// any random number such that gcd (r,N) = 1 
var e; //note that e has to be a value between 1 to (p-1)(q-1)
var d;// d = e^-1 mod (p-1)(q-1)
var b1;

function setValues(){
	var t = getCookie("Token");
	var pr = getCookie("r");

	if(t != "" && pr != ""){
		document.getElementById("token").value=t;
		document.getElementById("prev_r").value=pr;
	}

	document.getElementById("blind").value ="";	
	
	//fetch the encrypt object
	var encrypt = new JSEncrypt();
    encrypt.setPublicKey(document.getElementById("privkey").value);
		  
	var pubkey = encrypt.getKey();		  
					
	N = new BigInteger(""+pubkey.n);
	e = new BigInteger(""+pubkey.e);
	  
	document.getElementById("N").value = N;
	document.getElementById("e").value = e;

	//generate random nonce r 
	var r = generateR();
	document.getElementById("r").value = r;	
	
	//compute the hash of r 
	var h = md5(r);	
	document.getElementById("md5").value = h;
	
	//generate the blinding factor b 
	var b = generateB(N); //generate a random value r, using the mozilla secure random generator 
	document.getElementById("b").value = b;
	
	//compute the multiplicative inverse of b 
	b1 = b.modInverse(N);
	document.getElementById("b1").value = b1;
}

function send_1(){

	b_text = document.getElementById("b").value;
	e_text = document.getElementById("e").value;
	N_text = document.getElementById("N").value;
	h_text = document.getElementById("md5").value;
	
	//Get the plaintext 
	var pt = document.getElementById("pt").value;
	//alert("value of pt: " + pt);		
	//convert the hash into bigInteger
	b = new BigInteger(""+b_text);
	e = new BigInteger(""+e_text);
	N = new BigInteger(""+N_text);
	h = new BigInteger(""+h_text);
	
	//generate the blind message 		
	blind_message = calBlindSignature(b, e, N, h);		
	document.getElementById("blind").value = (blind_message);
	
	//save the r and b value into a cookie 
	//might not be the secure way to do this but this project is not handling the storage security 
	setCookie("r", r, 1);
	setCookie("b", b, 1);
	setCookie("blind_message", blind_message, 1); 

	//method to check if the cookie exist and if exist, print out the value of r and b 
	//checkCookie();

	//send request to databaseMgr.php
	
		document.body.innerHTML += '<form id="dynForm" action="databaseMgr.php" method="post"><input type="hidden" name="plain_text" value="'+document.getElementById("pt").value+'"><input type="hidden" name="blind_message" value='+blind_message+""+'><input type="hidden" name="token" value='+document.getElementById("token").value+'><input type="hidden" name="prev_r" value='+document.getElementById("prev_r").value+'></form>';
		document.getElementById("dynForm").submit();	
	
	console.log("Done");
	
}

function generateR(){
	var array = new Uint32Array(1);
	var b = new BigInteger("0");	

	window.crypto.getRandomValues(array);
	r = new BigInteger(""+array[0]);
	
	return r;
}

function generateB(N){
	var array = new Uint32Array(1);
	var b = new BigInteger("0");
	do{
		window.crypto.getRandomValues(array);
		b = new BigInteger(""+array[0]);		
	}while(b.gcd(N) != 1 || b.compareTo(N) >= 0); //need to include || r > N if using actual p and q 
	
	//console.log("random number r is :" + r);
	return b; 
}

function calBlindSignature(b,e,N,text){
	var a = b.modPow(e, N);
	var blind_message = text.multiply(a).mod(N);
	return blind_message;
}

function setCookie(cname, cvalue, exdays){
	var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var r=getCookie("r");
    var b = getCookie("b");
    if (r != "" && b != "" && blind_message != "") {
        alert("Value of r is " + r + "\n Value of b is " + b + "\n Value of Blind Message is " + blind_message);
    } else {
    	alert("error");
    	/*
       user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
           setCookie("username", user, 30);
       }
       */
    }
}
