angular
.module('wdi-group-project')
.controller('WidgetsIndexCtrl', WidgetsIndexCtrl);
// .controller('WidgetsNewCtrl', WidgetsNewCtrl);

// finds only the widgets belonging to the logged in user
WidgetsIndexCtrl.$inject = ['Widget', '$rootScope', 'CurrentUserService'];
function WidgetsIndexCtrl(Widget, $rootScope, CurrentUserService) {
  const vm = this;
  vm.getUserWidgets = function getUserWidgets() {
    vm.user = CurrentUserService.currentUser;
    vm.all = [];
    Widget
    .query({ 'user': vm.user._id })
    .$promise
    .then(widgets => {
      // console.log('WIDGETS FOUND: ', widgets)
      vm.all = widgets;
    });
    vm.widget = {};
    vm.widget.data = {};
    vm.widget.index = 0;
    vm.widget.user = vm.user._id;
    vm.create = function widgetsCreate() {
      // console.log(vm.widget);
      Widget
      .save(vm.widget)
      .$promise
      .then(widget => {
        vm.widget = widget;
        console.log('WIDGET CREATED:', vm.widget);
      })
      .then(() => {
        vm.all.push(vm.widget);
        vm.widget = {};
      });
    };
  };
  if (CurrentUserService.currentUser) vm.getUserWidgets();
  $rootScope.$on('loggedIn', () => {
    vm.getUserWidgets();
  });
  vm.newButton = {
    sizeY: 1, sizeX: 1, maxSizeY: 1, maxSizeX: 1
  };
  vm.newButtonOpts = {
    resizable: { enabled: false },
    draggable: { enabled: true }
  };

  vm.nextItem = function nextItem(item) {
    // console.log(item.index)
    if (item.type === 'giphy') {
      if (item.index+1 === item.data.data.length) {
        item.index = 0;
      } else item.index++;
    } else if (item.type === 'news') {
      if (item.index+1 === item.data.articles.length) {
        item.index = 0;
      } else item.index++;
    } else if (item.type === 'recipes') {
      if (item.index+1 === item.data.hits.length) {
        item.index = 0;
      } else item.index++;
    } else if (item.type === 'events') {
      if (item.index+1 === item.data.events.event.length) {
        item.index = 0;
      } else item.index++;
    } else if (item.type === 'today') {
      if (item.index+1 === item.data.data.Events.length) {
        item.index = 0;
      } else item.index++;
    }
  };

  vm.icons = {
    clear: { url: '/images/weather-icons/clear.png' },
    cloudy: { url: '/images/weather-icons/cloudy.png' },
    rain: { url: '/images/weather-icons/rain.png' },
    snow: { url: '/images/weather-icons/snow.png' }
  };

  vm.delete = function widgetsDelete(widget) {
    vm.all.splice(vm.all.indexOf(widget), 1);
    Widget.remove({ id: widget._id });
  };
  vm.newCancel = false;
  vm.newIsHidden = true;
  vm.newWidget = function newWidget() {
    // console.log('clicked');
    if (vm.newIsHidden) {
      vm.newIsHidden = false;
      vm.newCancel = true;
    } else {
      vm.newIsHidden = true;
      vm.newCancel = false;
    }
    // console.log(vm.newIsHidden);
  };

  vm.widgetUpdatePos = function widgetUpdatePos(widget) {
    // console.log(vm.all[index]);
    // ONLY update the position/size if different from starting position/size
    if (vm.startY !== widget.sizeY || vm.startX !== widget.sizeX || vm.startCol !== widget.col || vm.startRow !== widget.row) {
      const index = vm.all.indexOf(widget);
      // console.log('pos and size updated');
      Widget
      .update({ id: widget._id }, {
        sizeX: vm.all[index].sizeX,
        sizeY: vm.all[index].sizeY,
        row: vm.all[index].row,
        col: vm.all[index].col
      });
    }
  };

  vm.widgetMoveStart = function widgetMoveStart(widget) {
    vm.startX = widget.sizeX;
    vm.startY = widget.sizeY;
    vm.startCol = widget.col;
    vm.startRow = widget.row;
    // console.log(vm.startY, vm.startX, vm.startCol, vm.startRow);
  };

  vm.gridsterOpts = {
    mobileBreakPoint: 600,
    margins: [15, 15], // the pixel distance between each widget
    outerMargin: false,
    mobileModeEnabled: false,
    swapping: true,
    resizable: {
      enabled: true,
      handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
      start: function(event, $element, widget) {
        vm.widgetMoveStart(widget);
      }, // optional callback fired when resize is started,
      resize: function(event, $element, widget) {}, // optional callback fired when item is resized,
      stop: function(event, $element, widget) {
        // console.log(widget._id, widget.sizeX, widget.sizeY);
        vm.widgetUpdatePos(widget);
      } // optional callback fired when item is finished resizing
    },
    draggable: {
      start: function(event, $element, widget) {
        vm.widgetMoveStart(widget);
      }, // optional callback fired when drag is started,
      drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
      stop: function(event, $element, widget) {
        // console.log(widget._id, widget.row, widget.col);
        vm.widgetUpdatePos(widget);
      } // optional callback fired when item is finished dragging
    }
  };
// }

// WidgetsNewCtrl.$inject = ['$state', 'Widget', 'CurrentUserService'];
// function WidgetsNewCtrl($state, Widget, CurrentUserService) {
//   const vm = this;

  vm.options = [
    { type: 'news', name: 'News' },
    { type: 'weather', name: 'Weather' },
    { type: 'giphy', name: 'Giphy' },
    { type: 'events', name: 'Events' },
    { type: 'chuck', name: 'Chuck Norris Jokes' },
    { type: 'recipes', name: 'Recipes' },
    { type: 'ron', name: 'Ron Swanson Quotes' },
    { type: 'quote', name: 'Random Quote' },
    { type: 'advice', name: 'Advice' },
    { type: 'today', name: 'This Day in History' }
  ];

  // News
  vm.newsWidget = {};
  vm.newsSourceOptions = [
    { source: 'abc-news-au', name: 'ABC' },
    { source: 'bild', name: 'Bild' },
    { source: 'bbc-sport', name: 'BBC Sport' },
    { source: 'bbc-news', name: 'BBC News' },
    { source: 'al-jazeera-english', name: 'Al Jazeera English' },
    { source: 'bloomberg', name: 'Bloomberg' },
    { source: 'cnn', name: 'CNN' },
    { source: 'business-insider-uk', name: 'Business Insider (UK)' },
    { source: 'cnbc', name: 'CNBC' },
    { source: 'time', name: 'Time' },
    { source: 'hacker-news', name: 'Hacker News' },
    { source: 'the-washington-post', name: 'The Washington Post' },
    { source: 'the-new-york-times', name: 'The New York Times' },
    { source: 'the-lad-bible', name: 'The Lad Bible' },
    { source: 'espn', name: 'ESPN' },
    { source: 'usa-today', name: 'USA Today' },
    { source: 'the-huffington-post', name: 'The Huffington Post' },
    { source: 'techcrunch', name: 'TechCrunch' },
    { source: 'the-economist', name: 'The Economist' },
    { source: 'the-guardian-au', name: 'The Guardian (AU)' },
    { source: 'reddit-r-all', name: 'Reddit' },
    { source: 'polygon', name: 'Polygon' },
    { source: 'mtv-news', name: 'MTV News' },
    { source: 'financial-times', name: 'Financial Times' },
    { source: 'daily-mail', name: 'Daily Mail' }
  ];
  vm.test = test;
  function test() {
    const source = vm.newsWidget.source;
    vm.widget.url = `https://newsapi.org/v1/articles?source=${source}&apiKey=902a003f156c4002995eb5a6c8267b0a`;
  }

  // Events
  vm.eventsWidget = {};
  vm.eventsLocation = [
    { city: 'London' },
    { city: 'Paris' },
    { city: 'New York' },
    { city: 'Lisbon' }
  ];
  vm.eventsType = [
    { id: 'music', type: 'Concerts & Tour Dates' },
    { id: 'conference', type: 'Conferences & Tradeshows' },
    { id: 'comedy', type: 'Comedy' },
    { id: 'learning_education', type: 'Education' },
    { id: 'family_fun_kids', type: 'Kids & Family' },
    { id: 'festivals_parades', type: 'Festivals' },
    { id: 'movies_film', type: 'Film' },
    { id: 'food', type: 'Food & Wine' },
    { id: 'fundraisers', type: 'Fundraising & Charity' },
    { id: 'art', type: 'Art Galleries & Exhibits' },
    { id: 'support', type: 'Health & Wellness' },
    { id: 'holiday', type: 'Holiday' },
    { id: 'books', type: 'Literary & Books' },
    { id: 'attractions', type: 'Museums & Attractions' },
    { id: 'community', type: 'Neighborhood' },
    { id: 'singles_social', type: 'Nightlife & Singles' },
    { id: 'schools_alumni', type: 'University & Alumni' },
    { id: 'clubs_associations', type: 'Organizations & Meetups' },
    { id: 'outdoors_recreation', type: 'Outdoors & Recreation' },
    { id: 'performing_arts', type: 'Performing Arts' },
    { id: 'animals', type: 'Pets' },
    { id: 'politics_activism', type: 'Politics & Activism' },
    { id: 'sales', type: 'Sales & Retail' },
    { id: 'science', type: 'Science' },
    { id: 'sports', type: 'Sports' },
    { id: 'technology', type: 'Technology' },
    { id: 'other', type: 'Other & Miscellaneous' }
  ];
  vm.eventsTime = [
    { time: 'All' },
    { time: 'Future' },
    { time: 'Past' },
    { time: 'Today' },
    { time: 'Last Week' },
    { time: 'This Week' },
    { time: 'Next Week' }
  ];
  vm.time = '';

  vm.events = events;
  function events() {
    const event = vm.eventsWidget.type;
    const location = vm.eventsWidget.location.city;
    const time = vm.eventsWidget.time.time;
    vm.widget.url = `http://api.eventful.com/json/events/search?${event}&location=${location}&t=${time}&app_key=BKn3H5D8pC7vHPP3`;
    console.log(vm.widget.url);

  }

  // vm.eventOpts.url = `http://api.eventful.com/json/events/search?${vm.eventsType}&location=${vm.eventOpts.location}&app_key=BKn3H5D8pC7vHPP3`;

  // sets parameters for the widget when the type dropdown is changed
  vm.onChange = onChange;
  function onChange(option) {
    console.log('changed', option);
    switch (option) {
      case 'chuck': vm.widget.url = 'https://api.chucknorris.io/jokes/random';
        break;
      case 'advice': vm.widget.url = 'http://api.adviceslip.com/advice';
        break;
      case 'news': vm.widget.minSizeX = 2; vm.widget.minSizeY = 2; vm.widget.sizeX = 2; vm.widget.sizeY = 2;
        break;
      case 'today': vm.widget.url = 'http://history.muffinlabs.com/date';
        break;
      case 'ron': vm.widget.url = 'http://ron-swanson-quotes.herokuapp.com/v2/quotes';
        break;
      case 'quote': vm.widget.url = 'http://quotesondesign.com/wp-json/posts?filter=rand&filter=1';
        break;
      case 'recipes': vm.widget.url = 'https://api.edamam.com/search?q=breakfast';
        break;
      case 'giphy': vm.widget.sizeX = 2; vm.widget.sizeY = 2;
        break;
      case 'weather': vm.widget.sizeX = 2; vm.widget.sizeY = 1;
        break;
      default: break;
    }
  }
  vm.giphySearchTerms = '';
  vm.giphySearch = giphySearch;

  function giphySearch() {
    let search = vm.giphySearchTerms;
    search = search.split(' ').join('+');
    vm.widget.url = `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=dc6zaTOxFJmzC`;
  }

  vm.weatherLocation = null;
  vm.getWeather = function getWeather() {
    const location = vm.weatherLocation;
    vm.widget.url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=baecb13f15a7cb38326ec2b57025083e`;
  };



}



// hello
