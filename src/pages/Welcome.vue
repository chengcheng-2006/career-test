<script setup>
import { useRouter } from 'vue-router'
import { store } from '../store'

const router = useRouter()

const startTest = () => {
  store.reset()
  router.push('/category')
}
</script>

<template>
  <div class="welcome-page">
    <div class="content">
      <h1>职业测评系统</h1>
      <p class="subtitle">发现你的职业潜力，找到最适合你的发展方向</p>
      <div class="features">
        <div class="feature">
          <span class="icon">🎯</span>
          <span>精准匹配</span>
        </div>
        <div class="feature">
          <span class="icon">⚡</span>
          <span>快速测评</span>
        </div>
        <div class="feature">
          <span class="icon">💡</span>
          <span>专业建议</span>
        </div>
      </div>
      <button class="start-btn" @click="startTest">
        开始测评
      </button>
    </div>
  </div>
</template>

<style scoped>
.welcome-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.content {
  text-align: center;
  color: white;
}

h1 {
  font-size: 2.8rem;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2.5rem;
}

.features {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 3rem;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.feature .icon {
  font-size: 2rem;
}

.feature span:last-child {
  font-size: 0.95rem;
  opacity: 0.9;
}

.start-btn {
  padding: 16px 48px;
  font-size: 1.2rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.start-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

@media (max-width: 600px) {
  h1 {
    font-size: 2rem;
  }

  .features {
    flex-direction: column;
    gap: 20px;
  }
}
</style>
