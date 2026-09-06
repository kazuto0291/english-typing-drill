import type { FrameDef } from './types'

/** I like ___.（〜が好き） */
export const ilike: FrameDef = {
  frame: { id: 'ilike', tpl: 'I like ___.', jp: '〜が好き', slot: 'noun' },
  ok: {
    beginner: ['coffee', 'food', 'music', 'sports', 'art', 'movies', 'games', 'books', 'travel', 'cooking', 'fashion', 'dogs', 'cats', 'cars', 'dance', 'fitness', 'nature', 'history', 'science', 'business', 'photos', 'animals'],
    intermediate: ['technology', 'culture', 'marketing', 'leadership'],
  },
  jp: (w) => `${w}が好き`,
  kana: 'アイ ライク ___',
  grammar: {
    meaning:
      'I like ___.（〜が好き）は好みを言う一番基本の型。like の後ろに好きなものの名詞を置くだけです。自己紹介や雑談で必ず使います。',
    scenes: [
      '自己紹介で趣味を言う（I like music. 音楽が好きです）',
      'Do you like ___? と聞かれて答える',
      '食べ物や動物の好みを伝える（I like cats.）',
    ],
    examples: [
      { en: 'I like music.', jp: '音楽が好き' },
      { en: 'I like dogs.', jp: '犬が好き' },
      { en: 'I like cooking.', jp: '料理が好き' },
    ],
    tips: [
      '「一般的に好き」は複数形で言う（I like dogs. / I like movies.）。I like dog. は「犬の肉が好き」に聞こえる',
      '数えられないもの（music / coffee / food）はそのまま',
      '大好きなら I love ___.、好きじゃないなら I don’t like ___.、まあまあなら It’s ok.',
      '動作が好きなら I like ___ing.（I like cooking.）または I like to ___.',
    ],
    polite: "I'm fond of ___.（〜を好んでいます）はやや上品な言い方",
  },
}
