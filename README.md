# VaultMark – Smart Bookmark App

A private, real-time bookmark manager built using Next.js (App Router), Supabase, and Tailwind CSS.

---

## 🚀 Live Demo

🔗 Live URL: https://vault-mark-smart-bookmark-app.vercel.app  
🔗 GitHub Repo: https://github.com/S-Baksi/VaultMark-Smart-Bookmark-App

---

## 📌 Features

- Google OAuth login (No email/password)
- Add bookmarks (Title + URL)
- Delete bookmarks
- Private bookmarks per user (Row Level Security)
- Real-time updates across multiple tabs (no refresh required)
- Deployed on Vercel

---

## 🛠 Tech Stack

- **Next.js 14 (App Router)**
- **Supabase**
  - Authentication (Google OAuth)
  - PostgreSQL Database
  - Realtime Subscriptions
  - Row Level Security (RLS)
- **Tailwind CSS**
- **Vercel Deployment**

---

## 🗄 Database Schema

```sql
create extension if not exists "uuid-ossp";

create table bookmarks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  url text not null,
  created_at timestamp with time zone default now()
);

alter table bookmarks enable row level security;

create policy "Users manage own bookmarks"
on bookmarks
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

🔄 Realtime Implementation
Supabase Realtime is enabled via:

Database → Publications → bookmarks table enabled

The app subscribes to changes using:

supabase
  .channel("bookmarks-channel")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "bookmarks",
      filter: `user_id=eq.${user.id}`
    },
    () => fetchBookmarks()
  )
  .subscribe();
This ensures:

Only current user's bookmarks trigger updates

Multi-tab updates happen instantly

No manual page refresh required

🔐 Privacy
Row Level Security (RLS) ensures:

Users can only access their own bookmarks

No cross-user data visibility

All operations are secured at database level

⚙️ Local Setup
Clone the repo:

git clone https://github.com/S-Baksi/VaultMark-Smart-Bookmark-App
Install dependencies:

npm install
Create .env.local:

NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_key
Run development server:

npm run dev
🚀 Deployment
Deployed on Vercel.

Environment variables configured in Vercel dashboard:

NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY

Supabase redirect URLs configured for:

localhost

Production Vercel domain

⚠️ Problems Faced & Solutions
1. Google OAuth Redirect Loop
Cause: Incorrect Site URL and Redirect URLs in Supabase
Solution: Configured root Vercel domain properly without /login

2. Realtime Not Updating Current Tab
Cause: Missing subscription dependency on user
Solution: Added user-based filtered realtime subscription

3. Tailwind Errors
Cause: Installed Tailwind v4 (incompatible)
Solution: Downgraded to Tailwind v3.4.4

4. Environment Variables Not Working in Production
Cause: Not added in Vercel
Solution: Added variables and redeployed

📦 Clean Git Configuration
The following are excluded from repository:

node_modules
.next
.env
.env.local
No secrets are committed.

🎯 Assignment Requirements Status
Requirement	Status
Google Login Only	✅
Add Bookmark	✅
Private Per User	✅
Real-time Updates	✅
Delete Bookmark	✅
Vercel Deployment	✅
README Included	✅
📬 Author
Soumalya Baksi
Built as part of technical assignment submission.