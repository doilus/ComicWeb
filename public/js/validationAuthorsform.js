function validateForm(){
	//podanie odpowiednich pól na zmienne
	const nameInput = document.getElementById('firstName');
	const surnameInput = document.getElementById('surname');
	const birthDateInput = document.getElementById('birthDate');
	const deathDateInput = document.getElementById('deathDate');
	const countryInput = document.getElementById('country');
	//const passwordInput = document.getElementById('password');

	//błędy
	const errorName = document.getElementById('errorName');
	const errorSurname = document.getElementById('errorSurname');
	const errorBirthDate = document.getElementById('errorBirthDate');
	const errorDeathDate = document.getElementById('errorDeathDate');
	const errorCountry = document.getElementById('errorCountry');
	//const errorPassword = document.getElementById('password');
	const errorsSummary = document.getElementById('errorsSummary');
	
	const reqMessage = document.getElementById('errorMessage-required').innerText;
	const signsMessage = document.getElementById('errorMessage-signs').innerText;
	const dateMessage = document.getElementById('errorMessage-date').innerText;
	const dateLowMessage = document.getElementById('errorMessage-dateLow').innerText;
	const summaryMessage = document.getElementById('errorMessage-summary').innerText;

	//wyzerowanie starych komunikatow
	resetErrors([nameInput,surnameInput,birthDateInput, deathDateInput, countryInput], [errorName, errorSurname, errorBirthDate, errorDeathDate, errorCountry], errorsSummary);

	//flaga poprawnosci formularza
	let valid = true;

	//reguły walidacji dla poszczególnych pól
	if(!checkRequired(nameInput.value)){
		valid = false;
		nameInput.classList.add("error-input");
		errorName.innerText = reqMessage;
	} else if (!checkTextLengthRange(nameInput.value,2,90)) {
		valid = false;
		nameInput.classList.add("error-input");
		errorName.innerText = signsMessage;
	}

	if(!checkRequired(surnameInput.value)){
		valid = false;
		surnameInput.classList.add("error-input");
		errorSurname.innerText = reqMessage ;
	} else if (!checkTextLengthRange(surnameInput.value,2,90)) {
		valid = false;
		surnameInput.classList.add("error-input");
		errorSurname.innerText = signsMessage;
	}

	//określenie daty bieżącej
	let nowDate = new Date(),
	day = '' + nowDate.getDate(),
    month = '' + (nowDate.getMonth() + 1),
    year = nowDate.getFullYear();

	//odpowiednia reprezentacja znakowa daty
	if (month.length < 2)
    month = '0' + month;
	if (day.length < 2)
    day = '0' + day;
	const nowString = [year, month, day].join('-');

	//data urodzenia
	if(!checkRequired(birthDateInput.value)){
		valid = false;
		birthDateInput.classList.add("error-input");
		errorBirthDate.innerText = reqMessage ;
	} else if(!checkDate(birthDateInput.value)){
		valid = false;
		birthDateInput.classList.add("error-input");
		errorBirthDate.innerText = "Pole powinno zawierać datę w formacie dd-mm-yyyy";
	} else if (checkDateIfAfter(birthDateInput.value, nowString)) {
		valid = false;
		birthDateInput.classList.add("error-input");
		errorBirthDate.innerText = dateMessage;
	}
	else if (checkRequired(birthDateInput.value) && checkDate(birthDateInput.value)
    && !checkDateIfAfter( deathDateInput.value, birthDateInput.value)) {
    //warunek ze data musi byc wieksza niz data smierci
    valid = false;
    birthDateInput.classList.add("error-input");
     errorBirthDate.innerText = dateLowMessage;
	}
	
	//data śmierci
	
	if(checkSelect(deathDateInput.value)){
	if(!checkDate(deathDateInput.value)){
		valid = false;
		deathDateInput.classList.add("error-input");
		errorDeathDate.innerText = "Pole powinno zawierać datę w formacie dd-mm-yyyy";
	}else if (checkDateIfAfter(deathDateInput.value, nowString)) {
		valid = false;
		deathDateInput.classList.add("error-input");
		errorDeathDate.innerText = dateMessage;
	}}

	//kraj
	if(!checkRequired(countryInput.value)){
		valid = false;
		countryInput.classList.add("error-input");
		errorCountry.innerText = reqMessage ;
	}else if(!checkTextLengthRange(countryInput.value,2,60)){
		valid = false;
		countryInput.classList.add("error-input");
		errorCountry.innerText = signsMessage;
	}

/*
	if(!checkRequired(passwordInput.value)){
		valid = false;
		passwordInput.classList.add("error-input");
		errorPassword.innerText = "Pole jest wymagane";
	}*/

	//wyświetlenie ogólnej informacji o błędach
	if(!valid) {
    errorsSummary.innerText = summaryMessage;
	}

	//zwrócenie flagi
	return valid;
}