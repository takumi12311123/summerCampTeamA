# summerCampTeamA

### 設定

setting.json に以下を追加

```
{
  "editor.formatOnSave": true,
  "extensions.ignoreRecommendations": false
}
```

setting.json から、左下のところで、すべて install を選択してください

その後の詳しいやり方は、下記 URL の Qiita 参照

https://qiita.com/k_bobchin/items/717c216ddc29e5fbcd43

### issue の追加の仕方

`// TODO issueの追加`

コメントアウトの時に、冒頭に TODO とつけると、issue に追加しやすくなります

## how to develop

### volta の install

https://docs.volta.sh/guide/

volta を install してください

### clone

`git clone git@github.com:takumi12311123/summerCampTeamA.git`

### docker (ROOT 直下で)→ 一旦保留

`sudo service docker start`

docker が start したら

`docker compose up --build`

### npm install

`npm ci`

### 環境変数

.env.example の中身が.env に copy されます

.env.example に、トークンやパスワードを含めるのは禁止（セキュリティー的に危険です）

`cp .env.example .env`

### github の使い方

1.branch を切る
```git branch ~~```
```git checkout ~~```

2.編集をする

3.`git add .`

4.`git commit -m "commit名"`

5.`git push -u origin branch名`

6.Pull Request を出す

7.conflict がなければ merge
※conflict が出たとき、修正できるのであれば、修正後に merge

8.merge したら、毎回`git pull origin main`で自分の環境を最新版にしてください

aiueo
