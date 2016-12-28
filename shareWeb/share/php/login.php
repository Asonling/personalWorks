<?php
	//设置页面内容是html编码格式是utf-8
	// header("Content-Type: text/plain;charset=utf-8"); 
	header('Access-Control-Allow-Origin:*');
	header('Access-Control-Allow-Methods:POST,GET');
	header('Access-Control-Allow-Credentials:true'); 
	// header("Content-Type: application/json;charset=utf-8"); 
	//header("Content-Type: text/xml;charset=utf-8"); 
	//header("Content-Type: text/html;charset=utf-8"); 
	//header("Content-Type: application/javascript;charset=utf-8"); 
	$users = array(
				array("name" => "沈格格", "password" => "123", "src" => "face1.png"),
				array("name" => "美人至", "password" => "123", "src" => "下载.jpg"),
				array("name" => "七格格", "password" => "123","src" => "t0127d13f5cd666e7a2.jpg"),
				array("name" => "伊丝艾拉YISELLE", "password" => "123", "src" => "1_121119144404_1.jpg"),
				array("name" => "美之藤", "password" => "123", "src" => "t0198b9a909c671de08.jpg"),
				array("name" => "分享社", "password" => "123", "src" => "logo.png"),
				array("name" => "缤慕promone", "password" => "123", "src" => "20110921222100-1053558833.jpg"),
				array("name" => "名师路MINZE STYLE", "password" => "123", "src" => "09-070344_491.jpg"),
				array("name" => "吉承JI", "password" => "123", "src" => "1_12030T42G419.jpg"),
				array("name" => "ME-FOREVER", "password" => "123", "src" => "t015f3e1588f1ef05bc.jpg"),
				array("name" => "森马", "password" => "123", "src" => "2012050514351394677.jpg"),
				array("name" => "ycl", "password" => "123", "src" => "2012050514351394677.jpg")
			);

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		login();
	} 
	// function login(){
	// 	if (!isset($_POST["username"]) || empty($_POST["username"])
	// 		!isset($_POST["password"]) || empty($_POST["password"])) {
	// 		echo "请填写完整的信息";
	// 		return;
	// 	}
	// 	global $users;
	// 	$username = $_POST["username"];
	// 	$password = $_POST["password"];
	// 	$result = '{"success":false,"msg":"没有该用户"}';
		
	// 	foreach ($users as $value) {
	// 		if(($value["name"] == $username )&& ($value["password"] == $password)){
	// 			$result = '{"success":true,"msg":"找到该用户"}';
	// 			break;
	// 		}
	// 	}
	// }

	function login(){
		if (empty($_POST["username"]) || empty($_POST["password"])) {
			$result = array('ret'=>0,'src'=>0);
		} else {
			global $users;
			$username = $_POST["username"];
			$password = $_POST["password"];
			$result[0] = 1;
			$result[1] = 'face.png';
			foreach ($users as $value) {
				if(($value["name"] == $username )&& ($value["password"] == $password)){
					$result[0] = 2;
					$result[1] = $value["src"];
					break;
				}
			}
		}
		echo json_encode($result);
	}
?>