# Supabase Database Setup

This directory contains SQL schemas for your Supabase database.

## Setup Instructions

### 1. Apply the Contact Form Schema

To set up the contact form table with proper RLS policies:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** (in the left sidebar)
3. Click **New Query**
4. Copy and paste the contents of `contact-us.sql`
5. Click **Run** or press `Cmd/Ctrl + Enter`

### 2. Verify the Table

After running the SQL:

1. Go to **Table Editor** in your Supabase dashboard
2. You should see a table named `contact-us`
3. Click on the table to view its structure

### 3. Check RLS Policies

To verify Row Level Security policies are properly set:

1. Go to **Authentication** → **Policies** in your Supabase dashboard
2. Find the `contact-us` table
3. You should see these policies:
   - `contact_submit_public` - Allows anyone to submit contact forms
   - `contact_read_own` - Allows authenticated users to read their own submissions
   - `contact_read_service` - Allows service role to read all submissions

## Environment Variables

Make sure you have the following environment variables set in your `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Get these values from your Supabase project settings:
**Settings** → **API** → **Project API keys**

## Testing the Contact Form

After setup, test the contact form by:

1. Starting your Next.js dev server: `npm run dev`
2. Navigate to the contact page
3. Submit a test message
4. Check your Supabase table editor to see if the message was inserted

## Troubleshooting

### "new row violates row-level security policy" error

This means the RLS policies haven't been applied. Re-run the `contact-us.sql` file in the SQL Editor.

### "relation does not exist" error

The table hasn't been created yet. Run the `contact-us.sql` file in the SQL Editor.

### Service role key not working

Make sure:
- The environment variable is correctly named `SUPABASE_SERVICE_ROLE_KEY`
- You've restarted your Next.js dev server after adding the env var
- The key is copied correctly from Supabase (no extra spaces)


