

import { combineLatest, pipe, of, defer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

export const leftJoin = (
  afs: AngularFirestore,
  field,
  collection,
  limit = 100
) => {
  return source =>
    defer(() => {
      // Operator state
      let collectionData;

      // Track total num of joined doc reads
      let totalJoins = 0;

      return source.pipe(
        switchMap(data => {
          // Clear mapping on each emitted val ;

          // Save the parent data state
          collectionData = data as any[];

          const reads$ = [];
          for (const doc of collectionData) {
            // Push doc read to Array

            if (doc[field]) {
              // Perform query on join key, with optional limit
              const q = ref => ref.where(field, '==', doc[field]).limit(limit);

              reads$.push(afs.collection(collection, q).valueChanges());
            } else {
              reads$.push(of([]));
            }
          }

          return combineLatest(reads$);
        }),
        map(joins => {
          return collectionData.map((v, i) => {
            totalJoins += joins[i].length;
            return { ...v, [collection]: joins[i] || null };
          });
        }),
        tap(final => {
          console.log(
            `Queried ${(final as any).length}, Joined ${totalJoins} docs`
          );
          totalJoins = 0;
        })
      );
    });
};

export const leftJoinDocument = (afs: AngularFirestore, field, collection) => {
  return source =>
    defer(() => {
      // Operator state
      let collectionData;
      const cache = new Map();

      return source.pipe(
        switchMap(data => {
          // Clear mapping on each emitted val ;
          cache.clear();

          // Save the parent data state
          collectionData = data as any[];

          const reads$ = [];
          let i = 0;
          for (const doc of collectionData) {
            // Skip if doc field does not exist or is already in cache
            const docFiel = doc[field];
            if (!docFiel || cache.get(docFiel)) {
              continue;
            }
            try {
              // Push doc read to Array
              reads$.push(
                afs
                  .collection(collection)
                  .doc(docFiel)
                  .valueChanges()
              );
            } catch (error) {
              console.log(error);
              continue;
            }
            cache.set(docFiel, i);
            i++;

          }

          return reads$.length ? combineLatest(reads$) : of([]);
        }),
        map(joins => {
          return collectionData.map((v, i) => {
            const valueId = v[field];
            const joinIdx = cache.get(valueId);
            const data = joins[joinIdx] || null;
            const object = data ? { ...data, id: valueId } : null;
            return { ...v, [field]: object };
          });
        }),
        tap(final =>
          console.log(
            `Queried ${(final as any).length}, Joined ${cache.size} docs`
          )
        )
      );
    });
};