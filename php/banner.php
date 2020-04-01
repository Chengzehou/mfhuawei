<?php
//设置中文字符
header('content-type:text/html;charset=utf-8');

//define用来声明一个常量，一般约定常量名大写
define('HOST','localhost');//定义主机名
define('USERNAME','root');//定义用户名
define('PASSWORD','');//定义密码
define('DBNAME','huaweimall');//定义数据库名

//用 $ 声明一个变量
//php连接数据库   new mysqli(主机名，用户名，密码，数据库名)   连接数据库的类
$conn = new mysqli(HOST,USERNAME,PASSWORD,DBNAME);

//如果前端用post方式提交，就用$_POST['所取值的名']，如果用get方式，就用$_GET['所取值的名']
// $user = $_POST['username'];
// $pass = sha1($_POST['userpassword']);
// // php提供了2个加密函数，
// // sha1():将括号里面的字符串加密成40位的字符
// // md5():将括号里面的字符串加密成32位的字符
// // NOW():获取当前的时间。
// $phone = $_POST['userphone'];


//向数据库中增加前端表单输入的数据
// $sql = "insert form1 values(null,'$user','$pass','$phone',NOW())";
// $conn->query($sql);


//删除数据库中sid为1的记录集（行）
// $conn->query("delete from form1 where sid=1");


//将数据库中sid为4的userphone值改为17852054700;
// $conn->query("update form1 set userphone='17852054700' where sid=4");


$result = $conn->query("select * from huaweibanner");//查询数据库所有的值

$arr = array();//设置一个新数组，用来存放数据
for($i=0;$i<$result->num_rows;$i++){//$result->num_rows  获取记录集的条数（行数）;
    $arr[$i] = $result->fetch_assoc();//获取记录集（行）里面的内容，生成一个数组，按照顺序获取，每次执行获取一条；
}

echo json_encode($arr);//将数组转换成json格式，并进行编码。与之对应的是json_decode( ) 函数，将数组转换成json格式，并进行解码

//echo "我的姓名是{$user},我的密码是{$pass}，我的手机号是{$phone}";
?>