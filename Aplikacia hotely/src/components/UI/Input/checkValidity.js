export const checkValidity = (value, rules) => {

	let isValid = true;

	if (rules.isEmail) {
		isValid = value.match(/^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i) && isValid;
	}

	if (rules.isNumber) {
		isValid = isNaN(Number(value)) !== true && isValid;
	}

	if (rules.required) {
		isValid = value.replace(' ', '') !== '' && isValid;
	}

	if (rules.minLength) {
		isValid = value.length >= rules.minLength && isValid;
	}
	if (rules.maxLength) {
		isValid = value.length <= rules.maxLength && isValid;
	}


	return isValid;

}