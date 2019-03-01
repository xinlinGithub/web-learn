// 、windows下上传文件夹

// 接下来我们回到git bash的命令窗口，由于我们是在文件夹上右键打开的，因此已经定位到该文件夹目录了。可以通过pwd命令查看文件夹位置：

// pwd #查看文件夹位置
// 然后，将该文件夹变成Git可以管理的仓库：

// git init
// 我们可以通过ls命令查看文件夹中的内容：

// ls #查看文件夹中的内容
// 然后通过git add将所有文件提交到暂存区：

// git add .
// 由于是第一次提交，需要将所有文件都进行提交，如果一个一个的提交太麻烦，通过. 命令可以将所有文件都进行提交。

// 再然后，git commit -m '说明'提交到版本库中即可。
// git commit -m 'the initial edition'
// 这样我们便在本地建立好了仓库，接下来需要将本地仓库与GitHub网站的仓库进行关联。

// git remote add origin https://github.com/geerniya/MxShop2.git
// 后面的网址是我们刚才在GitHub网站上建立的仓库位置，可以从网站上进行复制，如下：

// 在将本地仓库与GitHub网站上的仓库进行关联后，便可进行推送了，但是在第一次进行推送时，需要注意的是，GitHub网站上的仓库并非是空的，我们在创建时创建了一个README文档，因此需要将两者进行合并才行。

// (git pull --rebase origin master)
// 最后，在进行推送即可。

// git push -u origin master
// 这个带有-u这个参数是指，将master分支的所有内容都提交，第一次关联之后后边你再提交就可以不用这个参数了，之后你的每一次修改，你就可以只将你修改push就好了。

// git push origin master
// 回到GitHub网站刷新下我们的MxShop2仓库，便可看到已经将windows上文件夹的内容全部同步过来了。

// 4、定期维护

// 在完成第一次上传后，之后在本地做的修改，都可以通过如下命令进行同步。

// git add -A               #将文件的修改上传到暂存区
// git commit -m '说明'      #提交到本地仓库
// git push origin master   #推送到GitHub网站上

// 5、git常用命令

// 本地删除文件的追踪状态
// git rm -r --cached .
// mkdir： XX (创建一个空目录 XX指目录名)

// pwd： 显示当前目录的路径。

// git init 把当前的目录变成可以管理的git仓库，生成隐藏.git文件。

// git add XX 把xx文件添加到暂存区去。

// git commit –m “XX” 提交文件 –m 后面的是注释。

// git status 查看仓库状态

// git diff XX 查看XX文件修改了那些内容

// git log 查看历史记录

// git reset –hard HEAD^ 或者 git reset –hard HEAD~ 回退到上一个版本

//  (如果想回退到100个版本，使用git reset –hard HEAD~100 )
// cat XX 查看XX文件内容

// git reflog 查看历史记录的版本号id

// git checkout — XX 把XX文件在工作区的修改全部撤销。

// git rm XX 删除XX文件

// git remote add origin https://github.com/zongyunqingfeng/testgit 关联一个远程库

// git push –u(第一次要用-u 以后不需要) origin master 把当前master分支推送到远程库

// git clone https://github.com/zongyunqingfeng/testgit 从远程库中克隆

// git checkout –b dev 创建dev分支 并切换到dev分支上

// git branch 查看当前所有的分支

// git checkout master 切换回master分支

// git merge dev 在当前的分支上合并dev分支

// git branch –d dev 删除dev分支

// git branch name 创建分支

// git stash 把当前的工作隐藏起来 等以后恢复现场后继续工作

// git stash list 查看所有被隐藏的文件列表

// git stash apply 恢复被隐藏的文件，但是内容不删除

// git stash drop 删除文件

// git stash pop 恢复文件的同时 也删除文件

// git remote 查看远程库的信息

// git remote –v 查看远程库的详细信息

// git push origin master Git会把master分支推送到远程库对应的远程分支上