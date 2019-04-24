<?php

    session_start();

    if($_POST["action"] == "deleteHoroscope") {

      if(isset($_SESSION["myHoroscope"])) {
        $myHoroscope = $_SESSION["myHoroscope"];

        echo json_encode($myHoroscope);
      } else {
        echo json_encode("Listan är tom");
      }
}

 ?>
