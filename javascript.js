
var giphy = {
	setting: {
		apiKey: 'AyEh54Xnf7m4Svi1JKUGBre0pChkzWQz',
		limit: 10,
	},

	result: {},
	
	search: (query,handler) => {
		let queryResult = {};

		const apiKey = giphy.setting.apiKey;
		const limit = giphy.setting.limit;

		fetch(`http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${limit}`)
			.then(response => response.json())
			.then(data => {
				handler(data.data)
			});
	},
} //var giphy = {

var search = {};

search.model = ['cat','dog'];

search.view = {
	update: () => {
		$('#tag-container').empty();
		const model = search.model;
		model.map(el => search.view.updateOne(el))

	},

	updateOne: (searchTerm) => {
		$('<div>').addClass('search-tag')
				  .data('searchTerm',searchTerm)
				  .text(searchTerm)
				  .appendTo($('#tag-container'));
	}
} //search.view = {

search.controller = {
	clickHandler: {
		initialize: () => {
			$(document).on('click','.search-tag',function() {
				const searchTerm = $(this).data('searchTerm');
				giphy.search(searchTerm,displayer.createAll);
			})
		}
	},

	addSearch: (searchTerm) => {
		search.model.push(searchTerm);
		search.view.update();
	},

	handleSearch: () => {
		const searchTerm = $('#search').val();
		$('#search').val('');
		search.controller.addSearch(searchTerm);
		giphy.search(searchTerm,displayer.createAll);
	}
} //search.controller = {

var displayer = {
	createAll: (results) => {
		const id = 'results-container';

		$(`#${id}`).empty();

		$('<div>').addClass('results-container')
				  .appendTo($('#root'))
				  .attr('id',id);

		results.map(result => {
			displayer.create(result,id);
		})
	}, //createAll: (results) => {

	create: (result,id) => {
		const gifURL = result.images.fixed_height.url
		const stillURL = result.images.fixed_height_still.url

		const rating = `rating: ${result.rating}`

		var container = $('<div>').addClass('gif-container')
								  .appendTo($(`#${id}`))

		$('<div>').addClass('gif-rating')
				  .text(rating)
				  .appendTo(container);

		$('<img>').addClass('gif-img')
				  .attr('src',stillURL)
				  .data('toggle',true)
				  .data('gifURL',gifURL)
				  .data('stillURL',stillURL)
				  .appendTo(container);
	}, //create: (result) => {

	clickHandler: {
		initialize: function() {
			$(document).on('click','.gif-img',function() {
				const toggle = $(this).data('toggle');

				if(toggle) {
					$(this).attr('src',$(this).data('gifURL'))
				} else {
					$(this).attr('src',$(this).data('stillURL'))
				}

				$(this).data('toggle',!toggle)
			})
		}
	}
} //var displayer = {




