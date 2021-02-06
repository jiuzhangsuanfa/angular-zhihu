import { ActivatedRouteSnapshot } from '@angular/router';

export const getPath: (route: ActivatedRouteSnapshot) => string = route => {
  return route
    .pathFromRoot
    .map(segment => segment.url.toString())
    .join('/')
};

export const getPaths: (route: ActivatedRouteSnapshot) => string[] = route => {
  const paths: string[] = [];
  return [
    ...route.url.map(segment => segment.path),
    ...(route.children.map(getPaths).flat()),
  ];
};

export const concat: (segments: string[]) => string = segments => {
  return segments.filter(segment => !!segment).join('/');
}
