import type { FrameDef } from './types'

const JP: Record<string, string> = {
  seat: '私の席はどこ？', bag: '私のカバンはどこ？', key: '私の鍵はどこ？', ticket: '私のチケットはどこ？',
  menu: 'メニューはどこ？', receipt: 'レシートはどこ？', coffee: 'コーヒーはどこ？', water: 'お水はどこ？',
  food: '食べ物はどこ？', schedule: '予定表はどこ？', budget: '予算はどこ？（予算表はどこ？）', meeting: '会議はどこ？',
  deadline: '締切はいつ？（どこに書いてある？）', information: '情報はどこ？', project: 'プロジェクトはどこ？',
}

/** Where is ___?（〜はどこ？） */
export const whereis: FrameDef = {
  frame: { id: 'whereis', tpl: 'Where is ___?', jp: '〜はどこ？', slot: 'noun' },
  ok: {
    beginner: ['seat', 'bag', 'key', 'ticket', 'menu', 'receipt', 'coffee', 'water', 'food'],
    intermediate: ['schedule', 'budget', 'meeting', 'deadline', 'information', 'project'],
  },
  articles: {
    seat: 'my', bag: 'my', key: 'my', ticket: 'my',
    menu: 'the', receipt: 'the', coffee: 'the', water: 'the', food: 'the',
    schedule: 'the', budget: 'the', meeting: 'the', deadline: 'the', information: 'the', project: 'the',
  },
  jp: (w, en) => JP[en] ?? `${w}はどこ？`,
  kana: 'ウェア イズ ___？',
  grammar: {
    meaning:
      'Where is ___?（〜はどこですか）は場所を聞く一番シンプルな質問。Where（どこ）+ is（〜は）+ 探しているものの順で言います。会話では Where’s と短くなることが多いです。',
    scenes: [
      '空港・駅・店で場所を聞く（Where is the exit? / Where is my seat?）',
      '自分の持ち物が見当たらないとき（Where is my key?）',
      '書類や情報のありかを聞く（Where is the schedule?）',
    ],
    examples: [
      { en: 'Where is my seat?', jp: '私の席はどこですか' },
      { en: 'Where is the menu?', jp: 'メニューはどこですか' },
      { en: 'Where is the meeting?', jp: '会議はどこでやるの？' },
    ],
    tips: [
      '自分のものは my（my key）、その場で決まっているものは the（the menu）を付ける',
      '複数のものを聞くなら Where are ___?（Where are my keys?）',
      '答えは It’s over there.（あそこです）/ It’s on the table.（テーブルの上）',
      '「〜はどこにありますか」と丁寧に聞くなら Could you tell me where ___ is?（語順が変わる）',
    ],
    polite: 'Excuse me, where is ___?（すみません、〜はどこですか）と Excuse me を頭に付ける',
  },
}
