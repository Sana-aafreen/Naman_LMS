# 🚀 QUICK START - Login Frontend Setup

## What's Ready ✅
- Backend API endpoints: `/api/departments`, `/api/login`, `/api/courses`
- CORS enabled
- Frontend configured to call Backend
- All integration tests passing

## What You Need to Do 📝

### Step 1: Add Test Users to Google Sheets (5 minutes)
1. Open: https://docs.google.com/spreadsheets/d/1ObVuVLXelgrKjKTJC3AXpv1YPxbWXO03wt5lXY8I-Po/edit
2. Pick the `Sales` sheet tab
3. Add these columns (if not present): `User_id`, `User_name`, `Password`, `Role`
4. Add one row of test data:
   ```
   EMP001 | Naman | naman123 | Admin
   ```

That's it! The rest is done.

### Step 2: Run Backend (if not running)
```bash
cd Backend
npm start
```
✅ Should say: "Server listening on port 5000"

### Step 3: Run Frontend
```bash
cd Frontend
npm run dev
```
✅ Should open at http://localhost:5173

### Step 4: Test Login
1. Open http://localhost:5173
2. Fill in:
   - **Role**: Employee
   - **User ID**: EMP001
   - **User Name**: Naman
   - **Password**: naman123
   - **Department**: Sales
3. Click Login
4. You should see Dashboard 🎉

---

## 🎯 Login Flow (What Happens Behind the Scenes)

```
Frontend Login Form
        ↓
    User enters credentials
        ↓
AuthContext sends POST to Backend
        ↓
Backend /api/login queries Google Sheets
        ↓
Google Sheets returns user data
        ↓
Backend returns { success: true, user: {...} }
        ↓
Frontend stores user in state
        ↓
Frontend redirects to Dashboard
```

---

## 📋 Files That Make This Work

1. **Backend/routes/sheets.js** ← API endpoints
   - GET /api/departments
   - POST /api/login
   - GET /api/courses

2. **Frontend/src/contexts/AuthContext.tsx** ← Login logic
   - Makes fetch request to `/api/login`
   - Stores user state
   - Has logout function

3. **Frontend/src/pages/Login.tsx** ← Login UI
   - Form for credentials
   - Calls AuthContext.login()
   - Shows error messages

4. **Google Sheets** ← User data
   - Must have User_id, User_name, Password, Role columns
   - One row per user

---

## 🐛 Quick Debugging

| Problem | Solution |
|---------|----------|
| "Invalid credentials" | Add user to Google Sheets in Sales sheet |
| Departments empty | Restart Backend (npm start) |
| Can't load login page | Check Frontend is running (npm run dev) |
| Login button does nothing | Check browser console (F12) for errors |
| Backend not responding | Start Backend first (npm start) |

---

## 📊 Test Different Roles

### Employee Login
```
User ID: 2
Name: John
Password: john123
Department: Sales
→ Adds to Sales sheet, Role=Employee
```

### Manager Login
```
User ID: M1
Name: Manager One
Password: mgr123
Department: (any)
Role: Manager (select from dropdown)
→ Adds to Manager sheet, Role=Manager
```

### Admin Login
```
User ID: A1
Name: Admin User
Password: admin123
Department: (any)
Role: Admin (select from dropdown)
→ Adds to Admin sheet, Role=Admin
```

---

## ✨ After Successful Login

You should see:
- User profile in top-right corner
- Sidebar with navigation
- Dashboard with courses
- All pages accessible

---

## 🔄 Next Steps (After Login Works)

1. Add real user data to Google Sheets
2. Create course data in department sheets
3. Implement password hashing (for production)
4. Add more features like course enrollment, progress tracking
5. Add leave management, projects, holidays, etc.

---

## 📞 Support

Files with complete documentation:
- `LOGIN_SETUP.md` - Detailed login guide
- `ADD_TEST_USERS.md` - How to add users to Google Sheets
- `INTEGRATION_GUIDE.md` - Architecture and troubleshooting
- `test-integration.js` - Integration test script

---

**Ready?** Follow "What You Need to Do" above and you're golden! ✨

Last Updated: March 30, 2026
