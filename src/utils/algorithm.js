/**
 * 计算用户各维度得分
 * @param {Array} questions - 题目数组
 * @param {Array} answers - 答案数组 [{ questionId, score }]
 * @returns {Object} 各维度平均分 { dimension: score }
 */
export function calculateScores(questions, answers) {
  const dimensionScores = {}
  const dimensionCounts = {}

  questions.forEach(q => {
    const answer = answers.find(a => a.questionId === q.id)
    if (!answer) return

    let score = answer.score
    // 反向题需要反转分数 (1->5, 2->4, 3->3, 4->2, 5->1)
    if (q.reverse) {
      score = 6 - score
    }

    const dim = q.dimension
    dimensionScores[dim] = (dimensionScores[dim] || 0) + score
    dimensionCounts[dim] = (dimensionCounts[dim] || 0) + 1
  })

  // 计算平均分并归一化到0-1
  const result = {}
  Object.keys(dimensionScores).forEach(dim => {
    const avg = dimensionScores[dim] / dimensionCounts[dim]
    result[dim] = avg / 5 // 归一化到0-1
  })

  return result
}

/**
 * 匹配职业并返回Top3
 * @param {Object} userScores - 用户维度得分
 * @param {Array} careers - 职业数组
 * @returns {Array} 排序后的Top3职业
 */
export function matchCareers(userScores, careers) {
  const userDimensions = Object.keys(userScores)

  const scoredCareers = careers.map(career => {
    let totalWeight = 0
    let matchedWeight = 0

    // 计算匹配度
    Object.entries(career.dimensions).forEach(([dim, weight]) => {
      totalWeight += weight
      if (userScores[dim] !== undefined) {
        matchedWeight += weight * userScores[dim]
      }
    })

    // 归一化匹配度
    const matchScore = totalWeight > 0 ? matchedWeight / totalWeight : 0

    // 生成推荐原因
    const reasons = generateReasons(career, userScores)

    return {
      ...career,
      matchScore: Math.round(matchScore * 100),
      reasons
    }
  })

  // 按匹配度排序并返回Top3
  return scoredCareers
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3)
}

/**
 * 生成推荐原因
 * @param {Object} career - 职业对象
 * @param {Object} userScores - 用户维度得分
 * @returns {Array} 推荐原因数组
 */
function generateReasons(career, userScores) {
  const reasons = []
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

  // 找出匹配度最高的维度
  const matchedDims = Object.entries(career.dimensions)
    .filter(([dim]) => userScores[dim] !== undefined)
    .sort((a, b) => (career.dimensions[b[0]] - career.dimensions[a[0]]))
    .slice(0, 2)

  matchedDims.forEach(([dim, weight]) => {
    if (weight >= 0.7 && userScores[dim] >= 0.6) {
      reasons.push(`您的${dimensionLabels[dim] || dim}与该职业高度契合`)
    }
  })

  if (reasons.length === 0) {
    reasons.push('综合各项特质与该职业较为匹配')
  }

  return reasons
}
