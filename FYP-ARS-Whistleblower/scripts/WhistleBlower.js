var p;
var q;
var N;// p*q i.e. p=23 q=43 must be two prime number (big enuff)
var r; 
var b;// any random number such that gcd (r,N) = 1 
var e; //note that e has to be a value between 1 to (p-1)(q-1)
var d;// d = e^-1 mod (p-1)(q-1)
var b1;

//hardcode the public key into the javascript 
var pubkeys = [
"-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAowkDHhOZ8hM0jNhB5BAMU50WqjZzJ3B31SPN5oreCn9PMxdJJyI1YW6fwMEPYmbOWDOWGlS6cbMDB1REYPFVz/3AvIhIyrPEzstZzu9MUZsyeYgw+jl73ORZo0xlYCR/QZLXjQt79OI4d0CPgifHX/BAaIQuo67HUwRNxlfOW3+OyCjJCYxzIxpkuFtE3voCDoUc7SIRnmhcMObvyEI5of2zNO+4DrVjFv4fb1cgI2lQZQ8+cpxnmlXolSiobL0KKIUqHgmMGfeqWrCW6GLEpNqhJ+YvOzXPbdyxHNJEG3LLveRVVT2VBzcaGFDKQXjqfvtvsAwhROAjJONRM/OqnCJEWfifiuYvCDSqqNM+XWvNO3svyuCIGw3fHxwulPhEcW4jOMKagN6NOjv+tnKA4OwJ0/EMK2Y2qomEmWjypkN0wCFFYwrNRgystLnrDuaXzjOckDjV4+Hy3IMWXgjUjFy+VRFANYNcfNqRLwaRv4ZeXyTNtPfQRL5OnQjJz4tr6zXllEyJDdqu5Hgl/N1cZC8zdfxsaVfDutswGmYBruzBQ8dJOiMRtdWRCbIih8gPCsQXEYNdvbgMj5Asaj38lLSXM6FoRBuSc5jR6xLa5qHCxYzj2QyGNJUiECsLnjhfVDH+2kJ6h9dYTMKnTaS+HcCzvGROu3gRNkkusdb3+XMCAwEAAQ==-----END PUBLIC KEY-----", "-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA9fmB9e4SukP9FuMWL9V/K+wdp9WmCNp4gcTGlBXKfeWA+sNqLAbeDMfPUmDApYyT/QqCnPu5eKr6vKEZG1V9tZZHC0FnuBR6xRx8Wy23hMEcEQWQEbzD1DuzFwMzAHfrRygI93Z+tEG+utMBtY/LsiQX7PQ0rP4aLpzzBxFyN/D3f5tpPHeYL0hkvUJCRiJaUGELJJjHr0Ka5Dn9JrajfyvGRftsicPXITJmDbwt3fkhAD277X0Or02CwIzHPbi1/g0XHAJqrA+w5vvEq98ApRlHah99OV5mBXly9LcJsmIcpTSbuf6DGUqKlodsdvzK/2S2T1hRBG31dr983/alTM6Y9tQ8WWbZdiLAi/RLGHsLN6lS18rukwcr3Z84+q1ezoktlGzjQfo5uTSmUTs2QGoBW6zhClmm/moCX8rfsxQxKLWiWT9d6Af/Cg4EzlwbKnoIWF8pLqoI/X7XBePefzMg5GDx7hYW/q0+1BBEEQapDy2kKY8L9TQtM75jkeQkGvand+Kxivryu0/wKsGWhbiIpFgMUqcbreu74Cj70GUpVX/qpXsA+alv2auJq8tW0sT2mM4B0VhpswOm0dhKWlk+zl95KhajnOe9K0f3ESKcDKbosOMTNHCdUdI8zyTszeiVcgSrIBy/kdKoThsuWu0NaKf1kGLl6bofjaiWay8CAwEAAQ==-----END PUBLIC KEY-----", "-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAsjzQHP8C9r9KHGkGDXX5mcerMPjB98RanD5FGbaG3C4Qh8fSPbD1Az8PT4r2BADgL1S3ShZe+qmv2S8zmyAGplW/LVegRcJHUPCCrTe7XDkza/C4KJ4hP2BMGMlYRlfr6x+m0CCrD373jk1pNlP20o811Ro+We7ShgPGONVmKygaac5jZNGFB6v9WY1kE4Plo6Y9CwTPk2is6N7VIyBxGyPzDxBhaAgwqIxkFmiymWdLbiHPq0i65wJHOH08po8FSr61g3ZaKtRlMFmYXZGVaDZ7Z6QKlXf0LH+U/o2IAD8nsdBr73+11o6z4G3jnLK3bMOdHMT5QMBSvzdlpRymYEepmPPYaDELzc9I3PATD087p80auf05fJcyixBQh8KzdF+kzd0N4vEwdwY1TbDpsGFxI3+XrZXNl1pGA6UoNu99g927UyT3Q5l0xVnldCsBXh05RdZLt4MfKHashfYCWL/cEUfk6PT6iI51bv6xMhYK7NuwGXyNMitPyI/BgdJcnaswqyZo2H+69CPUQ6gKFzvskBfEbVLFYGDQt63uUj8bE1JkszNMKSiJFAp5RPRU6dlBFLPx21hgdqvO0ZGVE6uvJ2cYxYuKAYjiRgrJR44LxqxFDBU0QfLzzvvdIZ7xV8bJc0nbP4fPhOrF50D9uAwrVcDpIwgNqE2R/iVaGjsCAwEAAQ==-----END PUBLIC KEY-----", "-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAvr8y+Q/6AhVeiUK1muOxR/DkxNQ30ImXjfoaIxya+DwXo/1Ul7qs2A18Ko+YsnycPUyNLhS0m7A64gRbQX4VA0F1wNZZ1jVg/5p1APT9FYXi3Bli8yh+XbhG3EJNobgCAYbsLiiC3pR1HjGSEsStzM1qhov46R3ruLDCmkMCZg0jq90oq2zoGtRRyQU+2Aiz54tbUmulkrOWcBgGYpfzyoNKNzBXIYa/8fLFScRJlTj5/9ZqHCtDO+3yJSOw3qMq/3GKMDZgRmPAtz9Wv+k6Y07esuHrgNEZbKVwRXr0lLMDcOAQJRkO7rjiQPPM7njkyXevzqZKV07u368og2Ur9kChcCq+D0+Mx1hZXoJV4tk5n3QkVDjPzsaiMc70+hy1feTpJMvLE5XIrIL3BPBJu59q+y+getNSauNpOo4D/6qBrmpPVhqZk/ZCk/J2ltKvZhwwMGgGM4BsSxdIY5BPkAOTFu46qZwMhaE8UUsS7T/TxLBkS/sTZzQ+9JmbrS/UCWHAnnOnw0mksA7FEJf5Ox4bm97vCPTsuQCd3bK0cTDq9cqkNoS4YP96105Gxzl6QmRmefGjSbuOA65pd356h0dUHYliEcjo350DA8Fbrn5dq9f7FU90j0JIwV4Z9Ycn3q5asdHhUMiKypiPMx1/tmkImLy7OWF2UBxrAi74AysCAwEAAQ==-----END PUBLIC KEY-----", "-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA1S3W9CDL6waHdiKDnA/xlaerqKsz5du3tCkpmGfGRjaBEuV01ZcrWCiB8a5fq7i6fjSzwcmwTpol/8kuwg/6AEGpuIO+pjeTp9EioKT2J74qORseWZlgnNFJ7Opc6yFm0/iTPZs11HeilenmVBwGQC+42TX9tDEnBvF0GvxYrUsDMWaE9trYsx6kWxHgROUeoNKvAFM7fEoPGh9eW8cmshkAJbBeRdEe8lV0yRykRcVe6g/TCxc6QA4WmlGNDDa8Ur4uoMoVeWWVujzhKY/WRKmpcj80F/8wEuh+GedZ5bnI8kmJ3heki5Z6v44ASa8IWAaFzRFZr24kVDIhPmvGU2mKxFbJXhE8GUWX51xpIsU0eSdEYX6nwQjDNjNxZA6Cp+fjfTCZOXpMu0uI6EHkDzYOsK/lQvwzZ+JbarFwMJsGIan7DtfKi7BBMLddk/gvYI7pvETXWgx0ERtaE36UQ8qkP40Ms46UzBUJPNxuNumYrPvEFcyaSIFaSo2+7gplQRrxP/8+ZYShcEAYDp3o3x818Bqm3soFNU3evwNLPOpApYTo0DrFjKxyKOICHGX2HkducKat1GIGenF/JXuYmOtRlTni5HlsS2YjTteqR9MafxVB3VDk9GevVJWFpxELZW9CEO90oa2AftKyx6bTDRe2/i1LBKAasLOALN6xkbECAwEAAQ==-----END PUBLIC KEY-----"];

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

    //list all the public key 
    for (var i=0; i<pubkeys.length; i++){
	    var z = document.getElementById("pubkey");
		var pubkey_text = document.createElement("option");
		pubkey_text.value = (i+1);
		//console.log(pubkey_text.value);
		pubkey_text.text = pubkeys[i];
		//console.log(pubkey_text.text);
		//console.log(z);
		z.add(pubkey_text);
	}

