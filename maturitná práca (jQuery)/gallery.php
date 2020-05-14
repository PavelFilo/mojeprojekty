
<?php  
		session_start();
		error_reporting(0);
		require './assets/database/conn.php';
		
		if (isset($_POST['text'], $_POST['id_obrazka'])) {
			$idobr = $_POST['id_obrazka'];
			$text = $_POST['text'];
			$name = $_POST['name'];
			if (empty($idobr) or empty($text) ) {
				$error = 'all columns required';
			}
				else if (!$_SESSION['logged_in']) {
					$error = 'you have to be logged in';
				}

			 else {
				$sql = "INSERT INTO comments(text, id_obrazka,name) VALUES ( '$text', '$idobr', '$name')";
				$result = mysqli_query($connect, $sql);

				if ($result) {
					header('location:./gallery.php');
				} else 
					$error = 'error';


			}
		}


		?>


<?php

	 include 'parts/header.php';

  ?>
	
	<div class="overlay"></div>
	<div class="overlay2">
		<span class="close">×</span>
		<span class="left">❮</span>
		<span class="right">❯</span>
		<div class="comentary">
			<h1>Comments</h1>
			<div class="komentare">
				
			</div>
			
			<?php if (isset($_SESSION['logged_in'])) { ?>

			<form action="gallery.php" method="post">
				<input class="texty" type="text" name="text" placeholder="  type your comment">
				<input class="hidden" type="hidden" name="id_obrazka">
				<input type="hidden" name="name"  value="<?php if ($_SESSION['username']) {
					echo $_SESSION['username'];
				} ?>">
				<input class="submit" type="submit" value="send">
			</form>
			
				<?php } else {?>
			<p class="plslogin">to comment please log in</p>
			<?php } ?>
			</div>
	</div>
	<ul class="gallery"> 
		<h1 class="galleryheader">Gallery</h1>
		<?php if(isset($error)) { ?>
				<p style="color:#aa0000;"><?php echo('error: '.$error)?> 
		<?php } ?></p>	


		<?php
		$files = glob("assets/img/galleryimg/*.*");

		for ($i=0; $i<count($files); $i++)

		{

		$image = $files[$i];
		echo '<li class="photo'.$i.'">';
		echo '<img src="'.$image .'" width="auto" height="200" />';
		echo '</li>';
		}
		
		
		?>

	
	</ul>
	<section class="aboutgallery">
		<h1 class="galleryheader"> About Gallery</h1>
		<p>Gallery is group of photos which when you click on, big one photo will open so you can see there buttons. With which you can select another and you can move in a gallery  </p>
		<p>The website contains reproductions of over 35,000 works[2] and includes accompanying text on the artworks and artists, accessible through a searchable database. The site is a leading example of an independently established collection of high-quality historically important pictures.</p>
		<p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue</p>
		<h1 class="galleryheader">What a Website Is</h1>
		<p>Websites can have many functions and can be used in various fashions; a website can be a personal website, a corporate website for a company, a government website, an organization website, etc. </p>
		<p class="lastonne"> Websites are typically dedicated to a particular topic or purpose, ranging from entertainment and social networking to providing news and education. All publicly accessible websites collectively constitute the World Wide Web, while private websites, such as a company's website for its employees, are typically a part of an intranet.</p>
	</section>
	<article class="<?php echo $i ?>"></article>
	<div class="aboutpalko" style="display: none;"></div>
	<div class="username" style="display: none;"><?php if ($_SESSION['username']) {
		echo $_SESSION['username'];
	}?></div>
  <?php include 'parts/footer.php'; ?>