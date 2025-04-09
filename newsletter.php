<?php
header('Content-Type: text/html; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    
    if (empty($email)) {
        echo 'Proszę podać adres email.';
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo 'Podaj poprawny adres email.';
        exit;
    }
    
    $file = 'newsletter_subscribers.txt';
    $current = file_get_contents($file);
    $current .= "$email\n";
    
    if (file_put_contents($file, $current)) {
        echo 'success|Dziękujemy za zapisanie się do newslettera!';
    } else {
        echo 'Wystąpił problem podczas zapisywania. Spróbuj ponownie później.';
    }
} else {
    echo 'Nieprawidłowe żądanie.';
}
?>