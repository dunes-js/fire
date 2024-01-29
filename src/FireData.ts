import { type FirebaseApp } from "firebase/app";

import {
	type CollectionReference, 
	type DocumentReference,
	type Query, 
	type QueryConstraint, 
	type Firestore,

	collection, doc, getDoc,
	getDocs, getFirestore,
	arrayUnion, arrayRemove, increment,
	onSnapshot, query, where, setDoc, updateDoc, 
  Timestamp, addDoc, deleteDoc
} from "firebase/firestore";

import type { Doc, DocFn, SetDoc, UpdateDoc } from "./types/index.js";

import { AbstractFire } from "./AbstractFire.js";


/**
 * Initialized using `Fire.useDatabase()` and used as `Fire.data`*/
export class FireData extends AbstractFire<Firestore> 
{

	constructor(app: FirebaseApp) 
  {
		super(getFirestore(app))
	}

  /**
   * Field value functions */
	readonly field = 
  {
    /**
     * Add value to array property*/
		arrayUnion,

    /**
     * Remove value from array property*/
		arrayRemove,

    /**
     * Increment a number property*/
		increment
	}

  /**
   * Returns a `Timestamp` at the moment of call*/
	stamp()
  : Timestamp 
  {
		return Timestamp.now();
	}

  /**
   * Returns an `Unsubscribe` after opening a listener for a collection*/
	onSnap<T>(colRef: Query<T> | CollectionReference<T>, docFn: DocFn<T>) 
  {
		return onSnapshot(colRef, (snap) => {
			const docs = snap.docs.map(x => ({ ...x.data(), id: x.id })) as Doc<T>[];
			return docFn(docs);
		});
	}

  /**
   * Create a query constraint*/
	where(...args: Parameters<typeof where>) 
  {
		return where(...args);
	}

  /**
   * Get a Document reference in collection named `from` with id `docID`*/
	doc<T>(from: string, docID: string)
  : DocumentReference<T> 
  {
		return doc(this.self, from, docID) as DocumentReference<T>;
	}

  /**
   * Get a Collection reference of collection named `from`*/
	col<T>(from: string)
  : CollectionReference<T> 
  {
		return collection(this.self, from) as CollectionReference<T>;
	}

  /**
   * Create a query for collection named `from`*/
	query<T>(from: string, ...queries: QueryConstraint[])
  : Query<T> 
  {
		return query(collection(this.self, from), ...queries) as Query<T>;
	}

	async get<T>(docRef: DocumentReference<T>)
  : Promise<Doc<T> | null> 
  {
		const siteDoc = await getDoc(docRef);
		if (!siteDoc.exists()) 
    {
			return null;
		}
		return { ...siteDoc.data()!, id: siteDoc.id } as Doc<T>;
	}

  /**
   * Get a `Doc` array from a collection `colRef` */
	async getCol<T>(colRef: CollectionReference<T> | Query<T>)
  : Promise<Doc<T>[]> 
  {
		const p = new Array<Doc<T>>();

		const ref = await getDocs(colRef);

		for (const x of ref.docs) 
    {
			p.push(({ ...x.data(), id: x.id }) as Doc<T>);
		}

		return p;
	}

  /**
   * Get a `Doc` array from a collection `colRef` */
  async list<T>(colRef: CollectionReference<T> | Query<T>)
  : Promise<Doc<T>[]> 
  {
    const p = new Array<Doc<T>>();

    const ref = await getDocs(colRef);

    for (const x of ref.docs) 
    {
      p.push(({ ...x.data(), id: x.id }) as Doc<T>);
    }

    return p;
  }

  /**
   * Remove a `Doc` */
	remove<T>(docRef: DocumentReference<T>)
  : Promise<void> 
  {
		return deleteDoc(docRef);
	}

  /**
   * Set a `Doc`'s properties */
  set<T>(docRef: DocumentReference<T>, doc: SetDoc<T>)
  : Promise<void> 
  {
    return setDoc(docRef, doc as Doc<T>);
  }

  /**
   * Add a `Doc` to a `Collection` */
	add<T>(colRef: CollectionReference<T>, doc: SetDoc<T>)
  : Promise<DocumentReference<T>> 
  {
		return addDoc(colRef, doc as Doc<T>);
	}

  /**
   * Update a `Doc`'s properties */
	update<T>(docRef: DocumentReference<T>, doc: UpdateDoc<T>)
  : Promise<void> 
  {
		return updateDoc(docRef, doc);
	}
}
