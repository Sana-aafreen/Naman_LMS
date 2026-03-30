# 🔑 Add Test Users to Google Sheets

## Your Google Sheets Setup

**Spreadsheet ID**: `1ObVuVLXelgrKjKTJC3AXpv1YPxbWXO03wt5lXY8I-Po`

Your spreadsheet should have multiple sheets (one per department/role). The Backend looks for sheets with these exact names:
- `Sales` (department)
- `Finance` (department)
- `HR` (department)
- `Operations` (department)
- `Marketing` (department)
- `Manager` (for manager logins)
- `Admin` (for admin logins)

---

## Step 1: Open Your Google Sheet

1. Go to: `https://docs.google.com/spreadsheets/d/1ObVuVLXelgrKjKTJC3AXpv1YPxbWXO03wt5lXY8I-Po/edit`
2. You should see all the sheet tabs at the bottom

---

## Step 2: Add Required Columns

Each sheet needs these exact column headers (case-sensitive):
- `User_id` - Unique identifier
- `User_name` - User's full name  
- `Password` - Password (plaintext - should be hashed in production!)
- `Role` - One of: `Employee`, `Manager`, `Admin`

Optional columns:
- `Email` - User email
- `Department` - Department name
- `Status` - Active/Inactive

---

## Step 3: Add Test Users

### For Sales Sheet
| User_id | User_name | Password | Role |
|---------|-----------|----------|------|
| EMP001 | Naman | naman123 | Admin |
| EMP002 | John | john123 | Employee |
| EMP003 | Sarah | sarah123 | Manager |

### For HR Sheet
| User_id | User_name | Password | Role |
|---------|-----------|----------|------|
| EMP006 | HR Manager | hr123 | Manager |
| EMP007 | HR Officer | officer123 | Employee |

### For Finance Sheet
| User_id | User_name | Password | Role |
|---------|-----------|----------|------|
| EMP008 | Finance Head | finance123 | Manager |
| EMP009 | Accountant | account123 | Employee |

### For Manager Sheet (for Manager role logins)
| User_id | User_name | Password | Role |
|---------|-----------|----------|------|
| EMP010 | Manager One | mgr123 | Manager |
| EMP011 | Manager Two | mgr456 | Manager |

### For Admin Sheet (for Admin role logins)
| User_id | User_name | Password | Role |
|---------|-----------|----------|------|
| EMP012 | Admin User | admin123 | Admin |

---

## Step 4: Test the Login

### Method 1: Using Frontend
1. **Start Frontend**:
   ```bash
   cd Frontend
   npm run dev
   ```

2. **Open Login Page**: `http://localhost:5173`

3. **Try Login with**:
   - **Role**: Employee
   - **User ID**: EMP001
   - **User Name**: Naman
   - **Password**: naman123
   - **Department**: Sales
   - **Click Login**

### Method 2: Using Command Line (curl)
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "EMP001",
    "userName": "Naman",
    "password": "naman123",
    "department": "Sales"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "user": {
    "userName": "Naman",
    "role": "Admin",
    "userId": "EMP001",
    "department": "Sales"
  }
}
```

---

## Step 5: Test All Scenarios

### Scenario 1: Employee Login
```
User ID: EMP002
User Name: John
Password: john123
Department: Sales
Role: Employee
```

### Scenario 2: Manager Login
```
User ID: EMP003
User Name: Sarah
Password: sarah123
Department: Sales
Role: Manager (select from role selector)
```

### Scenario 3: Admin Login
```
User ID: EMP012
User Name: Admin User
Password: admin123
Department: (doesn't matter)
Role: Admin
```

---

## ⚠️ Important Notes

### Password Handling
- **Current**: Passwords are stored in plaintext in Google Sheets (for testing)
- **Production**: You MUST hash passwords using bcrypt or similar
- **Do Not**: Use real passwords in Google Sheets

### Column Name Matching
The Backend looks for these EXACT column names:
- ❌ `user_id` (wrong - uses underscore)
- ✅ `User_id` (correct - capital U)
- ❌ `username` (wrong - lowercase)
- ✅ `User_name` (correct - capital U and N)
- ❌ `pass` (wrong - not complete)
- ✅ `Password` (correct - capital P)

### Troubleshooting

**Login fails with "Invalid credentials"**:
1. Check the column names match exactly
2. Verify no extra spaces in User ID, User_name
3. Check case sensitivity (Password is case-sensitive)
4. Make sure row format is correct

**Departments dropdown is empty**:
1. Verify Backend is running
2. Check all sheet names exist
3. Restart Backend with `npm start`

**Can't upload to Google Sheets**:
1. Make sure you have edit access
2. Check file isn't in read-only mode
3. Try refreshing the page

---

## 🚀 Quick Start Commands

```bash
# Terminal 1: Start Backend
cd Backend
npm start

# Terminal 2: Start Frontend
cd Frontend
npm run dev

# Terminal 3: Run Integration Tests
node test-integration.js
```

Then open `http://localhost:5173` and try logging in!

---

## 📝 Data Format in Google Sheets

| User_id | User_name | Password | Role | Email | Department |
|---------|-----------|----------|------|-------|------------|
| 1 | Naman Singh | naman123 | Admin | naman@naman.com | Sales |
| 2 | John Doe | john123 | Employee | john@naman.com | Sales |
| M1 | Manager One | mgr123 | Manager | mgr@naman.com | Sales |
| A1 | Admin User | admin123 | Admin | admin@naman.com | Admin |

---

## ✅ Verification Checklist

- [ ] Backend running (`npm start`)
- [ ] All sheet names exist in Google Sheets
- [ ] All sheets have required columns (User_id, User_name, Password, Role)
- [ ] At least one user added to Sales sheet
- [ ] At least one Manager user in Manager sheet
- [ ] At least one Admin user in Admin sheet
- [ ] Frontend running (`npm run dev`)
- [ ] Can load login page at `http://localhost:5173`
- [ ] Departments dropdown is populated
- [ ] Can successfully login with test user

---

**Status**: Backend ready ✅ | Integration tested ✅ | Waiting for user data ⏳

Last Updated: March 30, 2026
