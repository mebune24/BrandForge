import { navLinks } from '../data';

export const getBreadcrumb = (pathname: string) => {
  const path = pathname.split('/').filter(Boolean);
  const breadcrumbs = [{ label: 'Home', href: '/' }];
  let accumulatedPath = '';

  for (const segment of path) {
    accumulatedPath += `/${segment}`;
    const label = navLinks.find(link => link.href === accumulatedPath)?.label || segment.charAt(0).toUpperCase() + segment.slice(1);
    breadcrumbs.push({ label, href: accumulatedPath });
  }

  return breadcrumbs;
};
