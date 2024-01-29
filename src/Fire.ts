import { type FirebaseApp, type FirebaseOptions, initializeApp } from "firebase/app";

type FireAuth = import("./FireAuth.js").FireAuth
declare const FireAuth: typeof import("./FireAuth.js").FireAuth | undefined

type FireData = import("./FireData.js").FireData
declare const FireData: typeof import("./FireData.js").FireData | undefined

type FireStorage = import("./FireStorage.js").FireStorage
declare const FireStorage: typeof import("./FireStorage.js").FireStorage | undefined

type FireFunctions = import("./FireFunctions.js").FireFunctions
declare const FireFunctions: typeof import("./FireFunctions.js").FireFunctions | undefined

/**
 * Use `Fire.init()` with FirebaseOptions to start*/
export class Fire 
{
  /**
   * Static class*/
  private constructor() {}
	
	static #app: FirebaseApp;
	static #auth: FireAuth | null = null; 
	static #data: FireData | null = null; 
	static #storage: FireStorage | null = null; 
	static #functions: FireFunctions | null = null;

  /**
   * Initialize App*/
	static init(firebaseConfig: FirebaseOptions) 
  {
		this.#app = initializeApp(firebaseConfig)
	}

  /**
   * Start FireAuth. Use `Fire.auth`*/
	static useAuth(fireAuth = FireAuth): void 
  {
		if (!this.#app) 
    {
			throw `App is not initialized`
		}
		if (!fireAuth) 
    {
			throw `fireAuth is not imported`
		}
		this.#auth = new fireAuth(this.#app)
	}

  /**
   * Get access to `FireAuth` instance or null if not initialized*/
	static get auth() 
  : FireAuth
  {
		return this.#auth as FireAuth;
	}

  /**
   * Start FireData. Use `Fire.data`*/
	static useDatabase(fireData = FireData): void 
  {
		if (!this.#app) 
    {
			throw `App is not initialized`
		}
		if (!fireData) 
    {
			throw `FireData is not imported`
		}
		this.#data = new fireData(this.#app)
	}

  /**
   * Get access to `FireData` instance or null if not initialized*/
	static get data() 
  : FireData
  {
		return this.#data as FireData;
	}

  /**
   * Start FireStorage. Use `Fire.storage`*/
	static useStorage(fireStorage = FireStorage): void 
  {
		if (!this.#app) 
    {
			throw `App is not initialized`
		}
		if (!fireStorage) 
    {
			throw `fireStorage is not imported`
		}
		this.#storage = new fireStorage(this.#app)
	}

  /**
   * Get access to `FireStorage` instance or null if not initialized*/
	static get storage() 
  : FireStorage
  {
		return this.#storage as FireStorage;
	}

  /**
   * Start FireFunctions. Use `Fire.functions`*/
	static useFunctions(fireFunctions = FireFunctions): void 
  {
		if (!this.#app) 
    {
			throw `App is not initialized`
		}
		if (!fireFunctions) 
    {
			throw `fireFunctions is not imported`
		}
		this.#functions = new fireFunctions(this.#app)
	}

  /**
   * Get access to `FireFunctions` instance or null if not initialized*/
	static get functions() 
  : FireFunctions
  {
		return this.#functions as FireFunctions;
	}
}


