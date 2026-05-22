import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Meta } from '../../models/meta.model';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class MetaService {
  private dbPath = '/metas';
  metasRef: AngularFirestoreCollection<Meta>;

  constructor(private db: AngularFirestore) {
    this.metasRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Meta> {
    return this.metasRef;
  }

  add(meta: Meta): Promise<any> {
    return this.metasRef.add({ ...meta });
  }

  delete(id?: string): Promise<any> {
    const firestore = getFirestore();
    const docRef = doc(firestore, `metas/${id}`);
    return deleteDoc(docRef);
  }
}