/*
	if(t != "" && pr != ""){
		document.getElementById("token").value=t;
		document.getElementById("prev_r").value=pr;
	}
*/
	document.getElementById("blind").value ="";	

	//generate random nonce r 
	var r = generateR();
	document.getElementById("r").value = r;	
	
	//compute the hash of r 
	var h = md5(r);	
	document.getElementById("md5").value = h;

	setPublicKey(1);

	//generate the blinding factor b 
	var b = generateB(N); //generate a random value r, using the mozilla secure random generator 
	document.getElementById("b").value = b;
	
	//compute the multiplicative inverse of b 
	b1 = b.modInverse(N);
	document.getElementById("b1").value = b1;
}

function setPublicKey(CertNo){
	//fetch the encrypt object
	var encrypt = new JSEncrypt();
	document.getElementById("pubkey").selectedIndex = CertNo-1;

    encrypt.setPublicKey(pubkeys[(CertNo-1)]);
		  
	var pubkey = encrypt.getKey();		  
					
	N = new BigInteger(""+pubkey.n);
	e = new BigInteger(""+pubkey.e);
	  
	document.getElementById("N").value = N;
	document.getElementById("e").value = e;
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
	
	//alert("b is " + b + "e is " + e + "N is " + N + "h is " + h);

	//generate the blind message 		
	blind_message = calBlindSignature(b, e, N, h);		
	document.getElementById("blind").value = (blind_message);
	

	//save the r and b value into a cookie 
	var index = getLatestCookieIndex();
	var e = document.getElementById("pubkey");
	var pubkey_no = e.options[e.selectedIndex].value;

	//alert("pubkey number is " + pubkey_no);
	//might not be the secure way to do this but this project is not handling the storage security 
	setCookie("r"+index, r, 1);
	setCookie("b"+index, b, 1);
	setCookie("CertUsed"+index, pubkey_no, 1);	
	//setCookie("blind_message"+index, blind_message, 1); 

	//method to check if the cookie exist and if exist, print out the value of r and b 
	//checkCookie();

	//send request to databaseMgr.php
	document.body.innerHTML += '<form id="dynForm" action="https://192.168.1.1/FYP-ARS-Journalist/databaseMgr.php" method="post"><input type="hidden" name="plain_text" value="'+document.getElementById("pt").value+'"><input type="hidden" name="blind_message" value='+blind_message+""+'><input type="hidden" name="token" value='+document.getElementById("token").value+'><input type="hidden" name="prev_r" value='+document.getElementById("prev_r").value+'><input type="hidden" name="pubkey" value='+pubkey_no+'><input type="hidden" name="prev_pubkey" value='+document.getElementById("prev_pubkey").value+'></form>';
	document.getElementById("dynForm").submit();	
	
	console.log("Done");
	
}

