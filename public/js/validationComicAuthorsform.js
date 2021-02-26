function validateForm(){
	const roleInput = document.getElementById('role');
	const countryInput = document.getElementById('country');
	const percentInput = document.getElementById('percent');

	const comics = document.getElementById('comics_id');
	const author = document.getElementById('author_id');

	const errorComics = document.getElementById('errorComics');
	const errorAuthor = document.getElementById('errorAuthor');

	const errorRole = document.getElementById('errorRole');
	const errorCountry = document.getElementById('errorCountry');
	const errorPercent = document.getElementById('errorPercent');
	const errorsSummary = document.getElementById('errorsSummary');


	const reqMessage = document.getElementById('errorMessage-required').innerText;
	const signsMessage = document.getElementById('errorMessage-signs').innerText;
	const signs6Message = document.getElementById('errorMessage-signs6').innerText;
	const intcheckMessage = document.getElementById('errorMessage-intcheck').innerText;
	const intcheckBigLowMessage = document.getElementById('errorMessage-intcheckBig').innerText;
	const summaryMessage = document.getElementById('errorMessage-summary').innerText;
	const comicMessage = document.getElementById('errorMessage-comic').innerText;
	const authorMessage = document.getElementById('errorMessage-author').innerText;

	resetErrors([roleInput, countryInput, percentInput, comics, author],[errorRole, errorCountry, errorPercent,errorComics,errorAuthor], errorsSummary);

	let valid = true;

	//spr czy zostalo cos wybrane

	//reszta rola/kraj/procent

	//rola
	if(!checkTextLengthRange(roleInput.value,2,60)){
		valid = false;
		roleInput.classList.add("error-input");
		errorRole.innerText = signs6Message;
	}
	//kraj

	if(checkSelect(countryInput.value)){
		if(!checkTextLengthRange(countryInput.value,2,90)){
		valid = false;
		countryInput.classList.add("error-input");
		errorCountry.innerText = signsMessage;
	}
	}
	if(!checkSelect(percentInput.value)){
		valid = false;
		percentInput.classList.add("error-input");
		errorPercent.innerText = reqMessage ;
	}

	if(!checkSelect(percentInput.value)){
		valid = false;
		percentInput.classList.add("error-input");
		errorPercent.innerText = reqMessage;
	}
	else if(!checkNumber(percentInput.value)){
		valid = false;
		percentInput.classList.add("error-input");
		errorPercent.innerText = intcheckMessage;
	}else if(!checkNumberRange(percentInput.value,0,100)){
		valid = false;
		percentInput.classList.add("error-input");
		errorPercent.innerText = intcheckBigLowMessage;
	}


	

	//komiksy

	if(!checkSelect(comics.value)){
		valid = false;
		comics.classList.add("error-input");
		errorComics.innerText = comicMessage ;
	}

	if(!checkSelect(author.value)){
		valid = false;
		author.classList.add("error-input");
		errorAuthor.innerText = authorMessage;
	}

	if(!valid) {
    errorsSummary.innerText = summaryMessage;
	}
	return valid;
}
