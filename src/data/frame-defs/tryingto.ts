import type { FrameDef } from './types'

const JP: Record<string, string> = {
  sleep: '寝ようとしてる', learn: '学ぼうとしてる', find: '見つけようとしてる', think: '考えようとしてる', help: '助けようとしてる',
  work: '働こうとしてる', start: '始めようとしてる', stop: 'やめようとしてる', open: '開けようとしてる', close: '閉めようとしてる',
  use: '使おうとしてる', do: 'やろうとしてる', make: '作ろうとしてる', get: '手に入れようとしてる', call: '電話しようとしてる',
  check: '確認しようとしてる', read: '読もうとしてる', write: '書こうとしてる', eat: '食べようとしてる', walk: '歩こうとしてる',
  improve: '上達しようとしてる', focus: '集中しようとしてる', relax: 'リラックスしようとしてる', decide: '決めようとしてる',
  explain: '説明しようとしてる', prepare: '準備しようとしてる', organize: '整理しようとしてる', solve: '解決しようとしてる',
  avoid: '避けようとしてる', reduce: '減らそうとしてる', manage: 'なんとかしようとしてる', achieve: '達成しようとしてる',
  apply: '応募しようとしてる', describe: '説明しようとしてる', succeed: '成功しようとしてる', develop: '発展させようとしてる',
  compare: '比べようとしてる',
}

/** I'm trying to ___.（〜しようとしている） */
export const tryingto: FrameDef = {
  frame: { id: 'tryingto', tpl: "I'm trying to ___.", jp: '〜しようとしている', slot: 'verb' },
  ok: {
    beginner: ['sleep', 'learn', 'find', 'think', 'help', 'work', 'start', 'stop', 'open', 'close', 'use', 'do', 'make', 'get', 'call', 'check', 'read', 'write', 'eat', 'walk'],
    intermediate: ['improve', 'focus', 'relax', 'decide', 'explain', 'prepare', 'organize', 'solve', 'avoid', 'reduce', 'manage', 'achieve', 'apply', 'describe', 'succeed', 'develop', 'compare'],
  },
  jp: (w, en) => JP[en] ?? `${w}（しようとしてる）`,
  kana: 'アイム トライイング トゥ ___',
  grammar: {
    meaning:
      "I'm trying to ___.（〜しようとしている）は、今まさに努力中・挑戦中であることを伝える型。「まだできていないけれど頑張っている」というニュアンスがあり、うまくいかない状況の説明にも使えます。",
    scenes: [
      '何をしている最中か説明する（I’m trying to open it. 開けようとしてるんだけど）',
      '静かにしてほしいとき（I’m trying to sleep. 寝ようとしてるんだ）',
      '目標や努力を伝える（I’m trying to improve. 上達しようと頑張ってる）',
    ],
    examples: [
      { en: "I'm trying to sleep.", jp: '寝ようとしてるんだ（静かにして）' },
      { en: "I'm trying to find it.", jp: 'それを探してるところ' },
      { en: "I'm trying to focus.", jp: '集中しようとしてる' },
    ],
    tips: [
      'try to ___ は「〜しようと努力する」、try ___ing は「試しに〜してみる」で意味が少し違う',
      '過去なら I tried to ___.（〜しようとした＝結局できなかった、の含み）',
      'I’m trying. だけで「頑張ってるよ」の一言になる',
      '相手の努力をねぎらうなら You’re trying hard.（よく頑張ってるね）',
    ],
    polite: "I'm doing my best to ___.（〜するよう最善を尽くしています）",
  },
}
