import type { FrameDef } from './types'

const JP: Record<string, string> = {
  play: '昔はよく遊んでた', work: '昔は働いてた', sleep: '昔はよく寝てた', walk: '昔はよく歩いてた', read: '昔はよく読んでた',
  write: '昔はよく書いてた', drink: '昔はよく飲んでた', go: '昔はよく行ってた', think: '昔はそう思ってた', do: '昔はよくやってた',
  use: '昔は使ってた', learn: '昔は習ってた', talk: '昔はよく話してた', watch: '昔はよく見てた', eat: '昔はよく食べてた',
  relax: '昔はのんびりしてた', complain: '昔はよく文句を言ってた', argue: '昔はよく言い争ってた', attend: '昔は出席してた',
  waste: '昔は無駄にしてた', avoid: '昔は避けてた', imagine: '昔はそう想像してた', prefer: '昔はそっちが好きだった',
  depend: '昔は頼ってた', worry: '昔は心配してた',
}

/** I used to ___.（昔は〜していた） */
export const usedto: FrameDef = {
  frame: { id: 'usedto', tpl: 'I used to ___.', jp: '昔は〜していた', slot: 'verb' },
  ok: {
    beginner: ['play', 'work', 'sleep', 'walk', 'read', 'write', 'drink', 'go', 'think', 'do', 'use', 'learn', 'talk', 'watch', 'eat'],
    intermediate: ['relax', 'complain', 'argue', 'attend', 'waste', 'avoid', 'imagine', 'prefer', 'depend'],
  },
  jp: (w, en) => JP[en] ?? `昔は${w}（していた）`,
  kana: 'アイ ユースト トゥ ___',
  grammar: {
    meaning:
      'I used to ___.（昔は〜していた）は、以前の習慣や状態が「今はもう違う」ことを含めて言う型。「昔はよく〜したものだ」「前は〜だった」にあたります。used to の後ろは動詞の原形です。',
    scenes: [
      '昔の習慣や趣味を話す（I used to play. 昔はよくやってた）',
      '以前の仕事や生活を話す（I used to work there. 前はそこで働いてた）',
      '考えが変わったことを言う（I used to think so. 昔はそう思ってた）',
    ],
    examples: [
      { en: 'I used to play.', jp: '昔はよく遊んでた' },
      { en: 'I used to work there.', jp: '前はそこで働いてた' },
      { en: 'I used to think so.', jp: '昔はそう思ってた' },
    ],
    tips: [
      '「今はもうしていない」という含みがある。今も続いていることには使わない',
      '発音は「ユーストゥ」。use（ユーズ）とは違って s は濁らない',
      'be used to ___ing（〜に慣れている）は別の表現なので混同しない（I’m used to it. 慣れてるよ）',
      '疑問は Did you use to ___?（昔〜してた？）。use に d が付かない',
    ],
    polite: 'I used to ___ when I was younger.（若いころは〜していました）',
  },
}
