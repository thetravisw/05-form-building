'use strict';

let articleView = {};

articleView.populateFilters = () => {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      let val = $(this).find('address a').text();
      let optionTag = `<option value="${val}">${val}</option>`;

      if ($(`#author-filter option[value="${val}"]`).length === 0) {
        $('#author-filter').append(optionTag);
      }

      val = $(this).attr('data-category');
      optionTag = `<option value="${val}">${val}</option>`;
      if ($(`#category-filter option[value="${val}"]`).length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = () => {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-author="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = () => {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = () => {
  $('nav').on('click', '.tab', function(e) {
    e.preventDefault();
    $('.tab-content').hide();
    $(`#${$(this).data('content')}`).fadeIn();
  });

  $('nav .tab:first').click();
};

articleView.setTeasers = () => {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('article').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    if ($(this).text() === 'Read on →') {
      $(this).parent().find('*').fadeIn();
      $(this).html('Show Less &larr;');
    } else {
      $('body').animate({
        scrollTop: ($(this).parent().offset().top)
      },200);
      $(this).html('Read on &rarr;');
      $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
    }
  });
};

// COMMENT: In new.html because it should run ONLY when that page is loaded, and only once.
// PUT YOUR RESPONSE HERE
articleView.initNewArticlePage = () => {
  // TODO: Ensure the main .tab-content area is revealed. We might add more tabs later or otherwise edit the tab navigation.  
  // Done
  $('.tab-content').show()

  // TODO: The new articles we create will be copy/pasted into our source data file.
  // Set up this "export" functionality. We can hide it for now, and show it once we have data to export.
  // Done

  $('#article-json').on('focus', function(){
    this.select();
  });

  // TODO: Add an event handler to update the preview and the export field if any inputs change.
  // Done
  $('#new-form').on('change', articleView.create);

  $('#preview').on('click', articleView.previewClicked)  
  $('#write').on('click', articleView.writeClicked) 
};

articleView.previewClicked = () => {
  $('#new-form').hide()
  $('#articles').show()
  articleView.create()
}

articleView.writeClicked = () => {
  $('#articles').hide()
  $('#new-form').show()
}


articleView.create = () => {
  // TODO: Set up a variable to hold the new article we are creating.
  // Done
  let article;
  // TODO: Clear out the #articles element, so we can put in the updated preview
  // Done
  $('#articles').empty();

  // TODO: Instantiate an article based on what's in the form fields:
  // Done
  article = new Article({
    title: $('#article-title').val(),
    author: $('#article-author').val(),
    authorUrl: $('#article-author-url').val(),
    body: $('#article-body').val(),
    publishedOn: $('#article-published').val(),
    category: $('#article-category').val(),
  });

  // TODO: Use our interface to the Handblebars template to put this new article into the DOM: 
  // Done
  $('#articles').append(article.toHtml());

  // TODO: Activate the highlighting of any code blocks; look at the documentation for hljs to see how to do this by placing a callback function in the .each():  
  $('pre code').each();
  //  Will get this done tonight.

  // TODO: Show our export field, and export the new article as JSON, so it's ready to copy/paste into blogArticles.js:  
  // Done
  $('#article-json').val(JSON.stringify(article));
};

// COMMENT: Where is this function called? Why?
// In index.html.  Called there so that it won't/cant be called while on new.html.
//  Truthfully, I don't think I like that solution though.  I'm pretty sure there's a window property that gives you the current URL.  Seems like an if check would be better than calling functions out of the HTML.

articleView.initIndexPage = () => {
  articles.forEach(article => $('#articles').append(article.toHtml()));
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
};
