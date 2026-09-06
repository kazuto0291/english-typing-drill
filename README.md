# english-typing-drill

「100単語で1000文 作文マシン」の文を、日本語 → 英語のタイピングで身につける個人用の英作文練習サイト。

- 元サイト: <https://hina-english-417a36.netlify.app/>
- 初級 / 中級 × 10 の型（`I wanna ___.` `Can you ___?` など）
- 各ドリルは 3 段階でレベルアップ

| Step | 名前 | 内容 |
| --- | --- | --- |
| 1 | なぞり | 日本語と薄い英文が表示され、打った文字から濃くなる |
| 2 | 穴埋め | 型は表示されたまま `___` に入る単語だけを打つ |
| 3 | 瞬間英作文 | 日本語だけを見て英文を丸ごと打ち、Enter で答え合わせ |

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
  lib/          タイピング判定、進捗保存、読み上げ、ドリル進行フック
  components/   ホーム画面、結果画面、各ステージのドリル
```

## 文データについて

型（10 種）・単語（各レベル 100 語）・冠詞や `it` の付与規則・日本語訳の規則は元サイトの表示と一致するように再現しています。
`src/data/words.ts` と `src/data/translations.ts` を編集すれば、文を追加・修正できます。
