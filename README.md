# summerCampTeamA

### 設定

setting.jsonから、左下のところで、すべてinstallを選択してください

https://qiita.com/k_bobchin/items/717c216ddc29e5fbcd43

### issueの追加の仕方

```// TODO　issueの追加```

コメントアウトの時に、冒頭にTODOとつけると、issueに追加しやすくなります

## how to develop

### clone

```git clone git@github.com:takumi12311123/summerCampTeamA.git```

### docker (ROOT直下で)
```sudo service docker start```

dockerがstartしたら

```docker-compose up```

### 環境変数

.env.exampleの中身が.envにcopyされます

.env.exampleに、トークンやパスワードを含めるのは禁止（セキュリティー的に危険です）

```cp .env.example .env```

### githubの使い方

1.branchを切る

2.編集をする

3.```git add .```

4.```git commit -m "commit名"```

5.```git push -u origin branch名```

6.Pull Requestを出す

7.conflictがなければmerge

8.mergeしたら、毎回```git pull origin main```で自分の環境を最新版にしてください
