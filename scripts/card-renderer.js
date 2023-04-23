(() => {
	function createCardElem(card) {
		const html = createCardHtml(card);
		const cardElem = document.createElement('article');
		cardElem.setAttribute('class', 'magic-card magic-card-green swiper-slide');
		cardElem.innerHTML = html;
		return cardElem;
	}
	
	function createCardHtml(card) {
		return `
		<div class="magic-card-inner">
			<a class="magic-card-link bi bi-link-45deg" href="/" onclick="javascript:void(0)"></a>
			<a href="#"
				class="magic-card-answer bi bi-geo-alt-fill btn-card-answer"
				data-zoom="${card.zoom}"
				data-lat="${card.lat}"
				data-lng="${card.lng}"
			></a>
			<header class="magic-card-header d-flex justify-content-between">
				<div>
					<i class="bi bi-star-fill"></i>
					<i class="bi bi-star-fill"></i>
					<i class="bi bi-star-fill"></i>
				</div>
				<button type="button" class="btn-close btn-lg me-3" data-bs-dismiss="modal" aria-label="Close"></button>
			</header>
			<main class="magic-card-content">
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
		</div>`;
	}

	window.createCardElem = createCardElem;
})();