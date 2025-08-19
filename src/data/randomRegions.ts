import type { CountryRow } from './loadData';

export interface VisibleRegion {
  id: string;
  name: string;
  countries: string[];
  targetCountry: string;
  regionCode: string;
  maxGuesses: number;
}

// Country flag emoji mapping
export const COUNTRY_FLAGS: { [country: string]: string } = {
  'Afghanistan': '🇦🇫', 'Albania': '🇦🇱', 'Algeria': '🇩🇿', 'Andorra': '🇦🇩', 'Angola': '🇦🇴',
  'Antigua and Barbuda': '🇦🇬', 'Argentina': '🇦🇷', 'Armenia': '🇦🇲', 'Australia': '🇦🇺', 'Austria': '🇦🇹',
  'Azerbaijan': '🇦🇿', 'Bahamas': '🇧🇸', 'Bahrain': '🇧🇭', 'Bangladesh': '🇧🇩', 'Barbados': '🇧🇧',
  'Belarus': '🇧🇾', 'Belgium': '🇧🇪', 'Belize': '🇧🇿', 'Benin': '🇧🇯', 'Bhutan': '🇧🇹',
  'Bolivia': '🇧🇴', 'Bosnia and Herzegovina': '🇧🇦', 'Botswana': '🇧🇼', 'Brazil': '🇧🇷', 'Brunei': '🇧🇳',
  'Bulgaria': '🇧🇬', 'Burkina Faso': '🇧🇫', 'Burundi': '🇧🇮', 'Cambodia': '🇰🇭', 'Cameroon': '🇨🇲',
  'Canada': '🇨🇦', 'Cape Verde': '🇨🇻', 'Central African Republic': '🇨🇫', 'Chad': '🇹🇩', 'Chile': '🇨🇱',
  'China': '🇨🇳', 'Colombia': '🇨🇴', 'Comoros': '🇰🇲', 'Congo': '🇨🇬', 'Republic of the Congo': '🇨🇬', 'Costa Rica': '🇨🇷',
  'Croatia': '🇭🇷', 'Cuba': '🇨🇺', 'Cyprus': '🇨🇾', 'Czech Republic': '🇨🇿', 'Czechia': '🇨🇿',
  'Democratic Republic of the Congo': '🇨🇩', 'Denmark': '🇩🇰', 'Djibouti': '🇩🇯', 'Dominica': '🇩🇲',
  'Dominican Republic': '🇩🇴', 'East Timor': '🇹🇱', 'Ecuador': '🇪🇨', 'Egypt': '🇪🇬', 'El Salvador': '🇸🇻',
  'Equatorial Guinea': '🇬🇶', 'Eritrea': '🇪🇷', 'Estonia': '🇪🇪', 'Ethiopia': '🇪🇹', 'Fiji': '🇫🇯',
  'Finland': '🇫🇮', 'France': '🇫🇷', 'Gabon': '🇬🇦', 'Gambia': '🇬🇲', 'Georgia': '🇬🇪',
  'Germany': '🇩🇪', 'Ghana': '🇬🇭', 'Greece': '🇬🇷', 'Grenada': '🇬🇩', 'Guatemala': '🇬🇹',
  'Guinea': '🇬🇳', 'Guinea-Bissau': '🇬🇼', 'Guyana': '🇬🇾', 'Haiti': '🇭🇹', 'Honduras': '🇭🇳',
  'Hungary': '🇭🇺', 'Iceland': '🇮🇸', 'India': '🇮🇳', 'Indonesia': '🇮🇩', 'Iran': '🇮🇷',
  'Iraq': '🇮🇶', 'Ireland': '🇮🇪', 'Israel': '🇮🇱', 'Italy': '🇮🇹', 'Ivory Coast': '🇨🇮',
  'Jamaica': '🇯🇲', 'Japan': '🇯🇵', 'Jordan': '🇯🇴', 'Kazakhstan': '🇰🇿', 'Kenya': '🇰🇪',
  'Kiribati': '🇰🇮', 'Kuwait': '🇰🇼', 'Kyrgyzstan': '🇰🇬', 'Laos': '🇱🇦', 'Latvia': '🇱🇻',
  'Lebanon': '🇱🇧', 'Lesotho': '🇱🇸', 'Liberia': '🇱🇷', 'Libya': '🇱🇾', 'Liechtenstein': '🇱🇮',
  'Lithuania': '🇱🇹', 'Luxembourg': '🇱🇺', 'Macedonia': '🇲🇰', 'Madagascar': '🇲🇬', 'Malawi': '🇲🇼',
  'Malaysia': '🇲🇾', 'Maldives': '🇲🇻', 'Mali': '🇲🇱', 'Malta': '🇲🇹', 'Marshall Islands': '🇲🇭',
  'Mauritania': '🇲🇷', 'Mauritius': '🇲🇺', 'Mexico': '🇲🇽', 'Micronesia': '🇫🇲', 'Moldova': '🇲🇩',
  'Monaco': '🇲🇨', 'Mongolia': '🇲🇳', 'Montenegro': '🇲🇪', 'Morocco': '🇲🇦', 'Mozambique': '🇲🇿',
  'Myanmar': '🇲🇲', 'Namibia': '🇳🇦', 'Nauru': '🇳🇷', 'Nepal': '🇳🇵', 'Netherlands': '🇳🇱',
  'New Zealand': '🇳🇿', 'Nicaragua': '🇳🇮', 'Niger': '🇳🇪', 'Nigeria': '🇳🇬', 'North Korea': '🇰🇵',
  'Norway': '🇳🇴', 'Oman': '🇴🇲', 'Pakistan': '🇵🇰', 'Palau': '🇵🇼', 'Panama': '🇵🇦',
  'Papua New Guinea': '🇵🇬', 'Paraguay': '🇵🇾', 'Peru': '🇵🇪', 'Philippines': '🇵🇭', 'Poland': '🇵🇱',
  'Portugal': '🇵🇹', 'Qatar': '🇶🇦', 'Romania': '🇷🇴', 'Russia': '🇷🇺', 'Rwanda': '🇷🇼',
  'Saint Kitts and Nevis': '🇰🇳', 'Saint Lucia': '🇱🇨', 'Saint Vincent and the Grenadines': '🇻🇨',
  'Samoa': '🇼🇸', 'San Marino': '🇸🇲', 'Sao Tome and Principe': '🇸🇹', 'Saudi Arabia': '🇸🇦',
  'Senegal': '🇸🇳', 'Serbia': '🇷🇸', 'Seychelles': '🇸🇨', 'Sierra Leone': '🇸🇱', 'Singapore': '🇸🇬',
  'Slovakia': '🇸🇰', 'Slovenia': '🇸🇮', 'Solomon Islands': '🇸🇧', 'Somalia': '🇸🇴', 'South Africa': '🇿🇦',
  'South Korea': '🇰🇷', 'South Sudan': '🇸🇸', 'Spain': '🇪🇸', 'Sri Lanka': '🇱🇰', 'Sudan': '🇸🇩',
  'Suriname': '🇸🇷', 'Swaziland': '🇸🇿', 'Sweden': '🇸🇪', 'Switzerland': '🇨🇭', 'Syria': '🇸🇾',
  'Taiwan': '🇹🇼', 'Tajikistan': '🇹🇯', 'Tanzania': '🇹🇿', 'Thailand': '🇹🇭', 'Togo': '🇹🇬',
  'Tonga': '🇹🇴', 'Trinidad and Tobago': '🇹🇹', 'Tunisia': '🇹🇳', 'Turkey': '🇹🇷', 'Turkmenistan': '🇹🇲',
  'Tuvalu': '🇹🇻', 'Uganda': '🇺🇬', 'Ukraine': '🇺🇦', 'United Arab Emirates': '🇦🇪', 'United Kingdom': '🇬🇧',
  'United States': '🇺🇸', 'Uruguay': '🇺🇾', 'Uzbekistan': '🇺🇿', 'Vanuatu': '🇻🇺', 'Vatican City': '🇻🇦',
  'Venezuela': '🇻🇪', 'Vietnam': '🇻🇳', 'Yemen': '🇾🇪', 'Zambia': '🇿🇲', 'Zimbabwe': '🇿🇼',
  'Kosovo': '🇽🇰'
};

