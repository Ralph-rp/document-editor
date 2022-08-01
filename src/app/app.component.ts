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
      this.selected.isSelected = true;
    } else {
      if (this.selected.hasDescendant(block) || this.selected == block) {
        this.selected.isSelected = false;
        this.selected = undefined;
        return;
      }
      block.addChild(this.selected)
      this.selected.isSelected = false;
      this.selected = undefined;
    }
  }

  duplicate(block: Block) {
    const parent = block.parent;

    const newBlock = this.duplication(block);

    parent.addChild(newBlock);
  }

  duplication(block: Block) {
    const newB = new Block(block.name, []);

    if (!block.children) {
      return
    }
    block.children.forEach(child => {
      newB.addChild(this.duplication(child));
    });

    return newB
  }


  setTitleEdit(item) {
    item.canEditCode = true;
  }

  newBlock() {
    if(!this.newName) return;
    let newBlock = new Block(this.newName, [])
    this.doc.addChild(newBlock)
  }

  export() {

    this.exportedValue = this.convertBlockToString(this.doc)
  }

  convertBlockToString(block: Block) {
    let stringBlock = JSON.stringify(block, ['name', 'children']);
    console.log(JSON.parse(stringBlock))
    return stringBlock

    // other possible solution with simple comma seperation
    if (block.children === []) {
      return block.name;
    }
    let returnValue: string = block.name;
    block.children.forEach(element => {
      returnValue += ',' + this.convertBlockToString(element)
    });
    return returnValue;
  }

}
