import type { Slot } from './frames'

export type Level = 'beginner' | 'intermediate'

export type WordTuple = [en: string, jp: string, pos: Slot]

export interface LevelData {
  label: string
  words: WordTuple[]
  /** 型ID → その型に入れられる単語 */
  ok: Record<string, string[]>
}

export const LEVELS: Record<Level, LevelData> = {
  beginner: {
    label: '初級',
    words: [
      ['go', '行く', 'verb'], ['get', '手に入れる', 'verb'], ['do', 'する', 'verb'], ['make', '作る', 'verb'],
      ['take', '取る', 'verb'], ['see', '見る/会う', 'verb'], ['come', '来る', 'verb'], ['know', '知る', 'verb'],
      ['think', '思う', 'verb'], ['want', '欲しい', 'verb'], ['like', '好き', 'verb'], ['need', '必要', 'verb'],
      ['try', '試す', 'verb'], ['help', '助ける', 'verb'], ['wait', '待つ', 'verb'], ['check', '確認する', 'verb'],
      ['call', '電話する', 'verb'], ['ask', '聞く', 'verb'], ['tell', '伝える', 'verb'], ['give', 'あげる', 'verb'],
      ['find', '見つける', 'verb'], ['use', '使う', 'verb'], ['buy', '買う', 'verb'], ['watch', '見る', 'verb'],
      ['play', '遊ぶ', 'verb'], ['work', '働く', 'verb'], ['sleep', '寝る', 'verb'], ['start', '始める', 'verb'],
      ['stop', '止める', 'verb'], ['put', '置く', 'verb'], ['bring', '持ってくる', 'verb'], ['keep', '保つ', 'verb'],
      ['leave', '出る', 'verb'], ['meet', '会う', 'verb'], ['talk', '話す', 'verb'], ['say', '言う', 'verb'],
      ['feel', '感じる', 'verb'], ['look', '見る', 'verb'], ['show', '見せる', 'verb'], ['learn', '学ぶ', 'verb'],
      ['pay', '払う', 'verb'], ['send', '送る', 'verb'], ['open', '開ける', 'verb'], ['close', '閉める', 'verb'],
      ['turn', '曲がる', 'verb'], ['eat', '食べる', 'verb'], ['drink', '飲む', 'verb'], ['read', '読む', 'verb'],
      ['write', '書く', 'verb'], ['walk', '歩く', 'verb'],
      ['water', '水', 'noun'], ['food', '食べ物', 'noun'], ['coffee', 'コーヒー', 'noun'], ['ticket', 'チケット', 'noun'],
      ['seat', '席', 'noun'], ['menu', 'メニュー', 'noun'], ['receipt', 'レシート', 'noun'], ['key', '鍵', 'noun'],
      ['bag', '袋', 'noun'], ['name', '名前', 'noun'], ['music', '音楽', 'noun'], ['sports', 'スポーツ', 'noun'],
      ['art', '芸術', 'noun'], ['movies', '映画', 'noun'], ['games', 'ゲーム', 'noun'], ['books', '本', 'noun'],
      ['travel', '旅行', 'noun'], ['cooking', '料理', 'noun'], ['fashion', 'ファッション', 'noun'], ['dogs', '犬', 'noun'],
      ['cats', '猫', 'noun'], ['cars', '車', 'noun'], ['dance', 'ダンス', 'noun'], ['fitness', '運動', 'noun'],
      ['nature', '自然', 'noun'], ['history', '歴史', 'noun'], ['science', '科学', 'noun'], ['business', 'ビジネス', 'noun'],
      ['photos', '写真', 'noun'], ['animals', '動物', 'noun'],
      ['good', '良い', 'adj'], ['ok', '大丈夫', 'adj'], ['fine', '元気', 'adj'], ['great', '最高', 'adj'],
      ['true', '本当', 'adj'], ['fun', '楽しい', 'adj'], ['hard', '難しい', 'adj'], ['easy', '簡単', 'adj'],
      ['right', '正しい', 'adj'], ['wrong', '間違い', 'adj'], ['nice', '素敵', 'adj'], ['sad', '悲しい', 'adj'],
      ['hot', '暑い', 'adj'], ['cold', '寒い', 'adj'], ['happy', '幸せ', 'adj'], ['tired', '疲れた', 'adj'],
      ['busy', '忙しい', 'adj'], ['ready', '準備OK', 'adj'], ['free', '暇/無料', 'adj'], ['sure', '確か', 'adj'],
    ],
    ok: {
      wanna: ['go', 'come', 'eat', 'drink', 'sleep', 'walk', 'work', 'play', 'read', 'write', 'talk', 'try', 'help', 'learn', 'leave', 'meet', 'see', 'know', 'think', 'start', 'stop', 'look'],
      canyou: ['help', 'wait', 'check', 'come', 'stop', 'call', 'look', 'try', 'read', 'write', 'talk'],
      canget: ['water', 'food', 'coffee', 'ticket', 'seat', 'menu', 'receipt', 'key', 'bag', 'name'],
      gonna: ['go', 'come', 'eat', 'drink', 'sleep', 'walk', 'work', 'play', 'read', 'write', 'talk', 'try', 'help', 'learn', 'leave', 'meet', 'start', 'stop', 'call', 'check', 'wait', 'look', 'ask', 'pay', 'see'],
      dowan: ['go', 'come', 'eat', 'drink', 'walk', 'play', 'talk', 'try', 'see', 'help', 'read', 'meet', 'learn', 'watch', 'look', 'work'],
      haveto: ['go', 'come', 'eat', 'sleep', 'walk', 'work', 'read', 'write', 'talk', 'try', 'leave', 'start', 'stop', 'wait', 'check', 'call', 'ask', 'pay', 'help', 'learn', 'meet'],
      lets: ['go', 'eat', 'drink', 'walk', 'play', 'talk', 'try', 'start', 'stop', 'meet', 'work', 'read', 'write', 'learn', 'wait', 'look'],
      howdo: ['get', 'say', 'use', 'do', 'make', 'find', 'open', 'start', 'pay', 'learn', 'check', 'close', 'turn', 'read', 'write', 'play'],
      think: ['good', 'ok', 'fine', 'great', 'true', 'fun', 'hard', 'easy', 'right', 'wrong', 'nice', 'sad'],
      interested: ['music', 'sports', 'art', 'movies', 'games', 'books', 'travel', 'cooking', 'fashion', 'dogs', 'cats', 'cars', 'dance', 'fitness', 'nature', 'history', 'science', 'business', 'photos', 'animals', 'food'],
    },
  },
  intermediate: {
    label: '中級',
    words: [
      ['decide', '決める', 'verb'], ['explain', '説明する', 'verb'], ['suggest', '提案する', 'verb'], ['improve', '上達する', 'verb'],
      ['prepare', '準備する', 'verb'], ['realize', '気づく', 'verb'], ['manage', 'やりくりする', 'verb'], ['avoid', '避ける', 'verb'],
      ['consider', '検討する', 'verb'], ['recommend', '勧める', 'verb'], ['achieve', '達成する', 'verb'], ['discuss', '話し合う', 'verb'],
      ['describe', '描写する', 'verb'], ['prefer', '好む', 'verb'], ['complain', '不満を言う', 'verb'], ['apologize', '謝る', 'verb'],
      ['organize', '整理する', 'verb'], ['admit', '認める', 'verb'], ['mention', '言及する', 'verb'], ['remind', '思い出させる', 'verb'],
      ['arrange', '手配する', 'verb'], ['cancel', '中止する', 'verb'], ['confirm', '確認する', 'verb'], ['expect', '期待する', 'verb'],
      ['focus', '集中する', 'verb'], ['handle', '対処する', 'verb'], ['involve', '関わる', 'verb'], ['notice', '気づく', 'verb'],
      ['offer', '申し出る', 'verb'], ['reduce', '減らす', 'verb'], ['refuse', '断る', 'verb'], ['replace', '取り替える', 'verb'],
      ['require', '必要とする', 'verb'], ['respond', '返答する', 'verb'], ['solve', '解決する', 'verb'], ['support', '支える', 'verb'],
      ['waste', '無駄にする', 'verb'], ['afford', '余裕がある', 'verb'], ['apply', '応募する', 'verb'], ['argue', '議論する', 'verb'],
      ['attend', '出席する', 'verb'], ['borrow', '借りる', 'verb'], ['compare', '比較する', 'verb'], ['depend', '頼る', 'verb'],
      ['develop', '発展させる', 'verb'], ['discover', '発見する', 'verb'], ['imagine', '想像する', 'verb'], ['introduce', '紹介する', 'verb'],
      ['relax', 'のんびりする', 'verb'], ['succeed', '成功する', 'verb'],
      ['schedule', '予定', 'noun'], ['budget', '予算', 'noun'], ['deadline', '締切', 'noun'], ['meeting', '会議', 'noun'],
      ['opportunity', '機会', 'noun'], ['experience', '経験', 'noun'], ['decision', '決断', 'noun'], ['opinion', '意見', 'noun'],
      ['advice', '助言', 'noun'], ['information', '情報', 'noun'], ['environment', '環境', 'noun'], ['situation', '状況', 'noun'],
      ['relationship', '関係', 'noun'], ['culture', '文化', 'noun'], ['industry', '業界', 'noun'], ['technology', '技術', 'noun'],
      ['economy', '経済', 'noun'], ['career', 'キャリア', 'noun'], ['project', 'プロジェクト', 'noun'], ['goal', '目標', 'noun'],
      ['habit', '習慣', 'noun'], ['benefit', '利益', 'noun'], ['issue', '問題', 'noun'], ['result', '結果', 'noun'],
      ['process', '過程', 'noun'], ['quality', '品質', 'noun'], ['skill', 'スキル', 'noun'], ['society', '社会', 'noun'],
      ['leadership', 'リーダーシップ', 'noun'], ['marketing', 'マーケティング', 'noun'],
      ['available', '空いてる', 'adj'], ['confident', '自信がある', 'adj'], ['comfortable', '快適', 'adj'], ['curious', '好奇心旺盛', 'adj'],
      ['difficult', '難しい', 'adj'], ['excited', 'わくわく', 'adj'], ['expensive', '高価', 'adj'], ['familiar', '馴染みの', 'adj'],
      ['grateful', '感謝している', 'adj'], ['impressive', '印象的', 'adj'], ['necessary', '必要', 'adj'], ['nervous', '緊張した', 'adj'],
      ['obvious', '明らか', 'adj'], ['perfect', '完璧', 'adj'], ['popular', '人気', 'adj'], ['possible', '可能', 'adj'],
      ['professional', 'プロの', 'adj'], ['reasonable', '妥当', 'adj'], ['responsible', '責任がある', 'adj'], ['serious', '深刻', 'adj'],
    ],
    ok: {
      wanna: ['decide', 'explain', 'improve', 'prepare', 'relax', 'focus', 'succeed', 'apologize', 'apply', 'attend', 'organize', 'achieve', 'develop', 'imagine'],
      canyou: ['explain', 'confirm', 'describe', 'arrange', 'cancel', 'remind', 'suggest', 'recommend', 'handle', 'prepare', 'respond', 'apologize', 'organize'],
      canget: ['information', 'advice', 'opinion', 'schedule', 'budget'],
      gonna: ['decide', 'explain', 'prepare', 'apologize', 'focus', 'organize', 'arrange', 'cancel', 'confirm', 'handle', 'respond', 'relax', 'apply', 'attend', 'discuss', 'improve', 'develop'],
      dowan: ['relax', 'discuss', 'attend', 'prepare', 'organize', 'apply'],
      haveto: ['decide', 'explain', 'prepare', 'apologize', 'focus', 'organize', 'arrange', 'cancel', 'confirm', 'handle', 'respond', 'apply', 'attend', 'improve', 'discuss', 'admit', 'consider', 'manage'],
      lets: ['decide', 'discuss', 'relax', 'prepare', 'organize', 'focus', 'arrange', 'consider', 'compare', 'improve'],
      howdo: ['improve', 'apply', 'cancel', 'confirm', 'organize', 'prepare', 'handle', 'solve', 'avoid', 'develop', 'achieve', 'manage', 'focus', 'describe', 'arrange'],
      think: ['difficult', 'expensive', 'necessary', 'obvious', 'perfect', 'popular', 'possible', 'reasonable', 'serious', 'impressive', 'comfortable', 'available'],
      interested: ['marketing', 'technology', 'economy', 'culture', 'leadership', 'society'],
    },
  },
}

export const LEVEL_IDS: Level[] = ['beginner', 'intermediate']
