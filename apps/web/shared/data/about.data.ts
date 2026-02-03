export const aboutData = {
  profile: {
    name: '강민재 (Ian Kang)',
    description: [
      '무언가를 만들 때, 왜 이렇게 되어 있는지를 먼저 생각하는 편입니다.',
      '작은 기능 수정에 많은 코드를 고쳐야 했던 경험을 계기로, 변경 영향이 한눈에 보이는 코드를 지향하고 있습니다.',
      '완성보다 과정에서의 선택과 고민을 중요하게 생각하며, 이 블로그에는 개발하며 겪은 문제와 그 해결 과정을 기록하고 있습니다.',
      '배운 내용을 흘려보내기보다, 다시 꺼내 볼 수 있는 형태로 남기는 것을 목표로 합니다.',
    ],

    imageUrl: '/profile.jpeg',
  },

  techStack: {
    title: 'Tech Stack',
    items: {
      frontend: [
        'HTML',
        'CSS',
        'JavaScript',
        'TypeScript',
        'Tailwind CSS',
        'React',
        'Vue.js',
        'Next.js',
      ],
      backend: ['Java', 'Spring Boot', 'NestJS', 'Ubuntu', 'Nginx', 'GitHub Actions'],
    },
  },
  career: {
    title: 'Experience',
    items: [
      {
        company: '(주) 메가존클라우드',
        role: 'Frontend Developer (Intern)',
        period: '2025.11 - 2026.01',
        description: [
          'React + TypeScript 기반 레거시 백오피스 마이그레이션 작업을 진행했습니다.\n',
          '라우팅 및 URL 상태 관리 구조를 개선하고, 대시보드 화면과 폼 UI를 구현했습니다.',
        ],
      },
    ],
  },

  education: {
    title: 'Education',
    items: [
      {
        school: 'KB IT’s Your Life',
        type: 'Multicampus Bootcamp',
        major: 'Programming',
        period: '2025.03 - 2025.08',
        status: 'Completed',
      },
      {
        school: '세종대학교',
        type: 'B.S.',
        major: 'Hospitality Management / Computer Engineering',
        period: '2020.03 - 2025.02',
        status: 'Graduated',
      },
    ],
  },

  awards: {
    title: 'Awards',
    items: [
      {
        name: "KB IT's Your Life 해커톤",
        date: '2025',
        organizer: 'KB국민은행',
        type: '장려상 (4등)',
      },
      {
        name: '외식서비스 앱 기획 및 개발 경진대회',
        date: '2022',
        organizer: '세종대학교 LINK 3.0',
        type: '우수상 (1등)',
      },
    ],
  },

  projects: {
    title: 'Projects',
    items: [
      {
        name: 'Archive',
        description: 'Next.js 기반 개인 기술 블로그',
        links: [
          { label: 'Site', href: 'https://blog.minjae-dev.com' },
          { label: 'Repo', href: 'https://github.com/Blog-Archive-Ian/blog-platform' },
        ],
      },
      {
        name: 'MOS',
        description: '스터디 팀 모집 및 일정 관리 웹 플랫폼',
        links: [{ label: 'Repo', href: 'https://github.com/project-mos/frontend' }],
      },
      {
        name: 'Rabbit Tracker',
        description: '기록 습관을 돕는 React Native 모바일 앱',
        links: [{ label: 'Repo', href: 'https://github.com/Rabbit-Tracker' }],
      },
    ],
  },
} as const

export type AboutData = typeof aboutData
