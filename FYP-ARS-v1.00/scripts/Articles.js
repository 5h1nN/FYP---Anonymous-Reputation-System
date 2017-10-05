  function getTokens(){
    //Initialize the JSEncrypt object
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(document.getElementById("pubkey").value);
    console.log("public key is " + document.getElementById("pubkey").value);    
    var pubkey = encrypt.getKey();      
    
    //public key set 
    N = new BigInteger(""+pubkey.n);
    e = new BigInteger(""+pubkey.e);
    
    console.log("N is " + N);
    console.log("e is " + e);
    //blinding factor 
    b_string = document.getElementById("b").value;
    b = new BigInteger(b_string); //recast it to a bigInt object
    
    //compute the multiplicative inverse of b 
    b1 = b.modInverse(N);

    //random nonce
    r_string = document.getElementById("r").value;
    r = new BigInteger(r_string); //recast it to a bigInt object
    
    console.log("b is " + b);
    console.log("b1 is " + b1);
    console.log("r is " + r);

    //compute hash of r 
    var h = computeHashModN(r, N);
     
    //foreach of the signed blinded signature, perform unblinding and  check if it matches h(r)
    //in this script, token is the signed blinded signature 
    var SignedBlindedSignatures = document.getElementsByClassName("SignedBlindedSignatures");
    console.log ("num of SignedBlindedSignature: " + SignedBlindedSignatures.length);
	
	var num_of_token=0;
    for (i=0; i < SignedBlindedSignatures.length; i++){
      //console.log("signed blinded signature is " + SignedBlindedSignatures[i].value);
      SignedBlindedSignature = new BigInteger(""+SignedBlindedSignatures[i].value);
      var hash = unblindEncrypt(N, e, SignedBlindedSignature, b1);
      
      console.log("hash is " + hash);
      console.log("h is " + h);
      if(hash.equals(h)){
        //compute token 
        token = calUnBlindSignedSignature(SignedBlindedSignature, b1, N);
        setCookie("Token", token, 1);
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
      var r =getCookie("r");
      var b = getCookie("b");

      if (r != "" && b != "") {
        document.getElementById("r").value = r;
        document.getElementById("b").value = b;       
          //alert("Value of r is " + r + "\n Value of b is " + b);
      } else {
        alert("No cookie found!");
      }
    }