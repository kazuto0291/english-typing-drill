import type { FrameDef } from './types'

const JP: Record<string, string> = {
  coffee: 'コーヒーはどう？', food: '何か食べるのはどう？', water: 'お水はどう？', movies: '映画はどう？', games: 'ゲームはどう？',
  travel: '旅行はどう？', cooking: '料理するのはどう？', dance: 'ダンスはどう？', fitness: '運動はどう？',
  meeting: '会議を開くのはどう？', budget: '予算はどうする？', schedule: '予定はどうする？',
}

/** How about ___?（〜はどう？） */
export const howabout: FrameDef = {
  frame: { id: 'howabout', tpl: 'How about ___?', jp: '〜はどう？（提案）', slot: 'noun' },
  ok: {
    beginner: ['coffee', 'food', 'water', 'music', 'movies', 'games', 'books', 'travel', 'cooking', 'dance', 'fitness', 'sports', 'art', 'photos'],
    intermediate: ['meeting', 'budget', 'schedule'],
  },
  articles: { meeting: 'a', budget: 'the', schedule: 'the' },
  jp: (w, en) => JP[en] ?? `${w}はどう？`,
  kana: 'ハウ アバウト ___？',
  grammar: {
    meaning:
      'How about ___?（〜はどう？）は、何かを提案したり、相手の意見を軽く聞いたりする型。後ろには名詞か 〜ing を置きます。動詞を使わずに提案できるので、初学者にはとても便利です。',
    scenes: [
      '飲み物や食事を提案する（How about coffee? コーヒーはどう？）',
      '遊びや予定を提案する（How about movies? 映画はどう？）',
      '相手に話を振る（How about you? あなたは？）',
    ],
    examples: [
      { en: 'How about coffee?', jp: 'コーヒーでもどう？' },
      { en: 'How about a meeting?', jp: '会議を開くのはどう？' },
      { en: 'How about you?', jp: 'あなたはどう？' },
    ],
    tips: [
      'How about you?（あなたは？）は会話を返す定番。相手に同じ質問を返せる',
      'What about ___? もほぼ同じ意味。What about は「〜はどうなるの？」と問題点を指すこともある',
      '動詞で提案するなら How about ___ing?（How about going? 行くのはどう？）',
      '返事は Sounds good. / Sure. / Maybe next time.',
    ],
    polite: 'Would you like ___?（〜はいかがですか）',
  },
}
