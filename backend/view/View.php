<?php
require_once("../model/Model.php");

class View {
  static function get_countries() {
    $data = Model::get_countries();
    $json = json_encode($data);
    return $json;
  }

  static function get_entries($country) {
    $data = Model::get_entries($country);
    $json = json_encode($data);
    return $json;
  }

  static function get_exits($country) {
    $data = Model::get_exits($country);
    $json = json_encode($data);
    return $json;
  }

  static function get_entries_yearly($country) {
    $data = Model::get_entries_yearly($country);
    $json = json_encode($data);
    return $json;
  }

  static function get_exits_yearly($country) {
    $data = Model::get_exits_yearly($country);
    $json = json_encode($data);
    return $json;
  }

  static function get_total_balances() {
    $data = Model::get_total_balances();
    $json = json_encode($data);
    return $json;
  }

}
