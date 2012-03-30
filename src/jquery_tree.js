_node_template = _.template("\n\
<div id='jqt<%= node_id %>' class='node' style='display:block'>\n\
  <span class='marker'></span>\n\
  <span class='name'>\n\
    <%= name %>\n\
  </span>\n\
  <div class='children' style='display:none'>\n\
  </div>\n\
</div>\n");

_node_id = -1;
level = 0

Node = function(data_tree){
  this.my_nodes = [];

  self = this;
  data_tree.forEach(function(raw_node){

    self.el = _node_template({node_id:(++_node_id), name:raw_node.name})
    var node_jquery = $('<p></p>').append(self.el);
    
    if(raw_node.children){
      new_node = new Node(raw_node.children)
      node_jquery.append($(new_node.el));
      self.my_nodes.push(new_node)
    }

    self.node_html = node_jquery.html()

  });
};

Node.prototype._create_node_recursive = function(data_tree, level) {
  if(level==undefined)
    level = 0;

  self = this;
  var node_jquery = $('<p></p>');
  data_tree.forEach(function(node){

    node_jquery.append($(_node_template({node_id:(++_node_id), name:node.name})));
    self.all_nodes.push(new NodeT(node.name, 'jqt'+_node_id, level));

    if(node.children){
      var jquery_selector = '#jqt'+_node_id+' .children:eq(0)';
      node_jquery.find(jquery_selector).append(self._create_node_recursive(node.children, level+1));
    }
  });

  return node_jquery.html();
};

Node.prototype.nodes = function(level) {
  if(level==undefined)
    return this.all_nodes;

  nodes = []
  this.all_nodes.forEach(function(node) {
    if(node.level == level)
      nodes.push(node);
  });

  return nodes
};

Node.prototype.nodes_as_jquery = function(level) {
  var nodes = [];
  this.nodes(level).forEach(function(node) {
    nodes.push($('<p></p>').append(tree.el).find('#'+node.div_id));
  });
  return nodes
};

NodeT = function(name, div_id, level) {
  this.name = name;
  this.div_id = div_id;
  this.level = level;
};

NodeT.prototype.render = function() {
};

NodeT.prototype.slide_toggle = function() {
  children = $('<p></p>').append(this.tree.el).find('#'+this.div_id).find('div.children:eq(0)');
  console.log(children);
  children.show();
};