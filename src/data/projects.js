// "Projects" in the original PillarPride codebase = Courses for Skill Revolution.
// Shape is kept identical so the 3D gallery, listing and detail pages work unchanged.
import { COURSES } from './courses';

const durationOf = (c) => (c.meta.find(([k]) => /duration|modules/i.test(k)) || c.meta[0])[1];
const modeOf = (c) => (c.meta.find(([k]) => /mode|practicals/i.test(k)) || c.meta[1])[1];

export const projectsData = COURSES.map((c, i) => ({
  id: String(i + 1).padStart(2, '0'),
  slug: c.slug,
  name: c.n,
  fullName: c.full || c.n,
  category: c.dom,
  type: c.full || c.n,
  location: modeOf(c),
  area: durationOf(c),
  year: 'Admissions open',
  status: 'Weekday & weekend batches',
  image: c.img,
  blurb: c.blurb,
  overview: c.intro,
  highlights: (c.modules?.items || c.includes?.items || []).slice(0, 4),
  specs: Object.fromEntries(c.meta),
  course: c,
}));
