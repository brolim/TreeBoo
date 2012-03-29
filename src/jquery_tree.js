_node_template = _.template("\n\
<div id='jqt<%= node_id %>' class='node' style='display:block'>\n\
  <span class='marker'></span>\n\
  <span class='name'>\n\
    <%= name %>\n\
  </span>\n\
  <div class='children' style='display:none'></div>\n\
</div>");

JQueryTree = function(data_tree){
  _node_id = -1;
  this.all_nodes = [];
  this.el = this._create_node_recursive(data_tree);
};

JQueryTree.prototype._create_node_recursive = function(data_tree, level) {
  if(level==undefined)
    level = 0;

  self = this;
  var node_jquery = $('<p></p>');
  data_tree.forEach(function(node){

    node_jquery.append($(_node_template({node_id:(++_node_id), name:node.name})));
    self.all_nodes.push(new Node(node.name, 'jqt'+_node_id, level));

    if(node.children){
      var jquery_selector = '#jqt'+_node_id+' .children:eq(0)';
      node_jquery.find(jquery_selector).append(self._create_node_recursive(node.children, level+1));
    }
  });

  return node_jquery.html();
};

JQueryTree.prototype.nodes = function(level) {
  nodes = []
  this.all_nodes.forEach(function(node) {
    if(node.level == level)
      nodes.push(node);
  });

  return nodes
};

JQueryTree.prototype.jquery_nodes = function(level) {
  nodes = [];
  this.nodes(level).forEach(function(node) {
    nodes.push($('<p></p>').append(tree.el).find('#'+node.div_id));
  });
  return nodes
};

Node = function(name, div_id, level) {
  this.name = name;
  this.div_id = div_id;
  this.level = level;
}