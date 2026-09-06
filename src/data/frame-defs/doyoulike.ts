import type { FrameDef } from './types'

/** Do you like ___?（〜は好き？） */
export const doyoulike: FrameDef = {
  frame: { id: 'doyoulike', tpl: 'Do you like ___?', jp: '〜は好き？', slot: 'noun' },
  ok: {
    beginner: ['coffee', 'food', 'music', 'sports', 'art', 'movies', 'games', 'books', 'travel', 'cooking', 'fashion', 'dogs', 'cats', 'cars', 'dance', 'fitness', 'nature', 'history', 'science', 'business', 'photos', 'animals'],
    intermediate: ['technology', 'culture', 'marketing', 'leadership', 'society'],
  },
  jp: (w) => `${w}は好き？`,
  kana: 'ドゥ ユー ライク ___？',
  grammar: {
    meaning:
      'Do you like ___?（あなたは〜が好き？）は、相手の好みを聞く定番の質問。Do you + 動詞（like）で「あなたは〜する？」という疑問文になり、後ろに好きなものの名詞を置きます。',
    scenes: [
      '初対面で趣味や好みを聞いて会話を広げる',
      '食事に誘う前に好き嫌いを確認する（Do you like coffee?）',
      '相手の関心を探って話題を選ぶ',
    ],
    examples: [
      { en: 'Do you like music?', jp: '音楽は好き？' },
      { en: 'Do you like cats?', jp: '猫は好き？' },
      { en: 'Do you like travel?', jp: '旅行は好き？' },
    ],
    tips: [
      '答えは Yes, I do. / No, I don’t. または I love it! / Not really.（あまり）',
      '「一般的に好き」は複数形（dogs / movies / books）、数えられないもの（music / coffee）はそのまま',
      '好きなことを動詞で聞くなら Do you like to cook? / Do you like cooking?',
      '自分の好みは I like ___. / I don’t like ___.',
    ],
    polite: 'Are you into ___?（〜にはまってる？）はよりカジュアル、Do you enjoy ___? は少し丁寧',
  },
}
