<?php include 'databaseMgr.php' ?>
<html>
  <meta charset="UTF-8">

<!-- stylesheet -->
<link rel="stylesheet" href="https://192.168.1.1/FYP-ARS/style/Articles/bootstrap.min.js">

<!-- jquery -->
<script src="https://192.168.1.1/FYP-ARS/lib/jquery-1.8.3.min.js"></script>

<!-- library for decoding the certificates -->
<script src="https://192.168.1.1/FYP-ARS/bin/jsencrypt.min.js"></script>

<!-- library for the math -->
<script src="https://192.168.1.1/FYP-ARS/lib/jsbn/jsbn.js" ></script>
<script src="https://192.168.1.1/FYP-ARS/lib/jsbn/jsbn2.js" ></script>

<!-- Customized library for creating the token -->
<script src="https://192.168.1.1/FYP-ARS/scripts/Articles.js"></script>

<!-- library md5.js -->
<script src="https://192.168.1.1/FYP-ARS/scripts/md5.js"></script>

<body onload="setValues()" background="https://192.168.1.1/FYP-ARS/images/background5.jpg">
  <div class="container">
    <h1 align="center"> Welcome to ABC news portal ! </h1>
    <br />
  <div class="container">
  <h2>Below is the list of Token(s) </h2>
  <?php 

    $list_of_articles = getListofArticles();
    $count =1; 

    if (!empty($list_of_articles)){
      print ' <table class="table table-striped table-hover" style="table-layout:fixed;" width="300px;">';
      print '<thead><tr><th>Token</th><th>Certificate to use next</th></tr></thead>';  

      print '<tbody>';
      foreach ($list_of_articles as $articles){
        print 
          '<tr>
            <td style="word-wrap:break-word;">'.$articles["Signed_Blinded_Signature"].'<input type="hidden" class="SignedBlindedSignatures" value="'.$articles["Signed_Blinded_Signature"].'"></td>
            <td style="word-wrap:break-word;">'.$articles["CertToUse"].'<input type="hidden" class="CertToUse" value="'.$articles["CertToUse"].'"></td>
          </tr>';      
      }
      print '</tbody>';
      print '</table>';
      print '<div class="container">';
      print 'Enter the blinding factor: <select id="b" name="b" class="form-control"  onchange="setRAccordingtoB()"></select><br/>';
      print 'Enter the random nonce:  <select id="r" name="r" class="form-control"  onchange="setBAccordingtoR()"></select><br/>';
      print '<div align="center"><input id="testme" type="button" class="btn btn-success" value="Get token" onclick="getTokens()" /></div>';
      print '</div>';
    }   
  ?>
  </div>
  <br />
</body>
</html>