function setTokenAccordingPrevR(){
	//console.log(document.getElementById("prev_r").value);

	if (document.getElementById("prev_r").value==""){
		document.getElementById("token").value = "";
		document.getElementById("pubkey").value = pubkeys[0];		
		document.getElementById("prev_pubkey").value = "";		

	}else{
		//get the cookie index based on the prev_r 
		var index = findCookieIndexGivenPrevR(document.getElementById("prev_r").value);
		//console.log("index is " + index);

		var token_name="token"+index;
		//console.log("token is " + getCookie(token_name));
		document.getElementById("token").value = getCookie(token_name);
		document.getElementById("prev_pubkey").value = getCookie("prev_CertUsed"+index);		
		setPublicKey(getCookie("next_CertToUse"+index));		
	}
}

function setPrevRAccordingToken(){
	if (document.getElementById("token").value==""){
		document.getElementById("prev_r").value = "";
		document.getElementById("pubkey").value = pubkeys[0];				
		document.getElementById("prev_pubkey").value = "";		

	}else{
		//get the cookie index based on the prev_r 
		var index = findCookieIndexGivenToken(document.getElementById("token").value);
		console.log("index is " + index);

		var prev_r="prev_r"+index;
		//console.log("token is " + getCookie(token_name));
		document.getElementById("prev_r").value = getCookie(prev_r);
		document.getElementById("prev_pubkey").value = getCookie("prev_CertUsed"+index);				
		setPublicKey(getCookie("next_CertToUse"+index));			
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

//return the value stored in the cookie 
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
