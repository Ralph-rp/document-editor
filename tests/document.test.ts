import { Block } from '../src/app/models/block.model';

describe('Block', function () {

    let block1 = new Block('block1', []);
    let block2 = new Block('block2', []);
    let block3 = new Block('block3', []);

    beforeEach(() => {
      block1 = new Block('block1', []);
      block2 = new Block('block2', []);
      block3 = new Block('block3', []);
    });

    describe('setParent', function () {
      it('basic', function () {
        block1.setParent(block2);

        let result = block1.parent === block2;

        expect(result).toBeTrue();
      });
    });

    describe('addChild', function () {
      it('circular parenting', function () {
        block1.addChild(block2);
        block2.addChild(block3);
        block3.addChild(block1);


        let parentCheck = block1.parent === undefined
          && block2.parent === block1
          && block3.parent === block2;
        const childCheck = block1.children.includes(block2) && block2.children.includes(block3) && block3.children.length === 0;
        expect(parentCheck && childCheck).toBeTrue();
      });

      it('addChild', function () {
        block1.addChild(block2)

        let result = block1.children.includes(block2)
        expect(result).toBeTrue();
      });
    });

    describe('addChildren', function () {
      it('addChildren', function () {
        block1.addChildren([block2, block3])

        let result = block1.children.includes(block2) && block1.children.includes(block3);
        expect(result).toBeTrue();
      });
    });

    describe('removeChild', function () {
      it('removeChild', function () {
        block1.addChild(block2)

        block1.removeChild(block2)
        let result = block1.children.includes(block2);
        expect(result).toBeFalse();
      });


      it('removeChildTwice', function () {
        block1.addChildren([block2, block3])

        block1.removeChild(block2)
        block1.removeChild(block2)
        let result = block1.children.includes(block3) && !block1.children.includes(block2);
        expect(result).toBeTrue();
      });
    });

    describe('hasDescendant', function () {
      it('hasDescendant', function () {
        block1.addChild(block2);
        block2.addChild(block3);

        let result = block3.hasDescendant(block2);
        expect(result).toBeFalse();
      });
    });
});