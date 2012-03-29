JQueryTree = function(data_tree){
  this.all_nodes = [];
  this.el = this._create_html_string(data_tree, true);
};

JQueryTree.prototype._create_html_string = function(data_tree, is_root, level) {

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

  self = this;
  var tree_html_string = ''
  data_tree.forEach(function(node){
    var node_html_string = '<div class="' + div_class +'" ' + style +' ">' + 
                             '<span class="marker"></span>' +
                             '<span class="name">' + node.name + '</span>';
    if(node.children){
      node_html_string += self._create_html_string(node.children, false, level+1);
    }
    node_html_string += '</div>';

    self.all_nodes.push(new Node(node.name, node_html_string));

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

Node = function(name, html_string) {
  this.name = name
  this.html_string = html_string
}