/* ============================================================================
   SEO · AEO · GEO
   ----------------------------------------------------------------------------
   SEO  — classic crawl/index/rank: titles, descriptions, canonicals, sitemap.
   AEO  — answer engines: FAQPage, answer-first blocks, speakable, direct answers.
   GEO  — generative engines: a linked-entity graph, llms.txt, per-page markdown,
          explicit AI-crawler permission, and figures that carry a grade and a date
          so a model citing this site cites something checkable.

   Everything here is derived from src/data. Nothing is asserted that the site
   cannot back up — an unpurchasable product gets no InStock offer, an unknown
   ISBN is omitted rather than invented.
   ========================================================================== */

const { site } = require('./data/site');

const ORIGIN = `https://${site.domain}`;
const BUILD_DATE = '2026-08-26';           // as-at date for the whole corpus

const ID = {
  person: `${ORIGIN}/#person`,
  org: `${ORIGIN}/#organization`,
  website: `${ORIGIN}/#website`,
  stack: `${ORIGIN}/the-stack/#stack`
};

const url = p => ORIGIN + p;
const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* Strip HTML and collapse whitespace — used to derive text for schema fields. */
const plain = s => String(s || '')
  .replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

/* ------------------------------------------------------------ GLOBAL NODES */
/* Emitted once per page inside an @graph, so every page links to the same
   entity ids. This is what lets a knowledge graph — and an LLM — resolve
   "M. K. Elango" to one consistent thing across 58 URLs.                     */

function personNode() {
  return {
    '@type': 'Person',
    '@id': ID.person,
    name: 'M. K. Elango',
    alternateName: ['M K Elango', 'MK Elango'],
    givenName: 'Elango',
    url: url('/about/'),
    jobTitle: 'Strategist and author',
    description:
      'Strategist working with family business groups and AI-era founders on portfolio ' +
      'architecture, organisational velocity, AI compounding, computed goal systems and ' +
      'fast market entry. Author of five books.',
    knowsAbout: [
      'Portfolio architecture', 'Family business governance', 'Organisational velocity',
      'AI implementation strategy', 'Goal systems', 'Market entry strategy',
      'Corporate coherence', 'Business framework design'
    ],
    knowsLanguage: [
      { '@type': 'Language', name: 'English', alternateName: 'en' },
      { '@type': 'Language', name: 'Tamil', alternateName: 'ta' }
    ],
    nationality: { '@type': 'Country', name: 'India' },
    worksFor: { '@id': ID.org },
    /* No sameAs yet — sameAs must identify the SAME entity (a social profile,
       a Wikidata item). The venture sites are separate organisations and are
       modelled as their own nodes below. Add real profiles when they exist. */
    mainEntityOfPage: url('/about/')
  };
}

/* The ventures, as their own entities. `founder` belongs on the Organization,
   not on the Person — this is the correct direction of the relation. */
const VENTURES = [
  { id: 'startnet',  name: 'StartNet',            url: 'https://startnet.in', desc: 'The infrastructure behind Tamil Nadu’s AI startup ecosystem.' },
  { id: 'elanone',   name: 'ElanOne',             url: 'https://elan1.ai',    desc: 'Governed agentic business applications with a human approval gate.' },
  { id: 'publytics', name: 'Publytics',           url: 'https://publytics.in', desc: null },
  { id: 'thinktn',   name: 'Think TN Foundation', url: 'https://thinktn.org', desc: 'An independent Tamil Nadu policy institution.', ngo: true }
];

function ventureNodes() {
  return VENTURES.map(v => prune({
    '@type': v.ngo ? 'NGO' : 'Organization',
    '@id': `${ORIGIN}/#${v.id}`,
    name: v.name,
    url: v.url,
    description: v.desc || undefined,
    founder: { '@id': ID.person }
  }));
}

