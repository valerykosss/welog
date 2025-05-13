<?php
    require_once __DIR__.'/vendor/autoload.php';
    $settings=require_once __DIR__.'/mail_settings.php';
    require_once __DIR__.'/functions.php';

    function send_email(array $to, string $subject, string $body, int $maxAttempts = 30)
{
    // Общие настройки для отправки почты
    global $settings;
    if (!isset($settings['mail_settings'])) {
        die("Ошибка: настройки почты не загружены.");
    }

    $attempt = 0;
    while ($attempt < $maxAttempts) {
        try {
            // Попытка отправки сообщения
            if (send_mail($settings['mail_settings'], $to, $subject, $body)) {
                $attempt=$attempt+1;
                return true; // Успешная отправка, выходим из функции
            }
        } catch (Exception $e) {
            error_log("Ошибка отправки на попытке #" . ($attempt + 1) . ": " . $e->getMessage() . "<br>");
            sleep(rand(2, 15)); // Пауза перед повторной попыткой
        }
        $attempt++;
    }
    return false;
}
?>