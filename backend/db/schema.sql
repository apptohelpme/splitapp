CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    picture_url VARCHAR(255),  -- URL for the user's profile picture
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE auth_providers (
    auth_provider_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL,  -- e.g., 'Google', 'facebook', 'apple'
    provider_user_id VARCHAR(255) NOT NULL,  -- The unique ID provided by the auth provider (Google ID, Facebook ID, etc.)
    email VARCHAR(255) NOT NULL,  -- Email as provided by the auth provider
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(provider, provider_user_id),  -- Ensures a unique user per provider
    UNIQUE(user_id, provider)  -- Ensures that a user can't have multiple accounts with the same provider
);


CREATE TABLE groups (
    group_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_name VARCHAR(255) NOT NULL,
    created_by UUID REFERENCES users(user_id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE group_members (
    group_member_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID REFERENCES groups(group_id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(group_id, user_id)
);

CREATE TABLE expenses (
    expense_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID REFERENCES groups(group_id) ON DELETE SET NULL,
    paid_by UUID REFERENCES users(user_id) ON DELETE SET NULL,
    amount NUMERIC(10, 2) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE expense_shares (
    expense_share_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    expense_id UUID REFERENCES expenses(expense_id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    amount_owed NUMERIC(10, 2) NOT NULL,
    amount_paid NUMERIC(10, 2) DEFAULT 0.00,
    is_settled BOOLEAN DEFAULT FALSE,
    UNIQUE(expense_id, user_id)
);

CREATE TABLE settlements (
    settlement_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_user_id UUID REFERENCES users(user_id) ON DELETE SET NULL,
    to_user_id UUID REFERENCES users(user_id) ON DELETE SET NULL,
    amount NUMERIC(10, 2) NOT NULL,
    expense_id UUID REFERENCES expenses(expense_id) ON DELETE SET NULL,
    settled_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE expense_audit (
    audit_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    expense_id UUID REFERENCES expenses(expense_id) ON DELETE CASCADE,
    modified_by UUID REFERENCES users(user_id) ON DELETE SET NULL,
    modification_type VARCHAR(50) NOT NULL,
    old_value JSONB,
    new_value JSONB,
    modified_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE expense_versions (
    expense_version_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    expense_id UUID REFERENCES expenses(expense_id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(expense_id, version_number)
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_expenses_group_id ON expenses(group_id);
CREATE INDEX idx_expense_shares_expense_id ON expense_shares(expense_id);
