/**
 * This is js scrumboard
 * Use it to add tasks and make a nice print of it.
 * Usage: jsScrumboard.renderAt($('body'));
 * (or any other element of your choice)
 */
var jsScrumboard = {};

jsScrumboard.renderAt = (function($) {
	
	function addTask(page) {
		page.append('<div class="task" contenteditable></div>');
	}
	function addPage(target, settings) {
		var i, page = $('<br clear="all" /><div class="page"></div>'),
			close = $('<img src="images/close.png" class="close" title="Remove page" />');
		close.click(function() {
			if(confirm('Are you sure you want to remove this page?')) {
				$(this).parent().remove();
		}});
		page.append(close);
		for(i = 0; i < settings.tasks_per_page; i++) {
			addTask(page);			
		}
		target.append(page);
	}
	function renderToolbar(target, settings) {
		var toolbar = $('<div class="toolbar"></div>'),
			add_page = $('<button class="toolbar-item">Add page</button>'),
			explanation = 'JS scrumboard. Add your tasks and print the page!';
		add_page.click(function() { addPage(target, settings); });
		toolbar.append(add_page);
		toolbar.append(explanation);
		target.append(toolbar);
	}
	return function(target, user_settings) {
		var default_settings = { nr_of_pages: 1, tasks_per_page: 8 },
		    settings = jQuery.extend({}, default_settings, user_settings),
		    i;
		target = $(target).html('').addClass('js-scrumboard');
		renderToolbar(target, settings);
		for(i = 0; i < settings.nr_of_pages; i++) {
			addPage(target, settings);
		}
	};
}(jQuery));
