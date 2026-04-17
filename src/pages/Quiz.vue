<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'
import { calculateScores, matchCareers } from '../utils/algorithm'

const router = useRouter()

const questions = ref([])
const currentScore = ref(3)

// 加载题目
onMounted(async () => {
  const type = store.state.selectedType
  if (!type) {
    router.push('/category')
    return
  }

  try {
    const data = await import(`../data/questions/${type}.json`)
    questions.value = data.default || data
  } catch (e) {
    console.error('加载题目失败', e)
    router.push('/category')
  }
})

const currentQuestion = computed(() => {
  if (questions.value.length === 0) return null
  return questions.value[store.state.currentIndex]
})

const currentIndex = computed(() => store.state.currentIndex)
const totalQuestions = computed(() => questions.value.length)
const progress = computed(() => {
  if (totalQuestions.value === 0) return 0
  return ((currentIndex.value + 1) / totalQuestions.value) * 100
})
const isLast = computed(() => currentIndex.value === totalQuestions.value - 1)

const scoreLabels = ['完全不符', '不太符合', '一般', '比较符合', '完全符合']

// 初始化当前题的分数
function initScore() {
  if (currentQuestion.value) {
    const existing = store.state.answers.find(a => a.questionId === currentQuestion.value.id)
    currentScore.value = existing ? existing.score : 3
  }
}

// 选择分数
function selectScore(score) {
  currentScore.value = score
  store.setAnswer(currentQuestion.value.id, score)
}

// 上一题
function goPrev() {
  store.prevQuestion()
  initScore()
}

// 下一题
function goNext() {
  if (isLast.value) {
    submitQuiz()
  } else {
    store.setAnswer(currentQuestion.value.id, currentScore.value)
    store.nextQuestion(totalQuestions.value)
    initScore()
  }
}

// 提交测评
async function submitQuiz() {
  const type = store.state.selectedType

  try {
    const careersData = await import(`../data/careers/${type}.json`)
    const careers = careersData.default || careersData

    const scores = calculateScores(questions.value, store.state.answers)
    const matchedCareers = matchCareers(scores, careers)

    store.setResult({
      scores,
      careers: matchedCareers
    })

    router.push('/result')
  } catch (e) {
    console.error('提交失败', e)
  }
}
</script>

<template>
  <div class="quiz-page">
    <div v-if="!currentQuestion" class="loading">加载中...</div>

    <div v-else class="quiz-container">
      <!-- 进度条 -->
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>

      <!-- 题目信息 -->
      <div class="question-info">
        <span class="question-num">第 {{ currentIndex + 1 }} / {{ totalQuestions }} 题</span>
      </div>

      <!-- 题目内容 -->
      <div class="question-content">
        <h2>{{ currentQuestion.text }}</h2>
      </div>

      <!-- 评分选项 -->
      <div class="score-options">
        <div
          v-for="(label, index) in scoreLabels"
          :key="index"
          class="score-item"
          :class="{ active: currentScore === index + 1 }"
          @click="selectScore(index + 1)"
        >
          <span class="score-num">{{ index + 1 }}</span>
          <span class="score-label">{{ label }}</span>
        </div>
      </div>

      <!-- 导航按钮 -->
      <div class="nav-buttons">
        <button
          class="btn secondary"
          :disabled="currentIndex === 0"
          @click="goPrev"
        >
          上一题
        </button>
        <button class="btn primary" @click="goNext">
          {{ isLast ? '查看结果' : '下一题' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quiz-page {
  min-height: 100vh;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.loading {
  color: #666;
}

.quiz-container {
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

.progress-bar {
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  margin-bottom: 24px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 3px;
  transition: width 0.3s;
}

.question-info {
  text-align: center;
  margin-bottom: 20px;
}

.question-num {
  color: #888;
  font-size: 0.9rem;
}

.question-content {
  margin-bottom: 32px;
}

.question-content h2 {
  font-size: 1.3rem;
  color: #333;
  text-align: center;
  line-height: 1.6;
  margin: 0;
}

.score-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.score-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.score-item:hover {
  background: #f0f2ff;
}

.score-item.active {
  background: #f0f2ff;
  border-color: #667eea;
}

.score-num {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e0e0e0;
  border-radius: 50%;
  font-weight: 600;
  color: #555;
}

.score-item.active .score-num {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.score-label {
  font-size: 1rem;
  color: #555;
}

.nav-buttons {
  display: flex;
  gap: 16px;
}

.btn {
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn.primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn.secondary {
  background: #e0e0e0;
  color: #555;
}

.btn.secondary:hover:not(:disabled) {
  background: #d0d0d0;
}

.btn.secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
