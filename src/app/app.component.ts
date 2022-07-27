import { Component } from '@angular/core';
import { Block } from './models/block.model';
import { BlockService } from './services/block.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Blocks and subblocks';

  doc: Block = new Block('doc', []);
  block1: Block = new Block('block1', []);
  block2: Block = new Block('block2', []);
  block3: Block = new Block('block3', []);

  selected: Block = undefined;

  block: Block;

  newName: string;

  exportedValue: string;

  constructor(private data: BlockService) {
    this.data.moveObservable.subscribe(block => { if (block) this.setSelected(block); });
    this.data.duplicateObservable.subscribe(block => { if (block) this.duplicate(block); });

    //ngOnInit ?
    this.block3.addChild(this.block2);
    this.doc.addChildren([this.block3, this.block1]);;

  }

 setSelected(block: Block) {
    if (!this.selected) {
      if (block == this.doc) return;
      this.selected = block;
    } else {
      if (this.selected.isUpRelative(block) || this.selected == block) {
        this.selected = undefined;
        return;
      }
      // TODO check if you want to add it to want of its own subblocks
      block.addChild(this.selected)
      this.selected = undefined;
    }
  }

  duplicate(block: Block) {
    /* const newChildren: Block[] = block.children.map(a => {return {...a}})
    let newBlock: Block = new Block(block.name, block.children, block.parent);
      newBlock = structuredClone(block);
    block.parent.addChild(newBlock) */
  }

  setTitleEdit(item) {
    item.canEditCode = true;
  }

  newBlock() {
    let newBlock = new Block(this.newName, [])
    this.doc.addChild(newBlock)
  }

  export() {
    this.exportedValue = this.convertBlockToString(this.doc)
  }

  convertBlockToString(block: Block) {
    if (block.children === []) {
      return block.name;
    }
    else {
      let returnValue: string = block.name;
      block.children.forEach(element => {
        returnValue += ',' + this.convertBlockToString(element)
      });
      return returnValue;
    }

  }
}
