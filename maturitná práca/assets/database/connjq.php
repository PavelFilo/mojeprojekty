<?php 
		$connect = mysqli_connect('localhost', 'root', '', 'maturita');
		mysqli_set_charset($connect, "utf8");
		/*if ($connect) {
			echo 'success';
		}*/
 		$sql = "SELECT * FROM comments";
 		$result_array = array();
 		$result = $connect->query($sql);


if ($result->num_rows > 0) {
 	while($row = $result->fetch_assoc()) {
        array_push($result_array, $row);
    }
}

echo json_encode($result_array);

$connect->close();
 ?>