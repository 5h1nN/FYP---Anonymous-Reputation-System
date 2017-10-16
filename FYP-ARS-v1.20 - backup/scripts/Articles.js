  function getTokens(){
    //Initialize the JSEncrypt object
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(document.getElementById("pubkey").value);
   // console.log("public key is " + document.getElementById("pubkey").value);    
    var pubkey = encrypt.getKey();      
    
    //public key set 
    N = new BigInteger(""+pubkey.n);
    e = new BigInteger(""+pubkey.e);
    
    //console.log("N is " + N);
    //console.log("e is " + e);
    //blinding factor 
    b_string = document.getElementById("b").value;
    b = new BigInteger(b_string); //recast it to a bigInt object
    
    //compute the multiplicative inverse of b 
    b1 = b.modInverse(N);

    //random nonce
    r_string = document.getElementById("r").value;
    r = new BigInteger(r_string); //recast it to a bigInt object
    
   // console.log("b is " + b);
   // console.log("b1 is " + b1);
   // console.log("r is " + r);

    //compute hash of r 
    var h = computeHashModN(r, N);
     
    //foreach of the signed blinded signature, perform unblinding and  check if it matches h(r)
    //in this script, token is the signed blinded signature 
    var SignedBlindedSignatures = document.getElementsByClassName("SignedBlindedSignatures");
   // console.log ("num of SignedBlindedSignature: " + SignedBlindedSignatures.length);
	
  //save the r and b value into a cookie 
  var index = getLatestCookieIndex();

  //might not be the secure way to do this but this project is not handling the storage security 

	var num_of_token=0;
    for (i=0; i < SignedBlindedSignatures.length; i++){
      //console.log("signed blinded signature is " + SignedBlindedSignatures[i].value);
      SignedBlindedSignature = new BigInteger(""+SignedBlindedSignatures[i].value);
      var hash = unblindEncrypt(N, e, SignedBlindedSignature, b1);
      
   //   console.log("hash is " + hash);
   //   console.log("h is " + h);
      if(hash.equals(h)){
        //compute token 
        token = calUnBlindSignedSignature(SignedBlindedSignature, b1, N);
        setCookie("token"+index, token, 1);
        setCookie("prev_r"+index, r, 1)
        console.log("Token is " + token); 
		    num_of_token = num_of_token+1;
        alert("Token is " + token);   
      }
    }
	
	if(num_of_token==0){
		alert("No valid token found");
	}
        
  }

  // (s * b^-1 ) ^ e mod N 
  function unblindEncrypt(N, e, s, b1){
    unblind = (s.multiply(b1)).mod(N);
    hash = unblind.modPow(e,N);
    return hash;        
  }

  function computeHashModN(r, N){
    var hashModN = new BigInteger(md5(r)).mod(N);
    return hashModN;
  }
  
  function calUnBlindSignedSignature(sign_message, b1, N){
    unblind_signed_message = (sign_message.multiply(b1)).mod(N);
    return unblind_signed_message;
  }

  //function to set the cookie 
  function setCookie(cname, cvalue, exdays){
    var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  //cookies implementation  
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

  //setting the values according to the cookies 
  function setValues(){
      //var r =getCookie("r");
      //var b = getCookie("b"); 

      //fetching the list of token
      var c_list = document.cookie.split(";");

      //regex
      var r_patt = /r(\d+)=/;
      var b_patt = /b(\d+)=/;

      for (var i = 0; i < c_list.length; i++) {
          if (r_patt.test(c_list[i])) {
            var x = document.getElementById("r");
            var option = document.createElement("option");
            var match = c_list[i].split(r_patt);
            option.text = match[2]; // not sure why 2 and not 1 - might be an issue in the future
            x.add(option); 
          }else if (b_patt.test(c_list[i])){
            var x = document.getElementById("b");
            var option = document.createElement("option");
            var match = c_list[i].split(b_patt);
            option.text = match[2]; // not sure why 2 and not 1 - might be an issue in the future
            x.add(option); 
          }
      }
/*
      if (r != "" && b != "") {
        document.getElementById("r").value = r;
        document.getElementById("b").value = b;       
          //alert("Value of r is " + r + "\n Value of b is " + b);
      } else {
        alert("No cookie found!");
      }
  */
  }

function setBAccordingtoR(){
  //get the cookie index based on the prev_r 
  var index = findCookieIndexGivenR(document.getElementById("r").value);
  //console.log("token"+index);
  var b="b"+index;
  //console.log("token is " + getCookie(token_name));
  document.getElementById("b").value = getCookie(b);
}

function setRAccordingtoB(){
  //get the cookie index based on the prev_r 
  var index = findCookieIndexGivenB(document.getElementById("b").value);
  //console.log("token"+index);
  var r="r"+index;
  //console.log("token is " + getCookie(token_name));
  document.getElementById("r").value = getCookie(r);
}

function findCookieIndexGivenR(r){
    //fetching the list of token
  var c_list = document.cookie.split(";");

  //regex
  var r_patt = /r(\d+)=/;

  for (var i = 0; i < c_list.length; i++) {
    c_list[i].trim();
    //console.log(c_list[i]);
    if (r_patt.test(c_list[i])){ //if it is a prev_r[/d]= cookie 
        var tmp = c_list[i].split("r");
        //console.log(tmp);
        var tmp1 = tmp[1].split("=");
        //console.log("tmp1[0]: " + tmp1[0]);       
        //console.log("tmp1[1]: " + tmp1[1]);
        
        if(tmp1[1] == r){
          //console.log("tmp1[0]: " + tmp1[0]);
          return tmp1[0];
        }
      }
  }
}

function findCookieIndexGivenB(b){
    //fetching the list of token
  var c_list = document.cookie.split(";");

  //regex
  var b_patt = /b(\d+)=/;

  for (var i = 0; i < c_list.length; i++) {
    c_list[i].trim();
    //console.log(c_list[i]);
    if (b_patt.test(c_list[i])){ //if it is a prev_r[/d]= cookie 
        var tmp = c_list[i].split("b");
        //console.log(tmp);
        var tmp1 = tmp[1].split("=");
        //console.log("tmp1[0]: " + tmp1[0]);       
        //console.log("tmp1[1]: " + tmp1[1]);
        
        if(tmp1[1] == b){
          //console.log("tmp1[0]: " + tmp1[0]);
          return tmp1[0];
        }
      }
  }
}

function getLatestCookieIndex(){
  var i=0;
  while (1){
    var r = getCookie("r"+i);
      var b = getCookie("b"+i);
      if (r == "" && b == "") {
        //console.log("index is " + i); 
          return i; 
      }
    i++;
  } 
}