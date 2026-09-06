import type { FrameDef } from './types'

const JP: Record<string, string> = {
  help: '手伝っていただけますか', wait: '待っていただけますか', check: '確認していただけますか', come: '来ていただけますか',
  stop: 'やめていただけますか', call: '電話していただけますか', look: '見ていただけますか', try: 'やってみていただけますか',
  read: '読んでいただけますか', write: '書いていただけますか', talk: '話していただけますか',
  explain: '説明していただけますか', confirm: '確認していただけますか', describe: '説明していただけますか',
  arrange: '手配していただけますか', cancel: 'キャンセルしていただけますか', remind: 'リマインドしていただけますか',
  suggest: '提案していただけますか', recommend: 'おすすめしていただけますか', handle: '対処していただけますか',
  prepare: '準備していただけますか', respond: '返信していただけますか', apologize: '謝っていただけますか',
  organize: '整理していただけますか',
}

/** Could you ___?（〜していただけますか） */
export const couldyou: FrameDef = {
  frame: { id: 'couldyou', tpl: 'Could you ___?', jp: '〜していただけますか（丁寧な依頼）', slot: 'verb' },
  ok: {
    beginner: ['help', 'wait', 'check', 'come', 'stop', 'call', 'look', 'try', 'read', 'write', 'talk'],
    intermediate: ['explain', 'confirm', 'describe', 'arrange', 'cancel', 'remind', 'suggest', 'recommend', 'handle', 'prepare', 'respond', 'apologize', 'organize'],
  },
  jp: (w, en) => JP[en] ?? `${w}ていただけますか`,
  kana: 'クッド ユー ___？',
  grammar: {
    meaning:
      'Could you ___? は Can you ___?（〜してくれる？）の丁寧版。could は can の過去形ですが、ここでは過去の意味はなく「〜していただけますか」とやわらかくお願いするために使います。',
    scenes: [
      '店員・ホテル・駅員など初対面の人にお願いする',
      '仕事のメールや会議で同僚・上司に依頼する',
      '道を聞く、聞き返す（Could you say that again? もう一度言っていただけますか）',
    ],
    examples: [
      { en: 'Could you help?', jp: '手伝っていただけますか' },
      { en: 'Could you wait?', jp: '少々お待ちいただけますか' },
      { en: 'Could you explain?', jp: '説明していただけますか' },
    ],
    tips: [
      '文末に please を足すとさらに丁寧（Could you check, please?）',
      '返事は Sure. / Of course. / Certainly.（かしこまりました）',
      'Would you ___? もほぼ同じ丁寧さ。Would you mind ___ing? はさらに遠慮がちな言い方',
      '「〜できましたか」という過去の質問ではないので注意',
    ],
    polite: 'I was wondering if you could ___.（〜していただけないかと思いまして）は最上級に丁寧',
  },
}
