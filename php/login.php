<?php
	$user=array(
		array(
			"username"=>"zhangsan",
			"password"=>"123456"
			),
		array(
			"username"=>"lisi",
			"password"=>"123456"
			),
		array(
			"username"=>"wanger",
			"password"=>"123456"
			)
		);
	 $uname = $_POST['username'];
     $psw= $_POST['password'];
     $flag=0;
     foreach ($user as $value) {
     	if($value["username"]==$uname&&$value["password"]==$psw){
     		$flag=1;
     		break;
     	}
     }
     if($flag==0){
     	header("location:../login.html");
     }else{
     	header("location:../index.html");
     }

?>