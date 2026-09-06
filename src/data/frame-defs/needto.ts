import type { FrameDef } from './types'

const JP: Record<string, string> = {
  know: '知っておく必要がある', relax: '休む必要がある', sleep: '寝ないと', go: '行かないと', eat: '食べないと',
  buy: '買わないと', find: '見つけないと', leave: 'もう出ないと', pay: '払わないと', call: '電話しないと',
}

/** I need to ___.（〜する必要がある） */
export const needto: FrameDef = {
  frame: { id: 'needto', tpl: 'I need to ___.', jp: '〜する必要がある／〜しなきゃ', slot: 'verb' },
  ok: {
    beginner: ['go', 'sleep', 'eat', 'work', 'check', 'call', 'ask', 'talk', 'think', 'learn', 'pay', 'leave', 'wait', 'start', 'stop', 'buy', 'find', 'know', 'read', 'write', 'see'],
    intermediate: ['decide', 'explain', 'prepare', 'focus', 'improve', 'confirm', 'organize', 'apologize', 'relax', 'respond', 'apply', 'attend', 'consider', 'discuss', 'handle', 'solve', 'reduce', 'replace'],
  },
  jp: (w, en) => JP[en] ?? `${w}必要がある`,
  kana: 'アイ ニード トゥ ___',
  grammar: {
    meaning:
      'I need to ___.（〜する必要がある）は、自分にとって必要なことを言う型。I have to ___.（外からの事情でしなければならない）より「自分の判断で必要」というニュアンスで、会話でとてもよく使います。',
    scenes: [
      '自分のやるべきことを整理して言う（I need to check. 確認しないと）',
      '会話を切り上げる（I need to go. もう行かないと）',
      '相談や依頼の前置き（I need to ask. 聞きたいことがあるんだけど）',
    ],
    examples: [
      { en: 'I need to go.', jp: 'もう行かないと' },
      { en: 'I need to check.', jp: '確認する必要がある' },
      { en: 'I need to relax.', jp: '休まないと' },
    ],
    tips: [
      'I have to は「やらされる」感じ、I need to は「自分に必要」な感じ。日常会話ではどちらも使える',
      '否定 I don’t need to ___.（〜しなくていい）',
      '相手に言うなら You need to ___.（〜したほうがいいよ、少し強め）',
      '名詞を続けるなら to を外す（I need water. 水が要る）',
    ],
    polite: 'I need to ___, if possible.（できれば〜する必要があるのですが）',
  },
}
