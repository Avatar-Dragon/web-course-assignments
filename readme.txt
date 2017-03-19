

开启方式：

1、进入signin文件夹，打开cmd

2、启动这个应用（MacOS 或 Linux 平台）：
   DEBUG=myapp npm start

3、Windows 平台使用如下命令：
   set DEBUG=myapp & npm start

4、在浏览器中打开 http://localhost:8000/ 网址就可以看到这个应用了


使用说明：

1、我没有使用MongoDB对数据持久化，因为某些不知道的原因，
我的windows10安装MongoDB和bcrypt-as-promised失败。
花费很多时间也解决不了，所以我放弃了。

2、同上，没有实现数据加密。

3、对于http://localhost:8000?username=ab的访问，
如果ab是本人，则url会变为http://localhost:8000/detail
如果不是，url不会改变，不会变为其拥有的url（我不知道url怎么改）

4、在界面跳转时，可能会显示大量的error或者跳往不应该的界面
此时，可以试着直接刷新界面，也许会正常。。。

5、服务端会输出一些error，是“Can't set header after they are sent”
并不会解决。服务端不会因为这个挂的。


代码说明：

1、大部分代码是参考老师的视频的，有些改动

2、遗留了许多MongoDB和bcrypt的代码，都被注释了
