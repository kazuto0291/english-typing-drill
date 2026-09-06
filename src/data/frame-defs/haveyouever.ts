import type { FrameDef } from './types'

const JP: Record<string, string> = {
  try: 'それ試したことある？', play: 'やったことある？', work: '働いたことある？', read: 'それ読んだことある？',
  eat: 'それ食べたことある？', watch: 'それ見たことある？', use: 'それ使ったことある？', buy: 'それ買ったことある？',
  make: 'それ作ったことある？', do: 'それやったことある？', see: 'それ見たことある？',
  attend: '出席したことある？', apply: '応募したことある？', borrow: 'それ借りたことある？', cancel: 'それキャンセルしたことある？',
  complain: '文句を言ったことある？', argue: '言い争ったことある？', imagine: 'それ想像したことある？', consider: 'それ検討したことある？',
  discuss: 'それ話し合ったことある？', notice: 'それに気づいたことある？', succeed: '成功したことある？', waste: 'それ無駄にしたことある？',
  refuse: '断ったことある？', achieve: 'それ達成したことある？',
}

/** Have you ever ___?（〜したことある？） */
export const haveyouever: FrameDef = {
  frame: { id: 'haveyouever', tpl: 'Have you ever ___?', jp: '〜したことある？（経験）', slot: 'verb' },
  ok: {
    beginner: ['try', 'play', 'work', 'read', 'eat', 'watch', 'use', 'buy', 'make', 'do', 'see'],
    intermediate: ['attend', 'apply', 'borrow', 'cancel', 'complain', 'argue', 'imagine', 'consider', 'discuss', 'notice', 'succeed', 'waste', 'refuse', 'achieve'],
  },
  // 過去分詞に変える（目的語が要る動詞は it を付ける）
  wordForm: {
    try: 'tried it', play: 'played', work: 'worked', read: 'read it', eat: 'eaten it', watch: 'watched it',
    use: 'used it', buy: 'bought it', make: 'made it', do: 'done it', see: 'seen it',
    attend: 'attended', apply: 'applied', borrow: 'borrowed it', cancel: 'canceled it', complain: 'complained',
    argue: 'argued', imagine: 'imagined it', consider: 'considered it', discuss: 'discussed it', notice: 'noticed it',
    succeed: 'succeeded', waste: 'wasted it', refuse: 'refused', achieve: 'achieved it',
  },
  formKana: {
    tried: 'トライド', played: 'プレイド', worked: 'ワークト', read: 'レッド', eaten: 'イートゥン', watched: 'ウォッチト',
    used: 'ユーズド', bought: 'ボート', made: 'メイド', done: 'ダン', seen: 'スィーン',
    attended: 'アテンディッド', applied: 'アプライド', borrowed: 'ボロウド', canceled: 'キャンセルド', complained: 'コンプレインド',
    argued: 'アーギュード', imagined: 'イマジンド', considered: 'コンスィダード', discussed: 'ディスカスト', noticed: 'ノウティスト',
    succeeded: 'サクスィーディッド', wasted: 'ウェイスティッド', refused: 'リフューズド', achieved: 'アチーヴド',
  },
  jp: (w, en) => JP[en] ?? `${w}（したことある？）`,
  kana: 'ハヴ ユー エヴァー ___？',
  grammar: {
    meaning:
      'Have you ever ___?（今までに〜したことある？）は経験を聞く型。Have you + 過去分詞で「〜したことがある？」、ever（今までに）が付いて「一度でも」のニュアンスになります。動詞は過去分詞（tried / eaten / done）に変わるのがポイントです。',
    scenes: [
      '相手の経験を聞いて話題を広げる（Have you ever tried it? それ試したことある？）',
      '食べ物や映画をすすめる前に（Have you ever eaten it? / Have you ever seen it?）',
      '仕事で経験の有無を確認する（Have you ever attended? 出席したことありますか）',
    ],
    examples: [
      { en: 'Have you ever tried it?', jp: 'それ試したことある？' },
      { en: 'Have you ever seen it?', jp: 'それ見たことある？' },
      { en: 'Have you ever applied?', jp: '応募したことある？' },
    ],
    tips: [
      '答えは Yes, I have. / No, I haven’t. / No, never.（一度もない）',
      '過去分詞は規則動詞なら -ed（played / worked）、不規則動詞は個別に覚える（eat → eaten, buy → bought, do → done, see → seen, read → read）',
      '「〜に行ったことある？」は Have you ever been to ___?（gone ではなく been）',
      '自分の経験は I have tried it. / I’ve never tried it.（一度もない）',
    ],
    polite: 'Have you had a chance to ___?（〜する機会はありましたか）',
  },
}
