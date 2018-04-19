displayer.clickHandler.initialize();
giphy.search('cat',displayer.createAll);

$(document).ready(function() {
	search.view.update();
	search.controller.clickHandler.initialize();
});

$(document).on('click','.submit-btn',() => {
	search.controller.handleSearch();
})

