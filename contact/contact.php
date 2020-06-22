<?php
$name = $_POST["name"];
$email = $_POST["email"];
$message = wordwrap($_POST["message"], 70);
mail("treasurer.leedsxrsociety@gmail.com", "Contact via Website from $name", $message, "From: $email\r\nCC: faculty.leedsxrsociety@gmail.com");
?>