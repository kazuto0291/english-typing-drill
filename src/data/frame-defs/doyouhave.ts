import type { FrameDef } from './types'

const JP: Record<string, string> = {
  water: 'お水はありますか', food: '食べ物はある？', coffee: 'コーヒーはありますか', ticket: 'チケットは持ってる？',
  seat: '席はありますか', menu: 'メニューはありますか', receipt: 'レシートはありますか', key: '鍵は持ってる？',
  bag: '袋はありますか', dogs: '犬は飼ってる？', cats: '猫は飼ってる？', photos: '写真はある？', games: 'ゲームは持ってる？',
  schedule: '予定表はある？', budget: '予算はある？', deadline: '締切はある？', meeting: '会議はある？',
  opportunity: '機会はある？', experience: '経験はある？', advice: 'アドバイスはある？', information: '情報はある？',
  opinion: '意見はある？', goal: '目標はある？', project: 'プロジェクトはある？',
}

/** Do you have ___?（〜はある？／持ってる？） */
export const doyouhave: FrameDef = {
  frame: { id: 'doyouhave', tpl: 'Do you have ___?', jp: '〜はある？／持ってる？', slot: 'noun' },
  ok: {
    beginner: ['water', 'food', 'coffee', 'ticket', 'seat', 'menu', 'receipt', 'key', 'bag', 'dogs', 'cats', 'photos', 'games'],
    intermediate: ['schedule', 'budget', 'deadline', 'meeting', 'opportunity', 'experience', 'advice', 'information', 'opinion', 'goal', 'project'],
  },
  articles: {
    ticket: 'a', seat: 'a', menu: 'a', receipt: 'a', key: 'a', bag: 'a',
    schedule: 'a', budget: 'a', deadline: 'a', meeting: 'a', opportunity: 'an', opinion: 'an', goal: 'a', project: 'a',
  },
  jp: (w, en) => JP[en] ?? `${w}はある？`,
  kana: 'ドゥ ユー ハヴ ___？',
  grammar: {
    meaning:
      'Do you have ___?（〜を持っていますか／〜はありますか）は、お店で「〜はありますか」と聞くときにも、相手の持ち物・予定・経験を聞くときにも使える万能の質問です。',
    scenes: [
      'お店やレストランで「〜はありますか」と聞く（Do you have a menu?）',
      '相手の持ち物を確認する（Do you have a ticket?）',
      '予定や経験を聞く（Do you have a meeting? / Do you have experience?）',
    ],
    examples: [
      { en: 'Do you have a menu?', jp: 'メニューはありますか' },
      { en: 'Do you have water?', jp: 'お水はありますか' },
      { en: 'Do you have a deadline?', jp: '締切はある？' },
    ],
    tips: [
      '数えられるもの 1 つには a、母音で始まる語には an（an opinion / an opportunity）',
      'water / food / advice / information は数えられないので a を付けない',
      '答えは Yes, I do. / No, I don’t. お店なら Yes, here you are.（はい、どうぞ）',
      'Do you have time? は「時間ある？」、Do you have the time? は「今何時？」で意味が変わる',
    ],
    polite: 'Do you happen to have ___?（〜はありますでしょうか）',
  },
}
