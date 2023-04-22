(() => {

	async function loadAndRenderCards(dataUri, onShowAnswer) {
		console.log('Loading questions from', dataUri);
		const { default: questions} = await import(dataUri);
		console.log({ questions });
		return renderCards(questions, onShowAnswer);
	}

	function renderCards(questions, onShowAnswer) {
		const cardElems = questions.map(createCardElem);
		const wrapperElem = document.createElement('div');
		wrapperElem.setAttribute('class', 'swiper-wrapper');
		wrapperElem.append(...cardElems);
		wrapperElem.addEventListener('click', (evt) => {
			evt.preventDefault();
			if (evt.target.classList.contains('btn-card-answer')) {
				onShowAnswer({...evt.target.dataset})
			}
		})
		return wrapperElem;
	}

	window.loadAndRenderCards = loadAndRenderCards;
})();