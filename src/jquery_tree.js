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

Node = function(me){
  this.name = me.name;
  this.me = me
  this.el = $(_node_template({node_id:(++_node_id), name:me.name}));

  this.children = [];
  if(me.children){
    var self = this;
    me.children.forEach(function(raw_child) {
      var new_node = new Node(me.children[0])
      self.children.push(new_node);
      self.el.find('.children:eq(0)').html(new_node.el.html());
    });
  }
  
};

Node.prototype.render = function() {
  return this.el;
};

NodeArray = function(raw_nodes) {
  this.nodes = []
  var self = this;
  raw_nodes.forEach(function(raw_node) {
    self.nodes.push(new Node(raw_node));
  });

  this.html = $('<div id=tree></div>');
  this.nodes.forEach(function(node) {
    self.html.append(node.el);
  });
}

