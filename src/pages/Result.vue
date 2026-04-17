<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'

const router = useRouter()

const result = computed(() => store.state.result)
const hasResult = computed(() => result.value !== null)

const dimensionLabels = {
  logic: '逻辑思维',
  analysis: '分析能力',
  creativity: '创造力',
  hands_on: '动手能力',
  teamwork: '团队协作',
  detail: '细节关注',
  focus: '专注力',
  curiosity: '好奇心',
  abstraction: '抽象思维',
  rigor: '严谨性',
  practical: '实践能力',
  expression: '表达能力',
  culture: '文化素养',
  empathy: '同理心',
  reflection: '反思能力',
  language: '语言能力',
  openness: '开放性',
  communication: '沟通能力',
  social_interest: '社会关注',
  negotiation: '协商能力',
  leadership: '领导力',
  business: '商业意识',
  execution: '执行力',
  compliance: '规则意识',
  persuasion: '说服力'
}

function restart() {
  store.reset()
  router.push('/')
}

function goBack() {
  router.push('/category')
}
</script>

<template>
  <div class="result-page">
    <div v-if="!hasResult" class="no-result">
      <h2>暂无测评结果</h2>
      <button class="btn primary" @click="goBack">重新选择方向</button>
    </div>

    <div v-else class="result-container">
      <h1>测评结果</h1>

      <!-- 维度得分 -->
      <div class="scores-section">
        <h2>你的特质分析</h2>
        <div class="score-list">
          <div
            v-for="(score, dim) in result.scores"
            :key="dim"
            class="score-item"
          >
            <span class="dim-label">{{ dimensionLabels[dim] || dim }}</span>
            <div class="score-bar">
              <div class="score-fill" :style="{ width: (score * 100) + '%' }"></div>
            </div>
            <span class="score-value">{{ Math.round(score * 100) }}%</span>
          </div>
        </div>
      </div>

      <!-- 职业推荐 -->
      <div class="careers-section">
        <h2>推荐职业 TOP3</h2>
        <div class="career-list">
          <div
            v-for="(career, index) in result.careers"
            :key="career.name"
            class="career-card"
          >
            <div class="career-header">
              <span class="rank">{{ index + 1 }}</span>
              <div class="career-info">
                <h3>{{ career.name }}</h3>
                <p class="match">匹配度 {{ career.matchScore }}%</p>
              </div>
            </div>
            <p class="career-desc">{{ career.description }}</p>
            <div class="career-reasons">
              <div v-for="reason in career.reasons" :key="reason" class="reason">
                ✓ {{ reason }}
              </div>
            </div>
            <div class="career-jobs">
              <span v-for="job in career.jobs" :key="job" class="job-tag">
                {{ job }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <button class="btn primary restart-btn" @click="restart">
        重新测评
      </button>
    </div>
  </div>
</template>

<style scoped>
.result-page {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 30px 20px;
}

.no-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.result-container {
  max-width: 700px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
}

h2 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 16px;
}

.scores-section {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
}

.score-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.score-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dim-label {
  width: 80px;
  font-size: 0.9rem;
  color: #555;
}

.score-bar {
  flex: 1;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.score-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 4px;
}

.score-value {
  width: 45px;
  text-align: right;
  font-size: 0.85rem;
  color: #888;
}

.careers-section {
  margin-bottom: 24px;
}

.career-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.career-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
}

.career-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.rank {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 50%;
  font-weight: 700;
  font-size: 1.1rem;
}

.career-info h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.match {
  margin: 4px 0 0;
  font-size: 0.9rem;
  color: #667eea;
  font-weight: 500;
}

.career-desc {
  color: #666;
  margin: 0 0 12px;
  line-height: 1.5;
}

.career-reasons {
  margin-bottom: 12px;
}

.reason {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 4px;
}

.career-jobs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.job-tag {
  padding: 4px 12px;
  background: #f0f2ff;
  color: #667eea;
  border-radius: 20px;
  font-size: 0.85rem;
}

.btn {
  padding: 12px 32px;
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

.restart-btn {
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}
</style>
