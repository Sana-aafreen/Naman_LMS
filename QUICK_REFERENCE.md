# ⚡ Quick Reference - LMS System Guide

## 🗂️ System Architecture

```
Frontend (React + TypeScript)
├── /login route → Login.tsx
└── / route (protected) → Index.tsx → Sidebar navigation
    ├── Dashboard.tsx
    ├── Courses.tsx
    ├── LeaveManagement.tsx ← NEW: Full leave management
    ├── AIAssistant.tsx
    ├── TrainingMaterial.tsx
    └── ... other pages

Backend (Express.js)
├── GET  /api/departments
├── POST /api/login
├── GET  /api/courses
├── POST /api/leaves ← NEW
├── GET  /api/leaves ← NEW
└── PATCH /api/leaves/:id ← NEW

Database (Google Sheets)
├── Sales, Finance, HR, Operations, Marketing sheets (users)
├── Manager, Admin sheets (roles)
└── Leaves sheet ← AUTO-CREATED (leave requests)
```

---

## 👥 User Roles & Permissions

### Employee
| Action | Permission |
|--------|-----------|
| Login to system | ✅ Yes |
| View dashboard | ✅ Yes |
| Browse courses | ✅ Yes |
| Submit leave request | ✅ Yes |
| View own leaves | ✅ Yes |
| Approve other leaves | ❌ No |

### Manager  
| Action | Permission |
|--------|-----------|
| Login to system | ✅ Yes |
| View dashboard | ✅ Yes |
| Browse courses | ✅ Yes |
| Submit leave request | ✅ Yes |
| View own leaves | ✅ Yes |
| **Approve team leaves** | ✅ **Yes** |
| See team's pending requests | ✅ Yes |
| Reject with comments | ✅ Yes |

### Admin
| Action | Permission |
|--------|-----------|
| All Manager permissions | ✅ Yes |
| System administration | ✅ Yes (future) |

---

## 🔄 Leave Request Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                    EMPLOYEE                                  │
├─────────────────────────────────────────────────────────────┤
│  1. Open Leave Management                                    │
│  2. Fill form (dates, type, reason)                          │
│  3. Days auto-calculate                                      │
│  4. Click "Submit Leave Request"                             │
│  5. Leaves saved to Google Sheets as "Pending"               │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────────┐
│                   MANAGER                                    │
├─────────────────────────────────────────────────────────────┤
│  1. Open Leave Management                                    │
│  2. See "Pending Approval Requests" table                    │
│  3. View employee's leave details                            │
│  4. Click "Approve" or "Reject"                              │
│  5. Add comments (optional for approve, required for reject) │
│  6. Click confirm button                                     │
│  7. Status updated → Google Sheets updated                   │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────────┐
│                 GOOGLE SHEETS                                │
├─────────────────────────────────────────────────────────────┤
│  Leave_ID: 1-1711800000000                                   │
│  User_ID: 2                                                  │
│  User_Name: John Doe                                         │
│  Leave_Type: Casual                                          │
│  From_Date: 2025-04-15                                       │
│  Status: Approved ← UPDATED                                  │
│  Approved_By: Sarah Smith ← UPDATED                          │
│  Approval_Date: 2025-03-30 ← UPDATED                         │
│  Comments: "Approved - enjoy!" ← UPDATED                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Complete Test Checklist

### Part 1: Setup & Login
- [ ] Backend running (`npm start` in Backend/)
- [ ] Frontend running (`npm run dev` in Frontend/)
- [ ] Can access http://localhost:5173
- [ ] Login page appears with department dropdown
- [ ] Can login with test credentials (ID: 1, Name: Naman, Password: naman123)

### Part 2: Employee Leave Submission
- [ ] Logged in as Employee (John Doe, ID: 2)
- [ ] Sidebar shows "Leave Management" option
- [ ] Leave Management page has form
- [ ] Form has fields: Leave Type, From Date, To Date, No. of Days, Reason
- [ ] Days auto-calculate when dates are entered
- [ ] Can submit leave request
- [ ] Success toast appears
- [ ] Leave appears in "My Leave Requests" with "Pending" status
- [ ] Google Sheets Leaves sheet created with the request

### Part 3: Manager Approval
- [ ] Logout and login as Manager (Sarah Smith, ID: 3, Role: Manager)
- [ ] Leave Management page shows "Pending Approval Requests" table
- [ ] John's leave appears in table
- [ ] Click "Approve" button
- [ ] Dialog opens for approval
- [ ] Can add optional comments
- [ ] Click "Approve" in dialog
- [ ] Success toast appears
- [ ] Status changes to "Approved" in table
- [ ] Google Sheets updated with Approved_By and Approval_Date

### Part 4: Rejection Flow
- [ ] Submit another leave while logged in as Employee
- [ ] Login as Manager again
- [ ] Click "Reject" button for new leave
- [ ] Dialog opens with "Reason (required)" field
- [ ] Cannot submit without reason (button disabled)
- [ ] Add rejection reason
- [ ] Click "Reject"
- [ ] Status changes to "Rejected"
- [ ] Google Sheets updated accordingly

