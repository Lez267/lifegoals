import { Component, ChangeDetectorRef } from '@angular/core';
import { MetaService } from '../services/metas-service/meta.service';
import { Meta } from '../models/meta.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  metas: Meta[] = [];
  myMeta: Meta = new Meta();

  constructor(public metaService: MetaService, private cdr: ChangeDetectorRef) {
    this.metaService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.metas = data;
      this.cdr.detectChanges();
    });
  }

  addMeta() {
    const meta: Meta = { meta: this.myMeta.meta };
    this.metaService.add(meta).then(() => {
      console.log('Created new item successfully!');
      this.myMeta = new Meta();
      this.cdr.detectChanges();
    });
  }

  deleteMeta(id?: string) {
    this.metaService.delete(id).then(() => {
      console.log('Deleted item successfully!');
      this.cdr.detectChanges();
    });
  }
}