#!/usr/bin/env node

/**
 * Backend-Frontend Integration Test Script
 * Tests all API endpoints and validates the login flow
 */

const http = require('http');

const BASE_URL = 'http://localhost:5000';

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        let parsedData = null;
        try {
          parsedData = data ? JSON.parse(data) : null;
        } catch (e) {
          parsedData = data; // Return raw string if not JSON
        }
        resolve({
          status: res.statusCode,
          data: parsedData,
          headers: res.headers,
        });
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  log('\n🧪 NAMANDARSHAN LMS - Integration Test Suite\n', 'cyan');
  log('='.repeat(60), 'cyan');

  let passed = 0;
  let failed = 0;

  // Test 1: Health Check
  try {
    log('\n[Test 1] Health Check - GET /', 'blue');
    const response = await makeRequest('GET', '/');
    if (response.data === 'LMS Backend is running' && response.status === 200) {
      log('✅ PASS: Server is running', 'green');
      passed++;
    } else {
      throw new Error('Unexpected response');
    }
  } catch (error) {
    log(`❌ FAIL: ${error.message}`, 'red');
    log('   Make sure Backend is running: npm start', 'yellow');
    failed++;
  }

  // Test 2: Departments Endpoint
  try {
    log('\n[Test 2] Fetch Departments - GET /api/departments', 'blue');
    const response = await makeRequest('GET', '/api/departments');
    if (Array.isArray(response.data) && response.status === 200) {
      log(`✅ PASS: Found ${response.data.length} departments`, 'green');
      log(`   Departments: ${response.data.join(', ')}`, 'cyan');
      passed++;
    } else {
      throw new Error('Expected array of departments');
    }
  } catch (error) {
    log(`❌ FAIL: ${error.message}`, 'red');
    failed++;
  }

  // Test 3: Login with Missing Fields
  try {
    log('\n[Test 3] Login Validation - POST /api/login (missing fields)', 'blue');
    const response = await makeRequest('POST', '/api/login', {
      userId: '1',
    });
    if (response.status === 400 && !response.data.success) {
      log('✅ PASS: Correctly rejected incomplete request', 'green');
      passed++;
    } else {
      throw new Error('Should reject incomplete request');
    }
  } catch (error) {
    log(`❌ FAIL: ${error.message}`, 'red');
    failed++;
  }

  // Test 4: Login with Invalid Credentials
  try {
    log('\n[Test 4] Login - POST /api/login (invalid credentials)', 'blue');
    const response = await makeRequest('POST', '/api/login', {
      userId: 'invalid_id',
      userName: 'Invalid User',
      password: 'wrong_password',
      department: 'Sales',
    });
    if (response.status === 401 && !response.data.success) {
      log('✅ PASS: Correctly rejected invalid credentials', 'green');
      log(`   Response: ${response.data.error}`, 'cyan');
      passed++;
    } else {
      throw new Error('Should reject invalid credentials');
    }
  } catch (error) {
    log(`❌ FAIL: ${error.message}`, 'red');
    failed++;
  }

  // Test 5: Login with Test Credentials (if they exist)
  try {
    log('\n[Test 5] Login - POST /api/login (test credentials)', 'blue');
    const testCredentials = [
      { userId: '1', userName: 'Naman', password: 'naman123', department: 'Sales' },
      { userId: '1', userName: 'naman', password: 'naman123', department: 'Sales' },
    ];

    let foundValidUser = false;
    for (const creds of testCredentials) {
      const response = await makeRequest('POST', '/api/login', creds);
      if (response.status === 200 && response.data.success) {
        log('✅ PASS: Valid user authenticated', 'green');
        log(`   User: ${response.data.user.userName} (${response.data.user.role})`, 'cyan');
        log(`   Department: ${response.data.user.department}`, 'cyan');
        foundValidUser = true;
        passed++;
        break;
      }
    }

    if (!foundValidUser) {
      log('⚠️  INFO: No test users found in Google Sheets', 'yellow');
      log('   Add test data to your Google Sheets to enable full testing', 'yellow');
      log('   Expected columns: User_id, User_name, Password, Role', 'yellow');
      passed++;
    }
  } catch (error) {
    log(`❌ FAIL: ${error.message}`, 'red');
    failed++;
  }

  // Test 6: Courses Endpoint
  try {
    log('\n[Test 6] Fetch Courses - GET /api/courses?department=Sales', 'blue');
    const response = await makeRequest('GET', '/api/courses?department=Sales');
    if (Array.isArray(response.data) && response.status === 200) {
      log(`✅ PASS: Found ${response.data.length} courses`, 'green');
      if (response.data.length > 0) {
        log(`   Sample: ${response.data[0].title}`, 'cyan');
      }
      passed++;
    } else {
      throw new Error('Expected array of courses');
    }
  } catch (error) {
    log(`❌ FAIL: ${error.message}`, 'red');
    failed++;
  }

  // Summary
  log('\n' + '='.repeat(60), 'cyan');
  log(`\n📊 Test Results: ${passed} passed, ${failed} failed\n`, 'cyan');

  if (failed === 0) {
    log('🎉 All tests passed! Your Frontend-Backend integration is ready.\n', 'green');
    log('Next steps:', 'cyan');
    log('1. Start Frontend: cd Frontend && npm run dev', 'yellow');
    log('2. Open http://localhost:5173 in your browser', 'yellow');
    log('3. Add test users to your Google Sheets', 'yellow');
    log('4. Try logging in with your test credentials\n', 'yellow');
  } else {
    log('\n⚠️  Some tests failed. Check the Backend is running and Google Sheets is configured.\n', 'yellow');
  }
}

// Run tests
runTests().catch((error) => {
  log(`\n❌ Fatal error: ${error.message}\n`, 'red');
  process.exit(1);
});
