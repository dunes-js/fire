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
	onSnapshot, query, where, setDoc, updateDoc, Timestamp, addDoc
} from "firebase/firestore";
import type { Doc, DocFn, SetDoc, UpdateDoc } from "./types";
import { AbstractFire } from "./AbstractFire";

export class FireStore extends AbstractFire<Firestore> {

	constructor(app: FirebaseApp) {
		super(getFirestore(app))
	}

	readonly field = {
		arrayUnion,
		arrayRemove,
		increment
	}

	stamp(): Timestamp {
		return Timestamp.now();
	}

	onDocs<T>(colRef: Query<T> | CollectionReference<T>, docFn: DocFn<T>) {
		return onSnapshot(colRef, (snap) => {
			const docs = snap.docs.map(x => ({ ...x.data(), id: x.id })) as Doc<T>[];
			return docFn(docs);
		});
	}

	where(...args: Parameters<typeof where>) {
		return where(...args);
	}

	doc<T>(from: string, docID: string): DocumentReference<T> {
		return doc(this.self, from, docID) as DocumentReference<T>;
	}

	col<T>(from: string): CollectionReference<T> {
		return collection(this.self, from) as CollectionReference<T>;
	}

	colWhere<T>(from: string, ...queries: QueryConstraint[]): Query<T> {
		return query(collection(this.self, from), ...queries) as Query<T>;
	}

	async getDoc<T>(docRef: DocumentReference<T>): Promise<Doc<T> | null> {
		const siteDoc = await getDoc(docRef);
		if (!siteDoc.exists()) {
			return null;
		}
		return { ...siteDoc.data()!, id: siteDoc.id } as Doc<T>;
	}

	async getCollection<T>(colRef: CollectionReference<T> | Query<T>): Promise<Doc<T>[]> {
		const p = new Array<Doc<T>>();

		const ref = await getDocs(colRef);

		for (const x of ref.docs) {
			p.push(({ ...x.data(), id: x.id }) as Doc<T>);
		}

		return p;
	}

	setDoc<T>(docRef: DocumentReference<T>, doc: SetDoc<T>): Promise<void> {
		return setDoc(docRef, doc as Doc<T>);
	}

	addDoc<T>(colRef: CollectionReference<T>, doc: SetDoc<T>): Promise<DocumentReference<T>> {
		return addDoc(colRef, doc as Doc<T>);
	}

	updateDoc<T>(docRef: DocumentReference<T>, doc: UpdateDoc<T>): Promise<void> {
		return updateDoc(docRef, doc);
	}
}
