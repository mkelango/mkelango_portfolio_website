/* The route table. One entry per URL in the sitemap (Part 6.1 of the strategy). */

const { stack } = require('./data/stack');
const { programs } = require('./data/programs');
const { events } = require('./data/events');
const { coaching } = require('./data/coaching');
const { diagnostics } = require('./data/diagnostics');
const { ideas, showEpisodes, shopInstruments, shopDigital, evidenceStandard } = require('./data/misc');
const { byId } = require('./data/stack');
const SEO = require('./seo');

/* Breadcrumb trails, declared once, consumed by both the visible crumb and
   the BreadcrumbList node. */
const HOME = { label: 'Home', href: '/' };
const crumb = (...rest) => [HOME, ...rest];

const listOf = (path, name, items) => SEO.itemListNode(path, name, items);

const P = n => require('./pages/' + n);

const routes = [
  { path: '/', title: 'Home',
    desc: 'Most ambition fails for want of structure, not courage. M. K. Elango installs the five systems that turn an impossible objective into a schedule.',
    render: () => P('home')() },

  /* ---------------------------------------------------------------- ABOUT */
  { path: '/about/', title: 'The Story',
    desc: 'Ten years with founders, one pattern, and the correction that produced an evidence standard. One page, four movements, no résumé.',
    render: () => P('about')() },

  { path: '/the-stack/', title: 'The Stack',
    desc: 'Six books, one argument, read at five altitudes — plus the case that all five ran at once.',
    render: () => P('the-stack')() },

  { path: '/the-portfolio/', title: 'The Portfolio',
    desc: 'Three layers, running live. Milk, Mountain and Moonshot, populated with actual entities. This page is the audit.',
    render: () => P('the-portfolio')() },

  { path: '/speaking/', title: 'Speaking',
    desc: 'Keynotes and formats — what a room gets, and what I will not do on a stage.',
    render: () => P('speaking')() },

  { path: '/press/', title: 'Press Kit',
    desc: 'Bio, portrait, framework diagrams and a fact sheet where every figure carries a grade and a date.',
    render: () => P('press')() },

  /* ------------------------------------------------------------- PROGRAMS */
  { path: '/programs/', title: 'Programs',
    desc: 'Six installations ordered by altitude. A curriculum, a defined outcome, and a published price band.',
    render: () => P('programs')() },

  ...programs.map(p => ({
    path: `/programs/${p.slug}/`, title: p.title, desc: p.lede,
    render: () => P('program')(p)
  })),

  /* --------------------------------------------------------------- EVENTS */
  { path: '/events/', title: 'Events',
    desc: 'A date and a room. Every event carries a city, a price, a seat count and what you leave with.',
    render: () => P('events')() },

  { path: '/events/calendar/', title: 'Calendar',
    desc: 'Every date, city and seat count for the next twelve months.',
    render: () => P('calendar')() },

  ...events.map(e => ({
    path: `/events/${e.slug}/`, title: e.title, desc: e.lede,
    render: () => P('event')(e)
  })),

  /* ------------------------------------------------------------- COACHING */
  { path: '/coaching/', title: 'Coaching',
    desc: 'Three tiers, deliberately scarce. Six seats is the entire one-to-one practice, by design.',
    render: () => P('coaching')() },

  ...coaching.map(c => ({
    path: `/coaching/${c.slug}/`, title: c.title, desc: c.lede,
    render: () => P('coach')(c)
  })),

  /* -------------------------------------------------------------- EXPLORE */
  { path: '/explore/', title: 'Explore',
    desc: 'The free layer — six diagnostics, the essays, the show, the evidence log, and the Tamil section.',
    render: () => P('explore')() },

  { path: '/diagnostics/', title: 'Diagnostics',
    desc: 'Six instruments from the six books. Free, instant, playable on the page. Run one tonight.',
    render: () => P('diagnostics')() },

  ...diagnostics.map(d => ({
    path: `/diagnostics/${d.slug}/`, title: d.title, desc: d.lede,
    render: () => P('diagnostic')(d)
  })),

  { path: '/ideas/', title: 'Ideas',
    desc: 'One structural argument each. Not blog posts, not listicles.',
    render: () => P('ideas')() },

  ...ideas.map(i => ({
    path: `/ideas/${i.slug}/`, title: i.title, desc: i.dek, ogType: 'article',
    render: () => P('idea')(i)
  })),

  { path: '/show/', title: 'The Inevitable',
    desc: 'Conversations with people who made something certain. Show me your portfolio and I will show you what it is actually optimising for.',
    render: () => P('show')() },

  { path: '/evidence/', title: 'The Evidence Log',
    desc: 'Published corrections and updated figures, tagged and dated. Nobody else in this category does this.',
    render: () => P('evidence')() },

  { path: '/ta/', title: 'தமிழ்',
    desc: 'Copy, Customize, Innovate in Tamil — CCi Live, the workshop archive, and the base’s home.',
    render: () => P('tamil')() },

  { path: '/newsletter/', title: 'Newsletter',
    desc: 'The Inevitable, weekly — one structural idea, every Tuesday.',
    render: () => P('newsletter')() },

  /* ----------------------------------------------------------------- SHOP */
  { path: '/shop/', title: 'Shop',
    desc: 'Books, printed instruments, and the digital reports. Nothing here is merchandise.',
    render: () => P('shop')() },

  { path: '/books/', title: 'Books',
    desc: 'Six books, one argument, five altitudes. Ordered by altitude, not by publication date.',
    render: () => P('books')() },

  ...stack.map(b => ({
    path: `/books/${b.slug}/`, title: b.title, desc: b.prop, ogType: 'book',
    render: () => P('book')(b)
  })),

  { path: '/shop/the-stack/', title: 'The Elango Stack — boxed set',
    desc: 'Five books, one argument, one box. The sixth ships on publication.',
    render: () => P('boxed-set')() },

  { path: '/shop/instruments/', title: 'Instruments',
    desc: 'Printed workbooks and canvases — the Coherence Matrix, the Ladder, the 12-Traits pad, the Mission deck.',
    render: () => P('shop-instruments')() },

  { path: '/shop/digital/', title: 'Digital',
    desc: 'Deep reports, implementation templates, mission libraries and self-paced courses.',
    render: () => P('shop-digital')() },

  /* ---------------------------------------------------------------- UTILITY */
  { path: '/contact/', title: 'Start a conversation',
    desc: 'Tell me what you are building, what you hold, and what has already not worked.',
    render: () => P('contact')() },

  { path: '/privacy/', title: 'Privacy',
    desc: 'What this site collects, why, and how to have it removed.',
    render: () => P('legal')('privacy') },

  { path: '/terms/', title: 'Terms',
    desc: 'Terms of use, programme terms, and the limits of what is promised.',
    render: () => P('legal')('terms') }
];


