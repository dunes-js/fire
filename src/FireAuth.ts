import { type FirebaseApp } from "firebase/app";

import {
	type Auth, 
	initializeAuth,
	signInWithEmailAndPassword,
	browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  type Persistence,
} from "firebase/auth";

import { AbstractFire } from "./AbstractFire.js";


/**
 * Initialized using `Fire.useAuth()` and used as `Fire.auth`*/
export class FireAuth extends AbstractFire<Auth> 
{
	constructor(app: FirebaseApp)
  {
		super(initializeAuth(app, {persistence: browserLocalPersistence}))
	}

  /**
   * Log in with `email` and `password`*/
	login(email: string, password: string) 
  {
		return signInWithEmailAndPassword(this.self, email, password);
	}

  /**
   * Sign up with `email` and `password`*/
	signup(email: string, password: string) 
  {
		return createUserWithEmailAndPassword(this.self, email, password);
	}

  /**
   * Set auth persistence*/
  persistence(pers: Persistence)
  {
    return setPersistence(this.self, pers);
  }
}
