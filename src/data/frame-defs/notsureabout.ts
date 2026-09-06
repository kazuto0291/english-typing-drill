import type { FrameDef } from './types'

const JP: Record<string, string> = {
  name: '名前はよく分からない（覚えてない）', ticket: 'チケットのことはよく分からない', menu: 'メニューはよく分からない',
  food: '食べ物のことはよく分からない', history: '歴史はよく分からない', science: '科学はよく分からない',
  business: 'ビジネスはよく分からない', fashion: 'ファッションはよく分からない', art: '芸術はよく分からない',
  schedule: '予定はまだはっきりしない', budget: '予算はよく分からない', deadline: '締切はよく分からない', meeting: '会議のことはよく分からない',
  decision: 'その決定には確信がない', situation: '状況はよく分からない', process: '手順はよく分からない', result: '結果はよく分からない',
  quality: '品質には自信がない', economy: '経済のことはよく分からない', issue: 'その問題はよく分からない', goal: '目標はまだはっきりしない',
  project: 'プロジェクトのことはよく分からない',
}

/** I'm not sure about ___.（〜はよく分からない） */
export const notsureabout: FrameDef = {
  frame: { id: 'notsureabout', tpl: "I'm not sure about ___.", jp: '〜はよく分からない／自信がない', slot: 'noun' },
  ok: {
    beginner: ['name', 'ticket', 'menu', 'food', 'history', 'science', 'business', 'fashion', 'art'],
    intermediate: ['schedule', 'budget', 'deadline', 'meeting', 'decision', 'situation', 'process', 'result', 'quality', 'economy', 'issue', 'goal', 'project'],
  },
  articles: {
    name: 'the', ticket: 'the', menu: 'the', food: 'the',
    schedule: 'the', budget: 'the', deadline: 'the', meeting: 'the', decision: 'the', situation: 'the', process: 'the',
    result: 'the', quality: 'the', economy: 'the', issue: 'the', goal: 'the', project: 'the',
  },
  jp: (w, en) => JP[en] ?? `${w}はよく分からない`,
  kana: 'アイム ナット シュア アバウト ___',
  grammar: {
    meaning:
      "I'm not sure about ___.（〜についてはよく分からない）は、「知らない」と言い切らずに「はっきりしない」「自信がない」とやわらかく伝える型。about の後ろに話題の名詞を置きます。",
    scenes: [
      '質問に即答できないとき（I’m not sure about the schedule. 予定はまだはっきりしない）',
      '詳しくない分野を正直に言う（I’m not sure about history.）',
      '決定や判断に迷っているとき（I’m not sure about the decision.）',
    ],
    examples: [
      { en: "I'm not sure about the schedule.", jp: '予定はまだはっきりしません' },
      { en: "I'm not sure about the menu.", jp: 'メニューのことはよく分かりません' },
      { en: "I'm not sure about the result.", jp: '結果はまだ分かりません' },
    ],
    tips: [
      'I’m not sure. だけで「どうかな」「分からない」と言える。I don’t know. より丁寧で角が立たない',
      '特定のものには the（the schedule）、一般的な話題は冠詞なし（history / science）',
      '「〜かどうか分からない」は I’m not sure if ___.（I’m not sure if it’s free.）',
      '肯定形 I’m sure about it. は「それは確かだ」',
    ],
    polite: "I'm afraid I'm not sure about ___.（あいにく〜についてはよく分かりません）",
  },
}
