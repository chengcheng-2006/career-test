<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const router = useRouter()
const containerRef = ref(null)
let ctx = null

onMounted(() => {
  ctx = gsap.context(() => {

    // ==================== Section1: 标题滚动淡出 ====================
    gsap.to('.hero-title', {
      y: -150,
      opacity: 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: '.section-1',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })

    gsap.to('.hero-subtitle', {
      y: -100,
      opacity: 0.2,
      ease: 'none',
      scrollTrigger: {
        trigger: '.section-1',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })

    // ==================== Section2: 多阶段分镜动画 ====================
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-2',
        start: 'top top',
        end: '+=2000',
        scrub: true,
        pin: true,
        pinSpacing: true
      }
    })

    // 阶段1: 卡片进入 (0% - 25%)
    tl2.fromTo('.feature-card',
      { y: 150, scale: 0.8, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, ease: 'none', duration: 1 }
    )

    // 阶段2: 卡片聚焦 (25% - 50%)
    tl2.to('.feature-card', {
      scale: 1.08,
      ease: 'none',
      duration: 0.5
    })
    tl2.to('.section-2-bg', {
      opacity: 1,
      ease: 'none',
      duration: 0.5
    }, '<')

    // 阶段3: 信息展开 (50% - 75%)
    tl2.fromTo('.feature-list li',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, ease: 'none', stagger: 0.2, duration: 0.3 },
      '+=0.2'
    )
    tl2.to('.card-icon', {
      scale: 1.2,
      ease: 'none',
      duration: 0.3
    }, '<0.2')

    // 阶段4: 退出过渡 (75% - 100%)
    tl2.to('.feature-card', {
      y: -100,
      opacity: 0.5,
      scale: 0.95,
      ease: 'none',
      duration: 0.8
    })

    // ==================== Section3: CTA延迟出现 ====================
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-3',
        start: 'top top',
        end: '+=800',
        scrub: true,
        pin: true,
        pinSpacing: true
      }
    })

    // 文字出现
    tl3.fromTo('.cta-text',
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, ease: 'none', duration: 0.5 }
    )
    // 按钮放大出现
    tl3.fromTo('.cta-button',
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, ease: 'none', duration: 0.5 },
      '-=0.3'
    )
    // 按钮呼吸效果
    tl3.to('.cta-button', {
      scale: 1.05,
      ease: 'none',
      duration: 0.2
    })
    .to('.cta-button', {
      scale: 1,
      ease: 'none',
      duration: 0.2
    })

    // ==================== 全局视差背景 ====================
    gsap.to('.parallax-bg', {
      y: -200,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.value,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    })

  }, containerRef)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})

const startTest = () => {
  router.push('/category')
}
</script>

<template>
  <div ref="containerRef" class="landing-container">
    <!-- 视差背景 -->
    <div class="parallax-bg"></div>

    <!-- Section 1: Hero -->
    <section class="section section-1">
      <div class="hero-content">
        <h1 class="hero-title">职业选择测评</h1>
        <p class="hero-subtitle">找到最适合你的未来方向</p>
      </div>
    </section>

    <!-- Section 2: Feature (多阶段分镜) -->
    <section class="section section-2">
      <div class="section-2-bg"></div>
      <div class="feature-content">
        <div class="feature-card">
          <div class="card-icon">🎯</div>
          <h2>科学测评</h2>
          <p>通过科学测评发现你的潜力</p>
          <ul class="feature-list">
            <li>基于心理学理论设计</li>
            <li>多维度分析职业匹配度</li>
            <li>个性化职业推荐报告</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Section 3: CTA -->
    <section class="section section-3">
      <div class="cta-content">
        <p class="cta-text">准备好发现你的职业潜力了吗？</p>
        <button class="cta-button" @click="startTest">
          开始测试
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.landing-container {
  background: #000;
  color: #fff;
  overflow-x: hidden;
}

.parallax-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 130%;
  background: radial-gradient(ellipse at 50% 0%, #1a1a2e 0%, #000 60%);
  z-index: 0;
  pointer-events: none;
}

.section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

/* Section 1 */
.section-1 {
  background: transparent;
}

.hero-content {
  text-align: center;
  padding: 20px;
}

.hero-title {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 20px;
  background: linear-gradient(135deg, #fff 0%, #a0a0a0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: #86868b;
  margin: 0;
  font-weight: 400;
}

/* Section 2 */
.section-2 {
  background: transparent;
}

.section-2-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(100, 100, 255, 0.15) 0%, transparent 60%);
  z-index: -1;
  opacity: 0.3;
}

.feature-content {
  padding: 40px 20px;
  width: 100%;
  max-width: 600px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 48px 40px;
  text-align: center;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  transition: transform 0.3s;
}

.feature-card h2 {
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 12px;
}

.feature-card > p {
  color: #86868b;
  font-size: 1.1rem;
  margin: 0 0 24px;
}

.feature-list {
  text-align: left;
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  padding: 12px 0;
  padding-left: 28px;
  position: relative;
  color: #a0a0a0;
  font-size: 1rem;
}

.feature-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #30d158;
  font-weight: 600;
}

/* Section 3 */
.section-3 {
  background: transparent;
}

.cta-content {
  text-align: center;
  padding: 40px 20px;
}

.cta-text {
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  color: #86868b;
  margin: 0 0 40px;
}

.cta-button {
  padding: 18px 60px;
  font-size: 1.2rem;
  font-weight: 600;
  background: linear-gradient(135deg, #0071e3 0%, #42b883 100%);
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.cta-button:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 40px rgba(0, 113, 227, 0.4);
}

/* Responsive */
@media (max-width: 600px) {
  .feature-card {
    padding: 32px 24px;
  }

  .feature-list li {
    font-size: 0.95rem;
  }
}
</style>
