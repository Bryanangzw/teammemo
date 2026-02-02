# Product Requirements Document (PRD)
## Market Leaders Memo System v2.0

---

## Overview

A web application that helps Market Leaders team members create structured project proposals (memos), get founder approval, and automatically generate tasks in Dart AI upon approval.

**Problem Statement:**
Team members propose ideas verbally or in scattered formats, leading to unclear ownership, missed details, and no systematic task creation. Projects start without proper planning.

**Solution:**
A guided memo creation system that:
1. Helps users choose the right memo type
2. Forces structured thinking through templates
3. Routes memos to Bryan for approval
4. Auto-creates Dart AI projects and tasks upon approval

---

## Goals & Success Metrics

### Goals
- Reduce time from idea → approved project by 50%
- Ensure every project has clear ownership (RACI)
- Eliminate manual task creation in Dart AI
- Create audit trail of all project proposals

### Success Metrics
| Metric | Target |
|--------|--------|
| Memo completion rate | >80% of started memos get submitted |
| Approval turnaround | <48 hours from submission to decision |
| Dart sync success rate | >99% of approved memos create Dart projects |
| Team adoption | 100% of new projects go through memo system |

---

## User Roles

### 1. Team Member (Submitter)
- Creates and submits memos
- Can view status of their submissions
- Receives notifications on approval/rejection

### 2. Bryan (Approver)
- Reviews submitted memos
- Approves, requests revision, or rejects
- Approval triggers Dart AI integration
- Can delegate approval for Quick Memos

### 3. Melvin (Co-Approver - Initiative Only)
- Reviews Initiative Memos alongside Bryan
- Both must approve for Initiative Memos

---

## Features

### Phase 1: Core Memo System (Current)
- [x] Question-based memo type selector
- [x] Quick Memo form
- [x] Project Memo form
- [x] Initiative Memo form
- [x] PDF download
- [x] Priority levels (CRITICAL/HIGH/MEDIUM/LOW)
- [x] Team requirements with RACI matrix

### Phase 2: Approval Workflow
- [ ] User authentication (team members)
- [ ] Memo submission (saves to database)
- [ ] Approval queue for Bryan
- [ ] Email/Slack notifications
- [ ] Revision requests with comments
- [ ] Approval history log

### Phase 3: Dart AI Integration
- [ ] Dart AI OAuth/API connection
- [ ] Auto-create Dart project on approval
- [ ] Map RACI to Dart task assignments
- [ ] Sync milestones as Dart tasks
- [ ] Link back to original memo

---

## Detailed Requirements

### 2.1 Authentication

**Requirement:** Team members must log in to submit memos.

| Field | Requirement |
|-------|-------------|
| Auth Method | Magic link email OR Google OAuth |
| Session Duration | 30 days |
| Roles | `submitter`, `approver`, `admin` |

**User List (Initial):**
- Bryan Ang (approver, admin)
- Melvin Soh (approver - Initiative only)
- Collen (submitter)
- Morgan (submitter)
- Hwee Heng (submitter)
- Jassy (submitter)
- Jess (submitter)
- Leon (submitter)
- Zach (submitter)
- Jimmy (submitter)
- Warren (submitter)

---

### 2.2 Memo Submission Flow

```
┌─────────────────┐
│  Create Memo    │
│  (fill form)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Preview PDF    │
│  (optional)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Submit for     │
│  Approval       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Bryan Reviews  │◄──── Notification sent
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌───────┐  ┌─────────┐  ┌──────────┐
│Approve│  │ Revise  │  │  Reject  │
└───┬───┘  └────┬────┘  └────┬─────┘
    │           │            │
    ▼           ▼            ▼
┌───────────┐ ┌──────────┐ ┌──────────┐
│Create Dart│ │Return to │ │Archive   │
│Project    │ │Submitter │ │with note │
└───────────┘ └──────────┘ └──────────┘
```

---

### 2.3 Approval Rules

| Memo Type | Approver(s) | Auto-approve Conditions |
|-----------|-------------|------------------------|
| Quick Memo | Bryan | None - all require review |
| Project Memo | Bryan | None - all require review |
| Initiative Memo | Bryan AND Melvin | Both must approve |

**Approval Actions:**
1. **Approve** → Triggers Dart AI project creation
2. **Request Revision** → Returns to submitter with comments
3. **Reject** → Archives memo with rejection reason
4. **Approve with Modifications** → Bryan can edit before approving

---

### 2.4 Dart AI Integration

**Connection:**
- OAuth 2.0 authentication with Dart AI
- API Key stored securely (environment variable)
- Workspace: Market Leaders main workspace

**On Approval, Create:**

```json
{
  "project": {
    "name": "[Memo Type] - [Project Name]",
    "description": "Auto-created from Memo System",
    "status": "Active",
    "priority": "[from memo priority]",
    "start_date": "[target launch date]",
    "due_date": "[hard deadline or null]",
    "owner": "[ACCOUNTABLE person from RACI]"
  },
  "tasks": [
    {
      "title": "Review and kick off project",
      "assignee": "[ACCOUNTABLE person]",
      "due_date": "[start date + 2 days]",
      "description": "Original memo: [link to memo]"
    },
    // For each milestone in Initiative Memo:
    {
      "title": "[milestone name]",
      "assignee": "[milestone owner]",
      "due_date": "[milestone date]",
      "description": "[success criteria]"
    },
    // For each RESPONSIBLE person:
    {
      "title": "Execute [their role]",
      "assignee": "[RESPONSIBLE person]",
      "due_date": "[target launch date]"
    }
  ]
}
```

