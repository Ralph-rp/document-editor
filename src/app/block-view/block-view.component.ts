import {
  Component,
  Input,
} from '@angular/core';
import { Block } from '../models/block.model';
import { BlockService } from '../services/block.service';

@Component({
  selector: 'block-view',
  templateUrl: './block-view.template.html',
  styleUrls: ['./block-view.styles.less'],
})
export class BlockComponent<T> {
  @Input()
  value: Block | undefined = undefined;

  newName: string;

  constructor(private data: BlockService) {}

  onSelect() {
    this.data.moveBlock(this.value)
  }

  saveName() {
    console.log(this.newName)
    this.value.name = this.newName;
  }

  delete() {
    // maybe an are you sure popup should be added
    this.value.selfdestruct();
  }

  duplicate() {
    this.data.duplicateBlock(this.value)
  }

}
