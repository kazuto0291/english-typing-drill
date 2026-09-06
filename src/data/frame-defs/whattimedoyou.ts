import type { FrameDef } from './types'

const JP: Record<string, string> = {
  start: '何時に始める？', stop: '何時に終わる？', work: '何時に仕事する？', sleep: '何時に寝る？', eat: '何時に食べる？',
  leave: '何時に出る？', come: '何時に来る？', go: '何時に行く？', meet: '何時に会う？', play: '何時に遊ぶ？',
  check: '何時に確認する？', call: '何時に電話する？', wait: '何時に待ち合わせる？',
  attend: '何時に出席する？', prepare: '何時に準備する？', relax: '何時に休む？', respond: '何時に返答する？', focus: '何時に集中して作業する？',
}

/** What time do you ___?（何時に〜する？） */
export const whattimedoyou: FrameDef = {
  frame: { id: 'whattimedoyou', tpl: 'What time do you ___?', jp: '何時に〜する？', slot: 'verb' },
  ok: {
    beginner: ['start', 'stop', 'work', 'sleep', 'eat', 'leave', 'come', 'go', 'meet', 'play', 'check', 'call', 'wait'],
    intermediate: ['attend', 'prepare', 'relax', 'respond', 'focus'],
  },
  jp: (w, en) => JP[en] ?? `何時に${w}？`,
  kana: 'ワット タイム ドゥ ユー ___？',
  grammar: {
    meaning:
      'What time do you ___?（何時に〜しますか）は、相手の行動の時刻を聞く型。What time（何時に）+ do you ___?（あなたは〜する？）の組み合わせで、いつもの習慣や今日の予定を聞くのに使います。',
    scenes: [
      '待ち合わせや予定を決める（What time do you leave? 何時に出る？）',
      '相手の生活習慣を聞く（What time do you sleep? 何時に寝るの？）',
      '店や施設の営業時間を聞く（What time do you open? 何時に開きますか）',
    ],
    examples: [
      { en: 'What time do you start?', jp: '何時に始めるの？' },
      { en: 'What time do you leave?', jp: '何時に出る？' },
      { en: 'What time do you sleep?', jp: '何時に寝るの？' },
    ],
    tips: [
      '答えは At 7.（7 時に）/ Around 9.（9 時ごろ）のように at を付ける',
      '「今何時？」は What time is it?（do you は付かない）',
      'When do you ___? は「いつ〜する？」で、日や時期を聞くときにも使える',
      '過去なら What time did you ___?（何時に〜した？）',
    ],
    polite: 'What time would be good for you?（何時がご都合よろしいですか）',
  },
}
