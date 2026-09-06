import type { FrameDef } from './types'

const JP: Record<string, string> = {
  coffee: 'コーヒーをありがとう', food: '食事をありがとう', water: 'お水をありがとう', ticket: 'チケットをありがとう',
  photos: '写真をありがとう', books: '本をありがとう', music: '音楽をありがとう',
  advice: 'アドバイスをありがとう', information: '情報をありがとう', opinion: 'ご意見ありがとう',
  opportunity: '機会をいただきありがとう', meeting: '会議の時間をありがとう', schedule: '予定表をありがとう',
}

/** Thank you for ___.（〜をありがとう） */
export const thankyoufor: FrameDef = {
  frame: { id: 'thankyoufor', tpl: 'Thank you for ___.', jp: '〜をありがとう', slot: 'noun' },
  ok: {
    beginner: ['coffee', 'food', 'water', 'ticket', 'photos', 'books', 'music'],
    intermediate: ['advice', 'information', 'opinion', 'opportunity', 'meeting', 'schedule'],
  },
  articles: {
    coffee: 'the', food: 'the', water: 'the', ticket: 'the', photos: 'the', books: 'the', music: 'the',
    advice: 'the', information: 'the', opinion: 'your', opportunity: 'the', meeting: 'the', schedule: 'the',
  },
  jp: (w, en) => JP[en] ?? `${w}をありがとう`,
  kana: 'サンキュー フォー ___',
  grammar: {
    meaning:
      'Thank you for ___.（〜をありがとう）は、何に感謝しているかをはっきり言う型。for の後ろには名詞か 〜ing を置きます。Thank you. だけより気持ちが伝わります。',
    scenes: [
      'もらった物・してもらったことにお礼を言う（Thank you for the coffee.）',
      '仕事のメールの冒頭・結び（Thank you for the information.）',
      '時間を割いてもらったとき（Thank you for the meeting. / Thank you for your time.）',
    ],
    examples: [
      { en: 'Thank you for the coffee.', jp: 'コーヒーをありがとう' },
      { en: 'Thank you for the advice.', jp: 'アドバイスをありがとう' },
      { en: 'Thank you for your time.', jp: 'お時間をいただきありがとう' },
    ],
    tips: [
      'もらった具体的な物には the（the coffee）、相手のものには your（your opinion / your help）',
      '動作にお礼を言うなら for + 〜ing（Thank you for coming. 来てくれてありがとう）',
      'よく使う定番: Thank you for your help. / Thank you for everything.（いろいろありがとう）',
      '返事は You’re welcome. / No problem. / My pleasure.（どういたしまして）',
    ],
    polite: 'Thank you very much for ___. / I appreciate ___.（〜に感謝します）',
  },
}
