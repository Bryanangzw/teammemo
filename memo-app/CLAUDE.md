# CLAUDE.md
## AI Development Guide for Market Leaders Memo System

This document helps Claude (or any AI assistant) understand the codebase and implement features correctly.

---

## Project Overview

**What is this?**
A Next.js web app where Market Leaders team members create structured project proposals (memos), submit them for Bryan's approval, and auto-generate Dart AI projects/tasks upon approval.

**Core Flow:**
1. User answers questions → Gets recommended memo type
2. User fills out memo form → Downloads PDF and/or submits
3. Bryan reviews → Approves/Rejects/Requests revision
4. On approval → Dart AI project auto-created with tasks and assignments

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| PDF Generation | @react-pdf/renderer |
| Icons | lucide-react |
| Database | Supabase (PostgreSQL) - to be added |
| Auth | Supabase Auth - to be added |
| Task Management | Dart AI API |

---

## File Structure

```
memo-app/
├── app/                          # Next.js App Router
│   ├── globals.css               # Global styles + Tailwind
│   ├── layout.tsx                # Root layout (header)
│   ├── page.tsx                  # Home - questionnaire flow
│   └── memo/
│       ├── quick/page.tsx        # Quick Memo form
│       ├── project/page.tsx      # Project Memo form
│       └── initiative/page.tsx   # Initiative Memo form
│
├── components/
│   ├── FormComponents.tsx        # Reusable form inputs (TextInput, RadioGroup, etc.)
│   ├── QuickMemoPDF.tsx          # PDF template for Quick Memo
│   ├── ProjectMemoPDF.tsx        # PDF template for Project Memo
│   └── InitiativeMemoPDF.tsx     # PDF template for Initiative Memo
│
├── lib/
│   └── memoTypes.ts              # TypeScript types + constants (priorities, avatars, etc.)
│
├── PRD.md                        # Product requirements document
├── CLAUDE.md                     # This file
└── README.md                     # Deployment instructions
```

---

## Key Files Explained

### `lib/memoTypes.ts`
Contains all TypeScript interfaces and constants:
- `QuickMemoData`, `ProjectMemoData`, `InitiativeMemoData` - form data types
- `TeamMember` - person/role/hours/confirmed structure
- `priorityLevels`, `companyPriorities`, `avatars`, etc. - dropdown options

**When adding new form fields:** Update the interface here first, then add to form and PDF.

### `components/FormComponents.tsx`
Reusable form elements:
- `FormSection` - colored header sections
- `FormField` - label + optional note + children
- `TextInput`, `TextArea` - styled inputs
- `RadioGroup`, `CheckboxGroup` - option selectors
- `TeamMemberTable` - RACI-style people table
- `ObjectionsList`, `RisksList`, `MilestonesList`, `BudgetList` - dynamic lists

**Pattern:** Each list component follows add/remove/update pattern with state lifting.

### `components/*MemoPDF.tsx`
PDF templates using @react-pdf/renderer:
- Must match the Word templates exactly
- Use `StyleSheet.create()` for styles
- Colors match the Word doc headers (red, blue, green, etc.)

**Gotcha:** @react-pdf/renderer has limited CSS support. No flexbox gap, limited border-radius.

---

## Coding Conventions

### TypeScript
```typescript
// Always type props
type Props = {
  value: string;
  onChange: (v: string) => void;
};

// Use explicit return types for complex functions
const calculateTotal = (items: Item[]): number => {
  return items.reduce((sum, item) => sum + item.amount, 0);
};
```

### React Components
```typescript
// Use 'use client' directive for client components
'use client';

// Prefer functional components with hooks
export default function MyComponent() {
  const [state, setState] = useState<string>('');
  // ...
}
```

### Form State
```typescript
// Keep all form data in single state object
const [data, setData] = useState<MemoData>({...});

// Update with spread pattern
const updateData = (field: keyof MemoData, value: any) => {
  setData({ ...data, [field]: value });
};
```