function orgNode() {
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ID.org,
    name: 'M. K. Elango',
    url: ORIGIN,
    slogan: site.verb,
    foundingDate: '2026',
    founder: { '@id': ID.person },
    description:
      'Advisory practice installing five named systems — portfolio architecture, ' +
      'organisational velocity, an AI engine, a computed goal system and a fast-entry method — ' +
      'for family business groups, founders and large organisations.',
    knowsLanguage: ['en', 'ta'],
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'Place', name: 'Gulf Cooperation Council' },
      { '@type': 'Place', name: 'South-East Asia' }
    ],
    address: { '@type': 'PostalAddress', addressRegion: 'Tamil Nadu', addressCountry: 'IN' },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Business enquiries',
      url: url('/contact/'),
      availableLanguage: ['English', 'Tamil']
    },
    publishingPrinciples: url('/evidence/'),
    correctionsPolicy: url('/evidence/'),
    logo: { '@type': 'ImageObject', url: url('/assets/img/logo-512.png'), width: 512, height: 512 },
    image: url('/assets/img/logo-512.png')
  };
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    url: ORIGIN,
    name: 'M. K. Elango',
    description: site.verb,
    publisher: { '@id': ID.org },
    inLanguage: ['en-IN', 'ta-IN']
  };
}

/* ------------------------------------------------------------- PAGE NODES */

function breadcrumbNode(pagePath, crumbs) {
  if (!crumbs || crumbs.length < 2) return null;
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url(pagePath)}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: c.href ? url(c.href) : url(pagePath)
    }))
  };
}

function webPageNode({ path, title, description, crumbs, seo, type = 'WebPage', dateModified }) {
  const node = {
    '@type': type,
    '@id': `${url(path)}#webpage`,
    url: url(path),
    name: title,
    description,
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.person },
    inLanguage: path === '/ta/' ? 'ta-IN' : 'en-IN',
    datePublished: BUILD_DATE,
    dateModified: dateModified || BUILD_DATE,
    author: { '@id': ID.person },
    publisher: { '@id': ID.org },
    primaryImageOfPage: path === '/404/'
      ? undefined
      : { '@type': 'ImageObject', url: ogImageURL(path), width: 1200, height: 630 }
  };
  const out = prune(node);
  if (crumbs && crumbs.length > 1) out.breadcrumb = { '@id': `${url(path)}#breadcrumb` };
  /* Speakable marks the answer-first block — the passage built to be read aloud
     or lifted verbatim by an answer engine. */
  if (seo && seo.answer) {
    out.speakable = {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.answer-block__a', 'h1']
    };
  }
  return out;
}

function faqNode(path, faqs) {
  if (!faqs || !faqs.length) return null;
  return {
    '@type': 'FAQPage',
    '@id': `${url(path)}#faq`,
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: plain(f.q),
      acceptedAnswer: { '@type': 'Answer', text: plain(f.a) }
    }))
  };
}

/* ------------------------------------------------- TYPED ENTITY BUILDERS */

function bookNode(b) {
  const node = {
    '@type': 'Book',
    '@id': `${url('/books/' + b.slug + '/')}#book`,
    name: b.title,
    url: url('/books/' + b.slug + '/'),
    author: { '@id': ID.person },
    publisher: { '@id': ID.org },
    inLanguage: 'en',
    abstract: plain(b.prop),
    description: clip(plain(b.onePage), 480),
    genre: ['Business', 'Strategy', 'Management'],
    about: (b.keywords || []).length ? b.keywords : undefined,
    isPartOf: {
      '@type': 'BookSeries',
      '@id': ID.stack,
      name: 'The Elango Stack',
      description: 'Six books, one argument, read at five altitudes.',
      url: url('/the-stack/')
    },
    image: ogImageURL('/books/' + b.slug + '/'),
    workExample: b.status === 'available' ? {
      '@type': 'Book',
      bookFormat: 'https://schema.org/Paperback',
      inLanguage: 'en'
    } : undefined
  };
  /* No ISBN is invented. It is added when one is issued. */
  if (b.status === 'forthcoming') node.datePublished = undefined;
  return prune(node);
}

