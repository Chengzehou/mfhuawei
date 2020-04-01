
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

$result = $conn->query("select * from phonelist");//查询数据库所有的值

$arr = array();//设置一个新数组，用来存放数据
for($i=0;$i<$result->num_rows;$i++){//$result->num_rows  获取记录集的条数（行数）;
    $arr[$i] = $result->fetch_assoc();//获取记录集（行）里面的内容，生成一个数组，按照顺序获取，每次执行获取一条；
}

echo json_encode($arr);//将数组转换成json格式，并进行编码。与之对应的是json_decode( ) 函数，将数组转换成json格式，并进行解码

?>