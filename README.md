# FYP---Anonymous-Reputation-SystemIntroduction
The aim of this project is to prevent Distributed Denial of Services attack by making use of blind signature. 
For more information about Blind Signature, refer to https://en.wikipedia.org/wiki/Blind_signature

Credits: 
This project is done under the supervision of Prof Alwen Fernanto Tiu and Prof Anwitaman Datta. 
This project uses the JSBN library written by Tom Wu @ http://www-cs-students.stanford.edu/~tjw/jsbn/ for the RSA math calculation. 

How to use this library. (incomplete)
=======================
1. Generate a RSA private key thru 
```
openssl genrsa -out rsa_1024_priv.pem 1024
```
2. Generate a RSA public key thru 
```
openssl rsa -pubout -in rsa_1024_priv.pem -out rsa_1024_pub.pem
```
3. Copy and paste the private and public key into the textfield and click on the "Test Me!" button
