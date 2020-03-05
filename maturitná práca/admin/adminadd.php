<?php 	

		session_start();
		require '../assets/database/conn.php';
		$page_name = basename($_SERVER['SCRIPT_NAME'] ,'.php');
		if ($page_name == 'index') $page_name = 'Home'; 
		if (isset($_SESSION['logged_in_admin']) == false) {
			header('Location: ../index.php');
		};



    if (isset($_POST['submit'])) {

    $thisdir = dirname(getcwd(),1);
    $uploaddir = "/assets/img/galleryimg/";

    $errors = []; 
    $fileExtensions = ['jpeg','jpg']; 

    $fileName = $_FILES['image']['name'];
    $fileSize = $_FILES['image']['size'];
    $fileTmpName  = $_FILES['image']['tmp_name'];
    $fileType = $_FILES['image']['type'];
    $fileexplode = explode('.',$fileName);
    $fileExtension = strtolower(end($fileexplode));

    $uplPath = $thisdir . $uploaddir . basename($fileName); 


        if (! in_array($fileExtension,$fileExtensions)) {
            $errors[] = "This file extension is not allowed. Please upload a JPEG or JPG file";
        }

        if ($fileSize > 2000000) {
            $errors[] = "This file is more than 2MB. Sorry, it has to be less than or equal to 2MB";
        }

        if (empty($errors)) {
            $didUpload = move_uploaded_file($fileTmpName, $uplPath);

            if ($didUpload) {
              //  echo "The file " . basename($fileName) . " has been uploaded";
            } else {
                echo "An error occurred somewhere. Try again.";
            }
        } else {
            foreach ($errors as $error) {
                echo $error . "\n";
            }
        }
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

<form class="adminform" action="admin.php" method="post" enctype="multipart/form-data">
	<?php  if (isset($didUpload)) {
                echo "<p>The file " . basename($fileName) . " has been uploaded</p>";}
       ?>
        <p>Upload a File:</p>
        <input type="file" name="image" id="fileToUpload" >
        <input class="button2 w160" type="submit" name="submit" value="Upload File Now" >
</form>

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
