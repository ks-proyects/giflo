import { AngularFirestore } from '@angular/fire/firestore';
import { defer, combineLatest, forkJoin } from 'rxjs';
import { switchMap, map, concatMap } from 'rxjs/operators';

export const docInnerJoin = (
  afs: AngularFirestore,
  paths: { [key: string]: string }

) => {
  return source => defer(() => {
    debugger
    let parent;
    const keys = Object.keys(paths);
    return source.pipe(
      
      switchMap(data => {
        debugger;
        parent = data;
        const docs$ = keys.map(k => {
          debugger;
          const fullPath = `${paths[k]}/${parent[k]}`;
          return afs.doc(fullPath).valueChanges();
        });
        return combineLatest(docs$);
      }),
      map(arr => {
        debugger;
        const joins = keys.reduce((acc, cur, idx) => {
          return { ...acc, [cur]: arr[idx] };
        }, {});
        return { ...parent, ...joins };
      })
    );
  });
}