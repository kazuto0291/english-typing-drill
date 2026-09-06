# 自分だけが使えるように無料で公開する（Cloudflare Pages + Access）

GitHub Pages は誰でも見られる公開サイトしか作れません（無料プランでは非公開リポジトリの Pages も不可）。
無料で「自分のメールアドレスでログインした人だけ」に制限するには **Cloudflare Pages + Cloudflare Access** が最も簡単です。

- 費用: 0 円（Pages 無料枠、Access は Zero Trust Free プラン。50 ユーザーまで）
- ログイン方法: メールアドレスに届くワンタイム PIN（パスワード管理不要）
- 独自ドメイン不要（`https://<プロジェクト名>.pages.dev` を使う）
- GitHub のリポジトリを非公開にしても動く

## 1. Cloudflare アカウントを作る

<https://dash.cloudflare.com/sign-up> で無料アカウントを作成します（メールアドレスとパスワードのみ）。

## 2. Pages プロジェクトを作る（GitHub 連携）

1. ダッシュボード左メニュー **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. GitHub を連携し、リポジトリ `english-typing-drill` を選ぶ
3. ビルド設定

   | 項目 | 値 |
   | --- | --- |
   | Framework preset | Vite |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | 環境変数 | `NODE_VERSION` = `24` |

   `BASE_PATH` は設定しない（未設定なら `/` で動く）。
4. **Save and Deploy**。数十秒で `https://english-typing-drill.pages.dev` が公開されます。
   以後は `main` に push するたびに自動で再デプロイされます。

## 3. Access で自分だけに制限する

1. ダッシュボード左メニュー **Zero Trust**（初回はチーム名を決める。無料の Free プランを選ぶ）
2. **Access** → **Applications** → **Add an application** → **Self-hosted**
3. 設定

   | 項目 | 値 |
   | --- | --- |
   | Application name | english-typing-drill |
   | Session Duration | 1 month（好みで） |
   | Application domain | `english-typing-drill.pages.dev` |
   | （追加）Application domain | `*.english-typing-drill.pages.dev`（プレビュー URL も守る） |

4. **Next** → ポリシーを作る

   | 項目 | 値 |
   | --- | --- |
   | Policy name | only-me |
   | Action | Allow |
   | Include → Selector | Emails |
   | Value | 自分のメールアドレス |

5. **Next** → **Add application**

これで URL を開くとログイン画面になり、登録したメールアドレスに届く 6 桁の PIN を入れた人だけがサイトを使えます。
スマホからも同じ手順でログインできます。

## 4. GitHub 側を非公開にする（任意）

Cloudflare 側の公開が確認できたら、GitHub のリポジトリを非公開にし、GitHub Pages を止めます。

```bash
gh repo edit kazuto0291/english-typing-drill --visibility private --accept-visibility-change-consequences
```

```bash
gh api -X DELETE repos/kazuto0291/english-typing-drill/pages
```

あわせて `.github/workflows/deploy.yml`（GitHub Pages 用）を削除してください。
Cloudflare Pages は非公開リポジトリでもそのままビルドできます。

## 学習記録について

学習記録（進捗・文ごとの回数）はブラウザの localStorage に保存されます。
Access でログインしても、記録はサーバーには送られず、端末ごとに別々です。
端末間で同期したい場合は、別途クラウド保存の仕組みが必要です。
