var p;
var q;
var N;// p*q i.e. p=23 q=43 must be two prime number (big enuff)
var r; 
var b;// any random number such that gcd (r,N) = 1 
var e; //note that e has to be a value between 1 to (p-1)(q-1)
var d;// d = e^-1 mod (p-1)(q-1)
var b1;

function setValues(){
	//var t = getCookie("Token");
	//var pr = getCookie("r");

	//fetching the list of token
	var c_list = document.cookie.split(";");

	//regex
	var r_patt = /prev_r(\d+)=/;
	var t_patt = /token(\d+)=/;

	//create empty option for submission of token 
	var x = document.getElementById("token");
	var option = document.createElement("option");
	option.text = "";
	x.add(option);

	//create empty option for submission of prev_r
	var y = document.getElementById("prev_r");
	var option2 = document.createElement("option");
	option2.text = "";
	y.add(option2);

	for (var i = 0; i < c_list.length; i++) {
	    if (t_patt.test(c_list[i])) {
	        var x = document.getElementById("token");
			var option = document.createElement("option");
			var match = c_list[i].split(t_patt);
			option.text = match[2]; // not sure why 2 and not 1 - might be an issue in the future
			x.add(option); 
	    }else if (r_patt.test(c_list[i])){
	    	var x = document.getElementById("prev_r");
			var option = document.createElement("option");
			var match = c_list[i].split(r_patt);
			option.text = match[2]; // not sure why 2 and not 1 - might be an issue in the future
			x.add(option); 
	    }
	}

/*
	if(t != "" && pr != ""){
		document.getElementById("token").value=t;
		document.getElementById("prev_r").value=pr;
	}
*/
	document.getElementById("blind").value ="";	
	
	//fetch the encrypt object
	var encrypt = new JSEncrypt();
    encrypt.setPublicKey(document.getElementById("pubkey").value);
		  
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
	var index = getLatestCookieIndex();

	//might not be the secure way to do this but this project is not handling the storage security 
	setCookie("r"+index, r, 1);
	setCookie("b"+index, b, 1);
	setCookie("blind_message"+index, blind_message, 1); 

	//method to check if the cookie exist and if exist, print out the value of r and b 
	//checkCookie();

	//send request to databaseMgr.php
	document.body.innerHTML += '<form id="dynForm" action="databaseMgr.php" method="post"><input type="hidden" name="plain_text" value="'+document.getElementById("pt").value+'"><input type="hidden" name="blind_message" value='+blind_message+""+'><input type="hidden" name="token" value='+document.getElementById("token").value+'><input type="hidden" name="prev_r" value='+document.getElementById("prev_r").value+'></form>';
	document.getElementById("dynForm").submit();	
	
	console.log("Done");
	
}

function setTokenAccordingPrevR(){
	//console.log(document.getElementById("prev_r").value);

	if (document.getElementById("prev_r").value==""){
		document.getElementById("token").value = "";
	}else{
		//get the cookie index based on the prev_r 
		var index = findCookieIndexGivenPrevR(document.getElementById("prev_r").value);
		//console.log("token"+index);
		var token_name="token"+index;
		//console.log("token is " + getCookie(token_name));
		document.getElementById("token").value = getCookie(token_name);
	}
}

function setPrevRAccordingToken(){
	if (document.getElementById("token").value==""){
		document.getElementById("prev_r").value = "";
	}else{
		//get the cookie index based on the prev_r 
		var index = findCookieIndexGivenToken(document.getElementById("token").value);
		//console.log("token"+index);
		var prev_r="prev_r"+index;
		//console.log("token is " + getCookie(token_name));
		document.getElementById("prev_r").value = getCookie(prev_r);
	}
}

function findCookieIndexGivenPrevR(prev_r){
	//fetching the list of token
	var c_list = document.cookie.split(";");

	//regex
	var r_patt = /prev_r(\d+)=/;

	for (var i = 0; i < c_list.length; i++) {
		c_list[i].trim();
		//console.log(c_list[i]);
		if (r_patt.test(c_list[i])){ //if it is a prev_r[/d]= cookie 
	   		var tmp = c_list[i].split("prev_r");
	   		//console.log(tmp);
	   		var tmp1 = tmp[1].split("=");
	   		//console.log("tmp1[0]: " + tmp1[0]);	   		
	   		//console.log("tmp1[1]: " + tmp1[1]);
	   		
	   		if(tmp1[1] == prev_r){
	   			//console.log("tmp1[0]: " + tmp1[0]);
	   			return tmp1[0];
	   		}
	    }
	}
}

function findCookieIndexGivenToken(token){
		//fetching the list of token
	var c_list = document.cookie.split(";");

	//regex
	var t_patt = /token(\d+)=/;

	for (var i = 0; i < c_list.length; i++) {
		c_list[i].trim();
		//console.log(c_list[i]);
		if (t_patt.test(c_list[i])){ //if it is a prev_r[/d]= cookie 
	   		var tmp = c_list[i].split("token");
	   		//console.log(tmp);
	   		var tmp1 = tmp[1].split("=");
	   		//console.log("tmp1[0]: " + tmp1[0]);	   		
	   		//console.log("tmp1[1]: " + tmp1[1]);
	   		
	   		if(tmp1[1] == token){
	   			//console.log("tmp1[0]: " + tmp1[0]);
	   			return tmp1[0];
	   		}
	    }
	}
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

function setCookie(cname, cvalue, exdays){
	var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//a testing function that is used to print the value of b and blind message stored in the cookie 
function checkCookie(r,b) {
    var r = getCookie(r);
    var b = getCookie(b);
    if (r != "" && b != "" && blind_message != "") {
        alert("Value of r is " + r + "\n Value of b is " + b + "\n Value of Blind Message is " + blind_message);
    } else {
    	alert("error");
    }
}

function readCookie(name) {
    // Escape regexp special characters (thanks kangax!)
    name = name.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');

    var regex = new RegExp('(?:^|;)\\s?' + name + '=(.*?)(?:;|$)','i'),
        match = document.cookie.match(regex);

    return match && unescape(match[1]); // thanks James!
}

function getLatestCookieIndex(){
	var i=0;
	while (1){
		var r = getCookie("r"+i);
    	var b = getCookie("b"+i);
    	if (r == "" && b == "") {
    		console.log("index is " + i); 
        	return i; 
    	}
		i++;
	}	
}
