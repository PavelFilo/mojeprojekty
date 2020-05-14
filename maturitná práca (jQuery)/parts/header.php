<?php 	

		session_start();
		require 'assets/database/conn.php';
		$page_name = basename($_SERVER['SCRIPT_NAME'] ,'.php');
		if ($page_name == 'index') $page_name = 'Home'; 

?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1.0">
		<title><?php echo $page_name ?> // Pavel Fiľo</title>
		<link rel="shortcut icon" href="assets/img/logo.png" />
		<link href="https://fonts.googleapis.com/css?family=EB+Garamond" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Raleway:300,400,700" rel="stylesheet">
		<link rel="stylesheet" href="assets/css/font-awesome.min.css">
		<link rel="stylesheet" href="assets/css/header.css">
		<link rel="stylesheet" href="assets/css/content.css">
	</head>
	<body>
		<div id="top"></div>
		<header>
			<a id="menuButton" href="#">
				<i class="fa fa-bars"></i>
				<span>Menu</span>
			</a>
			<div class="logo">
				<img src="assets/img/logo.png" width="35" alt="logo">
				<h2>&nbspPavel&nbsp&nbsp Fiľo</h2>
			</div>
	

	<?php  	if (isset($_SESSION['logged_in'])) {
			?>	
			<nav class="headerNav">
				 <?php  if (isset($_SESSION['logged_in_admin'])) {
						echo '<li><a href="./admin/admin.php">Admin</a></li>'; 		
				 	} ?>
					
				
				<li><a href="./admin/logout.php">Log Out</a></li>
			</nav>
			

			<?php 

		} else {
		?>
			<nav class="headerNav">
				<li><a href="./admin/signin.php">Sign In</a></li>
				<li><a href="./admin/index.php">Log In</a></li>
			</nav>
			<?php } ?> 
		</header>
		<nav class="toggleNav">
			<ul>
				<li><a href="index.php">Home</a></li>
				<li><a href="gallery.php">Gallery</a></li>
				<li><a href="about.php">About</a></li>
				<li><a href="contact.php">Contact</a></li>
			</ul>
		</nav>