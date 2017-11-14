<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Untitled Document</title>
</head>

<body>
<?php
	$myfile = fopen("othersinput.txt", "a");
	$txt = $_POST["message"];
	fwrite($myfile,$txt);
	fwrite($myfile,"\n");
	fclose($myfile);
	?>
</body>
</html>