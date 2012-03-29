JQueryTree = function(data_tree){
  this.el = this._create_html_string(data_tree, true);
  this.roots = [];
};

JQueryTree.prototype._create_html_string = function(data_tree, is_root, level) {
  var tree_html_string = ''
  self = this;

  var div_class = undefined;
  var style = undefined
  if(is_root){
    div_class = 'root'
    style = ' style="display:block"; '
    level = 0;
  } else{
    style = ' style="display:none"; '
    div_class = 'node level' + level;
  }

  data_tree.forEach(function(node){
    var node_html_string = '<div class="' + div_class +'" ' + style +' ">' + '<span class="name">' + node.name + '</span>';
    if(node.children){
      node_html_string += self._create_html_string(node.children, false, level+1);
    }
    node_html_string += '</div>';

    tree_html_string += node_html_string;
  });

  return tree_html_string;
};

JQueryTree.prototype.nodes = function(level) {
  if(level==0)
    return $('<p></p>').append(this.el).find('.root');
  else if(level)
    return $(this.el).find('.level'+level);
  else
    return $('<p></p>').append(this.el).find('.root, .node');
};

JQueryTree.prototype.roots = function() {
  return this.nodes(0);
};

Node = function(name) {
  if(name){
    this.name = name
  };
}