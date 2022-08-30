# summerCampTeamA

### 設定

setting.jsonから、左下のところで、すべてinstallを選択してください

https://qiita.com/k_bobchin/items/717c216ddc29e5fbcd43

## how to develop

### docker (ROOT直下で)
```sudo service docker start```

dockerがstartしたら

```docker-compose up```

### 環境変数

.env.exampleの中身が.envにcopyされます

.env.exampleに、トークンやパスワードを含めるのは禁止（セキュリティー的に危険です）

```cp .env.example .env```

