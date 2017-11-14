<html>
<body>

<?php
    $myfile = fopen("emailList.txt","a");
    $txt = $_POST["email"];
    fwrite($myfile,$txt);
    fwrite($myfile,"\n");
    fclose($myfile);
 ?>


Thank you for Subscribing<br>
Your email address is: <?php echo $_POST["email"]; ?>

</body>
</html>
