import { mongo } from 'models';
import { GameDuel } from 'models/game';
import type { IUser } from 'models/user';
import { User } from 'models/user';
import { writeToGoogleSheet } from 'utils/google';

const getNewRegisterUser = async (startDate: Date): Promise<IUser[]> => {
	return await User.find({ createdAt: { $gte: startDate } });
};

/*
For each user, during time period, in all matches played:

- **Games Played**: Total number of games during the period.
- **Wins**: Total number of wins.
- **Losses**: Total number of losses.
- The timestamp of each match
*/

const getUserGameStats = async (user: IUser, startDate: Date) => {
	const duels = await GameDuel.find({
		$or: [
			{ 'config.firstPlayer.id': user.id },
			{ 'config.secondPlayer.id': user.id },
		],
		createdAt: { $gte: startDate },
	});
	const total = duels.length;
	const wins = duels.reduce((prev, curr) => {
		if (curr.winner && curr.winner == user.id) {
			return prev + 1;
		}
		return prev;
	}, 0);
	const loses = total - wins;
	const timestamps = duels.map((curr) => curr.createdAt);
	return [user.id, total, wins, loses, timestamps.join('\n')];
};

export const handler = async () => {
	const beginDate = new Date(2024, 9, 1);
	const spreadsheetId = '132w-SGJfo24O0ftvNVDU9Mrs1np6T8LKWfFEq3MXR1U'; // Add your spreadsheet ID here
	const users = await getNewRegisterUser(beginDate);
	const newUsersInfo = users.map((val) => [
		val.email != undefined ? val.email : val.address,
		val.createdAt,
	]);
	console.log('newUsersInfo', newUsersInfo);
	await writeToGoogleSheet(spreadsheetId, 'NewUsers', [
		['email/address', 'created At'],
		...newUsersInfo,
	]);

	const usersStat = await Promise.all(
		users.map(async (user) => {
			return await getUserGameStats(user, beginDate);
		}),
	);
	console.log('usersStat', usersStat);

	// Step 4: Write data to Google Sheets in the "Users" tab
	await writeToGoogleSheet(spreadsheetId, 'UserDuelStats', [
		['userId', 'total', 'wins', 'loss', 'timestamps'],
		...usersStat,
	]);

	console.log('Data successfully written to Google Sheets!');
};

const main = async () => {
	await mongo.connect();
	handler();
};

main().finally(() => {
	console.log('done');
});
