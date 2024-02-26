<?php
require_once("../view/View.php");

if (!isset($_GET["mode"])) die("Missing parameter 'mode'");

switch ($_GET["mode"]) {
  case 'get_countries':
    echo View::get_countries();
    break;
  
  case 'get_entries':
    if (!isset($_GET["country"])) die("Missing parameter 'country'");
    $country = $_GET["country"];
    echo View::get_entries($country);
    break;
  
  case 'get_exits':
    if (!isset($_GET["country"])) die("Missing parameter 'country'");
    $country = $_GET["country"];
    echo View::get_exits($country);
    break;
  
  case 'get_entries_yearly':
    if (!isset($_GET["country"])) die("Missing parameter 'country'");
    $country = $_GET["country"];
    echo View::get_entries_yearly($country);
    break;

  case 'get_exits_yearly':
    if (!isset($_GET["country"])) die("Missing parameter 'country'");
    $country = $_GET["country"];
    echo View::get_exits_yearly($country);
    break;

  case 'get_total_balances':
    echo View::get_total_balances();
    break;

}
