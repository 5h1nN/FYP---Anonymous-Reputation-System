# FYP---Anonymous-Reputation-SystemIntroduction
The aim of this project is to prevent Distributed Denial of Services attack by making use of blind signature. 
For more information about Blind Signature, refer to https://en.wikipedia.org/wiki/Blind_signature

The web application is created as a proof of concept of how blind signature can be used to provide a token of trust in anonymous connection. For more information, please refer to the amended final report. 

Credits: 
This project is done under the supervision of Prof Alwen Fernanto Tiu and Prof Anwitaman Datta. 
This project uses the JSBN library written by Tom Wu @ http://www-cs-students.stanford.edu/~tjw/jsbn/ for the RSA math calculation. 

How to use this library. (Setup)
=======================
1. [Generation of RSA private key via OpenSSL] 
```
openssl genrsa -out rsa_1024_priv.pem 1024
```
2. [Generation of RSA public key via OpenSSL] 
```
openssl rsa -pubout -in rsa_1024_priv.pem -out rsa_1024_pub.pem
```
3. Setting up the Web Server using XAMPP 
```
a. Download XAMPP 
```
b. Copy the FYP-ARS directory into the htdocs folder 
```
- In order for it to work, you need to replace the IP addresses stated in the following files to your ip address
``` 
  i. Articles.php
 ii. databaseMgr.php
iii. Journalist.php
 iv. WhistleBlower.html
```
c. Generate a SSL certified (self-signed) using the makecert command 
```
For more information:
https://support.comodo.com/index.php?/Knowledgebase/Article/View/1210/19/how-to-configure-a-certificate-for-use-in-xampp
```