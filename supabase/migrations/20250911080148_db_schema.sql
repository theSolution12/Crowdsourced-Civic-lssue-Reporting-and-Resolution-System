-- ===============================================
-- Reset schema (safe since no data exists)
-- ===============================================
DROP TABLE IF EXISTS reward_redemptions CASCADE;
DROP TABLE IF EXISTS rewards CASCADE;
DROP TABLE IF EXISTS votes CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS issue_updates CASCADE;
DROP TABLE IF EXISTS issues CASCADE;
DROP TABLE IF EXISTS department_members CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ===============================================
-- Extensions
-- ===============================================
-- enable uuid generator
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ===============================================
-- Trigger function for updated_at
-- ===============================================
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;

-- ===============================================
-- USERS
-- ===============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name  TEXT,
  phone TEXT,
  email TEXT UNIQUE NOT NULL,
  image_url TEXT,
  username TEXT UNIQUE,
  email_verified BOOLEAN DEFAULT FALSE,
  points INTEGER DEFAULT 0 CHECK (points >= 0),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- keep updated_at in sync
CREATE TRIGGER trg_users_set_timestamp
  BEFORE UPDATE ON users FOR EACH ROW
  EXECUTE FUNCTION trigger_set_timestamp();

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY users_select_own ON users
  FOR SELECT USING (auth.uid()::text = clerk_id);

CREATE POLICY users_update_own ON users
  FOR UPDATE USING (auth.uid()::text = clerk_id)
  WITH CHECK (auth.uid()::text = clerk_id);

CREATE POLICY users_insert_own ON users
  FOR INSERT WITH CHECK (auth.uid()::text = clerk_id);

CREATE POLICY service_role_all_users ON users
  FOR ALL USING (current_setting('role') = 'service_role');

-- Indexes
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_users_username ON users (username);
CREATE INDEX idx_users_created_at ON users (created_at);
CREATE INDEX idx_users_updated_at ON users (updated_at);

-- ===============================================
-- DEPARTMENTS
-- ===============================================
CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT,
  description TEXT,
  location_coverage JSONB,
  head_officer_id UUID,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_departments_head_officer FOREIGN KEY (head_officer_id)
    REFERENCES users (id) ON DELETE SET NULL
);

CREATE TRIGGER trg_departments_set_timestamp
  BEFORE UPDATE ON departments FOR EACH ROW
  EXECUTE FUNCTION trigger_set_timestamp();

-- ===============================================
-- DEPARTMENT MEMBERS
-- ===============================================
CREATE TABLE department_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id UUID NOT NULL,
  user_id UUID NOT NULL,
  role TEXT,
  permissions JSONB,
  assigned_areas JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_deptmembers_department FOREIGN KEY (department_id)
    REFERENCES departments (id) ON DELETE CASCADE,
  CONSTRAINT fk_deptmembers_user FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT uq_department_user UNIQUE (department_id, user_id)
);

-- ===============================================
-- ISSUES
-- ===============================================
CREATE TABLE issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT,
  description TEXT,
  location_data JSONB,
  image_urls TEXT[],
  voice_note_url TEXT,
  tags TEXT[],
  category TEXT,
  status TEXT,
  priority TEXT,
  assigned_department_id UUID,
  assigned_officer_id UUID,
  upvotes INTEGER DEFAULT 0 CHECK (upvotes >= 0),
  downvotes INTEGER DEFAULT 0 CHECK (downvotes >= 0),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMPTZ,
  CONSTRAINT fk_issues_user FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT fk_issues_assigned_department FOREIGN KEY (assigned_department_id)
    REFERENCES departments (id) ON DELETE SET NULL,
  CONSTRAINT fk_issues_assigned_officer FOREIGN KEY (assigned_officer_id)
    REFERENCES users (id) ON DELETE SET NULL
);

CREATE TRIGGER trg_issues_set_timestamp
  BEFORE UPDATE ON issues FOR EACH ROW
  EXECUTE FUNCTION trigger_set_timestamp();

