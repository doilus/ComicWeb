function validateForm(){
	//deklaracja wywyołania funkcji przy wysyłaniu formularza (atrybut onsubmit)
	const titleInput = document.getElementById('title');
	const yearPublishInput = document.getElementById('releaseDate');
	const pageNumberInput = document.getElementById('pages');
	const publishingHouseInput = document.getElementById('publishingHouse');

	const errorTitle = document.getElementById('errorTitle');
	const errorYearPublish = document.getElementById('errorYearPublish');
	const errorPageNumber = document.getElementById('errorPageNumber');
	const errorPublishingHouse = document.getElementById('errorPublishingHouse');
	const errorsSummary = document.getElementById('errorsSummary');

	const reqMessage = document.getElementById('errorMessage-required').innerText;
	const signsMessage = document.getElementById('errorMessage-signs').innerText;
	const summaryMessage = document.getElementById('errorMessage-summary').innerText;
	const intcheckMessage = document.getElementById('errorMessage-intcheck').innerText;
	const pagesMessage = document.getElementById('errorMessage-pages').innerText;
	const intBigMessage = document.getElementById('errorMessage-intBig').innerText;


	resetErrors([titleInput, yearPublishInput, pageNumberInput, publishingHouseInput], [errorTitle, errorYearPublish, errorPageNumber, errorPublishingHouse], errorsSummary);
	
	
	let valid = true;
	
	if(!checkRequired(titleInput.value)){
		valid = false;
		titleInput.classList.add("error-input");
		errorTitle.innerText = reqMessage;
	} else if (!checkTextLengthRange(titleInput.value,2,90)) {
		valid = false;
		titleInput.classList.add("error-input");
		errorTitle.innerText = signsMessage;
	}

	if(!checkRequired(yearPublishInput.value)) {
		valid = false;
		yearPublishInput.classList.add("error-input");
		errorYearPublish.innerText = reqMessage;
	}else if(!checkNumberRange(yearPublishInput.value,0,2020)) {
		valid = false;
		yearPublishInput.classList.add("error-input");
		errorYearPublish.innerText = intBigMessage;
	}else if(!checkNumber(yearPublishInput.value)){
		valid = false;
		yearPublishInput.classList.add("error-input");
		errorYearPublish.innerText = intcheckMessage ;
	}
	if(!checkRequired(pageNumberInput.value)){
		valid = false;
		pageNumberInput.classList.add("error-input");
		errorPageNumber.innerText = reqMessage;
	}
	else if(!checkNumberLength(pageNumberInput.value,0)) {
		valid = false;
		pageNumberInput.classList.add("error-input");
		errorPageNumber.innerText = pagesMessage;
	}else if(!checkNumber(pageNumberInput.value)){
		valid = false;
		pageNumberInput.classList.add("error-input");
		errorPageNumber.innerText = intcheckMessage ;
	}
	if(!checkRequired(pageNumberInput.value)){
		valid = false;
		publishingHouseInput.classList.add("error-input");
		errorPublishingHouse.innerText=reqMessage;
	}
	else if(!checkTextLengthRange(publishingHouseInput.value,2,60)) {
		valid = false;
		publishingHouseInput.classList.add("error-input");
		errorPublishingHouse.innerText=signsMessage;
	} 
	if(!valid) {
    errorsSummary.innerText = summaryMessage;
	}
	return valid;
}
