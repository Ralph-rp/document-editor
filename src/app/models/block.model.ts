export class Block {
  name: string;
  children: Block[];
  // TODO parent can be an ID and then we can deepCopy
  parent: Block | undefined;
  isSelected: boolean;

  constructor(name: string, children: Block[], parent?: Block) {
    this.name = name;
    this.children = children;
    this.parent = parent ? parent : undefined;
    this.isSelected = false;
  }

  setParent(parent: Block) {
    this.parent = parent;
  }

  addChild(child: Block) {
    if (child.hasDescendant(this)) return;
    if (this.children.includes(child)) return;
    child.parent?.removeChild(child);
    this.children.push(child);
    child.setParent(this);
  }

  addChildren(children: Block[]) {
    children.forEach((child) => {
      this.addChild(child);
      child.setParent(this);
    });
  }

  removeChild(child: Block) {
    if (!this.children.includes(child)) return;
    this.children.splice(this.children.indexOf(child), 1);
    child.parent = undefined;
  }

  selfdestruct() {
    this.parent?.removeChild(this);
    this.children = [];
  }

  // if the given block is a descendant to this then return true
  hasDescendant(block: Block) {
    return this.relativeCheck(block, this)
  }

  relativeCheck(from: Block, to: Block) {
    if (from.parent === to) {
      return true;
    }
    if (!from.parent) {
      return false;
    }
    return this.relativeCheck(from.parent, to)
  }

}