/* Programmes have a syllabus and run again — Course is the accurate type. */
function courseNode(p, bookTitle) {
  const band = parseBand(p.price);
  return prune({
    '@type': 'Course',
    '@id': `${url('/programs/' + p.slug + '/')}#course`,
    name: p.title,
    url: url('/programs/' + p.slug + '/'),
    description: plain(p.lede),
    provider: { '@id': ID.org },
    author: { '@id': ID.person },
    inLanguage: p.slug === 'cci-sprint' ? ['en', 'ta'] : 'en',
    educationalLevel: 'Professional',
    teaches: p.outputs,
    isBasedOn: bookTitle ? { '@type': 'Book', name: bookTitle } : undefined,
    coursePrerequisites: plain(p.forWhom),
    syllabusSections: (p.phases || []).map((ph, i) => ({
      '@type': 'Syllabus',
      position: i + 1,
      name: plain(ph.t),
      description: plain(ph.d)
    })),
    image: ogImageURL('/programs/' + p.slug + '/'),
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
      courseWorkload: p.duration,
      inLanguage: p.slug === 'cci-sprint' ? ['en', 'ta'] : 'en',
      location: { '@type': 'Place', address: { '@type': 'PostalAddress', addressCountry: 'IN' } }
    },
    offers: band ? {
      '@type': 'Offer',
      category: 'Advisory programme',
      availability: 'https://schema.org/LimitedAvailability',
      url: url('/programs/' + p.slug + '/'),
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'INR',
        minPrice: band.min,
        maxPrice: band.max,
        valueAddedTaxIncluded: false
      }
    } : undefined
  });
}

function serviceNode(c) {
  const band = parseBand(c.price);
  return prune({
    '@type': 'Service',
    '@id': `${url('/coaching/' + c.slug + '/')}#service`,
    name: c.title,
    url: url('/coaching/' + c.slug + '/'),
    serviceType: 'Executive and portfolio advisory',
    image: ogImageURL('/coaching/' + c.slug + '/'),
    description: plain(c.lede),
    provider: { '@id': ID.org },
    areaServed: [{ '@type': 'Country', name: 'India' }, { '@type': 'Place', name: 'Gulf Cooperation Council' }],
    audience: { '@type': 'BusinessAudience', audienceType: plain(c.forWhom) },
    offers: band ? {
      '@type': 'Offer',
      availability: c.seats && c.seats.open === 0
        ? 'https://schema.org/SoldOut' : 'https://schema.org/LimitedAvailability',
      url: url('/coaching/' + c.slug + '/'),
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'INR', minPrice: band.min, maxPrice: band.max,
        valueAddedTaxIncluded: false
      }
    } : undefined
  });
}

