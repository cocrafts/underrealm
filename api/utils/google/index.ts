import type { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';
import { logger } from 'utils/logger';

import GoogleServiceAccount from '../../google-service.json';

let auth: GoogleAuth;
// Load Google Sheets credentials
const getGoogleSheetsAuth = async () => {
	if (auth) {
		return auth;
	}

	auth = new google.auth.GoogleAuth({
		credentials: GoogleServiceAccount,
		scopes: ['https://www.googleapis.com/auth/spreadsheets'], // Scope to access Google Sheets
	});

	return auth;
};

export const writeToGoogleSheet = async (
	spreadsheetId: string,
	sheetName: string,
	startCell: string = 'A1',
	data: unknown,
) => {
	const auth = await getGoogleSheetsAuth();
	const sheets = google.sheets({ version: 'v4' });
	const doc = await sheets.spreadsheets.get({
		spreadsheetId: spreadsheetId,
		auth: auth,
	});

	if (!doc) {
		console.error('failed to write to google sheet, sheet id is invalid.');
		return;
	}
	const request = {
		spreadsheetId,
		auth: auth,
		range: `${sheetName}!${startCell}`, // Write to the top of the sheet
		valueInputOption: 'RAW',
		resource: {
			values: data,
		},
	};

	await sheets.spreadsheets.values.update(request);
};

export const createGoogleSheetTab = async (
	spreadsheetId: string,
	sheetName: string,
) => {
	const auth = await getGoogleSheetsAuth();
	const sheets = google.sheets({ version: 'v4' });
	const spreadsheet = await sheets.spreadsheets.get({
		spreadsheetId,
		auth,
	});

	const existingSheets = spreadsheet.data.sheets || [];

	// Step 2: Check if the sheet with the desired title already exists
	const sheetExists = existingSheets.some(
		(sheet) => sheet.properties?.title === sheetName,
	);

	if (sheetExists) {
		logger.info(
			`Sheet "${sheetName}" existed. No need to create the new one...`,
		);
		return;
	}

	const createSheetRequest = {
		spreadsheetId,
		resource: {
			requests: [
				{
					addSheet: {
						properties: {
							title: sheetName, // The title of the new tab (sheet)
						},
					},
				},
			],
		},
		auth,
	};

	try {
		const response = await sheets.spreadsheets.batchUpdate(createSheetRequest);
		logger.info('created new Sheet, receive', response.status);
	} catch (error) {
		logger.error('error adding new sheet or writing data:', error);
		throw error;
	}
};
