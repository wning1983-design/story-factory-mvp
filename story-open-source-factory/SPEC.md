# SPEC.md - 故事开源工场 (Story Open Source Factory)

## 1. 项目愿景
打造一个“故事领域的 GitHub”，让创作者能够像协作代码一样协作故事。支持分支（Branching）创作、合并（Merging）灵感，并通过热力图见证每一个文字的贡献。

## 2. 技术栈 (Tech Stack)
- **前端**: React 19 (Vite), Tailwind CSS, Lucide React, Motion (动画)
- **后端**: Express (TypeScript) - *适配当前环境，提供高性能 API*
- **数据库**: PostgreSQL + pgvector (语义查重与向量搜索)
- **AI 引擎**: LangChain.js + DeepSeek API
- **核心逻辑**: 模拟 Git 工作流 (Commit/Branch/Merge)

## 3. 核心功能模块
### 3.1 故事 Git 工作流
- **Branch (分支)**: 任何用户可以从故事的任意节点开启新分支。
- **Commit (提交)**: 章节的每一次修改记录为一次提交。
- **Merge (合并)**: 优秀的分支内容可以被合并回主干 (Mainline)。

### 3.2 贡献热力图 (Contribution Heatmap)
- 仿照 GitHub 蓝色/绿色热力图，记录用户每日的创作字数与频率。

### 3.3 AI 辅助与语义查重
- **DeepSeek 集成**: 提供续写、润色、大纲生成。
- **语义查重**: 利用 pgvector 对新提交内容进行向量匹配，防止洗稿与过度重复。

## 4. 数据库设计 (Schema)
### 4.1 `users`
- `id`: UUID (PK)
- `username`: String
- `email`: String (Unique)
- `contribution_score`: Integer (贡献分)
- `created_at`: Timestamp

### 4.2 `stories`
- `id`: UUID (PK)
- `title`: String
- `description`: Text
- `author_id`: UUID (FK -> users.id)
- `is_public`: Boolean
- `created_at`: Timestamp

### 4.3 `nodes` (章节/节点)
- `id`: UUID (PK)
- `story_id`: UUID (FK -> stories.id)
- `parent_id`: UUID (FK -> nodes.id, Nullable for root)
- `author_id`: UUID (FK -> users.id)
- `title`: String
- `content`: Text
- `branch_name`: String (分支名)
- `is_merged`: Boolean
- `created_at`: Timestamp

### 4.4 `contributions`
- `id`: UUID (PK)
- `user_id`: UUID (FK -> users.id)
- `node_id`: UUID (FK -> nodes.id)
- `word_count`: Integer
- `commit_message`: String
- `created_at`: Timestamp

### 4.5 `vector_store`
- `id`: UUID (PK)
- `node_id`: UUID (FK -> nodes.id)
- `embedding`: Vector(1536) - *适配常用 Embedding 模型*
- `content_snippet`: Text

## 5. 目录结构
```text
/
├── src/
│   ├── components/       # UI 组件 (Heatmap, Editor, TreeView)
│   ├── hooks/            # 自定义 React Hooks
│   ├── lib/              # 工具类 (LangChain, DB Client)
│   ├── server/           # Express 后端逻辑
│   │   ├── routes/       # API 路由
│   │   ├── controllers/  # 业务逻辑
│   │   └── models/       # 数据库模型 (Prisma/SQL)
│   ├── types/            # TypeScript 类型定义
│   ├── App.tsx           # 主入口
│   └── main.tsx
├── prisma/               # 数据库 Schema (如果使用 Prisma)
├── public/               # 静态资源
└── SPEC.md               # 项目宪法
```
