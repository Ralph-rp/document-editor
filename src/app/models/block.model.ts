export class Block {
  name: string;
  children: Block[];
  // TODO parent can be an ID and then we can deepCopy
  parent: Block | undefined;

  constructor(name: string, children: Block[], parent?: Block) {
    this.name = name;
    this.children = children;
    this.parent = parent ? parent : undefined;
  }

  setParent(parent: Block) {
    this.parent = parent;
  }

  addChild(child: Block) {
    child.parent?.removeChild(child);
    this.children.push(child);
    child.setParent(this);
  }

  addChildren(children: Block[]) {
    this.children.push(...children);
    // TODO
    children.forEach((child) => {
      child.setParent(this);
    });
  }

  removeChild(child: Block) {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  selfdestruct() {
    this.parent.removeChild(this);
    this.children = [];
  }

  isUpRelative(block: Block) {
    return this.relativeCheck(block, this)
  }

  relativeCheck(from: Block, to: Block) {
    if (from.parent === to) {
      return true;
    } else if (!from.parent) {
      return false;
    } else {
      return this.relativeCheck(from.parent, to)
    }
  }

}

