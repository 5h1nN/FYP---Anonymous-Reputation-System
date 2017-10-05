<?php include 'databaseMgr.php' ?>
<html>
  <meta charset="UTF-8">

<!-- stylesheet -->
<link rel="stylesheet" href="style/Articles/bootstrap.min.js">

<!-- jquery -->
<script src="http://code.jquery.com/jquery-1.8.3.min.js"></script>

<!-- library for decoding the certificates -->
<script src="bin/jsencrypt.min.js"></script>

<!-- library for the math -->
<script src="lib/jsbn/jsbn.js" ></script>
<script src="lib/jsbn/jsbn2.js" ></script>

<!-- Customized library for creating the token -->
<script src="scripts/Articles.js"></script>

<!-- library md5.js -->
<script src="scripts/md5.js"></script>

<body onload="setValues()" background="images/background5.jpg">
  <div class="container">
    <h1 align="center"> Welcome to ABC news portal ! </h1>
    <div class="form-group">
    <label for="pubkey">Public Key</label><br/>
      <textarea id="pubkey" rows="15" cols="100%" class="form-control">
  -----BEGIN PUBLIC KEY-----
  MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAowkDHhOZ8hM0jNhB5BAM
  U50WqjZzJ3B31SPN5oreCn9PMxdJJyI1YW6fwMEPYmbOWDOWGlS6cbMDB1REYPFV
  z/3AvIhIyrPEzstZzu9MUZsyeYgw+jl73ORZo0xlYCR/QZLXjQt79OI4d0CPgifH
  X/BAaIQuo67HUwRNxlfOW3+OyCjJCYxzIxpkuFtE3voCDoUc7SIRnmhcMObvyEI5
  of2zNO+4DrVjFv4fb1cgI2lQZQ8+cpxnmlXolSiobL0KKIUqHgmMGfeqWrCW6GLE
  pNqhJ+YvOzXPbdyxHNJEG3LLveRVVT2VBzcaGFDKQXjqfvtvsAwhROAjJONRM/Oq
  nCJEWfifiuYvCDSqqNM+XWvNO3svyuCIGw3fHxwulPhEcW4jOMKagN6NOjv+tnKA
  4OwJ0/EMK2Y2qomEmWjypkN0wCFFYwrNRgystLnrDuaXzjOckDjV4+Hy3IMWXgjU
  jFy+VRFANYNcfNqRLwaRv4ZeXyTNtPfQRL5OnQjJz4tr6zXllEyJDdqu5Hgl/N1c
  ZC8zdfxsaVfDutswGmYBruzBQ8dJOiMRtdWRCbIih8gPCsQXEYNdvbgMj5Asaj38
  lLSXM6FoRBuSc5jR6xLa5qHCxYzj2QyGNJUiECsLnjhfVDH+2kJ6h9dYTMKnTaS+
  HcCzvGROu3gRNkkusdb3+XMCAwEAAQ==
  -----END PUBLIC KEY-----
    </textarea><br/>
    </div>
  </div>
  <br />

  <div class="container">
  <h2>Below is the list of token </h2>
  <?php 

    $list_of_articles = getListofArticles();
    $count =1; 

    if (!empty($list_of_articles)){
      print ' <table class="table table-striped table-hover" style="table-layout:fixed;" width="300px;">';
      print '<thead><tr><th>Token</th></tr></thead>';  

      print '<tbody>';
      foreach ($list_of_articles as $articles){
        print '<tr>
          <td style="word-wrap:break-word;">'.$articles["token"].'<input type="hidden" class="SignedBlindedSignatures" value="'.$articles["token"].'"></td></tr>';      
      }
      print '</tbody>';
      print '</table>';
      print '<div class="container">';
      print 'Enter the blinding factor: <input type="text" id="b" class="form-control" /><br />';
      print 'Enter the random nonce: <input type="text" id="r" class="form-control" /><br />';
      print '<div align="center"><input id="testme" type="button" class="btn btn-success" value="Get token" onclick="getTokens()" /></div>';
      print '</div>';
    }   
  ?>
  </div>
  <br />
</body>
</html>
