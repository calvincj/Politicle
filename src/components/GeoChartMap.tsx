import { Chart } from 'react-google-charts';
import type { VisibleRegion } from '../data/randomRegions';
import { getCountryFlag } from '../data/randomRegions';

interface GeoChartMapProps {
  visibleRegion: VisibleRegion;
  onCountryClick: (countryName: string) => void;
  guessedCountries: string[];
}

export default function GeoChartMap({ visibleRegion, onCountryClick, guessedCountries }: GeoChartMapProps) {
  // Country name mapping from CSV names to ISO codes
  const countryToISOMapping: { [key: string]: string } = {
    'Afghanistan': 'AF', 'Albania': 'AL', 'Algeria': 'DZ', 'Andorra': 'AD', 'Angola': 'AO',
    'Antigua and Barbuda': 'AG', 'Argentina': 'AR', 'Armenia': 'AM', 'Australia': 'AU', 'Austria': 'AT',
    'Azerbaijan': 'AZ', 'Bahamas': 'BS', 'Bahrain': 'BH', 'Bangladesh': 'BD', 'Barbados': 'BB',
    'Belarus': 'BY', 'Belgium': 'BE', 'Belize': 'BZ', 'Benin': 'BJ', 'Bhutan': 'BT',
    'Bolivia': 'BO', 'Bosnia and Herzegovina': 'BA', 'Botswana': 'BW', 'Brazil': 'BR', 'Brunei': 'BN',
    'Bulgaria': 'BG', 'Burkina Faso': 'BF', 'Burundi': 'BI', 'Cambodia': 'KH', 'Cameroon': 'CM',
    'Canada': 'CA', 'Cape Verde': 'CV', 'Central African Republic': 'CF', 'Chad': 'TD', 'Chile': 'CL',
    'China': 'CN', 'Colombia': 'CO', 'Comoros': 'KM', 'Costa Rica': 'CR', 'Croatia': 'HR',
    'Cuba': 'CU', 'Cyprus': 'CY', 'Czechia': 'CZ', 'Democratic Republic of the Congo': 'CD', 'Denmark': 'DK',
    'Djibouti': 'DJ', 'Dominica': 'DM', 'Dominican Republic': 'DO', 'East Timor': 'TL', 'Ecuador': 'EC',
    'Egypt': 'EG', 'El Salvador': 'SV', 'Equatorial Guinea': 'GQ', 'Eritrea': 'ER', 'Estonia': 'EE',
    'Eswatini': 'SZ', 'Ethiopia': 'ET', 'Fiji': 'FJ', 'Finland': 'FI', 'France': 'FR',
    'Gabon': 'GA', 'Gambia': 'GM', 'Georgia': 'GE', 'Germany': 'DE', 'Ghana': 'GH',
    'Greece': 'GR', 'Grenada': 'GD', 'Guatemala': 'GT', 'Guinea': 'GN', 'Guinea-Bissau': 'GW',
    'Guyana': 'GY', 'Haiti': 'HT', 'Honduras': 'HN', 'Hungary': 'HU', 'Iceland': 'IS',
    'India': 'IN', 'Indonesia': 'ID', 'Iran': 'IR', 'Iraq': 'IQ', 'Ireland': 'IE',
    'Israel': 'IL', 'Italy': 'IT', 'Ivory Coast': 'CI', 'Jamaica': 'JM', 'Japan': 'JP',
    'Jordan': 'JO', 'Kazakhstan': 'KZ', 'Kenya': 'KE', 'Kiribati': 'KI', 'Kuwait': 'KW',
    'Kyrgyzstan': 'KG', 'Laos': 'LA', 'Latvia': 'LV', 'Lebanon': 'LB', 'Lesotho': 'LS',
    'Liberia': 'LR', 'Libya': 'LY', 'Liechtenstein': 'LI', 'Lithuania': 'LT', 'Luxembourg': 'LU',
    'Madagascar': 'MG', 'Malawi': 'MW', 'Malaysia': 'MY', 'Maldives': 'MV', 'Mali': 'ML',
    'Malta': 'MT', 'Marshall Islands': 'MH', 'Mauritania': 'MR', 'Mauritius': 'MU', 'Mexico': 'MX',
    'Micronesia': 'FM', 'Moldova': 'MD', 'Monaco': 'MC', 'Mongolia': 'MN', 'Montenegro': 'ME',
    'Morocco': 'MA', 'Mozambique': 'MZ', 'Myanmar': 'MM', 'Namibia': 'NA', 'Nauru': 'NR',
    'Nepal': 'NP', 'Netherlands': 'NL', 'New Zealand': 'NZ', 'Nicaragua': 'NI', 'Niger': 'NE',
    'Nigeria': 'NG', 'North Korea': 'KP', 'North Macedonia': 'MK', 'Norway': 'NO', 'Oman': 'OM',
    'Pakistan': 'PK', 'Palau': 'PW', 'Panama': 'PA', 'Papua New Guinea': 'PG', 'Paraguay': 'PY',
    'Peru': 'PE', 'Philippines': 'PH', 'Poland': 'PL', 'Portugal': 'PT', 'Qatar': 'QA',
    'Republic of Congo': 'CG', 'Romania': 'RO', 'Russia': 'RU', 'Rwanda': 'RW', 'Saint Kitts and Nevis': 'KN',
    'Saint Lucia': 'LC', 'Saint Vincent and the Grenadines': 'VC', 'Samoa': 'WS', 'San Marino': 'SM', 'Sao Tome and Principe': 'ST',
    'Saudi Arabia': 'SA', 'Senegal': 'SN', 'Serbia': 'RS', 'Seychelles': 'SC', 'Sierra Leone': 'SL',
    'Singapore': 'SG', 'Slovakia': 'SK', 'Slovenia': 'SI', 'Solomon Islands': 'SB', 'Somalia': 'SO',
    'South Africa': 'ZA', 'South Korea': 'KR', 'South Sudan': 'SS', 'Spain': 'ES', 'Sri Lanka': 'LK',
    'Sudan': 'SD', 'Suriname': 'SR', 'Swaziland': 'SZ', 'Sweden': 'SE', 'Switzerland': 'CH',
    'Syria': 'SY', 'Tajikistan': 'TJ', 'Tanzania': 'TZ', 'Thailand': 'TH', 'Timor-Leste': 'TL',
    'Togo': 'TG', 'Tonga': 'TO', 'Trinidad and Tobago': 'TT', 'Tunisia': 'TN', 'Turkey': 'TR',
    'Turkmenistan': 'TM', 'Tuvalu': 'TV', 'Uganda': 'UG', 'Ukraine': 'UA', 'United Arab Emirates': 'AE',
    'United Kingdom': 'GB', 'United States': 'US', 'Uruguay': 'UY', 'Uzbekistan': 'UZ', 'Vanuatu': 'VU',
    'Vatican City': 'VA', 'Venezuela': 'VE', 'Vietnam': 'VN', 'Yemen': 'YE', 'Zambia': 'ZM', 'Zimbabwe': 'ZW',
    'Kosovo': 'XK'
  };

  // Function to get ISO code for GeoChart
  const getISOCode = (csvName: string): string => {
    return countryToISOMapping[csvName] || csvName;
  };

  // Prepare data for Google GeoChart
  const chartData = [
    ['Country', 'Value', { role: 'tooltip', type: 'string', p: { html: true } }], 
    ...visibleRegion.countries.map(country => [
      { v: getISOCode(country), f: '' }, // Use ISO code for GeoChart
      guessedCountries.includes(country) ? 1 : 0, // 1 for guessed (yellow), 0 for unguessed (blue)
      `<div style="padding: 1px 2px; font-size: 14px; white-space: nowrap; background: white; solid #ccc;">${getCountryFlag(country)} ${country}</div>`
    ])
  ];

  const options = {
    displayMode: 'regions',
    resolution: 'countries',
    region: visibleRegion.regionCode,
    legend: 'none',
    backgroundColor: 'transparent',
    datalessRegionColor: '#e6e6e6',
    defaultColor: '#3B82F6',
    enableRegionInteractivity: true,
    keepAspectRatio: true,
    tooltip: { 
      textStyle: { fontSize: 12 },
      trigger: 'focus',
      isHtml: true,
      ignoreBounds: true,
      showColorCode: false
    },
    colorAxis: {
      colors: ['#3B82F6', '#FCD34D'],
      minValue: 0,
      maxValue: 1
    },
    chartArea: {
      left: 0,
      top: 0,
      width: '100%',
      height: '100%'
    }
  };

  const handleSelect = (chart: any) => {
    const selection = chart.getSelection();
    if (selection.length > 0) {
      const selectedRow = selection[0].row;
      if (selectedRow !== undefined && selectedRow >= 0) {
        const geoChartData = chartData[selectedRow + 1][0];
        const geoChartName = typeof geoChartData === 'object' && 'v' in geoChartData ? geoChartData.v : geoChartData as string;
        
        // Find CSV name from the ISO code
        const originalCountryName = visibleRegion.countries.find(country => 
          getISOCode(country) === geoChartName
        );
        
        if (originalCountryName) {
          // Only allow selection if country hasn't been guessed and is in visible region
          if (!guessedCountries.includes(originalCountryName) && visibleRegion.countries.includes(originalCountryName)) {
            onCountryClick(originalCountryName); 
          } else {
            console.log(`Country ${originalCountryName} already guessed or not in visible region`);
          }
        }
      }
    }
  };

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 overflow-hidden relative" 
      style={{ height: '300px' }}
    >
      <Chart
        chartType="GeoChart"
        width="100%"
        height="300px"
        data={chartData}
        options={options}
        chartEvents={[
          {
            eventName: 'select',
            callback: ({ chartWrapper }) => {
              if (chartWrapper) {
                handleSelect(chartWrapper.getChart());
              }
            }
          },
          {
            eventName: 'ready',
            callback: ({ chartWrapper }) => {
              if (chartWrapper) {
                // Chart is ready for interactions
                console.log('GeoChart ready for zoom and pan interactions');
              }
            }
          }
        ]}
      />
    </div>
  );
}
