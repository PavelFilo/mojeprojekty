<?php  
		session_start();
		require './assets/database/conn.php';
		
		if (isset($_GET['komentarik'])) {
			$komentarik = $_GET['komentarik'];
			if (empty($komentarik) ) {
				echo 'is empty';
			}
				/*else if (!isset($_SESSION['logged_in']) ) {
					$error = 'you have to be logged in';
					$_SESSION['error'] = $error;
					 header('location:./gallery.php');
				}*/

			 else {
				$sql = "DELETE FROM comments WHERE id = '$komentarik'";
				$result = mysqli_query($connect, $sql);

				if ($result) {
					
				header('location:./gallery.php');
				} else {
				  echo 'error';
				}


			}
		}
