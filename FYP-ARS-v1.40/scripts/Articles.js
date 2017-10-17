//hardcode the public key into the javascript 
var pubkeys = [
"-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAowkDHhOZ8hM0jNhB5BAMU50WqjZzJ3B31SPN5oreCn9PMxdJJyI1YW6fwMEPYmbOWDOWGlS6cbMDB1REYPFVz/3AvIhIyrPEzstZzu9MUZsyeYgw+jl73ORZo0xlYCR/QZLXjQt79OI4d0CPgifHX/BAaIQuo67HUwRNxlfOW3+OyCjJCYxzIxpkuFtE3voCDoUc7SIRnmhcMObvyEI5of2zNO+4DrVjFv4fb1cgI2lQZQ8+cpxnmlXolSiobL0KKIUqHgmMGfeqWrCW6GLEpNqhJ+YvOzXPbdyxHNJEG3LLveRVVT2VBzcaGFDKQXjqfvtvsAwhROAjJONRM/OqnCJEWfifiuYvCDSqqNM+XWvNO3svyuCIGw3fHxwulPhEcW4jOMKagN6NOjv+tnKA4OwJ0/EMK2Y2qomEmWjypkN0wCFFYwrNRgystLnrDuaXzjOckDjV4+Hy3IMWXgjUjFy+VRFANYNcfNqRLwaRv4ZeXyTNtPfQRL5OnQjJz4tr6zXllEyJDdqu5Hgl/N1cZC8zdfxsaVfDutswGmYBruzBQ8dJOiMRtdWRCbIih8gPCsQXEYNdvbgMj5Asaj38lLSXM6FoRBuSc5jR6xLa5qHCxYzj2QyGNJUiECsLnjhfVDH+2kJ6h9dYTMKnTaS+HcCzvGROu3gRNkkusdb3+XMCAwEAAQ==-----END PUBLIC KEY-----", "-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA9fmB9e4SukP9FuMWL9V/K+wdp9WmCNp4gcTGlBXKfeWA+sNqLAbeDMfPUmDApYyT/QqCnPu5eKr6vKEZG1V9tZZHC0FnuBR6xRx8Wy23hMEcEQWQEbzD1DuzFwMzAHfrRygI93Z+tEG+utMBtY/LsiQX7PQ0rP4aLpzzBxFyN/D3f5tpPHeYL0hkvUJCRiJaUGELJJjHr0Ka5Dn9JrajfyvGRftsicPXITJmDbwt3fkhAD277X0Or02CwIzHPbi1/g0XHAJqrA+w5vvEq98ApRlHah99OV5mBXly9LcJsmIcpTSbuf6DGUqKlodsdvzK/2S2T1hRBG31dr983/alTM6Y9tQ8WWbZdiLAi/RLGHsLN6lS18rukwcr3Z84+q1ezoktlGzjQfo5uTSmUTs2QGoBW6zhClmm/moCX8rfsxQxKLWiWT9d6Af/Cg4EzlwbKnoIWF8pLqoI/X7XBePefzMg5GDx7hYW/q0+1BBEEQapDy2kKY8L9TQtM75jkeQkGvand+Kxivryu0/wKsGWhbiIpFgMUqcbreu74Cj70GUpVX/qpXsA+alv2auJq8tW0sT2mM4B0VhpswOm0dhKWlk+zl95KhajnOe9K0f3ESKcDKbosOMTNHCdUdI8zyTszeiVcgSrIBy/kdKoThsuWu0NaKf1kGLl6bofjaiWay8CAwEAAQ==-----END PUBLIC KEY-----", "-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAsjzQHP8C9r9KHGkGDXX5mcerMPjB98RanD5FGbaG3C4Qh8fSPbD1Az8PT4r2BADgL1S3ShZe+qmv2S8zmyAGplW/LVegRcJHUPCCrTe7XDkza/C4KJ4hP2BMGMlYRlfr6x+m0CCrD373jk1pNlP20o811Ro+We7ShgPGONVmKygaac5jZNGFB6v9WY1kE4Plo6Y9CwTPk2is6N7VIyBxGyPzDxBhaAgwqIxkFmiymWdLbiHPq0i65wJHOH08po8FSr61g3ZaKtRlMFmYXZGVaDZ7Z6QKlXf0LH+U/o2IAD8nsdBr73+11o6z4G3jnLK3bMOdHMT5QMBSvzdlpRymYEepmPPYaDELzc9I3PATD087p80auf05fJcyixBQh8KzdF+kzd0N4vEwdwY1TbDpsGFxI3+XrZXNl1pGA6UoNu99g927UyT3Q5l0xVnldCsBXh05RdZLt4MfKHashfYCWL/cEUfk6PT6iI51bv6xMhYK7NuwGXyNMitPyI/BgdJcnaswqyZo2H+69CPUQ6gKFzvskBfEbVLFYGDQt63uUj8bE1JkszNMKSiJFAp5RPRU6dlBFLPx21hgdqvO0ZGVE6uvJ2cYxYuKAYjiRgrJR44LxqxFDBU0QfLzzvvdIZ7xV8bJc0nbP4fPhOrF50D9uAwrVcDpIwgNqE2R/iVaGjsCAwEAAQ==-----END PUBLIC KEY-----", "-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAvr8y+Q/6AhVeiUK1muOxR/DkxNQ30ImXjfoaIxya+DwXo/1Ul7qs2A18Ko+YsnycPUyNLhS0m7A64gRbQX4VA0F1wNZZ1jVg/5p1APT9FYXi3Bli8yh+XbhG3EJNobgCAYbsLiiC3pR1HjGSEsStzM1qhov46R3ruLDCmkMCZg0jq90oq2zoGtRRyQU+2Aiz54tbUmulkrOWcBgGYpfzyoNKNzBXIYa/8fLFScRJlTj5/9ZqHCtDO+3yJSOw3qMq/3GKMDZgRmPAtz9Wv+k6Y07esuHrgNEZbKVwRXr0lLMDcOAQJRkO7rjiQPPM7njkyXevzqZKV07u368og2Ur9kChcCq+D0+Mx1hZXoJV4tk5n3QkVDjPzsaiMc70+hy1feTpJMvLE5XIrIL3BPBJu59q+y+getNSauNpOo4D/6qBrmpPVhqZk/ZCk/J2ltKvZhwwMGgGM4BsSxdIY5BPkAOTFu46qZwMhaE8UUsS7T/TxLBkS/sTZzQ+9JmbrS/UCWHAnnOnw0mksA7FEJf5Ox4bm97vCPTsuQCd3bK0cTDq9cqkNoS4YP96105Gxzl6QmRmefGjSbuOA65pd356h0dUHYliEcjo350DA8Fbrn5dq9f7FU90j0JIwV4Z9Ycn3q5asdHhUMiKypiPMx1/tmkImLy7OWF2UBxrAi74AysCAwEAAQ==-----END PUBLIC KEY-----", "-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA1S3W9CDL6waHdiKDnA/xlaerqKsz5du3tCkpmGfGRjaBEuV01ZcrWCiB8a5fq7i6fjSzwcmwTpol/8kuwg/6AEGpuIO+pjeTp9EioKT2J74qORseWZlgnNFJ7Opc6yFm0/iTPZs11HeilenmVBwGQC+42TX9tDEnBvF0GvxYrUsDMWaE9trYsx6kWxHgROUeoNKvAFM7fEoPGh9eW8cmshkAJbBeRdEe8lV0yRykRcVe6g/TCxc6QA4WmlGNDDa8Ur4uoMoVeWWVujzhKY/WRKmpcj80F/8wEuh+GedZ5bnI8kmJ3heki5Z6v44ASa8IWAaFzRFZr24kVDIhPmvGU2mKxFbJXhE8GUWX51xpIsU0eSdEYX6nwQjDNjNxZA6Cp+fjfTCZOXpMu0uI6EHkDzYOsK/lQvwzZ+JbarFwMJsGIan7DtfKi7BBMLddk/gvYI7pvETXWgx0ERtaE36UQ8qkP40Ms46UzBUJPNxuNumYrPvEFcyaSIFaSo2+7gplQRrxP/8+ZYShcEAYDp3o3x818Bqm3soFNU3evwNLPOpApYTo0DrFjKxyKOICHGX2HkducKat1GIGenF/JXuYmOtRlTni5HlsS2YjTteqR9MafxVB3VDk9GevVJWFpxELZW9CEO90oa2AftKyx6bTDRe2/i1LBKAasLOALN6xkbECAwEAAQ==-----END PUBLIC KEY-----"];


  function getTokens(){
     
    //foreach of the signed blinded signature, perform unblinding and  check if it matches h(r)
    //in this script, token is the signed blinded signature 
    var SignedBlindedSignatures = document.getElementsByClassName("SignedBlindedSignatures");
   // console.log ("num of SignedBlindedSignature: " + SignedBlindedSignatures.length);
	
  //get the latest cookie index - used for saving the prev_r and token to a new cookie
  var index = getLatestCookieIndex();

  //might not be the secure way to do this but this project is not handling the storage security 
	var num_of_token=0;
  for (i=0; i < SignedBlindedSignatures.length; i++){

    //for(j=0; j< pubkeys.length; j++){
      b_string = document.getElementById("b").value;
      b = new BigInteger(b_string); //recast it to a bigInt object

      //random nonce
      r_string = document.getElementById("r").value;
      r = new BigInteger(r_string); //recast it to a bigInt object

      cookie_index_for_cert = findCookieIndexGivenR(r); //get the index based on r. Similarly you can get the index based on b 
      //console.log("cookie_index_for_cert : " + cookie_index_for_cert);
     
      Cert_num_array = getCookie("CertUsed"+(cookie_index_for_cert))-1;
      //console.log("Cert_num_array : " + Cert_num_array);

      CertToUse = pubkeys[Cert_num_array];
      //console.log("Cert index is " + getCookie("CertUsed"+(cookie_index_for_cert)));
      //console.log("Cert to use is " + CertToUse);

      var encrypt = new JSEncrypt();
      encrypt.setPublicKey(CertToUse);

      //console.log(pubkeys[i]);
        
      var pubkey = encrypt.getKey();
      N = new BigInteger(""+pubkey.n);
      e = new BigInteger(""+pubkey.e);

      //console.log("N is " + N);
      //console.log("e is " + e);   

      //compute the multiplicative inverse of b 
      b1 = b.modInverse(N);

      //compute the hash(r) mod N 
      var h = computeHashModN(r, N);

      //console.log("signed blinded signature is " + SignedBlindedSignatures[i].value);
      SignedBlindedSignature = new BigInteger(""+SignedBlindedSignatures[i].value);
      var hash = unblindEncrypt(N, e, SignedBlindedSignature, b1);
        
      //console.log("hash is " + hash);
      //console.log("h is " + h);
      if(hash.equals(h)){

        token = calUnBlindSignedSignature(SignedBlindedSignature, b1, N); //compute token 

        //set the cookies 
        setCookie("token"+index, token, 1);
        setCookie("prev_r"+index, r, 1);
        setCookie("next_CertToUse"+index, document.getElementsByClassName("CertToUse")[i].value, 1);

        console.log("Token is " + token); 
  		  num_of_token = num_of_token+1;
        alert("Token is " + token);   
      } //end of if statement 
    //} //end of for loop for list of public keys 
  } //end of for loop for list of signtures
	
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

//Get the latest cookie index that does not have a r OR a b 
function getLatestCookieIndex(){  
  var i=0;
  while (1){
    var r = getCookie("r"+i);
    var b = getCookie("b"+i);

    //console.log("r is " + r);
    //console.log("b is " + b);
    if (r == "" || b == "") {
        //console.log("index is " + i); 
          return i; 
    }
    i++;
  } 
}