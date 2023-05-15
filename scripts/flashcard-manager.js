(() => {

	function loadAndRenderCards(minLevel, onShowAnswer) {
		const questionElems = document.querySelectorAll('#question-list li');
		const questions = parseQuestions(minLevel, questionElems);
		return renderCards(questions, onShowAnswer);
	}

	function parseQuestions(minLevel, questionElems) {
		const questions = [];
		for (const elem of questionElems) {
			const { id, dataset, innerHTML } = elem;
			const elemLevel = Number(dataset.level) || 1;
			if (elemLevel > minLevel) continue;

			questions.push({
				id,
				question: innerHTML,
				hint: dataset.hint,
				level: elemLevel,
				lat: dataset.lat,
				lng: dataset.lng,
				zoom: dataset.zoom,
			});
		}
		return questions;
	}

	function renderCards(questions, onShowAnswer) {
		const cardElems = questions.map(createCardElem);
		const wrapperElem = document.createElement('div');
		wrapperElem.setAttribute('class', 'swiper-wrapper');
		wrapperElem.append(...cardElems);
		wrapperElem.addEventListener('click', (evt) => {
			if (evt.target.classList.contains('btn-card-answer')) {
				evt.preventDefault();
				onShowAnswer({...evt.target.dataset})
			}
		})
		return wrapperElem;
	}

	window.loadAndRenderCards = loadAndRenderCards;
})();