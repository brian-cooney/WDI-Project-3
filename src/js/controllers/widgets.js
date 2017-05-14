angular
.module('widgetApp')
.controller('WidgetCtrl', WidgetCtrl);

WidgetCtrl.$inject = [];
function WidgetCtrl() {
  const vm = this;
  vm.all = [
    {
      '_id': '5918490da12128db4f322634',
      'type': 'weather',
      'url': 'http://api.openweathermap.org/data/2.5/weather?q=London&APPID=d2c4c1492a04ec9081fe74119400cc6e',
      '__v': 0,
      'data': {
        'coord': {
          'lon': -0.13,
          'lat': 51.51
        },
        'weather': [
          {
            'id': 801,
            'main': 'Clouds',
            'description': 'few clouds',
            'icon': '02d'
          }
        ],
        'base': 'stations',
        'main': {
          'temp': 290.22,
          'pressure': 1019,
          'humidity': 39,
          'temp_min': 288.15,
          'temp_max': 292.15
        },
        'visibility': 10000,
        'wind': {
          'speed': 6.7,
          'deg': 240,
          'gust': 12.3
        },
        'clouds': {
          'all': 12
        },
        'dt': 1494762600,
        'sys': {
          'type': 1,
          'id': 5091,
          'message': 0.0966,
          'country': 'GB',
          'sunrise': 1494734956,
          'sunset': 1494791126
        },
        'id': 2643743,
        'name': 'London',
        'cod': 200
      }

    }, {
      '_id': '5918490da12128db4f322635',
      'type': 'news',
      'url': 'https://newsapi.org/v1/articles?source=bbc-news&apiKey=220bcdb5f5bd425194e8e6914bf03244',
      '__v': 0,
      'data': {
        'status': 'ok',
        'source': 'bbc-news',
        'sortBy': 'top',
        'articles': [
          {
            'author': 'BBC News',
            'title': 'Ransomware: Cyber-attack threat escalating - Europol',
            'description': 'Europe\'s police chief says Friday\'s ransomware attack hit more than 200,000 victims in 150 countries.',
            'url': 'http://www.bbc.co.uk/news/technology-39913630',
            'urlToImage': 'https://ichef-1.bbci.co.uk/news/1024/cpsprodpb/4316/production/_96047171_039455678-1.jpg',
            'publishedAt': '2017-05-14T11:28:23+00:00'
          }
        ]
      }
    }
  ];
}
