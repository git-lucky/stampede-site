export interface CityMarket {
  slug: string;
  name: string;
  state: string;
  region: string;
  headline: string;
  description: string;
  routeIdeas: string[];
  planningNotes: string[];
  nearby: string[];
}

export const priorityCities: CityMarket[] = [
  {
    slug: 'new-york-city',
    name: 'New York City',
    state: 'NY',
    region: 'New York Metro',
    headline: 'New York City team building for companies that need an event worth the calendar space.',
    description:
      'Stampede builds New York City corporate scavenger hunts for offsites, conferences, leadership teams, and client-facing events that need real energy and polished logistics.',
    routeIdeas: ['Midtown and Flatiron clue routes', 'SoHo and downtown photo challenges', 'Custom missions near your hotel, office, or event venue'],
    planningNotes: ['Best for high-density corporate groups and visiting teams', 'Works well before dinner, after a conference block, or as a half-day offsite', 'Routes are built around timing, crowd flow, and transit realities'],
    nearby: ['Jersey City', 'Brooklyn', 'Queens', 'Hoboken'],
  },
  {
    slug: 'los-angeles',
    name: 'Los Angeles',
    state: 'CA',
    region: 'Southern California',
    headline: 'Los Angeles team building with creative challenges and big-market polish.',
    description:
      'Stampede creates Los Angeles scavenger hunts and corporate team building games for entertainment, tech, agency, healthcare, and professional-services teams.',
    routeIdeas: ['Downtown LA routes', 'Santa Monica and Culver City missions', 'Custom creative prompts built around your team culture'],
    planningNotes: ['Strong fit for retreats, production teams, and client events', 'Neighborhood-specific routing keeps travel simple', 'Hosted and self-guided formats available'],
    nearby: ['Santa Monica', 'Culver City', 'Burbank', 'Pasadena'],
  },
  {
    slug: 'chicago',
    name: 'Chicago',
    state: 'IL',
    region: 'Chicagoland',
    headline: 'Chicago team building that turns a corporate outing into a city-wide game.',
    description:
      'Stampede designs Chicago corporate scavenger hunts for large employers, conference groups, sales teams, and departments that want a shared win outside the meeting room.',
    routeIdeas: ['Loop and River North clue routes', 'Architecture and public-art photo challenges', 'Company-custom puzzles near your meeting venue'],
    planningNotes: ['Excellent for conferences and multi-office gatherings', 'Routes can start near hotels, offices, or event spaces', 'Built for clear kickoff, scoring, and finish-line moments'],
    nearby: ['Evanston', 'Oak Brook', 'Schaumburg', 'Naperville'],
  },
  {
    slug: 'houston',
    name: 'Houston',
    state: 'TX',
    region: 'Gulf Coast Texas',
    headline: 'Houston team building games built for a major corporate market.',
    description:
      'Stampede creates Houston scavenger hunts for energy, healthcare, aerospace, finance, and professional-services teams that need practical routing and high group energy.',
    routeIdeas: ['Downtown Houston missions', 'Museum District photo prompts', 'Custom challenges near your hotel, office, or conference venue'],
    planningNotes: ['Useful for enterprise teams and conference groups', 'Routes are planned around timing, weather, and start locations', 'Self-guided, remote-hosted, and hosted tiers available'],
    nearby: ['The Woodlands', 'Sugar Land', 'Katy', 'Pearland'],
  },
  {
    slug: 'dallas',
    name: 'Dallas',
    state: 'TX',
    region: 'Dallas-Fort Worth',
    headline: 'Dallas team building for headquarters teams, sales kickoffs, and corporate offsites.',
    description:
      'Stampede builds Dallas corporate scavenger hunts for companies that want a polished team event with clues, creative challenges, scoring, and support handled end to end.',
    routeIdeas: ['Downtown Dallas clue routes', 'Arts District and plaza challenges', 'Custom missions near your office, hotel, or meeting venue'],
    planningNotes: ['Strong fit for large employers and multi-office teams', 'Can serve Dallas, Fort Worth, Plano, Irving, and Frisco plans', 'Hosted, remote-hosted, and self-guided event tiers'],
    nearby: ['Fort Worth', 'Plano', 'Irving', 'Frisco'],
  },
  {
    slug: 'oklahoma-city',
    name: 'Oklahoma City',
    state: 'OK',
    region: 'Central Oklahoma',
    headline: 'Oklahoma City team building from the home base of Stampede.',
    description:
      'Stampede is based in Oklahoma City and builds OKC corporate scavenger hunts, company outings, and team building games with local route knowledge and polished event support.',
    routeIdeas: ['Downtown and Bricktown routes', 'Arts district photo challenges', 'Custom missions near your office, hotel, or meeting venue'],
    planningNotes: ['Local route planning from our Oklahoma City home base', 'Great for OKC employers, visiting teams, conferences, and employee appreciation events', 'Works for teams based in OKC, Edmond, Norman, Moore, and nearby suburbs'],
    nearby: ['Edmond', 'Norman', 'Moore', 'Yukon'],
  },
  {
    slug: 'atlanta',
    name: 'Atlanta',
    state: 'GA',
    region: 'Metro Atlanta',
    headline: 'Atlanta team building for busy companies and conference-heavy calendars.',
    description:
      'Stampede creates Atlanta scavenger hunts and corporate games for headquarters teams, regional offices, convention groups, and growing companies.',
    routeIdeas: ['Midtown and downtown clue routes', 'BeltLine-adjacent photo missions', 'Custom company trivia and values challenges'],
    planningNotes: ['Great for regional meetings and employee appreciation events', 'Routes can fit tight agendas or larger half-day outings', 'We handle game setup, instructions, and scoring'],
    nearby: ['Sandy Springs', 'Marietta', 'Decatur', 'Alpharetta'],
  },
  {
    slug: 'washington-dc',
    name: 'Washington, D.C.',
    state: 'DC',
    region: 'Capital Region',
    headline: 'Washington, D.C. team building for associations, agencies, and corporate groups.',
    description:
      'Stampede designs Washington, D.C. corporate scavenger hunts for teams that want a smart, active event near offices, hotels, convention spaces, and landmarks.',
    routeIdeas: ['Downtown DC clue loops', 'Monument-adjacent photo challenges', 'Custom association or policy-themed prompts'],
    planningNotes: ['Strong fit for conferences, nonprofits, agencies, and professional services', 'Routes are built around security, walkability, and timing', 'Works for local and visiting teams'],
    nearby: ['Arlington', 'Alexandria', 'Bethesda', 'Silver Spring'],
  },
  {
    slug: 'miami',
    name: 'Miami',
    state: 'FL',
    region: 'South Florida',
    headline: 'Miami team building with local color and corporate-grade logistics.',
    description:
      'Stampede builds Miami scavenger hunts for finance, hospitality, tech, healthcare, and conference teams that want movement, collaboration, and a memorable finish.',
    routeIdeas: ['Brickell and downtown routes', 'Wynwood photo missions', 'Custom challenges around your retreat or conference venue'],
    planningNotes: ['Great for visiting teams and incentive trips', 'Neighborhood-specific routing keeps the day efficient', 'Hosted and self-guided options available'],
    nearby: ['Fort Lauderdale', 'Coral Gables', 'Doral', 'Miami Beach'],
  },
  {
    slug: 'philadelphia',
    name: 'Philadelphia',
    state: 'PA',
    region: 'Greater Philadelphia',
    headline: 'Philadelphia team building for corporate groups that want substance and momentum.',
    description:
      'Stampede creates Philadelphia scavenger hunts for healthcare, education, finance, legal, and professional-services teams looking for an active shared experience.',
    routeIdeas: ['Center City clue routes', 'Old City and museum-area missions', 'Custom company prompts near your event venue'],
    planningNotes: ['Useful for conferences, department outings, and leadership retreats', 'Routes can start from major hotels or offices', 'Flexible timing for lunch-to-finish or afternoon events'],
    nearby: ['Camden', 'King of Prussia', 'Cherry Hill', 'Wilmington'],
  },
  {
    slug: 'phoenix',
    name: 'Phoenix',
    state: 'AZ',
    region: 'Greater Phoenix',
    headline: 'Phoenix team building for fast-growing companies and desert offsites.',
    description:
      'Stampede designs Phoenix corporate scavenger hunts for tech, healthcare, finance, manufacturing, and regional teams that want easy logistics and real participation.',
    routeIdeas: ['Downtown Phoenix missions', 'Scottsdale and Tempe-adjacent routes', 'Custom prompts near resorts, offices, or conference spaces'],
    planningNotes: ['Strong fit for retreats and regional sales meetings', 'Routes are planned around heat, timing, and transportation', 'Works for hosted and self-guided play'],
    nearby: ['Scottsdale', 'Tempe', 'Mesa', 'Chandler'],
  },
  {
    slug: 'boston',
    name: 'Boston',
    state: 'MA',
    region: 'Greater Boston',
    headline: 'Boston team building for innovation teams, healthcare groups, and corporate offsites.',
    description:
      'Stampede creates Boston scavenger hunts for biotech, healthcare, finance, higher ed, consulting, and technology teams that need a smart team event.',
    routeIdeas: ['Back Bay and downtown clue routes', 'Seaport photo challenges', 'Custom innovation-themed missions'],
    planningNotes: ['Great for leadership teams, conferences, and recruiting events', 'Walkable routes can fit compact agendas', 'Built around your start and finish locations'],
    nearby: ['Cambridge', 'Somerville', 'Brookline', 'Newton'],
  },
  {
    slug: 'seattle',
    name: 'Seattle',
    state: 'WA',
    region: 'Puget Sound',
    headline: 'Seattle team building for tech teams, headquarters groups, and visiting offices.',
    description:
      'Stampede builds Seattle corporate scavenger hunts with route-aware clues, creative collaboration prompts, and flexible support for teams that move fast.',
    routeIdeas: ['Downtown and waterfront routes', 'South Lake Union missions', 'Custom tech and product-themed challenges'],
    planningNotes: ['Strong fit for tech, retail, cloud, and professional-services teams', 'Can run near offices, hotels, or retreat venues', 'Hosted, remote-hosted, and self-guided options'],
    nearby: ['Bellevue', 'Redmond', 'Kirkland', 'Tacoma'],
  },
  {
    slug: 'san-francisco',
    name: 'San Francisco',
    state: 'CA',
    region: 'Bay Area',
    headline: 'San Francisco team building for high-output teams that need a real reset.',
    description:
      'Stampede creates San Francisco scavenger hunts for tech, finance, startup, healthcare, and professional-services groups that want a polished outdoor team experience.',
    routeIdeas: ['Financial District and Embarcadero routes', 'Mission and SoMa creative challenges', 'Custom startup, product, or values-based missions'],
    planningNotes: ['Great for offsites, all-hands weeks, and visiting teams', 'Routes are planned around hills, transit, and timing', 'Can support small leadership teams or larger departments'],
    nearby: ['Oakland', 'Berkeley', 'San Mateo', 'Palo Alto'],
  },
  {
    slug: 'austin',
    name: 'Austin',
    state: 'TX',
    region: 'Central Texas',
    headline: 'Austin team building with tech-market energy and zero spreadsheet chaos.',
    description:
      'Stampede creates Austin corporate scavenger hunts that help teams explore, collaborate, and compete without asking your organizer to become an event producer.',
    routeIdeas: ['Downtown Austin clue routes', 'Music and mural photo missions', 'Custom challenges near your offsite venue'],
    planningNotes: ['Great for retreats, conference groups, and hybrid teams meeting in Austin', 'Flexible for tight agendas or half-day outings', 'Hosted support available for larger groups'],
    nearby: ['Round Rock', 'Cedar Park', 'Georgetown', 'San Marcos'],
  },
  {
    slug: 'denver',
    name: 'Denver',
    state: 'CO',
    region: 'Front Range Colorado',
    headline: 'Denver team building that gets your group out of the conference room.',
    description:
      'Stampede creates Denver corporate scavenger hunts with city-aware routes, creative prompts, and game support for teams of many sizes.',
    routeIdeas: ['Downtown Denver missions', 'RiNo and arts district challenges', 'Custom clues around your offsite or hotel'],
    planningNotes: ['Great for visiting teams and offsite groups', 'Designed around timing, walkability, and weather backup plans', 'Works for hosted, remote-hosted, or self-guided play'],
    nearby: ['Aurora', 'Lakewood', 'Boulder', 'Golden'],
  },
  {
    slug: 'charlotte',
    name: 'Charlotte',
    state: 'NC',
    region: 'Charlotte Metro',
    headline: 'Charlotte team building for finance, tech, and fast-growing corporate teams.',
    description:
      'Stampede builds Charlotte scavenger hunts for banks, fintech teams, healthcare groups, consulting firms, and regional offices that want a crisp team event.',
    routeIdeas: ['Uptown Charlotte clue routes', 'South End photo missions', 'Custom finance, leadership, or culture prompts'],
    planningNotes: ['Strong fit for corporate campuses and headquarters teams', 'Useful for onboarding, retreats, and celebration days', 'Built around your group size and finish-line plan'],
    nearby: ['Concord', 'Huntersville', 'Matthews', 'Fort Mill'],
  },
  {
    slug: 'nashville',
    name: 'Nashville',
    state: 'TN',
    region: 'Middle Tennessee',
    headline: 'Nashville team building with music-city energy and organized game flow.',
    description:
      'Stampede builds Nashville scavenger hunts for corporate retreats, sales kickoffs, conferences, healthcare teams, and celebration days that need a lively group experience.',
    routeIdeas: ['Downtown Nashville clue routes', 'Music and mural photo missions', 'Custom company challenges near your venue'],
    planningNotes: ['Strong fit for traveling teams and conference groups', 'Built to pair with dinner, awards, or a closing happy hour', 'We handle the route, instructions, and scoring'],
    nearby: ['Franklin', 'Brentwood', 'Murfreesboro', 'Hendersonville'],
  },
  {
    slug: 'minneapolis',
    name: 'Minneapolis',
    state: 'MN',
    region: 'Twin Cities',
    headline: 'Minneapolis team building for headquarters teams and corporate event calendars.',
    description:
      'Stampede creates Minneapolis scavenger hunts for retail, healthcare, finance, manufacturing, and professional-services teams that want a shared story beyond the meeting room.',
    routeIdeas: ['Downtown Minneapolis missions', 'North Loop photo challenges', 'Custom prompts near your office, hotel, or event venue'],
    planningNotes: ['Works for headquarters teams, retreats, and employee appreciation events', 'Can support Minneapolis and St. Paul plans', 'Routes are designed around timing, weather, and walkability'],
    nearby: ['St. Paul', 'Bloomington', 'Edina', 'Eden Prairie'],
  },
  {
    slug: 'raleigh-durham',
    name: 'Raleigh-Durham',
    state: 'NC',
    region: 'Research Triangle',
    headline: 'Raleigh-Durham team building for research, tech, healthcare, and university-adjacent teams.',
    description:
      'Stampede designs Raleigh-Durham corporate scavenger hunts for innovation teams, life-science groups, startups, higher-ed partners, and regional offices.',
    routeIdeas: ['Downtown Raleigh routes', 'Durham and campus-adjacent missions', 'Custom research, product, or culture-themed prompts'],
    planningNotes: ['Strong fit for Research Triangle companies and visiting teams', 'Works for team offsites, onboarding, and leadership retreats', 'Built around your start location and timing window'],
    nearby: ['Cary', 'Chapel Hill', 'Apex', 'Morrisville'],
  },
];
