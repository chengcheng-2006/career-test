<script setup>
import { useRouter } from 'vue-router'
import { store } from '../store'

const router = useRouter()

const categories = [
  { type: 'engineering', name: '工科', desc: '工程技术、计算机、建筑等', icon: '⚙️' },
  { type: 'science', name: '理科', desc: '数学、物理、化学、生物等', icon: '🔬' },
  { type: 'arts', name: '文科', desc: '文学、历史、哲学、语言等', icon: '📚' },
  { type: 'social', name: '社科', desc: '经济、管理、法律、社会学等', icon: '🌐' }
]

const selectCategory = (type) => {
  store.setType(type)
  router.push('/quiz')
}
</script>

<template>
  <div class="category-page">
    <h1>选择你的方向</h1>
    <p class="hint">请选择与你背景最相关的领域</p>
    <div class="category-grid">
      <div
        v-for="cat in categories"
        :key="cat.type"
        class="category-card"
        @click="selectCategory(cat.type)"
      >
        <span class="icon">{{ cat.icon }}</span>
        <h3>{{ cat.name }}</h3>
        <p>{{ cat.desc }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: #f5f7fa;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.hint {
  color: #666;
  margin-bottom: 2rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 600px;
  width: 100%;
}

.category-card {
  background: white;
  padding: 30px 20px;
  border-radius: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.category-card:hover {
  border-color: #667eea;
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
}

.icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 12px;
}

.category-card h3 {
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  color: #333;
}

.category-card p {
  margin: 0;
  font-size: 0.875rem;
  color: #888;
}

@media (max-width: 500px) {
  .category-grid {
    grid-template-columns: 1fr;
  }
}
</style>
