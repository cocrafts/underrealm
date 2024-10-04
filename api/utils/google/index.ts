import { promises as fs } from 'fs';

import { google } from 'googleapis';

// Load Google Sheets credentials
async function getGoogleSheetsAuth() {
	const credentialsPath = './credentials.json';
	const credentials = JSON.parse(await fs.readFile(credentialsPath, 'utf-8'));

	const auth = new google.auth.GoogleAuth({
		credentials,
		scopes: ['https://www.googleapis.com/auth/spreadsheets'], // Scope to access Google Sheets
	});

	return auth;
}

export async function writeToGoogleSheet(
	spreadsheetId: string,
	sheetName: string,
	data,
) {
	const auth = await getGoogleSheetsAuth();
	const sheets = google.sheets({ version: 'v4' });
	const doc = await sheets.spreadsheets.get({
		spreadsheetId: spreadsheetId,
		auth: auth,
	});

	if (!doc) {
		spreadsheetId = (await sheets.spreadsheets.create({ auth: auth })).data
			.spreadsheetId;
	}
	const request = {
		spreadsheetId,
		auth: auth,
		range: `${sheetName}!A1`, // Write to the top of the sheet
		valueInputOption: 'RAW',
		resource: {
			values: data,
		},
	};

	await sheets.spreadsheets.values.update(request);
}