function eventNode(e) {
  /* An event with no date is not an Event. It gets no node until it is scheduled. */
  if (e.scheduled === false || !(e.startISO || e.dateISO)) return null;
  const band = parseBand(e.price);
  const virtual = e.format === 'VIRTUAL';
  /* The display string is "Rotating · Coimbatore, Chennai…" — the schema needs
     the actual next city, which the data already holds. */
  const city = (e.next && e.next.place && e.next.place !== 'Virtual')
    ? e.next.place : plain(e.city).split(' · ').pop().split(',')[0].trim();
  return prune({
    '@type': 'BusinessEvent',
    '@id': `${url('/events/' + e.slug + '/')}#event`,
    name: e.title,
    url: url('/events/' + e.slug + '/'),
    description: plain(e.lede),
    startDate: e.startISO || e.dateISO,
    endDate: e.endISO || undefined,
    eventAttendanceMode: virtual
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    organizer: { '@id': ID.org },
    performer: { '@id': ID.person },
    inLanguage: e.tamil ? ['ta', 'en'] : 'en',
    maximumAttendeeCapacity: e.seats && e.seats.total ? e.seats.total : undefined,
    remainingAttendeeCapacity: e.seats && e.seats.open != null ? e.seats.open : undefined,
    audience: { '@type': 'BusinessAudience', audienceType: plain(e.who) },
    location: virtual
      ? { '@type': 'VirtualLocation', url: url('/events/' + e.slug + '/') }
      : {
          '@type': 'Place',
          name: city,
          address: {
            '@type': 'PostalAddress',
            addressLocality: city,
            addressCountry: city === 'Singapore' ? 'SG' : city === 'Dubai' ? 'AE' : 'IN'
          }
        },
    image: ogImageURL('/events/' + e.slug + '/'),
    offers: band ? {
      '@type': 'Offer',
      url: url('/events/' + e.slug + '/'),
      priceCurrency: 'INR',
      /* A band is published as a range; a single `price` would assert a
         precision the page does not claim. */
      ...(band.min === band.max
        ? { price: band.min }
        : { priceSpecification: {
              '@type': 'PriceSpecification', priceCurrency: 'INR',
              minPrice: band.min, maxPrice: band.max } }),
      availability: !(e.seats && e.seats.open > 0)
        ? 'https://schema.org/SoldOut'
        : (e.openFrom ? 'https://schema.org/PreOrder' : 'https://schema.org/LimitedAvailability'),
      validFrom: e.openFrom || BUILD_DATE
    } : undefined
  });
}

/* A diagnostic is a real interactive tool that runs in the browser — not an article. */
function diagnosticNode(d) {
  return prune({
    '@type': ['WebApplication', 'Quiz'],
    '@id': `${url('/diagnostics/' + d.slug + '/')}#tool`,
    name: d.title,
    url: url('/diagnostics/' + d.slug + '/'),
    description: plain(d.what),
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any modern browser',
    browserRequirements: 'Requires JavaScript',
    author: { '@id': ID.person },
    provider: { '@id': ID.org },
    inLanguage: 'en',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'INR' },
    educationalUse: 'Self-assessment',
    image: ogImageURL('/diagnostics/' + d.slug + '/'),
    about: { '@type': 'Thing', name: d.short },
    isBasedOn: { '@type': 'Book', name: d.engine.book ? d.engine.book.title : undefined }
  });
}

function articleNode(i, bookTitle) {
  return prune({
    '@type': 'Article',
    '@id': `${url('/ideas/' + i.slug + '/')}#article`,
    headline: i.title,
    alternativeHeadline: plain(i.dek),
    url: url('/ideas/' + i.slug + '/'),
    description: plain(i.dek),
    datePublished: isoDate(i.date),
    dateModified: isoDate(i.date),
    author: { '@id': ID.person },
    publisher: { '@id': ID.org },
    inLanguage: 'en',
    articleSection: i.layer,
    wordCount: plain(i.body).split(/\s+/).length,
    timeRequired: 'PT' + (parseInt(i.read, 10) || 6) + 'M',
    isBasedOn: bookTitle ? { '@type': 'Book', name: bookTitle } : undefined,
    isPartOf: { '@id': ID.website },
    mainEntityOfPage: url('/ideas/' + i.slug + '/'),
    image: ogImageURL('/ideas/' + i.slug + '/')
  });
}

function productNode(item, path) {
  const price = parsePrice(item.price);
  return prune({
    '@type': 'Product',
    name: item.name,
    description: plain(item.line),
    brand: { '@id': ID.org },
    category: item.tag,
    offers: price != null ? {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price,
      /* PreOrder, honestly: the price is published and interest can be registered,
         but payments are not connected yet. Switch to InStock at launch. */
      availability: 'https://schema.org/PreOrder',
      url: url(path),
      seller: { '@id': ID.org }
    } : undefined
  });
}

