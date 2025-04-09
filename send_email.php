<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    $to = "tomszma14@gmail.com";

    $txt = "Imię: " . $name . "\r\n" . "Email: " . $email . "\r\n" . "Temat: " . $subject . "\r\n" . "\r\n" . "Treść: " . $message;
    
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";

    $mail_status = mail($to, $subject, $txt, $headers);
    
?>