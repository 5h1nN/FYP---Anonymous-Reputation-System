<?php include "databaseMgr.php" ?>
<html>
  <meta charset="UTF-8">

<!-- stylesheet -->
<link rel="stylesheet" href="style/Journalist/bootstrap.min.js">

<!-- jquery -->
<script src="http://code.jquery.com/jquery-1.8.3.min.js"></script>

<!-- library for decoding the certificates -->
<script src="bin/jsencrypt.min.js"></script>

<!-- library for the math -->
<script src="lib/jsbn/jsbn.js" ></script>
<script src="lib/jsbn/jsbn2.js" ></script>

<!-- Customized library for signing the blind signature -->
<script src="scripts/Journalist.js"></script>

<!-- library md5.js -->
<script src="scripts/md5.js"></script>

<body onload="validateToken()" background="images/background5.jpg">

<div align="center" class="container"> <!-- start of main container-->
	<!-- actual table -->
	<h2>------------ For Journalist -----------</h2>
	<label for="privkey">Private Key</label><br/>
	    <textarea id="privkey" rows="15" cols="65" class="form-control">
	-----BEGIN RSA PRIVATE KEY-----
	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
	-----END RSA PRIVATE KEY-----
	</textarea><br/>
	
	<div class="container"> <!-- start of table container-->
    <label for="input">---- Summary ----</label><br/>
	<table border="1" width="100%" class="table table-striped table-hover" style="table-layout:fixed;"" width="300px;">
	<?php 
		$list_of_reports = getListofReports();
		if(!empty($list_of_reports)){
			print '<tr><th>Index</th><th>Text</th><th>Blind Message</th><th>Token</th><th>Previous r</th><th>Validity</th><th>&nbsp;</th></tr>';	
			
			$index = 1;
			
			foreach ($list_of_reports as $report){

				print '<tr>
					<td style="word-wrap:break-word;">'.$index.'</td>
					<td style="word-wrap:break-word;">'.$report["text"].'</td>
					<td style="word-wrap:break-word;">'.$report["blind_message"].'</td>
					<td style="word-wrap:break-word;">'.$report["token"].'<input type="hidden" class="token" value="'.$report["token"].'" class="form-control"></td>
					<td style="word-wrap:break-word;">'.$report["prev_r"].'<input type="hidden" class="prev_r" value="'.$report["prev_r"].'" class="form-control"></td>
					<td style="word-wrap:break-word;" id="validity'.$index.'"></td>					
					<td align="center" style="word-wrap:break-word;">
						<input id="sign" type="button" value="Sign" onclick="sign(\''.$report["blind_message"].'\',\''.$report["text"].'\')" class="btn btn-success" style="width: 100px;"/>
						<br />
						<br />
						
						<input id="	" type="button" value="Delete" onclick="deleteReport(\''.$report["blind_message"].'\',\''.$report["text"].'\')" class="btn btn-danger" style="width: 100px;"/>
					</td>
					</tr>';	

					$index++;
			} //end of foreach loop 
		} //end of if statement
	?>
	</table>
	</div><!-- end of table container-->

</div><!-- end of main container-->
<br />
</body>
</html>