/* ------------------------------------------------------------------ SCHEMA */
/* Each route is annotated with its breadcrumb trail and the typed entity nodes
   that belong on it. layout.js merges these into the page @graph. */

const CRUMBS = {
  '/': null,
  '/about/': crumb({ label: 'About' }),
  '/the-stack/': crumb({ label: 'About', href: '/about/' }, { label: 'The Stack' }),
  '/the-portfolio/': crumb({ label: 'About', href: '/about/' }, { label: 'The Portfolio' }),
  '/speaking/': crumb({ label: 'About', href: '/about/' }, { label: 'Speaking' }),
  '/press/': crumb({ label: 'About', href: '/about/' }, { label: 'Press Kit' }),
  '/programs/': crumb({ label: 'Programs' }),
  '/events/': crumb({ label: 'Events' }),
  '/events/calendar/': crumb({ label: 'Events', href: '/events/' }, { label: 'Calendar' }),
  '/coaching/': crumb({ label: 'Coaching' }),
  '/explore/': crumb({ label: 'Explore' }),
  '/diagnostics/': crumb({ label: 'Explore', href: '/explore/' }, { label: 'Diagnostics' }),
  '/ideas/': crumb({ label: 'Explore', href: '/explore/' }, { label: 'Ideas' }),
  '/show/': crumb({ label: 'Explore', href: '/explore/' }, { label: 'The Inevitable' }),
  '/evidence/': crumb({ label: 'Explore', href: '/explore/' }, { label: 'The Evidence Log' }),
  '/ta/': crumb({ label: 'Explore', href: '/explore/' }, { label: 'தமிழ்' }),
  '/newsletter/': crumb({ label: 'Explore', href: '/explore/' }, { label: 'Newsletter' }),
  '/shop/': crumb({ label: 'Shop' }),
  '/books/': crumb({ label: 'Shop', href: '/shop/' }, { label: 'Books' }),
  '/shop/the-stack/': crumb({ label: 'Shop', href: '/shop/' }, { label: 'The Elango Stack' }),
  '/shop/instruments/': crumb({ label: 'Shop', href: '/shop/' }, { label: 'Instruments' }),
  '/shop/digital/': crumb({ label: 'Shop', href: '/shop/' }, { label: 'Digital' }),
  '/contact/': crumb({ label: 'Start a conversation' }),
  '/privacy/': crumb({ label: 'Privacy' }),
  '/terms/': crumb({ label: 'Terms' })
};
programs.forEach(p => CRUMBS['/programs/' + p.slug + '/'] = crumb({ label: 'Programs', href: '/programs/' }, { label: p.title }));
events.forEach(e => CRUMBS['/events/' + e.slug + '/'] = crumb({ label: 'Events', href: '/events/' }, { label: e.title }));
coaching.forEach(c => CRUMBS['/coaching/' + c.slug + '/'] = crumb({ label: 'Coaching', href: '/coaching/' }, { label: c.title }));
diagnostics.forEach(d => CRUMBS['/diagnostics/' + d.slug + '/'] = crumb({ label: 'Diagnostics', href: '/diagnostics/' }, { label: d.short }));
stack.forEach(b => CRUMBS['/books/' + b.slug + '/'] = crumb({ label: 'Books', href: '/books/' }, { label: b.title }));
ideas.forEach(i => CRUMBS['/ideas/' + i.slug + '/'] = crumb({ label: 'Ideas', href: '/ideas/' }, { label: i.title }));

