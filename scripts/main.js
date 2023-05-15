let infographicMap;
let flashCardModal;
let swiper;
let prevLevel = -1;
let curLevel = 3;

const pageHref = window.location.search; //"?zoom=5&lat=50.515625&lng=30.515625";
const searchParams = new URLSearchParams(pageHref.substring(pageHref.indexOf('?')));
const mapState = createMapState(searchParams);

window.addEventListener("DOMContentLoaded", () => {
	setupLevelMenu();

	const modelElemFlashCards = document.getElementById('modalFlashCards');
	flashCardModal = new bootstrap.Modal(modelElemFlashCards, {
		backdrop: 'static',
	});

	setTimeout(checkCardDirectLink, 500);
});

function setupLevelMenu() {
	const menuItems = document.querySelectorAll('#btnFlashCards .dropdown-item');
	for (const item of menuItems) {
		item.addEventListener('click', () => {
			prevLevel = curLevel;
			curLevel = Number(item.dataset.level);
			prepareCards();
		})
	}
}

function checkCardDirectLink() {
	const cardId = searchParams.get('card');
	if (!cardId) return;

	flashCardModal.show();
	prepareCards();
	const slideIdx = swiper.slides.findIndex(s => s.id === cardId);
	slideIdx && swiper.slideTo(slideIdx, 500, false);
}

function showLeafLetMap() {
	infographicMap = L.map('map', {
		center: [mapState.lat, mapState.lng],
		zoom: mapState.zoom,
		crs: L.CRS.Simple, // https://leafletjs.com/examples/crs-simple/crs-simple.html
	});
	infographicMap
		.on('zoomend', (evt) => {
			mapState.zoom = evt.target.getZoom();
			const queryString = toQueryString(mapState);
			history.replaceState({}, "", `?${queryString}`);
		})
		.on('moveend', (evt) => {
			Object.assign(mapState, evt.target.getCenter());
			const queryString = toQueryString(mapState);
			history.replaceState({}, "", `?${queryString}`);
		})
		.whenReady(() => {
			console.log('Infographic map loaded');
		});
	
	const svgElement = document.getElementById('infographic');
	const svgElementBounds = [
		[0, 0],
		[100, 100]
	];
	L.svgOverlay(svgElement, svgElementBounds).addTo(infographicMap);

}

function prepareCards() {
	if (curLevel !== prevLevel) {
		const newWrapperElem = loadAndRenderCards(curLevel, onShowAnswer)
		const swiperFlashCards = document.getElementById('swiperFlashCards');
		const curWrapperElem = swiperFlashCards.querySelector('.swiper-wrapper');
		curWrapperElem.replaceWith(newWrapperElem);

		swiper?.destroy();
		initSwiper();
	}
}

function initSwiper() {
	swiper = new Swiper('.swiper', {
		direction: 'horizontal',
		effect: "cards",
		grabCursor: true,
		loop: true,

		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
}

function onShowAnswer(answer) {
	const latlng = L.latLng(answer.lat, answer.lng);
	flashCardModal.hide();
	infographicMap.setView(latlng, answer.zoom, {
		animate: true,
		duration: 1,
	});
}

function createMapState(searchParams) {
	return {
		zoom: searchParams.get('zoom') ?? 3,
		lat: searchParams.get('lat') ?? 50,
		lng: searchParams.get('lng') ?? 50,
	};
}

function toQueryString(obj) {
	return Object.entries(obj).map(([key, value]) => {
		return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
	}).join('&');
}
