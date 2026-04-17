import { reactive } from 'vue'

// 全局状态
const state = reactive({
  selectedType: '',      // 选择的方向
  currentIndex: 0,       // 当前题目索引
  answers: [],           // 答案数组 [{ questionId, score }]
  result: null           // 测评结果
})

// 设置选择的类型
function setType(type) {
  state.selectedType = type
  state.currentIndex = 0
  state.answers = []
  state.result = null
}

// 记录答案
function setAnswer(questionId, score) {
  const existing = state.answers.find(a => a.questionId === questionId)
  if (existing) {
    existing.score = score
  } else {
    state.answers.push({ questionId, score })
  }
}

// 下一题
function nextQuestion(totalQuestions) {
  if (state.currentIndex < totalQuestions - 1) {
    state.currentIndex++
    return true
  }
  return false
}

// 上一题
function prevQuestion() {
  if (state.currentIndex > 0) {
    state.currentIndex--
    return true
  }
  return false
}

// 重置状态
function reset() {
  state.selectedType = ''
  state.currentIndex = 0
  state.answers = []
  state.result = null
}

// 设置结果
function setResult(result) {
  state.result = result
}

export const store = {
  state,
  setType,
  setAnswer,
  nextQuestion,
  prevQuestion,
  reset,
  setResult
}
