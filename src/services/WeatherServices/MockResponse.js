export const geoLocationMock = {
  data: {
    Version: 1,
    Key: '333259',
    Type: 'City',
    Rank: 85,
    LocalizedName: 'Dearing',
    EnglishName: 'Dearing',
    PrimaryPostalCode: '67340',
    Region: {
      ID: 'NAM',
      LocalizedName: 'North America',
      EnglishName: 'North America',
    },
    Country: {
      ID: 'US',
      LocalizedName: 'United States',
      EnglishName: 'United States',
    },
    AdministrativeArea: {
      ID: 'KS',
      LocalizedName: 'Kansas',
      EnglishName: 'Kansas',
      Level: 1,
      LocalizedType: 'State',
      EnglishType: 'State',
      CountryID: 'US',
    },
    TimeZone: {
      Code: 'CDT',
      Name: 'America/Chicago',
      GmtOffset: -5.0,
      IsDaylightSaving: true,
      NextOffsetChange: '2020-11-01T07:00:00Z',
    },
    GeoPosition: {
      Latitude: 37.059,
      Longitude: -95.713,
      Elevation: {
        Metric: {
          Value: 240.0,
          Unit: 'm',
          UnitType: 5,
        },
        Imperial: {
          Value: 787.0,
          Unit: 'ft',
          UnitType: 0,
        },
      },
    },
    IsAlias: false,
    SupplementalAdminAreas: [
      {
        Level: 2,
        LocalizedName: 'Montgomery',
        EnglishName: 'Montgomery',
      },
    ],
    DataSets: [
      'AirQualityCurrentConditions',
      'AirQualityForecasts',
      'Alerts',
      'DailyAirQualityForecast',
      'DailyPollenForecast',
      'ForecastConfidence',
      'MinuteCast',
      'Radar',
    ],
  },
};

export const autoCompleteLocationsMock = {
  data: [
    {
      Version: 1,
      Key: '215854',
      Type: 'City',
      Rank: 31,
      LocalizedName: 'Tel Aviv',
      Country: { ID: 'IL', LocalizedName: 'Israel' },
      AdministrativeArea: { ID: 'TA', LocalizedName: 'Tel Aviv' },
    },
    {
      Version: 1,
      Key: '3431644',
      Type: 'City',
      Rank: 45,
      LocalizedName: 'Telanaipura',
      Country: { ID: 'ID', LocalizedName: 'Indonesia' },
      AdministrativeArea: { ID: 'JA', LocalizedName: 'Jambi' },
    },
    {
      Version: 1,
      Key: '300558',
      Type: 'City',
      Rank: 45,
      LocalizedName: 'Telok Blangah New Town',
      Country: { ID: 'SG', LocalizedName: 'Singapore' },
      AdministrativeArea: { ID: '05', LocalizedName: 'South West' },
    },
    {
      Version: 1,
      Key: '325876',
      Type: 'City',
      Rank: 51,
      LocalizedName: 'Telford',
      Country: { ID: 'GB', LocalizedName: 'United Kingdom' },
      AdministrativeArea: { ID: 'TFW', LocalizedName: 'Telford and Wrekin' },
    },
    {
      Version: 1,
      Key: '169072',
      Type: 'City',
      Rank: 51,
      LocalizedName: 'Telavi',
      Country: { ID: 'GE', LocalizedName: 'Georgia' },
      AdministrativeArea: { ID: 'KA', LocalizedName: 'Kakheti' },
    },
    {
      Version: 1,
      Key: '230611',
      Type: 'City',
      Rank: 51,
      LocalizedName: 'Telsiai',
      Country: { ID: 'LT', LocalizedName: 'Lithuania' },
      AdministrativeArea: { ID: 'TE', LocalizedName: 'Telšiai' },
    },
    {
      Version: 1,
      Key: '2723742',
      Type: 'City',
      Rank: 55,
      LocalizedName: 'Telégrafo',
      Country: { ID: 'BR', LocalizedName: 'Brazil' },
      AdministrativeArea: { ID: 'PA', LocalizedName: 'Pará' },
    },
    {
      Version: 1,
      Key: '186933',
      Type: 'City',
      Rank: 55,
      LocalizedName: 'Tela',
      Country: { ID: 'HN', LocalizedName: 'Honduras' },
      AdministrativeArea: { ID: 'AT', LocalizedName: 'Atlántida' },
    },
    {
      Version: 1,
      Key: '3453754',
      Type: 'City',
      Rank: 55,
      LocalizedName: 'Telaga Asih',
      Country: { ID: 'ID', LocalizedName: 'Indonesia' },
      AdministrativeArea: { ID: 'JB', LocalizedName: 'West Java' },
    },
    {
      Version: 1,
      Key: '3453755',
      Type: 'City',
      Rank: 55,
      LocalizedName: 'Telagamurni',
      Country: { ID: 'ID', LocalizedName: 'Indonesia' },
      AdministrativeArea: { ID: 'JB', LocalizedName: 'West Java' },
    },
  ],
};

export const currentWeatherMock = {
  data: [
    {
      LocalObservationDateTime: '2020-05-15T22:51:00+03:00',
      EpochTime: 1589572260,
      WeatherText: 'Some clouds',
      WeatherIcon: 36,
      HasPrecipitation: false,
      PrecipitationType: null,
      IsDayTime: false,
      Temperature: {
        Metric: { Value: 27.8, Unit: 'C', UnitType: 17 },
        Imperial: { Value: 82.0, Unit: 'F', UnitType: 18 },
      },
      MobileLink: 'http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us',
      Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us',
    },
  ],
};