function schemaFor(path) {
  /* Detail pages — one typed entity each. */
  const prog = programs.find(p => '/programs/' + p.slug + '/' === path);
  if (prog) return [SEO.courseNode(prog, (byId[prog.book] || {}).title)];

  const ev = events.find(e => '/events/' + e.slug + '/' === path);
  if (ev) return [SEO.eventNode(ev)];

  const co = coaching.find(c => '/coaching/' + c.slug + '/' === path);
  if (co) return [SEO.serviceNode(co)];

  const di = diagnostics.find(d => '/diagnostics/' + d.slug + '/' === path);
  if (di) return [SEO.diagnosticNode(di)];

  const bk = stack.find(b => '/books/' + b.slug + '/' === path);
  if (bk) return [SEO.bookNode(bk)];

  const id = ideas.find(i => '/ideas/' + i.slug + '/' === path);
  if (id) return [SEO.articleNode(id, (byId[id.book] || {}).title)];

  /* Index pages — an ItemList so the set is legible as a set. */
  switch (path) {
    case '/programs/':
      return [listOf(path, 'Programs', programs.map(p => ({ name: p.title, href: '/programs/' + p.slug + '/' })))];
    case '/events/':
    case '/events/calendar/':
      return [listOf(path, 'Events', events.map(e => ({ name: e.title, href: '/events/' + e.slug + '/' }))),
              ...events.map(SEO.eventNode)];
    case '/coaching/':
      return [listOf(path, 'Coaching tiers', coaching.map(c => ({ name: c.title, href: '/coaching/' + c.slug + '/' })))];
    case '/diagnostics/':
      return [listOf(path, 'Diagnostic instruments', diagnostics.map(d => ({ name: d.title, href: '/diagnostics/' + d.slug + '/' }))),
              ...diagnostics.map(SEO.diagnosticNode)];
    case '/books/':
    case '/the-stack/':
      return [{
        '@type': 'BookSeries', '@id': SEO.ID.stack, name: 'The Elango Stack',
        url: SEO.url('/the-stack/'), author: { '@id': SEO.ID.person },
        description: 'Six books, one argument, read at five altitudes.',
        hasPart: stack.map(b => ({ '@type': 'Book', name: b.title, url: SEO.url('/books/' + b.slug + '/'), abstract: b.question }))
      }];
    case '/ideas/':
      return [listOf(path, 'Essays', ideas.map(i => ({ name: i.title, href: '/ideas/' + i.slug + '/' })))];
    case '/show/':
      return [SEO.podcastNode(showEpisodes)];
    case '/shop/instruments/':
      return shopInstruments.map(i => SEO.productNode(i, path));
    case '/shop/digital/':
      return shopDigital.map(i => SEO.productNode(i, path));
    case '/shop/the-stack/':
      return [SEO.productNode({ name: 'The Elango Stack — boxed set', line: 'Five books, one argument, one box. The sixth ships on publication.', price: '₹4,800', tag: 'Books' }, path)];
    case '/evidence/':
      return [{
        '@type': 'DefinedTermSet', '@id': SEO.url(path) + '#standard',
        name: 'The A/B/C evidence standard',
        url: SEO.url(path),
        description: 'Every published figure carries a grade and an as-at date.',
        hasDefinedTerm: evidenceStandard.map(t => ({
          '@type': 'DefinedTerm', termCode: t.g, name: t.name, description: t.def,
          inDefinedTermSet: SEO.url(path) + '#standard'
        }))
      }];
    case '__unused__':
      return [{
        '@type': 'WebPage',
        mainEntity: {
          '@type': 'DefinedTermSet', name: 'The A/B/C evidence standard',
          hasDefinedTerm: evidenceStandard.map(t => ({
            '@type': 'DefinedTerm', termCode: t.g, name: t.name, description: t.def
          }))
        }
      }];

    case '/speaking/':
      return [{
        '@type': 'Service', '@id': SEO.url(path) + '#speaking', name: 'Speaking',
        serviceType: 'Keynote and executive briefing', provider: { '@id': SEO.ID.org },
        url: SEO.url(path), areaServed: { '@type': 'Country', name: 'India' }
      }];


    case '/newsletter/':
      return [{
        '@type': 'Periodical', '@id': SEO.url(path) + '#newsletter',
        name: 'The Inevitable, weekly', url: SEO.url(path),
        description: 'One structural idea, every Tuesday.',
        publisher: { '@id': SEO.ID.org }, inLanguage: 'en'
      }];
    default:
      return [];
  }
}

/* Ideas carry article meta for Open Graph. */
const ARTICLE_META = {};
ideas.forEach(i => {
  ARTICLE_META['/ideas/' + i.slug + '/'] = { published: SEO.isoDate(i.date), section: i.layer };
});

const seoMeta = require('./seo-meta');

for (const r of routes) {
  r.crumbs = CRUMBS[r.path] || null;
  r.schema = schemaFor(r.path);
  r.seo = seoMeta[r.path] || {};
  r.articleMeta = ARTICLE_META[r.path] || null;
  const idea = ideas.find(i => '/ideas/' + i.slug + '/' === r.path);
  if (idea) r.dateModified = SEO.isoDate(idea.date);
}

module.exports = routes;
