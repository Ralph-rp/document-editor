Node 16.14.2

Start: npm run start

Test: npm run test

Usage:
- Insert a list of new blocks to the document
- Delete a list of existing blocks from the document
- Fetch a list of existing blocks from the document
- Duplicate an existing block with all of its subblocks (including all levels of subblocks in the hierarchy)
- Move an existing block to another position in the document *(with the Select button)*
- - The target position can be on any level in the hierarchy, not necessarily on the same level
- - The moved block should keep its subblocks, so they move together
- Export the full document to a single string