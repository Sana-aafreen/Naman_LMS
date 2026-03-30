# Frontend Login Setup Guide

## 🔐 How the Login Flow Works

1. **Frontend** (`src/pages/Login.tsx`) → User enters: `User ID`, `User Name`, `Password`, `Department`
2. **AuthContext** (`src/contexts/AuthContext.tsx`) → Makes POST request to `http://localhost:5000/api/login`
3. **Backend** (`routes/sheets.js`) → Validates credentials against Google Sheets
4. **Response** → Backend returns `{ success: true, user: {...} }`
5. **Frontend** → Sets user state and redirects to Dashboard

---

## ✅ Prerequisites

### 1. Backend Must Be Running
```bash
cd Backend
npm start
# Expected: "Server listening on port 5000"
```

### 2. Google Sheets Must Have User Data
Your spreadsheet (`ID: 1ObVuVLXelgrKjKTJC3AXpv1YPxbWXO03wt5lXY8I-Po`) needs sheets with:
- **Sheet Name**: Department name (e.g., "Sales", "HR", "Finance")
- **Required Columns**:
  - `User_id` - Unique user identifier
  - `User_name` - User's full name
  - `Password` - Password (plaintext, should be hashed in production)
  - `Role` - User role ("Employee", "Manager", "Admin")

**Example Sheet Structure (Sales sheet)**:
```
User_id | User_name | Password    | Role     | Email
--------|-----------|-------------|----------|-------------------
1       | Naman     | naman123    | Admin    | naman@example.com
2       | John      | john123     | Employee | john@example.com
3       | Sarah     | sarah123    | Manager  | sarah@example.com
```

---

## 🧪 Test the Login Endpoint

### Step 1: Start Backend
```bash
cd Backend
npm start
```

### Step 2: Test Departments API
```bash
curl http://localhost:5000/api/departments
# Should return: ["Sales","Finance","HR",...]
```

### Step 3: Test Login with Sample Credentials
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "1",
    "userName": "Naman",
    "password": "naman123",
    "department": "Sales"
  }'
```

**Expected Success Response:**
```json
{
  "success": true,
  "user": {
    "userName": "Naman",
    "role": "Admin",
    "userId": "1",
    "department": "Sales"
  }
}
```

**Expected Error Response:**
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

---

## 🚀 Start Frontend

```bash
cd Frontend
npm run dev
# Expected: "VITE v... ready in ... ms"
# Open: http://localhost:5173
```

---

## 🧑‍💻 Login Steps in Frontend

1. **Open** `http://localhost:5173`
2. **Select Role**: Choose "Employee", "Manager", or "Admin"
3. **Fill Form**:
   - **User ID**: User's ID from Google Sheets
   - **User Name**: User's name from Google Sheets
   - **Password**: User's password from Google Sheets
   - **Department**: Select from dropdown (fetched from Backend)
4. **Click Login**
5. **Success**: Should see Dashboard with sidebar and user profile

---

## 🔍 Debugging Login Issues

### Issue: "Invalid credentials" error
**Possible Causes**:
1. **User doesn't exist in Google Sheets**
   - Add user to the correct department sheet in Google Sheets
   - Column names must be exactly: `User_id`, `User_name`, `Password`, `Role`

2. **Data mismatch** (spaces, case sensitivity)
   - Backend automatically trims whitespace
   - Passwords are case-sensitive
   - User IDs are compared as strings

3. **Wrong sheet selected**
   - For Employees: Department sheet (e.g., "Sales")
   - For Managers: "Manager" sheet
   - For Admins: "Admin" sheet

### Issue: Departments dropdown is empty
**Solution**: Backend `/api/departments` endpoint isn't responding
1. Check backend is running: `curl http://localhost:5000/api/departments`
2. Restart backend: `npm start` in Backend folder
3. Check browser console for network errors

### Issue: Frontend loads but login doesn't work
**Solution**: Check browser console (F12)
- Look for CORS errors (unlikely, CORS is enabled)
- Check Network tab for failed requests
- Verify Backend URL is `http://localhost:5000`

---

## 📝 Example Test Credentials

Add these users to your Google Sheets to test:

### Sales Sheet
```
User_id | User_name    | Password  | Role
--------|--------------|-----------|----------
1       | Naman Singh  | naman123  | Admin
2       | John Doe     | john123   | Employee
3       | Jane Smith   | jane123   | Manager
```

### HR Sheet
```
User_id | User_name    | Password  | Role
--------|--------------|-----------|----------
101     | HR Manager   | hr123     | Manager
102     | HR Officer   | officer123| Employee
```

### Manager Sheet (for Manager logins)
```
User_id | User_name    | Password  | Role
--------|--------------|-----------|----------
M1      | Manager One  | mgr123    | Manager
```

### Admin Sheet (for Admin logins)
```
User_id | User_name    | Password  | Role
--------|--------------|-----------|----------
A1      | Admin User   | admin123  | Admin
```

---

## 🔗 Connection Verification Checklist

- [ ] Backend server running on port 5000
- [ ] `GET http://localhost:5000/api/departments` returns department list
- [ ] `POST http://localhost:5000/api/login` accepts JSON and returns response
- [ ] Google Sheets has user test data with correct column names
- [ ] Frontend running on port 5173
- [ ] Frontend Login page loads and shows department dropdown
- [ ] Departments dropdown is populated from Backend

---

## 🐛 Enable Debug Logging

### Backend Debug
Edit `Backend/server.js` and add:
```javascript
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`, req.body);
  next();
});
```

### Frontend Debug
Add to `Frontend/src/contexts/AuthContext.tsx`:
```javascript
console.log("🔐 Attempting login...", { userId, userName, department });
console.log("✅ Login response:", data);
console.log("❌ Login failed:", error);
```

---

## 📚 File References

- **Frontend Login**: [src/pages/Login.tsx](../Frontend/src/pages/Login.tsx)
- **Auth Context**: [src/contexts/AuthContext.tsx](../Frontend/src/contexts/AuthContext.tsx)
- **Backend Routes**: [Backend/routes/sheets.js](../Backend/routes/sheets.js)
- **Backend Server**: [Backend/server.js](../Backend/server.js)

---

**Status**: ✅ Ready to test with your Google Sheets data

Last Updated: March 30, 2026
