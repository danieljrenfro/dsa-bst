class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    // if the tree is empty, aka the key is null, then just insert the key and value at the top of the tree.
    if (this.key == null) {
      this.key = key;
      this.value = value;
    }
    // otherwise, compare the new key with the current key. If the key to insert is less than the current key go down the left branch
    else if ( key < this.key) {
      // if the left node is null then create a new tree there, setting the key, value and making this tree the parent.
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      // otherwise, if there is already a value to the left, then recurse and call insert on the left node.
      else {
        this.left.insert(key, value);
      }
    }
    // otherwise, if the key to insert is greater than the current key, go down the right branch
    else {
      // if there is no right node, create a new tree with the key and value and set this tree as the parent
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      // else, recurse and call insert on the right node
      else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    // if the root key is equal to the key we are trying to find
    if (this.key == key) {
      // return the value of the root
      return this.value;
    }
    // else if, the key is less than the root key and there is a left node
    else if (key < this.key && this.left) {
      // return and recurse and find the key from the left node
      return this.left.find(key);
    }
    // else if, the key is greater than the root key and there is a right node
    else if (key > this.key && this.right) {
      // return and recurse adn find the key from the right node
      return this.right.find(key);
    }
    // else, throw an error that there was a key error
    else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    // if the current node's key, matches the one we are trying to remove, execute block of code
    if (this.key == key) {
      // if the key you are removing has a left and right child, execute this block
      if (this.left && this.right) {
        // store the node that will replace the node we are removing, by using the _findMin() helper function
        const successor = this.right._findMin();
        // set the current node's key to the successor's key
        this.key = successor.key;
        // set the current node's value to the successor's value
        this.value = successor.value;
        // recursively call remove on the successor node and pass in the successor's own key.
        successor.remove(successor.key);
      }
      // else if, the node you are trying to remove only has a left child, execute this block
      else if (this.left) {
        // replace this node with the left child
        this._replaceWith(this.left);
      }
      // else if, the node you are trying to remove only has a right child, execute this block
      else if (this.right) {
        // replace this node with the right child
        this._replaceWith(this.right);
      }
      // otherwise, there is no child element, execute this block
      else {
        // replace this node with the value of null
        this._replaceWith(null);
      }
    }
    // else if, key is less than the current node's key and it has a left child, execute this block of code
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    // else if, key is greater than the current node's key and it has a right child, execute this block of code
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    // otherwise, the key that you are looking for is not in the BST. Throw a Key Error.
    else {
      throw new Error('Key Error');
    }
  }

  // this is called on a node whose key == the key we are wanting to remove. It will be passed the node it is supposed to be replaced with
  _replaceWith(node) {
    // if the current node has a parent, aka, it's not the root, execute this block
    if (this.parent) {
      // if this current node is the parent's left child, execute this block
      if (this == this.parent.left) {
        // set the parent's left pointer to the new node
        this.parent.left = node;
      }
      // if the current node is the parent's right child, execute this block
      else if (this == this.parent.right) {
        // set the parent's right pointer to the new node
        this.parent.right = node;
      }

      // if a node was passed into the function, set the node parent to the parent of the current node.
      if (node) {
        node.parent = this.parent;
      }
    }
    // otherwise, if the current node doesn't have a parent, meaning that it's the root, execute this block
    else {
      // if a node was passed into the function, execute this block
      if (node) {
        // here, we reset the key, value, left, and right values to the values of the node.
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      // if a node wasn't passed into the function, execute this block
      else {
        // if there is no node to replace the node we are removing with, just set everything to null
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  // this helper function returns the minimum node of a right branch of a node that we are removing
  _findMin() {
    // if there is not another left child, return the current node
    if (!this.left) {
      return this;
    }
    // otherwise, recurse and call _findMin() on the next left child
    return this.left._findMin();
  }
}