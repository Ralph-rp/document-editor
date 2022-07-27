import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Block } from '../models/block.model';

@Injectable()
export class BlockService {

  private moveSource = new BehaviorSubject<any>(null);
  moveObservable = this.moveSource.asObservable();

  private duplicateSource = new BehaviorSubject<any>(null);
  duplicateObservable = this.duplicateSource.asObservable();

  constructor() { }

   //This whole service could be an @Output relation if there were no deeply nested connections
   moveBlock(block: any) {
    this.moveSource.next(block)
   }

   duplicateBlock(block: any) {
    this.duplicateSource.next(block)
   }

}