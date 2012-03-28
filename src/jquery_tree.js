JQueryTree = function(tree){
  this.el = '';
  self = this
  tree.forEach(function(root){
    self.el += '<div class="root">' + root.name + '</div>';
  });
};

// JQueryTree.prototype.nodes = function() {
//   return []
// };