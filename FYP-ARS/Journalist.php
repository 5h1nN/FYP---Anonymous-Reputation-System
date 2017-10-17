<?php include "databaseMgr.php" ?>
<html>
  <meta charset="UTF-8">

<!-- stylesheet -->
<link rel="stylesheet" href="https://192.168.1.1/FYP-ARS/style/Journalist/bootstrap.min.js">

<!-- jquery -->
<script src="https://192.168.1.1/FYP-ARS/lib/jquery-1.8.3.min.js"></script>

<!-- library for decoding the certificates -->
<script src="https://192.168.1.1/FYP-ARS/bin/jsencrypt.min.js"></script>

<!-- library for the math -->
<script src="https://192.168.1.1/FYP-ARS/lib/jsbn/jsbn.js" ></script>
<script src="https://192.168.1.1/FYP-ARS/lib/jsbn/jsbn2.js" ></script>

<!-- library md5.js -->
<script src="https://192.168.1.1/FYP-ARS/scripts/md5.js"></script>

<!-- Customized library for signing the blind signature -->
<script src="https://192.168.1.1/FYP-ARS/scripts/Journalist.js"></script>

<body onload="validateToken()" background="https://192.168.1.1/FYP-ARS/images/background5.jpg">

<div align="center" class="container"> <!-- start of main container-->
	<!-- actual table -->
	<h2>------------ For Journalist -----------</h2>
    <!--<label for="privkey">Private Key : </label><br/>-->
    <?php 
    	$privatekeys = getAllPrivateKeys();
		foreach ($privatekeys as $privatekey){ 
			echo '<input type="hidden" id="'.$privatekey["TrustLevel"].'" value="'.$privatekey["PrivateKey"].'"/>';
		}   	
    ?>
	<br/>
	
	<div class="container"> <!-- start of table container-->
    <label for="input">---- Summary ----</label><br/>
	<table border="1" width="100%" class="table table-striped table-hover" style="table-layout:fixed;">
	<?php 
		$list_of_reports = getListofReports();
		if(!empty($list_of_reports)){
			print '<tr><th>Index</th><th>Text</th><th>Blind Message</th><th>Token</th><th>Previous r</th><th>Trust Level</th><th>Action</th></tr>';	
			
			$index = 1;
			
			foreach ($list_of_reports as $report){

				print '<tr>
					<td style="word-wrap:break-word;">'.$index.'</td>
					<td style="word-wrap:break-word;">'.$report["text"].'</td>
					<td style="word-wrap:break-word;">'.$report["blind_message"].'</td>
					<td style="word-wrap:break-word;">'.$report["token"].'<input type="hidden" class="token form-control" value="'.$report["token"].'"></td>
					<td style="word-wrap:break-word;">'.$report["prev_r"].'<input type="hidden" class="prev_r form-control" value="'.$report["prev_r"].'"></td>
					<td style="word-wrap:break-word;" id="validitybox'.$index.'">'.$report["TrustLevel"].'<input type="hidden" id="validity'.$index.'" class="form-control" value="'.$report["TrustLevel"].'" />
						<input type="hidden" id="prev_pubkey'.$index.'" class="form-control" value="'.$report["prev_pubkey"].'" />
					</td>										
					<td align="center" style="word-wrap:break-word;">
						<input id="sign" type="button" value="1" onclick="sign(\''.$report["blind_message"].'\',\''.$report["TrustLevel"].'\',\'1\',\''.$report["token"].'\')" class="btn btn-success" style="width: 100px;"/>
						<br />
						<br />						
						<input id="sign" type="button" value="2" onclick="sign(\''.$report["blind_message"].'\',\''.$report["TrustLevel"].'\',\'2\',\''.$report["token"].'\')" class="btn btn-success" style="width: 100px;"/>
						<br />
						<br />
						<input id="sign" type="button" value="3" onclick="sign(\''.$report["blind_message"].'\',\''.$report["TrustLevel"].'\',\'3\',\''.$report["token"].'\')" class="btn btn-success" style="width: 100px;"/>
						<br />
						<br />
						<input id="sign" type="button" value="4" onclick="sign(\''.$report["blind_message"].'\',\''.$report["TrustLevel"].'\',\'4\',\''.$report["token"].'\')" class="btn btn-success" style="width: 100px;"/>
						<br />
						<br />
						<input id="sign" type="button" value="5" onclick="sign(\''.$report["blind_message"].'\',\''.$report["TrustLevel"].'\',\'5\',\''.$report["token"].'\')" class="btn btn-success" style="width: 100px;"/>
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
