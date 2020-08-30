<?php

if(isset($_POST['submit']))
{
$name = $_POST['fname'];
$emailFrom = $_POST['email'];
$inquiry = $_POST['inquiry'];
$message = $_POST['message'];

$mailTo = "lilian.ljungkvist@gmail.com";
$headers = "From: ".$emailFrom;
$txt = "Recieved email from: ".$name.".\n\n".$message;

mail($mailTo, $subject, $txt, $headers);
header("Location: contact.html?mailsend")
}
