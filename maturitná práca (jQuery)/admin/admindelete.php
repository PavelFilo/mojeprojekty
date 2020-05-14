<?php 	

		session_start();
		require '../assets/database/conn.php';
		$page_name = basename($_SERVER['SCRIPT_NAME'] ,'.php');
		if ($page_name == 'index') $page_name = 'Home'; 
		if (isset($_SESSION['logged_in_admin']) == false) {
			header('Location: ../index.php');
		};

if (isset($_POST['delete_file'])) {
	$filename = $_POST['file_name'];
	unlink('../assets/img/galleryimg/'.$filename );
}

?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title><?php echo $page_name ?> // Pavel Fiľo</title>
		<link rel="shortcut icon" href="../assets/img/logo.png" />
		<link href="https://fonts.googleapis.com/css?family=EB+Garamond" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Raleway:300,400,700" rel="stylesheet">
		<link rel="stylesheet" href="../assets/css/font-awesome.min.css">
		<link rel="stylesheet" href="../assets/css/header.css">
		<link rel="stylesheet" href="../assets/css/content.css">
	</head>
	<body>
		<div id="top"></div>
		<header>
			<a id="menuButton" href="#">
				<i class="fa fa-bars"></i>
				<span>Menu</span>
			</a>
			<div>
				<img src="../assets/img/logo.png" width="35" alt="logo">
				<h2>&nbspPavel&nbsp&nbsp Fiľo</h2>
			</div>
	

	<?php  	if (isset($_SESSION['logged_in'])) {
			?>	
			<nav class="headerNav">
				<li><a href="./logout.php">Log Out</a></li>
			</nav>
			

			<?php 

		} else {
		?>
			<nav class="headerNav">
				<li><a href="./signin.php">Sign In</a></li>
				<li><a href="./index.php">Log In</a></li>
			</nav>
			<?php } ?> 
		</header>
		<nav class="toggleNav">
			<ul>
				<li><a href="../index.php">Home</a></li>
				<li><a href="../gallery.php">Gallery</a></li>
				<li><a href="../about.php">About</a></li>
				<li><a href="../contact.php">Contact</a></li>
			</ul>
		</nav>
<div class="adminform">
<?php 

	$folder = "../assets/img/galleryimg/" ;
	$files = glob("../assets/img/galleryimg/*.*");
	$i=0;
	if ($dir = opendir($folder)) {
		while (($file = readdir($dir)) !== false ) {
		if ($file == '.' or $file == '..') {
		} else {
			echo '<div class="vymazat">';
			echo '<p>'.$file.'</p>';
			echo '<img src="'.$files[$i].'"  width="auto" height="200" >';
			echo '<form action="admindelete.php" method="post">';
			echo "<input type='hidden' name='file_name' value='".$file."'>";
			echo '<input class="button4" type="submit" name="delete_file" value="Delete File">';
			echo '</form>';
			echo '</div>';
			$i=$i+1;
		}

		}
		closedir($dir);
	}
?>
</div>
	
<a href="admin.php" style="position: relative; top: -30px;">Back</a>



<div class="pre-footer">
				<div class="links">
					<a href="https://www.facebook.com/pavel.p.filo.1" target="_blank"><i class="fa fa-facebook-square"></i></a>					
					<a href="https://www.instagram.com/palo_filo/" target="_blank"><i class="fa fa-instagram"></i></a>
					<a href="https://twitter.com/sani3212" target="_blank"><i class="fa fa-twitter"></i></a>
					<a href="https://plus.google.com/u/0/107145111532613023320" target="_blank"><i class="fa fa-google-plus"></i></a>
				</div>
				<form class="email-form" action="	" method="post">
					<p>Subscribe to my Newsletter</p>
					<input class="email" type="email" >
					<input class="button" type="submit" value="Sign me up">
				</form>
			</div>
			<footer>
				<nav id="not-fixed">
					<ul>
						<li><a href="../index.php">Home</a></li>
						<li><a href="../gallery.php">Gallery</a></li>
				<!--		<li><a href="blog.php">Blog</a></li>
						<li><a href="eshop.php">eShop</a></li> -->
						<li><a href="../about.php">About</a></li>
						<li><a href="../contact.php">Contact</a></li>
					</ul>
				</nav>

				<div class="scrolltop">
					<p class="nadpisabout"><a href="#">Scroll to top</a></p>	
				</div>

				
				<p class="copyright">	&copy; Pavel Fiľo 2017 / All rights reserved</p>
			</footer>
	
		</div>
		<div class="aboutpavel" style="display: none;"></div>

		<!--script-->
		<script src="../assets/jq/jquery-3.1.1.min.js"></script>	
		<script src="../assets/jq/script.js"></script>

	</body>
</html>