-- Helpful indexes
CREATE INDEX idx_issues_user_id ON issues (user_id);
CREATE INDEX idx_issues_status ON issues (status);
CREATE INDEX idx_issues_category ON issues (category);

-- ===============================================
-- ISSUE UPDATES
-- ===============================================
CREATE TABLE issue_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID NOT NULL,
  updated_by UUID,
  status TEXT,
  comment TEXT,
  attachments TEXT[],
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_issueupdates_issue FOREIGN KEY (issue_id)
    REFERENCES issues (id) ON DELETE CASCADE,
  CONSTRAINT fk_issueupdates_updated_by FOREIGN KEY (updated_by)
    REFERENCES users (id) ON DELETE SET NULL
);

CREATE INDEX idx_issue_updates_issue_id ON issue_updates (issue_id);

-- ===============================================
-- COMMENTS
-- ===============================================
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID NOT NULL,
  user_id UUID,
  content TEXT,
  parent_comment_id UUID,
  likes INTEGER DEFAULT 0 CHECK (likes >= 0),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_comments_issue FOREIGN KEY (issue_id)
    REFERENCES issues (id) ON DELETE CASCADE,
  CONSTRAINT fk_comments_user FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE SET NULL,
  CONSTRAINT fk_comments_parent FOREIGN KEY (parent_comment_id)
    REFERENCES comments (id) ON DELETE SET NULL
);

CREATE TRIGGER trg_comments_set_timestamp
  BEFORE UPDATE ON comments FOR EACH ROW
  EXECUTE FUNCTION trigger_set_timestamp();

CREATE INDEX idx_comments_issue_id ON comments (issue_id);

-- ===============================================
-- VOTES
-- ===============================================
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID NOT NULL,
  user_id UUID NOT NULL,
  vote_type TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_votes_issue FOREIGN KEY (issue_id)
    REFERENCES issues (id) ON DELETE CASCADE,
  CONSTRAINT fk_votes_user FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT uq_vote_per_user_issue UNIQUE (issue_id, user_id)
);

CREATE INDEX idx_votes_issue_id ON votes (issue_id);

-- ===============================================
-- REWARDS
-- ===============================================
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  issue_id UUID,
  points_earned INTEGER NOT NULL CHECK (points_earned >= 0),
  reward_type TEXT,
  description TEXT,
  earned_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_rewards_user FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT fk_rewards_issue FOREIGN KEY (issue_id)
    REFERENCES issues (id) ON DELETE SET NULL
);

CREATE INDEX idx_rewards_user_id ON rewards (user_id);

-- ===============================================
-- REWARD REDEMPTIONS
-- ===============================================
CREATE TABLE reward_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  reward_title TEXT,
  points_spent INTEGER NOT NULL CHECK (points_spent >= 0),
  reward_details JSONB,
  status TEXT,
  redeemed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_redemptions_user FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX idx_reward_redemptions_user_id ON reward_redemptions (user_id);

-- ===============================================
-- NOTIFICATIONS
-- ===============================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  type TEXT,
  title TEXT,
  message TEXT,
  data JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_notifications_user FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX idx_notifications_user_id ON notifications (user_id);

-- ===============================================
-- HELPER FUNCTION: update_username
-- ===============================================
CREATE OR REPLACE FUNCTION update_username(user_clerk_id TEXT, new_username TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Validation
    IF LENGTH(new_username) < 3 OR LENGTH(new_username) > 50 THEN
        RAISE EXCEPTION 'Username must be between 3 and 50 characters';
    END IF;

    -- Update username
    UPDATE users
    SET username = new_username,
        updated_at = now()
    WHERE clerk_id = user_clerk_id;

    RETURN FOUND;
END;
$$;

-- Grant execution rights
GRANT EXECUTE ON FUNCTION update_username(TEXT, TEXT) TO authenticated;