### Styling
```typescript
// Use Tailwind classes
<div className="bg-white rounded-lg p-4 shadow-md">

// For form inputs, use global classes from globals.css
<input className="form-input" />
<textarea className="form-textarea" />
```

---

## Adding New Features

### Adding a New Form Field

1. **Update type** in `lib/memoTypes.ts`:
```typescript
export type ProjectMemoData = {
  // ...existing fields
  newField: string;
};
```

2. **Add to form** in `app/memo/project/page.tsx`:
```typescript
// In state initialization
const [data, setData] = useState<ProjectMemoData>({
  // ...existing
  newField: '',
});

// In JSX
<FormField label="New Field Label">
  <TextInput 
    value={data.newField} 
    onChange={(v) => updateData('newField', v)} 
    placeholder="Placeholder text" 
  />
</FormField>
```

3. **Add to PDF** in `components/ProjectMemoPDF.tsx`:
```typescript
<Text style={styles.label}>New Field:</Text>
<Text style={styles.value}>{data.newField}</Text>
```

### Adding a New Memo Type

1. Create new type in `lib/memoTypes.ts`
2. Create new form page in `app/memo/[type]/page.tsx`
3. Create new PDF component in `components/[Type]MemoPDF.tsx`
4. Add to questionnaire options in `app/page.tsx`

---

## Dart AI Integration

### API Reference

**Base URL:** `https://app.itsdart.com/api/v1`

**Authentication:**
```typescript
headers: {
  'Authorization': `Bearer ${process.env.DART_API_KEY}`,
  'Content-Type': 'application/json'
}
```

### Endpoints to Use

**Create Project:**
```typescript
POST /projects

{
  "name": "Project Name",
  "description": "Description",
  "status": "Active",
  "priority": "High", // High, Medium, Low
  "startDate": "2026-02-01",
  "dueDate": "2026-03-01"
}
```

**Create Task:**
```typescript
POST /tasks

{
  "projectId": "project_xxx",
  "title": "Task title",
  "description": "Task description",
  "assigneeId": "user_xxx",
  "dueDate": "2026-02-15",
  "priority": "High"
}
```

**List Users:**
```typescript
GET /users

// Returns list of workspace users with IDs
```

### Integration Implementation

Create `lib/dart.ts`:
```typescript
const DART_API_URL = 'https://app.itsdart.com/api/v1';

export async function createDartProject(memo: ProjectMemoData) {
  const response = await fetch(`${DART_API_URL}/projects`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.DART_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `[${memo.projectType}] ${memo.projectName}`,
      description: `Memo submitted by ${memo.submittedBy}`,
      priority: mapPriority(memo.priorityLevel),
      startDate: memo.targetLaunchDate,
      dueDate: memo.hardDeadline || null
    })
  });
  
  return response.json();
}

export async function createDartTasks(projectId: string, memo: ProjectMemoData) {
  const tasks = [];
  
  // Create task for accountable person
  tasks.push({
    projectId,
    title: 'Kick off and oversee project',
    assigneeId: await getUserId(memo.accountable),
    dueDate: addDays(memo.targetLaunchDate, 2)
  });
  
  // Create tasks for milestones (if Initiative)
  if ('milestones' in memo && memo.milestones) {
    for (const milestone of memo.milestones) {
      tasks.push({
        projectId,
        title: milestone.milestone,
        assigneeId: await getUserId(milestone.owner),
        dueDate: milestone.date,
        description: `Success criteria: ${milestone.criteria}`
      });
    }
  }
  
  // Create tasks for each responsible person
  const responsible = memo.responsible.split(',').map(s => s.trim());
  for (const person of responsible) {
    tasks.push({
      projectId,
      title: `Execute: ${memo.projectName}`,
      assigneeId: await getUserId(person),
      dueDate: memo.targetLaunchDate
    });
  }
  
  // Batch create tasks
  return Promise.all(tasks.map(task => 
    fetch(`${DART_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DART_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
  ));
}

