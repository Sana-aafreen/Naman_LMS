# Backend-Frontend Integration Guide

## ✅ What Was Fixed

### Backend Routes (`Backend/routes/sheets.js`)
The routes file has been updated to properly export an Express router with the following API endpoints:

#### 1. **GET /api/departments**
- **Purpose**: Fetch list of all departments/sheets from the Google Sheets
- **Returns**: Array of department names
- **Example Response**:
```json
["Sales", "Finance", "HR", "Operations", "Marketing", "Admin", "Manager"]
```

#### 2. **POST /api/login**
- **Purpose**: Authenticate user credentials
- **Request Body**:
```json
{
  "userId": "user123",
  "userName": "John Doe",
  "password": "password123",
  "department": "Sales"
}
```
- **Success Response** (200):
```json
{
  "success": true,
  "user": {
    "userName": "John Doe",
    "role": "Employee",
    "userId": "user123",
    "department": "Sales"
  }
}
```
- **Error Response** (401):
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

#### 3. **GET /api/courses** (Bonus)
- **Purpose**: Fetch courses for a specific department
- **Query Parameter**: `department` (required)
- **Example URL**: `http://localhost:5000/api/courses?department=Sales`
- **Returns**: Array of course objects

---

## 🚀 How to Run

### Backend
```bash
cd Backend
npm install  # Only needed if you haven't installed dependencies
npm start    # Starts server on http://localhost:5000
```

### Frontend
```bash
cd Frontend
npm install  # Or use bun install if you prefer
npm run dev  # Starts dev server (typically on http://localhost:5173)
```

---

## 🔗 Connection Status

| Component | Status | Details |
|-----------|--------|---------|
| **Backend Server** | ✅ Ready | Express server on port 5000 |
| **CORS Enabled** | ✅ Ready | Can accept requests from Frontend |
| **API Routes** | ✅ Ready | `/api/departments`, `/api/login`, `/api/courses` |
| **Google Sheets Integration** | ✅ Ready | Credentials configured in `.env` |
| **Frontend API Calls** | ✅ Ready | Configured to call `http://localhost:5000/api/*` |

---

## 🔍 Testing the Connection

### Test 1: Health Check
```bash
curl http://localhost:5000/
# Expected: "LMS Backend is running"
```

### Test 2: Departments endpoint
```bash
curl http://localhost:5000/api/departments
# Expected: Array of department names
```

### Test 3: Login endpoint
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test123",
    "userName": "Test User",
    "password": "pass123",
    "department": "Sales"
  }'
# Expected: Success or Invalid credentials response
```

---

## 📋 Frontend Configuration

The Frontend is already configured to:
- Make requests to `http://localhost:5000/api/*`
- Handle login responses correctly
- Store user authentication state in AuthContext
- Pass authentication state throughout the app

No changes needed to the Frontend for basic connectivity!

---

## 🐛 Troubleshooting

### Issue: "Cannot GET /api/departments"
**Solution**: Make sure the Backend server is running (`npm start` in Backend folder)

### Issue: CORS errors in Frontend
**Solution**: CORS is already enabled in `Backend/server.js`. Restart the Backend server if you still see this after updating code.

### Issue: "Invalid credentials" even with correct data
**Possible Causes**:
1. User doesn't exist in the Google Sheets
2. Column names in Google Sheets don't match expected names (`User_id`, `User_name`, `Password`, `Role`)
3. Data has extra spaces (sheets.js trims this automatically)

---

## 📝 Next Steps

1. **Populate Google Sheets**: Add user test data to your Google Sheets with columns:
   - `User_id`
   - `User_name`
   - `Password`
   - `Role`
   - Other fields like `Course Name`, `Duration`, `Status`, etc.

2. **Test Login**: Use Login page in Frontend to test authentication

3. **Add More Endpoints**: As needed, continue adding routes in `Backend/routes/sheets.js`

---

## 📚 Files Modified

- ✅ `Backend/routes/sheets.js` - Completely refactored to use Express router pattern
- ⚠️ `Backend/server.js` - Already correctly configured (no changes needed)
- ⚠️ `Frontend/** - No changes needed

---

**Last Updated**: March 30, 2026
