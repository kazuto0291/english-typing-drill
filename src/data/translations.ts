import { EXTRA_FRAME_DEFS } from './frame-defs'

// 冠詞（Can I get ___? のとき単語の前に付く）
export const ARTICLE: Record<string, string> = {
  coffee: 'a', ticket: 'a', seat: 'a', menu: 'a', receipt: 'a', key: 'a', bag: 'a',
  name: 'your', opinion: 'your',
  schedule: 'the', budget: 'the',
}

/** 型ごとの冠詞表。型 ID → 単語 → 冠詞 */
export const ARTICLE_BY_FRAME: Record<string, Record<string, string>> = {
  canget: ARTICLE,
  ...Object.fromEntries(EXTRA_FRAME_DEFS.filter((d) => d.articles).map((d) => [d.frame.id, d.articles!])),
}

// 目的語 it が必要な動詞（動詞型の英文に自動で it を付ける）
export const OBJ_VERBS = [
  'use', 'do', 'make', 'find', 'open', 'close', 'get', 'say',
  'handle', 'organize', 'cancel', 'confirm', 'arrange', 'discuss', 'describe',
  'develop', 'consider', 'solve', 'avoid', 'achieve', 'compare',
  // 追加した型で使う
  'take', 'borrow', 'replace', 'waste', 'mention',
]

const JP_WANNA: Record<string, string> = {
  go: '行きたい', come: '来たい', eat: '食べたい', drink: '飲みたい', sleep: '寝たい', walk: '歩きたい',
  work: '働きたい', play: '遊びたい', read: '読みたい', write: '書きたい', talk: '話したい', try: '試したい',
  help: '助けたい', learn: '学びたい', leave: '出たい', meet: '会いたい', see: '見たい', know: '知りたい',
  think: '考えたい', start: '始めたい', stop: 'やめたい', look: '見たい', decide: '決めたい', explain: '説明したい',
  improve: '上達したい', prepare: '準備したい', relax: 'のんびりしたい', focus: '集中したい', succeed: '成功したい',
  apologize: '謝りたい', apply: '応募したい', attend: '出席したい', organize: '整理したい', achieve: '達成したい',
  develop: '成長させたい', imagine: '想像したい',
}

const JP_CANYOU: Record<string, string> = {
  help: '手伝ってくれる？', wait: '待ってくれる？', check: '確認してくれる？', come: '来てくれる？', stop: 'やめてくれる？',
  call: '電話してくれる？', see: '見てくれる？', look: '見てくれる？', try: 'やってみてくれる？', read: '読んでくれる？',
  write: '書いてくれる？', talk: '話してくれる？', walk: '歩いてくれる？', explain: '説明してくれる？', confirm: '確認してくれる？',
  describe: '説明してくれる？', arrange: '手配してくれる？', cancel: 'キャンセルしてくれる？', remind: 'リマインドしてくれる？',
  suggest: '提案してくれる？', recommend: 'おすすめしてくれる？', handle: '対処してくれる？', prepare: '準備してくれる？',
  respond: '返信してくれる？', apologize: '謝ってくれる？', organize: '整理してくれる？',
}

const JP_CANGET: Record<string, string> = {
  bag: '袋ください', seat: '席ください（席ありますか？）', name: 'お名前 聞いてもいい？', food: '何か食べ物 もらえる？',
  opinion: '意見 聞かせてもらえる？', advice: 'アドバイス もらえる？', information: '情報 もらえる？',
  budget: '予算 教えてもらえる？', schedule: 'スケジュール もらえる？',
}

const JP_THINK: Record<string, string> = { available: '空いてると思う' }
const JP_HAVETO: Record<string, string> = { manage: 'なんとかしなきゃ' }

/** 完成文の日本語訳（型ごと）。w = 単語の日本語、en = 単語の英語 */
export const JP_TEMPLATE: Record<string, (w: string, en: string) => string> = {
  wanna: (w, en) => JP_WANNA[en] ?? `${w}たい`,
  canyou: (w, en) => JP_CANYOU[en] ?? `${w}てくれる？`,
  canget: (w, en) => JP_CANGET[en] ?? `${w}を もらえる？`,
  gonna: (w) => `${w}ね`,
  dowan: (w) => `${w}？`,
  haveto: (w, en) => JP_HAVETO[en] ?? `${w}必要がある`,
  lets: (w) => `一緒に ${w}？`,
  howdo: (w) => `どうやって ${w}？`,
  think: (w, en) => JP_THINK[en] ?? (w.endsWith('い') ? `${w}と思う` : `${w}だと思う`),
  interested: (w) => `${w}に 興味がある`,
  ...Object.fromEntries(EXTRA_FRAME_DEFS.map((d) => [d.frame.id, d.jp])),
}
