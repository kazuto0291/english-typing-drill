import { EXTRA_FRAME_DEFS } from './frame-defs'

/** 型のカタカナ読み（___ の位置に単語の読みが入る） */
export const FRAME_KANA: Record<string, string> = {
  wanna: 'アイ ワナ ___',
  canyou: 'キャン ユー ___？',
  canget: 'キャナイ ゲット ___？',
  gonna: 'アイム ゴナ ___',
  dowan: 'ドゥ ユー ワナ ___？',
  haveto: 'アイ ハフ トゥ ___',
  lets: 'レッツ ___',
  howdo: 'ハウ ドゥ アイ ___？',
  think: 'アイ シンク イッツ ___',
  interested: 'アイム インタレステッド イン ___',
  ...Object.fromEntries(EXTRA_FRAME_DEFS.map((d) => [d.frame.id, d.kana])),
}

/** 冠詞・目的語の読み */
export const EXTRA_KANA: Record<string, string> = {
  a: 'ア',
  an: 'アン',
  the: 'ザ',
  your: 'ユア',
  my: 'マイ',
  it: 'イット',
}

/** 単語のカタカナ読み（初級・中級 200 語） */
export const WORD_KANA: Record<string, string> = {
  // ---- 初級 動詞 ----
  go: 'ゴウ', get: 'ゲット', do: 'ドゥ', make: 'メイク', take: 'テイク', see: 'スィー', come: 'カム', know: 'ノウ',
  think: 'シンク', want: 'ウォント', like: 'ライク', need: 'ニード', try: 'トライ', help: 'ヘルプ', wait: 'ウェイト',
  check: 'チェック', call: 'コール', ask: 'アスク', tell: 'テル', give: 'ギヴ', find: 'ファインド', use: 'ユーズ',
  buy: 'バイ', watch: 'ウォッチ', play: 'プレイ', work: 'ワーク', sleep: 'スリープ', start: 'スタート', stop: 'ストップ',
  put: 'プット', bring: 'ブリング', keep: 'キープ', leave: 'リーヴ', meet: 'ミート', talk: 'トーク', say: 'セイ',
  feel: 'フィール', look: 'ルック', show: 'ショウ', learn: 'ラーン', pay: 'ペイ', send: 'センド', open: 'オウプン',
  close: 'クロウズ', turn: 'ターン', eat: 'イート', drink: 'ドリンク', read: 'リード', write: 'ライト', walk: 'ウォーク',
  // ---- 初級 名詞 ----
  water: 'ウォーター', food: 'フード', coffee: 'コーフィ', ticket: 'ティケット', seat: 'スィート', menu: 'メニュー',
  receipt: 'リスィート', key: 'キー', bag: 'バッグ', name: 'ネイム', music: 'ミュージック', sports: 'スポーツ',
  art: 'アート', movies: 'ムービーズ', games: 'ゲイムズ', books: 'ブックス', travel: 'トラヴェル', cooking: 'クッキング',
  fashion: 'ファッション', dogs: 'ドッグズ', cats: 'キャッツ', cars: 'カーズ', dance: 'ダンス', fitness: 'フィットネス',
  nature: 'ネイチャー', history: 'ヒストリー', science: 'サイエンス', business: 'ビズネス', photos: 'フォウトウズ',
  animals: 'アニマルズ',
  // ---- 初級 形容詞 ----
  good: 'グッド', ok: 'オウケイ', fine: 'ファイン', great: 'グレイト', true: 'トゥルー', fun: 'ファン', hard: 'ハード',
  easy: 'イーズィ', right: 'ライト', wrong: 'ロング', nice: 'ナイス', sad: 'サッド', hot: 'ホット', cold: 'コウルド',
  happy: 'ハッピー', tired: 'タイアード', busy: 'ビズィ', ready: 'レディ', free: 'フリー', sure: 'シュア',
  // ---- 中級 動詞 ----
  decide: 'ディサイド', explain: 'イクスプレイン', suggest: 'サジェスト', improve: 'インプルーヴ', prepare: 'プリペア',
  realize: 'リアライズ', manage: 'マニッジ', avoid: 'アヴォイド', consider: 'コンスィダー', recommend: 'レコメンド',
  achieve: 'アチーヴ', discuss: 'ディスカス', describe: 'ディスクライブ', prefer: 'プリファー', complain: 'コンプレイン',
  apologize: 'アポロジャイズ', organize: 'オーガナイズ', admit: 'アドミット', mention: 'メンション', remind: 'リマインド',
  arrange: 'アレインジ', cancel: 'キャンセル', confirm: 'コンファーム', expect: 'イクスペクト', focus: 'フォウカス',
  handle: 'ハンドル', involve: 'インヴォルヴ', notice: 'ノウティス', offer: 'オファー', reduce: 'リデュース',
  refuse: 'リフューズ', replace: 'リプレイス', require: 'リクワイア', respond: 'リスポンド', solve: 'ソルヴ',
  support: 'サポート', waste: 'ウェイスト', afford: 'アフォード', apply: 'アプライ', argue: 'アーギュー',
  attend: 'アテンド', borrow: 'ボロウ', compare: 'コンペア', depend: 'ディペンド', develop: 'ディヴェロップ',
  discover: 'ディスカヴァー', imagine: 'イマジン', introduce: 'イントロデュース', relax: 'リラックス', succeed: 'サクスィード',
  // ---- 中級 名詞 ----
  schedule: 'スケジュール', budget: 'バジェット', deadline: 'デッドライン', meeting: 'ミーティング',
  opportunity: 'オポチュニティ', experience: 'イクスピアリエンス', decision: 'ディスィジョン', opinion: 'オピニオン',
  advice: 'アドヴァイス', information: 'インフォメイション', environment: 'インヴァイロンメント', situation: 'スィチュエイション',
  relationship: 'リレイションシップ', culture: 'カルチャー', industry: 'インダストリー', technology: 'テクノロジー',
  economy: 'イコノミー', career: 'カリア', project: 'プロジェクト', goal: 'ゴウル', habit: 'ハビット', benefit: 'ベネフィット',
  issue: 'イシュー', result: 'リザルト', process: 'プロセス', quality: 'クオリティ', skill: 'スキル', society: 'ソサイエティ',
  leadership: 'リーダーシップ', marketing: 'マーケティング',
  // ---- 中級 形容詞 ----
  available: 'アヴェイラブル', confident: 'コンフィデント', comfortable: 'カンフタブル', curious: 'キュリアス',
  difficult: 'ディフィカルト', excited: 'イクサイティッド', expensive: 'イクスペンスィヴ', familiar: 'ファミリアー',
  grateful: 'グレイトフル', impressive: 'インプレッスィヴ', necessary: 'ネセサリー', nervous: 'ナーヴァス',
  obvious: 'オブヴィアス', perfect: 'パーフェクト', popular: 'ポピュラー', possible: 'ポッスィブル',
  professional: 'プロフェッショナル', reasonable: 'リーズナブル', responsible: 'リスポンスィブル', serious: 'スィリアス',
}

/** 穴に入る部分（例: "a coffee", "use it"）の読み */
export function slotKana(slot: string): string {
  return slot
    .split(' ')
    .map((w) => WORD_KANA[w] ?? EXTRA_KANA[w] ?? w)
    .join(' ')
}

/** 完成文の読み */
export function sentenceKana(frameId: string, slot: string): string {
  return (FRAME_KANA[frameId] ?? '___').replace('___', slotKana(slot))
}
