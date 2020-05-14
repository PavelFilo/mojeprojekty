<?php 

		require 'assets/database/conn.php';

			$meno = $_POST['meno'];
			 	$cinnost = $_POST['cinnost'];
			 	$email = $_POST['email'];
			 	$date = $_POST['date'];

		$insert = "INSERT INTO zenit_ziak_8(typ_sluzby,datum_rezervacie,meno,kontakt) VALUES ('$cinnost','$date', '$meno', '$email')";
		$result = mysqli_query($connect, $insert);
		if ($result) {
			echo 'success';
		}