// UN M49 Region mapping - countries grouped by continent/sub-continent codes
const UN_REGIONS: { [key: string]: { name: string; countries: string[] } } = {
  // Africa (002)
  '015': { name: 'Northern Africa', countries: ['Algeria', 'Egypt', 'Libya', 'Morocco', 'Sudan', 'South Sudan', 'Tunisia'] },
  '011': { name: 'Western Africa', countries: ['Burkina Faso', 'Benin', 'Côte d\'Ivoire', 'Cabo Verde', 'Ghana', 'Gambia', 'Guinea', 'Guinea-Bissau', 'Ivory Coast', 'Liberia', 'Mali', 'Mauritania', 'Niger', 'Nigeria', 'Sierra Leone', 'Senegal', 'Togo'] },
  '017': { name: 'Middle Africa', countries: ['Angola', 'Democratic Republic of the Congo', 'Central African Republic', 'Congo', 'Republic of Congo', 'Cameroon', 'Gabon', 'Equatorial Guinea', 'Sao Tome and Principe', 'Chad'] },
  '014': { name: 'Eastern Africa', countries: ['Burundi', 'Djibouti', 'Eritrea', 'Ethiopia', 'Kenya', 'Comoros', 'Madagascar', 'Mauritius', 'Malawi', 'Mozambique', 'Rwanda', 'Seychelles', 'Somalia', 'Tanzania', 'Uganda', 'Zambia', 'Zimbabwe'] },
  '018': { name: 'Southern Africa', countries: ['Botswana', 'Lesotho', 'Namibia', 'Eswatini', 'South Africa'] },
  
  // Europe (150)
  '154': { name: 'Northern Europe', countries: ['Denmark', 'Estonia', 'Finland', 'Iceland', 'Ireland', 'Latvia', 'Lithuania', 'Norway', 'Sweden', 'United Kingdom'] },
  '155': { name: 'Western Europe', countries: ['Austria', 'Belgium', 'Switzerland', 'Germany', 'France', 'Liechtenstein', 'Luxembourg', 'Monaco', 'Netherlands'] },
  '151': { name: 'Eastern Europe', countries: ['Bulgaria', 'Belarus', 'Czechia', 'Hungary', 'Moldova', 'Poland', 'Romania', 'Russia', 'Slovakia', 'Ukraine'] },
  '039': { name: 'Southern Europe', countries: ['Andorra', 'Albania', 'Bosnia and Herzegovina', 'Spain', 'Greece', 'Croatia', 'Italy', 'Kosovo', 'Montenegro', 'North Macedonia', 'Malta', 'Serbia', 'Portugal', 'Slovenia', 'San Marino'] },
  
  // Americas (019)
  '021': { name: 'Northern America', countries: ['Canada', 'United States'] },
  '013': { name: 'Central America', countries: ['Bahamas', 'Belize', 'Costa Rica', 'Cuba', 'Guatemala', 'Honduras', 'Jamaica', 'Mexico', 'Nicaragua', 'Panama', 'El Salvador'] },
  '005': { name: 'South America', countries: ['Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 'Guyana', 'Peru', 'Paraguay', 'Suriname', 'Uruguay', 'Venezuela'] },
  
  // Asia (142)
  '143': { name: 'Central Asia', countries: ['Turkmenistan', 'Tajikistan', 'Kyrgyzstan', 'Kazakhstan', 'Uzbekistan'] },
  '030': { name: 'Eastern Asia', countries: ['China', 'Japan', 'North Korea', 'South Korea', 'Mongolia'] },
  '034': { name: 'Southern Asia', countries: ['Afghanistan', 'Bangladesh', 'Bhutan', 'India', 'Iran', 'Sri Lanka', 'Maldives', 'Nepal', 'Pakistan'] },
  '035': { name: 'South-Eastern Asia', countries: ['Brunei', 'Indonesia', 'Cambodia', 'Laos', 'Myanmar', 'Malaysia', 'Philippines', 'Singapore', 'Thailand', 'Vietnam'] },
  '145': { name: 'Western Asia', countries: ['United Arab Emirates', 'Armenia', 'Azerbaijan', 'Bahrain', 'Cyprus', 'Georgia', 'Israel', 'Iraq', 'Jordan', 'Kuwait', 'Lebanon', 'Oman', 'Qatar', 'Saudi Arabia', 'Syria', 'Turkey', 'Yemen'] },
  
  // Oceania (009) - Use continent code for smaller regions
  '009': { name: 'Oceania', countries: ['Australia', 'New Zealand', 'Fiji', 'Papua New Guinea', 'Solomon Islands', 'Vanuatu', 'Samoa', 'Tonga', 'Palau', 'Marshall Islands', 'Micronesia', 'Nauru', 'Kiribati', 'Tuvalu'] }
};

export function generateRandomVisibleRegion(countryData: CountryRow[]): VisibleRegion {
  let attempts = 0;
  const maxAttempts = 50; // Prevent infinite loops
  
  while (attempts < maxAttempts) {
    attempts++;
    
    // Step 1: Pick a random region code
    const regionCodes = Object.keys(UN_REGIONS);
    const selectedRegionCode = regionCodes[Math.floor(Math.random() * regionCodes.length)];
    const selectedRegion = UN_REGIONS[selectedRegionCode];
    
    // Step 2: Filter countries that exist in our dataset
    const availableCountries = selectedRegion.countries.filter(countryName => 
      countryData.some(c => c.Country === countryName)
    );
    
    // Step 3: Only proceed if we have at least 5 countries
    if (availableCountries.length >= 5) {
      // Step 4: Calculate max guesses (1/2 of region size, minimum 3, maximum 15)
      const maxGuesses = Math.max(3, Math.min(15, Math.round(availableCountries.length * 0.5)));
      
      // Step 5: Pick a random target country from the region
      const targetCountryName = availableCountries[Math.floor(Math.random() * availableCountries.length)];
      
      return {
        id: `region-${selectedRegionCode}-${Date.now()}`,
        name: selectedRegion.name,
        countries: availableCountries,
        targetCountry: targetCountryName,
        regionCode: selectedRegionCode,
        maxGuesses: maxGuesses
      };
    }
  }
  
  // Fallback: If we can't find a suitable region after many attempts, create a larger mixed region
  const shuffledCountries = [...countryData].sort(() => Math.random() - 0.5);
  const selectedCountries = shuffledCountries.slice(0, 12).map(c => c.Country);
  const fallbackTarget = selectedCountries[Math.floor(Math.random() * selectedCountries.length)];
  
  return {
    id: `fallback-${Date.now()}`,
    name: 'Mixed Countries',
    countries: selectedCountries,
    targetCountry: fallbackTarget,
    regionCode: '001', // World
    maxGuesses: Math.max(3, Math.min(15, Math.round(selectedCountries.length * 0.5))) // 1/2 of countries
  };
}

export function pickRandomTargetFromVisibleRegion(visibleRegion: VisibleRegion, countryData: CountryRow[]): CountryRow | null {
  // The target country is already determined during region generation
  const targetCountry = countryData.find(country => 
    country.Country === visibleRegion.targetCountry
  );
  
  return targetCountry || null;
}

export function getCountryAbbreviation(countryName: string): string {
  const abbreviationMap: { [key: string]: string } = {
    'United Arab Emirates': 'UAE',
    'Central African Republic': 'CAR',
    'Democratic Republic of the Congo': 'DRC',
    'United States of America': 'USA',
    'United Kingdom': 'UK',
    'Russian Federation': 'Russia',
    'Bosnia and Herzegovina': 'Bosnia',
    'Trinidad and Tobago': 'Trinidad',
    'Papua New Guinea': 'PNG',
    'São Tomé and Príncipe': 'São Tomé',
    'Saint Vincent and the Grenadines': 'St. Vincent',
    'Antigua and Barbuda': 'Antigua',
    'Saint Kitts and Nevis': 'St. Kitts',
    'Dominican Republic': 'Dominican Rep.',
    'Equatorial Guinea': 'Eq. Guinea',
    'Solomon Islands': 'Solomon Is.',
    'Marshall Islands': 'Marshall Is.',
    'Federated States of Micronesia': 'Micronesia',
    'Republic of the Congo': 'Congo',
    'North Macedonia': 'N. Macedonia',
    'Czech Republic': 'Czechia'
  };
  
  return abbreviationMap[countryName] || countryName;
}

export function getGovernmentTypeAbbreviation(governmentType: string): string {
  const abbreviationMap: { [key: string]: string } = {
    'Semi-Presidential Government': 'Semi-Presidential',
    'Presidential Government': 'Presidential',
    'Parliamentary Government': 'Parliamentary',
    'Constitutional Monarchy': 'Constitutional Monarchy',
    'Absolute Monarchy': 'Absolute Monarchy',
    'Federal Republic': 'Federal Republic',
    'Unitary Republic': 'Republic',
    'Democratic Republic': 'Democratic Republic',
    'Socialist Republic': 'Socialist Republic',
    'Islamic Republic': 'Islamic Republic',
    'People\'s Republic': 'People\'s Republic',
    'Federal Parliamentary Republic': 'Federal Parliamentary',
    'Federal Presidential Republic': 'Federal Presidential',
    'Parliamentary Constitutional Monarchy': 'Parliamentary Monarchy',
    'Federal Constitutional Republic': 'Federal Constitutional',
    'Unitary Parliamentary Republic': 'Parliamentary Republic'
  };
  
  return abbreviationMap[governmentType] || governmentType;
}

export function getCountryFlag(countryName: string): string {
  return COUNTRY_FLAGS[countryName] || '🏳️';
}
