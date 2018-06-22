# react + fetch + react-redux + 临时组件库

  react技术栈实践。

  一、先行进行数据库建库。(见服务端包gt_nav_website.sql)。

  二、启动后端服务。

    1、执行npm install 安装所需依赖包。
    2、config文件夹下sql_config.json配置数据库信息。
    3、config文件夹下default.json配置host路径。
    4、使用命令 pm2 start ./bin/www 启动node服务。

  三、部署前端。
    1、将前端包部署到ngxin上，具体配置如下参考
    
    server {
          listen       8761; #前端页面端口
          server_name  192.168.25.230; #前端页面host

          client_max_body_size    100m;

          location / {
              root    html/react/; // 前端包地址
              proxy_set_header    X-Real-IP   $remote_addr;
              proxy_set_header    Host    $host;
              proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
        }
          location ^~ /apiService/ {
              proxy_pass          http://localhost:4000/; #后端API地址
              proxy_set_header    X-Real-IP   $remote_addr;
              proxy_set_header    Host    $host;
              proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
          }
          location ^~ /uploadImg {
              proxy_pass          http://localhost:4000; #代理至后端上传图片地址
              proxy_set_header    X-Real-IP   $remote_addr;
              proxy_set_header    Host    $host;
              proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
          }
    }