// Map team member names to Dart user IDs
const USER_MAP: Record<string, string> = {
  'Bryan': 'dart_user_id_1',
  'Melvin': 'dart_user_id_2',
  'Collen': 'dart_user_id_3',
  // Add all team members
};

async function getUserId(name: string): Promise<string | null> {
  const normalized = name.trim().split(' ')[0]; // Get first name
  return USER_MAP[normalized] || null;
}

function mapPriority(level: string): string {
  const map: Record<string, string> = {
    'CRITICAL': 'Critical',
    'HIGH': 'High',
    'MEDIUM': 'Medium',
    'LOW': 'Low'
  };
  return map[level] || 'Medium';
}
```

### Approval Flow with Dart

Create `app/api/memos/[id]/approve/route.ts`:
```typescript
import { createDartProject, createDartTasks } from '@/lib/dart';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  // 1. Get memo from database
  const memo = await getMemo(params.id);
  
  // 2. Update memo status to approved
  await updateMemo(params.id, { 
    status: 'approved',
    approvedBy: 'Bryan',
    approvedAt: new Date()
  });
  
  // 3. Create Dart project
  try {
    const project = await createDartProject(memo.content);
    
    // 4. Create tasks from memo
    await createDartTasks(project.id, memo.content);
    
    // 5. Save Dart project ID to memo
    await updateMemo(params.id, {
      dartProjectId: project.id,
      dartSyncStatus: 'synced'
    });
    
    return Response.json({ success: true, dartProjectId: project.id });
    
  } catch (error) {
    // 6. Handle sync failure
    await updateMemo(params.id, {
      dartSyncStatus: 'failed',
      dartSyncError: error.message
    });
    
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
```

---

## Database Schema (Supabase)

When adding Supabase, create these tables:

```sql
-- Users table
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text not null,
  role text not null default 'submitter', -- submitter, approver, admin
  dart_user_id text, -- For Dart AI assignment
  created_at timestamptz default now()
);

-- Memos table
create table memos (
  id uuid primary key default gen_random_uuid(),
  type text not null, -- quick, project, initiative
  status text not null default 'draft', -- draft, submitted, approved, rejected, revision_requested
  
  submitted_by uuid references users(id),
  submitted_at timestamptz,
  reviewed_by uuid references users(id),
  reviewed_at timestamptz,
  
  content jsonb not null, -- Full memo data
  
  approval_notes text,
  revision_comments text,
  
  dart_project_id text,
  dart_sync_status text, -- pending, synced, failed
  dart_sync_error text,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table memos enable row level security;

-- Users can see their own memos
create policy "Users can view own memos" on memos
  for select using (submitted_by = auth.uid());

-- Approvers can see all submitted memos
create policy "Approvers can view submitted memos" on memos
  for select using (
    status != 'draft' 
    and exists (
      select 1 from users 
      where id = auth.uid() 
      and role in ('approver', 'admin')
    )
  );
```

---

## Environment Variables

Create `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Dart AI
DART_API_KEY=your_dart_api_key
DART_WORKSPACE_ID=your_workspace_id

# Optional: Slack notifications
SLACK_WEBHOOK_URL=your_slack_webhook

# App
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

---

## Common Tasks

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
Push to GitHub → Vercel auto-deploys

### Add New Team Member

1. Add to Supabase `users` table
2. Add to `USER_MAP` in `lib/dart.ts` with their Dart user ID
3. They can now log in via magic link

---

## Troubleshooting

### PDF Generation Fails
- Check @react-pdf/renderer compatibility
- Ensure no unsupported CSS (gap, certain border-radius)
- Check browser console for errors

### Dart API Errors
- Verify API key is valid
- Check user IDs exist in workspace
- Review API response for specific error

### Form State Not Updating
- Check that `updateData` is called with correct field name
- Verify field exists in initial state
- Check for typos in field names

---

## Contact

**Project Owner:** Bryan Ang
**Business:** Market Leaders (Industry Titans Pte Ltd)
**Tech Questions:** Ask Claude to check this CLAUDE.md first

---

*Last Updated: January 31, 2026*
