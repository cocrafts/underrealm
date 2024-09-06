export interface WarningResult {
	hasError: boolean;
	errorMess: string;
}

export const validateEmail = (value: string): WarningResult => {
	if (!value) {
		return {
			hasError: true,
			errorMess: 'Invalid Email Address',
		};
	} else {
		const emailCheck = !!String(value)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			);

		if (!emailCheck) {
			return {
				hasError: !emailCheck,
				errorMess: 'Invalid Email Address',
			};
		}
		return {
			hasError: !emailCheck,
			errorMess: '',
		};
	}
};
