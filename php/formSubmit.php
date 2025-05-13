<?php
    require_once "./mail/mail_client_connect.php";

    if(isset($_POST)){
        $today = date("d-m-Y H:i");  
        $name = $_POST['name'];
        $client_email = $_POST['email'];
        $tel = $_POST['tel'];
        $email="mail@gmail.com";
        //ТУТ ООБЯЗАТЕЛЬНО МЫЛО КОМПАНИИ

        $message_body="
            <h3>Заявка от клиента:</h3>
            <p>Имя: ".$name."</p>
            <p>Почта: ".$client_email."</p>
            <p>Номер телефона: ".$tel."</p>
            <i>Заявка создана ".$today."</i>
        ";

        send_email([$email], "Заявка Welog", $message_body);
    }
    echo json_encode([
        "status" => "success",
    ]);
?>