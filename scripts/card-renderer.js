(() => {
	function createCardElem(card) {
		const html = createCardHtml(card);
		const cardElem = document.createElement('div');
		cardElem.setAttribute('class', 'card swiper-slide');
		cardElem.innerHTML = html;
		return cardElem;
	}
	
	function createCardHtml(card) {
		return `
		<div class="card swiper-slide">
			<header class="card-header d-flex justify-content-between">
				<div>
					<!-- TODO: Link directly to this card -->
					<!-- <button type="button" class="btn-lg">Link</button> -->
				</div>
				<div>
					<button type="button" class="btn-close btn-lg" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
			</header>
			<main class="card-body">
				<p class="card-text">${card.question}</p>
				${!card.hint ? '' : `
					<button class="btn btn-primary" type="button"
						data-bs-toggle="collapse"
						data-bs-target="#${card.id}"
						aria-expanded="false"
					>
						Hint
					</button>
					<div style="min-height: 50px;">
						<div class="collapse" id="${card.id}">
							<div class="border p-2 mt-2">
							${card.hint}
							</div>
						</div>
					</div>
				`}
			</main>
			<footer class="card-footer d-flex justify-content-end">
				<a
					href="#"
					class="btn btn-primary btn-card-answer"
					data-zoom="${card.zoom}"
					data-lat="${card.lat}"
					data-lng="${card.lng}"
				>Answer on map</a>
			</footer>
		</div>`;
	}

	window.createCardElem = createCardElem;
})();