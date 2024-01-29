import type { FirebaseApp } from "firebase/app";
import {
	type HttpsCallable,
	type Functions,
	getFunctions,
	httpsCallable,
} from "firebase/functions";
import { AbstractFire } from "./AbstractFire.js";


/**
 * Initialized using `Fire.useFunctions()` and used as `Fire.functions`*/
export class FireFunctions extends AbstractFire<Functions> {

	constructor(app: FirebaseApp) {
		super(getFunctions(app))
	}

  /**
   * Create a callable function*/
	getFn<N, R>(name: string): HttpsCallable<N, R> 
  {
		return httpsCallable<N, R>(this.self, name);
	}

  /**
   * Calls a function and returns the value*/
	async function<N, R>(name: string, obj: N): Promise<R> 
  {
		const { data } = await httpsCallable<N, R>(this.self, name)(obj);
		return data;
	}
}