function podcastNode(episodes) {
  return {
    '@type': 'PodcastSeries',
    '@id': `${url('/show/')}#podcast`,
    name: 'The Inevitable',
    url: url('/show/'),
    description: 'Conversations with people who made something certain.',
    author: { '@id': ID.person },
    inLanguage: 'en',
    webFeed: url('/feed.xml'),
    hasPart: episodes.slice(0, 10).map(e => ({
      '@type': 'PodcastEpisode',
      name: e.title,
      episodeNumber: parseInt(e.n, 10),
      description: plain(e.dek),
      datePublished: isoDate(e.date),
      timeRequired: 'PT' + (parseInt(e.len, 10) || 45) + 'M',
      partOfSeries: { '@id': `${url('/show/')}#podcast` }
    }))
  };
}

function itemListNode(path, name, items) {
  return {
    '@type': 'ItemList',
    '@id': `${url(path)}#list`,
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: url(it.href)
    }))
  };
}

/* --------------------------------------------------------------- HELPERS */

/* "₹18L – ₹60L" → { min: 1800000, max: 6000000 }.  Indian units, honestly parsed. */
function parseBand(s) {
  if (!s) return null;
  const nums = [];
  if (/\bfree\b/i.test(s)) nums.push(0);   /* "Free – ₹9,500" has a floor of 0 */
  const re = /₹\s*([\d,.]+)\s*(cr|L|l)?/g;
  let m;
  while ((m = re.exec(s))) {
    let v = parseFloat(String(m[1]).replace(/,/g, ''));
    if (isNaN(v)) continue;
    const unit = (m[2] || '').toLowerCase();
    if (unit === 'cr') v *= 10000000;
    else if (unit === 'l') v *= 100000;
    nums.push(Math.round(v));
  }
  if (!nums.length) return null;
  return { min: Math.min(...nums), max: Math.max(...nums) };
}

function parsePrice(s) {
  const b = parseBand(s);
  return b ? b.min : null;
}

function isoDate(s) {
  const M = { January: '01', February: '02', March: '03', April: '04', May: '05', June: '06',
              July: '07', August: '08', September: '09', October: '10', November: '11', December: '12' };
  const m = /(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/.exec(String(s || ''));
  if (!m || !M[m[2]]) return BUILD_DATE;
  return `${m[3]}-${M[m[2]]}-${String(m[1]).padStart(2, '0')}`;
}

/* Never end a schema string mid-word. */
function clip(s, n) {
  s = String(s || '').trim();
  if (s.length <= n) return s;
  const cut = s.slice(0, n);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:—–-]$/, '') + '…';
}

/* Remove undefined/empty branches so no empty schema properties are published. */
function prune(o) {
  if (Array.isArray(o)) return o.map(prune).filter(v => v !== undefined);
  if (o && typeof o === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(o)) {
      const p = prune(v);
      if (p === undefined || p === null) continue;
      if (Array.isArray(p) && !p.length) continue;
      if (typeof p === 'object' && !Array.isArray(p) && !Object.keys(p).length) continue;
      out[k] = p;
    }
    return out;
  }
  return o;
}

const ogImageURL = p =>
  url('/assets/og/' + (p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace(/\//g, '-')) + '.png');

/* ------------------------------------------------------------- RENDERING */

function jsonLd(nodes) {
  const graph = nodes.filter(Boolean).map(prune);
  return `<script type="application/ld+json">${
    JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
      .replace(/</g, '\\u003c')
  }</script>`;
}

module.exports = {
  ORIGIN, ID, BUILD_DATE, url, esc, plain, ogImageURL,
  personNode, orgNode, ventureNodes, websiteNode, webPageNode, breadcrumbNode, faqNode,
  bookNode, courseNode, serviceNode, eventNode, diagnosticNode, articleNode,
  productNode, podcastNode, itemListNode,
  parseBand, parsePrice, isoDate, prune, clip, jsonLd
};
