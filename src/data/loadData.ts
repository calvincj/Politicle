export interface CountryRow {
  Country: string;
  Population: number;
  'GDP per Capita': number;
  LDI: number;
  Government: string;
  Continent: string;
}

export interface CountryByContinent {
  [continent: string]: CountryRow[];
}

function normalizeNumeric(value: string): number {
  if (value === 'NA' || value === '' || value === undefined) {
    return 0;
  }
  // Remove commas and convert to number
  const cleaned = value.toString().replace(/,/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

export async function loadCountryData(): Promise<CountryByContinent> {
  try {
    // Get the base URL for assets
    const baseUrl = import.meta.env.BASE_URL || '/';
    
    // Load CSV data
    const csvResponse = await fetch(`${baseUrl}UN_Countries_Merged_2.csv`);
    const csvText = await csvResponse.text();
    
    // Load continent mapping
    const continentResponse = await fetch(`${baseUrl}countries-continents.json`);
    const continentMapping: { [country: string]: string } = await continentResponse.json();
    
    // Parse CSV
    const lines = csvText.trim().split('\n');
    
    const countries: CountryRow[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      if (values.length >= 5) {
        const country = values[0].trim();
        const continent = continentMapping[country] || 'Unknown';
        
        countries.push({
          Country: country,
          Population: normalizeNumeric(values[1]),
          'GDP per Capita': normalizeNumeric(values[2]),
          LDI: normalizeNumeric(values[3]),
          Government: values[4].trim(),
          Continent: continent
        });
      }
    }
    
    // Group by continent
    const byContinent: CountryByContinent = {};
    
    countries.forEach(country => {
      if (!byContinent[country.Continent]) {
        byContinent[country.Continent] = [];
      }
      byContinent[country.Continent].push(country);
    });
    
    return byContinent;
  } catch (error) {
    console.error('Error loading country data:', error);
    return {};
  }
}

export function pickRandomTarget(continent: string, byContinent: CountryByContinent): CountryRow | null {
  const pool = byContinent[continent];
  if (!pool || pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}
