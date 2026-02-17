// Question data for minimalist couples conversation app

export interface Question {
  id: string;
  text: string;
  categoryId: string;
  followUp: string;
}

export interface Category {
  id: string;
  name: string;
  questionCount: number;
  isLocked: boolean;
}

export const categories: Category[] = [
  {
    id: 'childhood',
    name: '童年记忆',
    questionCount: 12,
    isLocked: false
  },
  {
    id: 'love-gratitude',
    name: '爱与感恩',
    questionCount: 15,
    isLocked: false
  },
  {
    id: 'future',
    name: '未来畅想',
    questionCount: 10,
    isLocked: false
  },
  {
    id: 'intimacy',
    name: '亲密关系',
    questionCount: 18,
    isLocked: false
  },
  {
    id: 'self',
    name: '自我认知',
    questionCount: 14,
    isLocked: true
  },
  {
    id: 'values',
    name: '价值观',
    questionCount: 16,
    isLocked: true
  },
  {
    id: 'conflict',
    name: '冲突与理解',
    questionCount: 11,
    isLocked: true
  }
];

export const questions: Question[] = [
  // Childhood
  {
    id: 'q1',
    text: '你小时候放学后最喜欢做的一件事是什么？',
    categoryId: 'childhood',
    followUp: '你们的答案有什么让彼此意外的地方？'
  },
  {
    id: 'q2',
    text: '童年时，家里有什么让你感到特别安心的物品或角落？',
    categoryId: 'childhood',
    followUp: '那种安心的感觉，在现在的生活中还能找到吗？'
  },
  
  // Love & Gratitude
  {
    id: 'q3',
    text: '最近一次觉得"幸好有你在"是什么时候？',
    categoryId: 'love-gratitude',
    followUp: '对方知道那个时刻对你的意义吗？'
  },
  {
    id: 'q4',
    text: '在我们的关系中，什么事情是你从未想过要改变的？',
    categoryId: 'love-gratitude',
    followUp: '为什么这件事对你来说如此重要？'
  },
  
  // Future
  {
    id: 'q5',
    text: '如果十年后的我们写一封信给现在，你猜会写什么？',
    categoryId: 'future',
    followUp: '你希望十年后的自己对现在说些什么？'
  },
  {
    id: 'q6',
    text: '五年后的某个平常的周末，你希望我们在做什么？',
    categoryId: 'future',
    followUp: '这个画面里最重要的元素是什么？'
  },
  
  // Intimacy
  {
    id: 'q7',
    text: '你觉得我们之间最不需要改变的一件事是什么？',
    categoryId: 'intimacy',
    followUp: '这件事是从什么时候开始成为"我们"的一部分的？'
  },
  {
    id: 'q8',
    text: '有什么话，你想说但还没找到合适的时机？',
    categoryId: 'intimacy',
    followUp: '现在可以说了。'
  },
  
  // Self
  {
    id: 'q9',
    text: '你最近一次改变想法是因为什么？',
    categoryId: 'self',
    followUp: '改变想法这件事，对你来说容易吗？'
  },
  {
    id: 'q10',
    text: '如果可以对一年前的自己说一句话，你会说什么？',
    categoryId: 'self',
    followUp: '这一年你最大的变化是什么？'
  },
  
  // Values
  {
    id: 'q11',
    text: '在你的生活中，什么是绝对不能妥协的？',
    categoryId: 'values',
    followUp: '对方知道这件事对你的重要性吗？'
  },
  
  // Conflict
  {
    id: 'q12',
    text: '当我们意见不同时，你内心最想要的是什么？',
    categoryId: 'conflict',
    followUp: '我可以如何更好地给你这种感受？'
  }
];

// Get today's question (cycles through questions based on day)
export function getTodayQuestion(): Question {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const questionIndex = dayOfYear % questions.length;
  return questions[questionIndex];
}

// Get day number
export function getDayNumber(): string {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return String(dayOfYear % 365 + 1).padStart(2, '0');
}

// Get questions by category
export function getQuestionsByCategory(categoryId: string): Question[] {
  return questions.filter(q => q.categoryId === categoryId);
}

// Get category by id
export function getCategoryById(categoryId: string): Category | undefined {
  return categories.find(c => c.id === categoryId);
}
