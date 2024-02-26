<?php
require_once("../connect.php");

class Model {
  static function get_countries() {
    global $conn;
    $query = "SELECT * 
              FROM countries 
              WHERE name != 'Dati non ripartibili'";
    $result = mysqli_query($conn, $query);
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
    return $data;
  }

  static function get_entries($country) {
    global $conn;
    $query = "SELECT *
              FROM expenses
              WHERE type = 'entry' AND country = '$country'";
    $result = mysqli_query($conn, $query);
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
    return $data;
  }
  
  static function get_exits($country) {
    global $conn;
    $query = "SELECT *
              FROM expenses 
              WHERE type = 'exit' AND country = '$country'";
    $result = mysqli_query($conn, $query);
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
    return $data;
  }

  static function get_entries_yearly($country) {
    global $conn;
    $query = "SELECT country, year, `type`, SUM(money) money
              FROM expenses
              WHERE type = 'entry' AND country = '$country'
              GROUP BY year";
    $result = mysqli_query($conn, $query);
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
    return $data;
  }

  static function get_exits_yearly($country) {
    global $conn;
    $query = "SELECT country, year, `type`, SUM(money) money
              FROM expenses 
              WHERE type = 'exit' AND country = '$country'
              GROUP BY year";
    $result = mysqli_query($conn, $query);
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
    return $data;
  }
  
  static function get_total_balances() {
    global $conn;
    $query = "SELECT T1.entries - T2.exits AS balance, T2.country
              FROM total_entries T1 JOIN total_exits T2 ON (T1.country=T2.country)
              WHERE T1.country IN (
                SELECT name
                FROM countries
                WHERE part_of IS NULL AND name != 'Totale'
              )
              ORDER BY balance DESC";
    $result = mysqli_query($conn, $query);
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
    return $data;
  }

}
