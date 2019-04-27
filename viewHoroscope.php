<?php

    session_start();

    if($_SERVER["REQUEST_METHOD"] == "GET") {

      if(isset($_SESSION["myHoroscope"])) {
        $currentHoroscope = $_SESSION["myHoroscope"];

        echo json_encode($currentHoroscope);
      }
}



 ?>