**User Mapping (Dart AI User IDs):**
| Name | Email | Dart User ID |
|------|-------|--------------|
| Bryan | bryan@industrytitans.com | [to be configured] |
| Melvin | melvin@industrytitans.com | [to be configured] |
| Collen | collen@industrytitans.com | [to be configured] |
| Morgan | morgan@industrytitans.com | [to be configured] |
| ... | ... | ... |

**Error Handling:**
- If Dart API fails, queue for retry (max 3 attempts)
- Notify Bryan of sync failures
- Manual "Resync to Dart" button available

---

### 2.5 Data Model

**Memo:**
```typescript
interface Memo {
  id: string;
  type: 'quick' | 'project' | 'initiative';
  status: 'draft' | 'submitted' | 'in_review' | 'revision_requested' | 'approved' | 'rejected';
  
  // Metadata
  submittedBy: string; // user ID
  submittedAt: Date;
  reviewedBy: string | null;
  reviewedAt: Date | null;
  
  // Content (JSON blob matching form data)
  content: QuickMemoData | ProjectMemoData | InitiativeMemoData;
  
  // Approval
  approvalNotes: string | null;
  revisionComments: string | null;
  
  // Dart Integration
  dartProjectId: string | null;
  dartSyncStatus: 'pending' | 'synced' | 'failed' | null;
  dartSyncError: string | null;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
```

**User:**
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'submitter' | 'approver' | 'admin';
  dartUserId: string | null; // For task assignment
  createdAt: Date;
}
```

---

### 2.6 Notifications

| Event | Recipient | Channel |
|-------|-----------|---------|
| Memo submitted | Bryan | Email + Slack |
| Initiative submitted | Bryan + Melvin | Email + Slack |
| Revision requested | Submitter | Email |
| Memo approved | Submitter | Email + Slack |
| Memo rejected | Submitter | Email |
| Dart sync failed | Bryan | Slack |

**Slack Integration:**
- Post to #memo-approvals channel
- Include: Memo name, type, priority, submitter, link to review

---

### 2.7 UI/UX Requirements

**Dashboard (After Login):**
- "Create New Memo" button
- "My Submissions" list with status
- For Bryan: "Pending Approvals" queue

**Approval Queue (Bryan Only):**
- List of pending memos sorted by priority then date
- Preview memo without leaving queue
- One-click approve/reject buttons
- Inline comment field for revisions

**Mobile Responsive:**
- Forms must work on mobile
- Approval queue must work on mobile (Bryan reviews on-the-go)

---

## Technical Architecture

### Stack
- **Frontend:** Next.js 16, React 18, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (magic link)
- **PDF:** @react-pdf/renderer (client-side)
- **Hosting:** Vercel

### API Routes

```
POST   /api/memos              Create draft memo
GET    /api/memos              List user's memos
GET    /api/memos/:id          Get memo details
PUT    /api/memos/:id          Update draft memo
POST   /api/memos/:id/submit   Submit for approval
POST   /api/memos/:id/approve  Approve memo (Bryan only)
POST   /api/memos/:id/reject   Reject memo (Bryan only)
POST   /api/memos/:id/revise   Request revision (Bryan only)
POST   /api/memos/:id/sync     Resync to Dart (admin only)
GET    /api/approvals          Get pending approvals (Bryan only)
GET    /api/users              List team members (for RACI dropdowns)
```

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Dart AI
DART_API_KEY=
DART_WORKSPACE_ID=

# Slack (optional)
SLACK_WEBHOOK_URL=

# App
NEXT_PUBLIC_APP_URL=
```

---

## Rollout Plan

### Phase 1: MVP (Week 1-2)
- Deploy current version (PDF download only)
- Team starts using for new projects
- Collect feedback on form fields

### Phase 2: Backend + Approval (Week 3-4)
- Add Supabase database
- Implement auth (magic link)
- Build approval queue for Bryan
- Email notifications

### Phase 3: Dart Integration (Week 5-6)
- Connect Dart AI API
- Map users to Dart IDs
- Auto-create projects on approval
- Test with real memos

### Phase 4: Polish (Week 7-8)
- Slack notifications
- Mobile optimization
- Analytics dashboard
- Team training

---

## Open Questions

1. **Dart AI Permissions:** Does Bryan's API key have permission to create projects and assign tasks to other users?

2. **Historical Memos:** Should we backfill any existing memos/projects into the system?

3. **Memo Editing:** Can submitters edit after submission but before approval? Or only via revision cycle?

4. **Archive Policy:** How long do we keep rejected memos? Forever? 1 year?

5. **Offline Access:** Do we need PWA/offline support for mobile memo creation?

---

## Appendix

### A. Memo Type Decision Tree

```
Does this require budget >$500?
├─ YES → Does it need founder sign-off?
│        ├─ YES → INITIATIVE MEMO
│        └─ NO  → PROJECT MEMO
└─ NO  → How many team members?
         ├─ Just me → Can you complete in a day?
         │            ├─ YES → QUICK MEMO
         │            └─ NO  → PROJECT MEMO
         └─ Multiple → PROJECT MEMO
```

### B. RACI Definitions

| Role | Meaning | Count |
|------|---------|-------|
| **R**esponsible | Does the work | Multiple allowed |
| **A**ccountable | Owns the outcome | Exactly ONE |
| **C**onsulted | Input required before decisions | Multiple allowed |
| **I**nformed | Kept in the loop | Multiple allowed |

### C. Priority Definitions

| Level | Meaning | Response Time |
|-------|---------|---------------|
| CRITICAL | Drop everything, company-wide focus | Same day review |
| HIGH | This quarter's priority | 24-48 hour review |
| MEDIUM | Important but not urgent | Within 1 week |
| LOW | Nice to have | When bandwidth allows |

---

*Document Version: 1.0*
*Last Updated: January 31, 2026*
*Author: Bryan Ang / Claude*
