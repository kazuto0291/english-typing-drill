# english-typing-drill

「100単語で1000文 作文マシン」の文を、日本語 → 英語のタイピングで身につける個人用の英作文練習サイト。

- 元サイト: <https://hina-english-417a36.netlify.app/>
- 初級 / 中級 × 37 の型（元サイトの 10 型 + 追加 27 型）。ホームで「元の 10 型 / 追加の型」をタブで切り替え
  - 元サイト: `I wanna ___.` `Can you ___?` `Can I get ___?` `I'm gonna ___.` `Do you wanna ___?` `I have to ___.` `Let's ___.` `How do I ___?` `I think it's ___.` `I'm interested in ___.`
  - 追加（状態・感想）: `I'm ___.` `It's ___.` `Are you ___?` `Is it ___?` `That sounds ___.` `It looks ___.`
  - 追加（好み・持ち物・場所）: `Do you like ___?` `I like ___.` `Do you have ___?` `Where is ___?` `How about ___?` `Thank you for ___.` `I'm not sure about ___.`
  - 追加（依頼・許可・提案）: `Can I ___?` `Could you ___?` `Let me ___.` `Don't ___.` `Why don't we ___?` `What time do you ___?`
  - 追加（希望・必要・気持ち）: `I need to ___.` `I'd like to ___.` `I'm trying to ___.` `I forgot to ___.` `I used to ___.` `I'm glad to ___.` `I'm sorry to ___.` `Have you ever ___?`（過去分詞）
- 各ドリルは 3 段階でレベルアップ

| Step | 名前 | 内容 |
| --- | --- | --- |
| 1 | なぞり | 日本語と薄い英文が表示され、打った文字から濃くなる |
| 2 | 穴埋め | 型は表示されたまま `___` に入る単語だけを打つ |
| 3 | 瞬間英作文 | 日本語だけを見て英文を丸ごと打ち、Enter で答え合わせ |

Step 1・2 では間違った文字は入力されません（入力欄が赤く揺れてミスとして数えるだけ）。
カーソル移動キーは無効で、常に正しい文字だけが進みます。

各ドリルの入力欄の下に、その型の文法解説（意味・使う場面・例文・注意点・丁寧な言い方）を表示します（折りたたみ可）。
内容は `src/data/grammar.ts` で編集できます。

結果画面では正確さ・WPM・時間を表示し、最高記録をブラウザ（localStorage）に保存します。
完了した英文はブラウザの音声合成で読み上げます（設定でオフ可）。

## 技術構成

- Vite 8 + React 19 + TypeScript 6
- Tailwind CSS 4（`@tailwindcss/vite`）
- Vitest（文データ生成のテスト）
- GitHub Actions → GitHub Pages に自動デプロイ

サーバーもデータベースも使わず、静的サイトとして動きます。

## 開発

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # 文データのテスト
npm run build    # dist/ に出力
```

## デプロイ

`main` ブランチへ push すると `.github/workflows/deploy.yml` がビルドして GitHub Pages に公開します。
初回のみ、リポジトリの Settings → Pages → Source を **GitHub Actions** にしてください。

## ディレクトリ

```
src/
  data/         型・単語・訳・文生成ロジック（元サイトと同じ規則）
  data/frame-defs/  追加した型（1 型 1 ファイル。index.ts に登録すると全画面に反映）
  lib/          タイピング判定、進捗保存、読み上げ、ドリル進行フック
  components/   ホーム画面、結果画面、各ステージのドリル
```

## 文データについて

型（10 種）・単語（各レベル 100 語）・冠詞や `it` の付与規則・日本語訳の規則は元サイトの表示と一致するように再現しています。
`src/data/words.ts` と `src/data/translations.ts` を編集すれば、文を追加・修正できます。
型を増やすときは `src/data/frame-defs/` に 1 ファイル作り、`index.ts` の `EXTRA_FRAME_DEFS` に並べます。
