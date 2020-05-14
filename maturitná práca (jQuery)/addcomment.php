<?php  
		session_start();
		require '../assets/database/conn.php';
		
		if (isset($_POST['text'], $_POST['id_obrazka'])) {
			$idobr = $_POST['id_obrazka']
			$text = $_POST['text'];
			if (empty($idobr) or empty($text) ) {
				$error = 'all columns required';
			}
			 else {
				$sql = "INSERT INTO comments(text, id_obrazka) VALUES ( '$text', '$idobr')";
				$result = mysqli_query($connect, $sql);

				if ($result) {
					header('location:./gallery.php');
				} else 
					$error = 'error';


			}
		}


		?>