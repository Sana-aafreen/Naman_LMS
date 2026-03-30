#!/usr/bin/env node

/**
 * Add Test Users to Google Sheets (Sales Sheet)
 * This script adds sample user data to your Google Sheets
 */

const { google } = require('googleapis');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'Backend', '.env') });

const SPREADSHEET_ID = '1ObVuVLXelgrKjKTJC3AXpv1YPxbWXO03wt5lXY8I-Po';
const SHEET_NAME = 'Sales';

const testUsers = [
  ['EMP001', 'Naman', 'naman123', 'Admin', 'naman@namandarshan.com'],
  ['EMP002', 'John Doe', 'john123', 'Employee', 'john@namandarshan.com'],
  ['EMP003', 'Sarah Smith', 'sarah123', 'Manager', 'sarah@namandarshan.com'],
  ['EMP004', 'Priya Sharma', 'priya123', 'Employee', 'priya@namandarshan.com'],
  ['EMP005', 'Raj Kumar', 'raj123', 'Employee', 'raj@namandarshan.com'],
];

async function addTestUsers() {
  console.log('\n🧪 Adding Test Users to Google Sheets...\n');

  try {
    // Authenticate with Google
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim(),
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // First, get the sheet to see if header row exists
    console.log('📋 Checking sheet structure...');
    const getResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${SHEET_NAME}'!A1`,
    });

    let headerExists = getResponse.data.values && getResponse.data.values[0];
    
    if (!headerExists) {
      console.log('❌ ERROR: Sheet is empty or missing header row');
      console.log('❌ Expected first row to contain: User_id User_name Password Role Email');
      process.exit(1);
    }

    // Clear existing data (keep header)
    console.log('🧹 Clearing old test data from Sales sheet...');
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${SHEET_NAME}'!A2:Z1000`,
    });

    // Add the test users
    console.log('➕ Adding test users...');
    const appendResponse = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${SHEET_NAME}'!A2`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: testUsers,
      },
    });

    console.log('\n✅ Successfully added test users!\n');
    console.log('📊 Sample Login Credentials:');
    console.log('─'.repeat(60));
    testUsers.forEach((user, index) => {
      console.log(`${index + 1}. ID: ${user[0]}, Name: ${user[1]}, Password: ${user[2]}, Role: ${user[3]}`);
    });
    console.log('─'.repeat(60));
    console.log('\n🎯 Try logging in with:');
    console.log('   User ID: EMP001');
    console.log('   User Name: Naman');
    console.log('   Password: naman123');
    console.log('   Department: Sales');
    console.log('   Role: Employee\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Check Backend/.env file exists and has GOOGLE credentials');
    console.error('2. Check Google Service Account has edit access to the sheet');
    console.error('3. Make sure the Sales sheet exists in your Google Sheet');
    console.error('4. Run from project root: node add-test-users.js\n');
    process.exit(1);
  }
}

addTestUsers();