export const fiveDayForecastsMock = {
  data: {
    Headline: {
      EffectiveDate: '2020-05-16T07:00:00+08:00',
      EffectiveEpochDate: 1589583600,
      Severity: 4,
      Text: 'Pleasant this weekend',
      Category: 'mild',
      EndDate: null,
      EndEpochDate: null,
      MobileLink:
        'http://m.accuweather.com/en/au/king-leopold-ranges/3494517/extended-weather-forecast/3494517?unit=c&lang=en-us',
      Link:
        'http://www.accuweather.com/en/au/king-leopold-ranges/3494517/daily-weather-forecast/3494517?unit=c&lang=en-us',
    },
    DailyForecasts: [
      {
        Date: '2020-05-15T07:00:00+08:00',
        EpochDate: 1589497200,
        Temperature: {
          Minimum: { Value: 16.3, Unit: 'C', UnitType: 17 },
          Maximum: { Value: 32.8, Unit: 'C', UnitType: 17 },
        },
        Day: { Icon: 1, IconPhrase: 'Sunny', HasPrecipitation: false },
        Night: { Icon: 33, IconPhrase: 'Clear', HasPrecipitation: false },
        Sources: ['AccuWeather'],
        MobileLink:
          'http://m.accuweather.com/en/au/king-leopold-ranges/3494517/daily-weather-forecast/3494517?day=1&unit=c&lang=en-us',
        Link:
          'http://www.accuweather.com/en/au/king-leopold-ranges/3494517/daily-weather-forecast/3494517?day=1&unit=c&lang=en-us',
      },
      {
        Date: '2020-05-16T07:00:00+08:00',
        EpochDate: 1589583600,
        Temperature: {
          Minimum: { Value: 17.2, Unit: 'C', UnitType: 17 },
          Maximum: { Value: 33.0, Unit: 'C', UnitType: 17 },
        },
        Day: { Icon: 1, IconPhrase: 'Sunny', HasPrecipitation: false },
        Night: { Icon: 33, IconPhrase: 'Clear', HasPrecipitation: false },
        Sources: ['AccuWeather'],
        MobileLink:
          'http://m.accuweather.com/en/au/king-leopold-ranges/3494517/daily-weather-forecast/3494517?day=2&unit=c&lang=en-us',
        Link:
          'http://www.accuweather.com/en/au/king-leopold-ranges/3494517/daily-weather-forecast/3494517?day=2&unit=c&lang=en-us',
      },
      {
        Date: '2020-05-17T07:00:00+08:00',
        EpochDate: 1589670000,
        Temperature: {
          Minimum: { Value: 19.2, Unit: 'C', UnitType: 17 },
          Maximum: { Value: 33.3, Unit: 'C', UnitType: 17 },
        },
        Day: { Icon: 1, IconPhrase: 'Sunny', HasPrecipitation: false },
        Night: { Icon: 34, IconPhrase: 'Mostly clear', HasPrecipitation: false },
        Sources: ['AccuWeather'],
        MobileLink:
          'http://m.accuweather.com/en/au/king-leopold-ranges/3494517/daily-weather-forecast/3494517?day=3&unit=c&lang=en-us',
        Link:
          'http://www.accuweather.com/en/au/king-leopold-ranges/3494517/daily-weather-forecast/3494517?day=3&unit=c&lang=en-us',
      },
      {
        Date: '2020-05-18T07:00:00+08:00',
        EpochDate: 1589756400,
        Temperature: {
          Minimum: { Value: 17.7, Unit: 'C', UnitType: 17 },
          Maximum: { Value: 32.6, Unit: 'C', UnitType: 17 },
        },
        Day: { Icon: 1, IconPhrase: 'Sunny', HasPrecipitation: false },
        Night: { Icon: 35, IconPhrase: 'Partly cloudy', HasPrecipitation: false },
        Sources: ['AccuWeather'],
        MobileLink:
          'http://m.accuweather.com/en/au/king-leopold-ranges/3494517/daily-weather-forecast/3494517?day=4&unit=c&lang=en-us',
        Link:
          'http://www.accuweather.com/en/au/king-leopold-ranges/3494517/daily-weather-forecast/3494517?day=4&unit=c&lang=en-us',
      },
      {
        Date: '2020-05-19T07:00:00+08:00',
        EpochDate: 1589842800,
        Temperature: {
          Minimum: { Value: 20.6, Unit: 'C', UnitType: 17 },
          Maximum: { Value: 32.0, Unit: 'C', UnitType: 17 },
        },
        Day: { Icon: 4, IconPhrase: 'Intermittent clouds', HasPrecipitation: false },
        Night: { Icon: 7, IconPhrase: 'Cloudy', HasPrecipitation: false },
        Sources: ['AccuWeather'],
        MobileLink:
          'http://m.accuweather.com/en/au/king-leopold-ranges/3494517/daily-weather-forecast/3494517?day=5&unit=c&lang=en-us',
        Link:
          'http://www.accuweather.com/en/au/king-leopold-ranges/3494517/daily-weather-forecast/3494517?day=5&unit=c&lang=en-us',
      },
    ],
  },
};