### Part 5: Employee View After Approval
- [ ] Logout and login as Employee again
- [ ] Go to Leave Management
- [ ] See approved leave with status "Approved" (green)
- [ ] Shows "Approved by: Sarah Smith"
- [ ] See rejected leave with status "Rejected" (red)

### Part 6: Routing & Navigation
- [ ] After logout, redirect to `/login` page
- [ ] If try to access `/` while logged out, redirect to `/login`
- [ ] Already authenticated users redirected from `/login` to `/`
- [ ] URL changes to `/login` and `/` correctly

---

## 🧑‍💼 Test Users (Pre-Added to Google Sheets)

### Employees
```
User_ID: 1 | Name: Naman     | Password: naman123 | Role: Admin
User_ID: 2 | Name: John Doe  | Password: john123  | Role: Employee
User_ID: 4 | Name: Priya Sharma | Password: priya123 | Role: Employee
User_ID: 5 | Name: Raj Kumar | Password: raj123   | Role: Employee
```

### Managers/Other Roles
```
User_ID: 3 | Name: Sarah Smith | Password: sarah123 | Role: Manager
```

---

## 🔍 Key Files to Review

### Backend Leave API Logic
- File: `Backend/routes/sheets.js`
- Functions:
  - `ensureLeavesSheet()` - Creates headers if sheet doesn't exist
  - `router.post('/leaves')` - Submit new leave request
  - `router.get('/leaves')` - Fetch leaves (filtered by role)
  - `router.patch('/leaves/:id')` - Approve/reject with manager name

### Frontend Leave UI
- File: `Frontend/src/pages/LeaveManagement.tsx`
- Features:
  - Form for employees to submit leaves
  - Auto-calculation of days
  - Manager approval panel with inline dialog
  - Status color coding (Green=Approved, Red=Rejected, Yellow=Pending)

### Routing
- File: `Frontend/src/App.tsx`
- Routes: `/login` (public), `/` (protected)
- Components: `LoginRoute`, `ProtectedRoute`

---

## 💾 Data Persistence Flow

```
Employee submits leave form
    ↓
POST /api/leaves
    ↓
Backend: ensureLeavesSheet() checks Leaves sheet exists
    ↓
Backend: Appends new row to Leaves sheet
    ↓
Google Sheets: Leaves sheet updated with:
├── Leave_ID (auto-generated)
├── User info (ID, Name, Department)
├── Leave details (Type, Dates, Days, Reason)
├── Status: "Pending"
├── Requested_Date
└── Empty Approved_By, Approval_Date, Comments (for later)

Manager approves leave
    ↓
PATCH /api/leaves/:id
    ↓
Backend: Finds row in Leaves sheet
    ↓
Backend: Updates columns:
├── Status → "Approved"
├── Approved_By → Manager Name
├── Approval_Date → Today
└── Comments → Manager's comments

Google Sheets: Row updated with approval details
```

---

## ⚙️ Configuration

### Backend (.env)
```
PORT=5000
GOOGLE_API_KEY=AIzaSyBYg...
GOOGLE_SERVICE_ACCOUNT_EMAIL=namanlms@...
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----...
```

### Frontend API Base URL
```
http://localhost:5000/api/
```

---

## 🆘 Common Issues & Solutions

### Issue: "Manager doesn't see pending leaves"
**Solution**: 
- Ensure logged in as Manager role
- Both employee and manager must be in SAME department
- Employee must have submitted leave in correct department sheet

### Issue: "Google Sheets not updating"
**Solution**:
- Verify Google credentials in Backend/.env
- Check Leaves sheet exists
- Ensure Backend successfully created sheet on first submission
- Check Backend console for error logs

### Issue: "Form not submitting / stuck on 'Submitting...'"
**Solution**:
- Check Backend is running and responding (test with curl)
- Open browser console (F12) → Network tab
- Look for failed API requests to /api/leaves
- Verify all form fields are filled correctly

### Issue: "Logout not working / stays on dashboard"
**Solution**:
- Hard refresh browser (Ctrl+F5 on Windows)
- Check browser console for JavaScript errors
- Verify logout navigate to `/login` in Topbar.tsx
- Ensure useNavigate from react-router-dom is imported

---

## 📞 Testing Support Commands

### Test Leave Creation (curl)
```bash
curl -X POST http://localhost:5000/api/leaves \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "2",
    "userName": "John Doe",
    "department": "Sales",
    "leaveType": "Casual",
    "fromDate": "2025-04-15",
    "toDate": "2025-04-17",
    "days": 3,
    "reason": "Family visit"
  }'
```

### Test Leave Fetching (curl)
```bash
# Employee view
curl "http://localhost:5000/api/leaves?userId=2&department=Sales&role=Employee"

# Manager view
curl "http://localhost:5000/api/leaves?userId=3&department=Sales&role=Manager"
```

### Test Approval (curl)
```bash
curl -X PATCH http://localhost:5000/api/leaves/ID_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "action": "approve",
    "approvedBy": "Sarah Smith",
    "comments": "Approved!"
  }'
```

---

**Status**: ✅ All features implemented and ready for testing!

Last Updated: March 30, 2026
