-- 初始化 Story Open Source Factory 数据库

-- 启用 pgvector 扩展
CREATE EXTENSION IF NOT EXISTS vector;

-- 用户表
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contribution_score INTEGER DEFAULT 0,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 故事主干表
CREATE TABLE stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    author_id UUID REFERENCES users(id),
    is_public BOOLEAN DEFAULT TRUE,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 故事节点表 (树状分支结构)
CREATE TABLE nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES nodes(id), -- 父节点，实现分支
    author_id UUID REFERENCES users(id),
    title VARCHAR(255),
    content TEXT NOT NULL,
    branch_name VARCHAR(100) DEFAULT 'main',
    is_merged BOOLEAN DEFAULT FALSE,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 贡献记录表 (用于热力图)
CREATE TABLE contributions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    node_id UUID REFERENCES nodes(id),
    story_id UUID REFERENCES stories(id),
    word_count INTEGER NOT NULL,
    commit_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 向量存储表 (语义查重)
CREATE TABLE vector_store (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID REFERENCES nodes(id) ON DELETE CASCADE,
    embedding VECTOR(1536), -- 假设使用 OpenAI 或类似维度的 Embedding
    content_snippet TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 索引优化
CREATE INDEX idx_nodes_story ON nodes(story_id);
CREATE INDEX idx_nodes_parent ON nodes(parent_id);
CREATE INDEX idx_contributions_user_date ON contributions(user_id, created_at);
CREATE INDEX idx_vector_search ON vector_store USING ivfflat (embedding vector_cosine_ops);
