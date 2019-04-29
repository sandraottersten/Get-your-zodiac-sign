<?php

    session_start();

// ger tillgång till sidan via GET, kollar om det finns något i SESSION och echoar det

    if($_SERVER["REQUEST_METHOD"] == "GET") {

      if(isset($_SESSION["myHoroscope"])) {
        $currentHoroscope = $_SESSION["myHoroscope"];

        echo json_encode($currentHoroscope);
      } else {
        echo json_encode(false);
      }
}



 ?>
