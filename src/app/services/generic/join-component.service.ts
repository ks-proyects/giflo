import { AngularFirestore } from '@angular/fire/firestore';
import { defer, combineLatest, forkJoin } from 'rxjs';
import { switchMap, map, concatMap } from 'rxjs/operators';

export const docInnerJoin = (
  afs: AngularFirestore,
  paths: { [key: string]: string }

) => {
  return source => defer(() => {
    let parent;
    const keys = Object.keys(paths);
    return source.pipe(
      switchMap(data => {
        parent = data;
        const docs$ = keys.map(k => {
          const fullPath = `${paths[k]}/${parent[k]}`;
          return afs.doc(fullPath).valueChanges();
        });
        return combineLatest(docs$);
      }),
      map(arr => {
        const joins = keys.reduce((acc, cur, idx) => {
          return { ...acc, [cur]: arr[idx] };
        }, {});
        return { ...parent, ...joins };
      })
    );
  });
}