const HN_URL = 'https://hn.algolia.com/api/v1/search?query=';

$(function() {
	$('#searchTerm').on('change paste keyup', handleSearchTermChange);
});

function handleSearchTermChange() {
	let value = $.trim($('#searchTerm').val());
	
	if(value.length >= 3) {
		dispalySpinner();
		performSearch(value, 0);
	} else {
		$('#resultArea').html('');
		$('#pageInfo').html('');
		$('#btnPrev').addClass('hidden');
		$('#btnNext').addClass('hidden');
	}
}

function dispalySpinner() {
	$('#searchStatus').html('<i class="fas fa-spinner fa-spin"></i>');
}

function displaySearchIcon() {
	$('#searchStatus').html('<i class="fas fa-search"></i>');
}

function performSearch(query, currentPage) {
	$.get(HN_URL + query + '&page=' + currentPage, function (data) {
		displaySearchIcon();
		displaySearchResult(data);
		displaySearchNavigation(data);
	}).fail(function (err) {
		console.error(err);
	});
}

function displaySearchResult(data) {
	let hits = data.hits;

	let html = '<table class="table table-striped">';
	hits.forEach(hit => {
		html += '<tr>';
		html += '<td><a href="'+ hit.url +'" target="_blank">'+ hit.title +'</a>';
		html += '<small class="author">Author: '+ hit.author +'</small>';
		html += '</td>';
		html += '</tr>';
	});
	html += '</table>';

	$('#resultArea').html(html);
}

function displaySearchNavigation(data) {
	let currentPage = data.page;
	let totalPages = data.nbPages;
	let query = data.query;

	$('#pageInfo').html('Page ' + (currentPage + 1) + ' of ' + totalPages);

	if (currentPage > 0) {
		$('#btnPrev').removeClass('hidden');
		$('#btnPrev').off();
		$('#btnPrev').on('click', function () {
			dispalySpinner();
			performSearch(query, currentPage - 1)
		});
	} else {
		$('#btnPrev').addClass('hidden');
	}

	if (currentPage < totalPages - 1) {
		$('#btnNext').removeClass('hidden');
		$('#btnNext').off();
		$('#btnNext').on('click', function () {
			dispalySpinner();
			performSearch(query, currentPage + 1);
		});
	} else {
		$('#btnNext').addClass('hidden');
	}
}

