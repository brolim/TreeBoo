_node_template = _.template("\n\
<div id='<%= node_id %>' class='node' style='display:block'>\n\
  <span class='marker unchecked'></span>\n\
  <span class='name'>\n\
    <%= name %>\n\
  </span>\n\
  <div class='children' style='display:none'>\n\
  </div>\n\
</div>\n");

level = 0

Node = function(me){
  this.name = me.name;
  this.id = me.id;
  this.me = me;
  this.status = 'unchecked';
  this.el = $(_node_template({node_id:(me.id), name:me.name}));

  var self = this;

  this.children = [];
  if(me.children){
    me.children.forEach(function(raw_child) {
      var new_node = new Node(raw_child);
      self.children.push(new_node);
      self.el.find('.children:eq(0)').append(new_node.el);
    });
  }

  this.el.find('span.name:eq(0)').click(function(){
    var children = self.el.find('.children:eq(0)');
    children.slideToggle();
  });

  this.el.find('span.marker:eq(0)').click(function(){
    if(self.status=='checked')
      self.uncheck_node();
    else
      self.check_node();
  });
  
};

Node.prototype.node = function(node_id) {
  if(node_id==this.id){
    return this;
  }
  else{
    var node_to_return = 'aaa';
    this.children.forEach(function(node) {
      if(node.id==node_id){
        node_to_return = node;
      }
      return true;//continue
    });
    return node_to_return;
  }
};

Node.prototype.uncheck_node = function() {
  this.el.find('.marker:eq(0)').removeClass('unchecked');
  this.el.find('.marker:eq(0)').removeClass('checked');
  this.status = 'unchecked';
  this.el.find('.marker:eq(0)').addClass('unchecked');
};

Node.prototype.check_node = function() {
  this.el.find('.marker:eq(0)').removeClass('unchecked');
  this.el.find('.marker:eq(0)').removeClass('checked');
  this.status = 'checked';
  this.el.find('.marker:eq(0)').addClass('checked');
};

Node.prototype.uncheck_all_nodes = function() {
  this.uncheck_node();
  this.children.forEach(function(node) {
    node.uncheck_node()
  });
};

Node.prototype.check_all_nodes = function() {
  this.check_node();
  this.children.forEach(function(node) {
    node.check_node()
  });
};

Node.prototype._nodes_by_status = function(status) {
  var nodes = []
  if(this.status == status){
    nodes.push(this);
  }

  this.children.forEach(function(node) {
    if(node.status == status){
      nodes.push(node);
    }
  });

  return nodes;
};

Node.prototype.checked_nodes = function() {
  return this._nodes_by_status('checked');
};

Node.prototype.unchecked_nodes = function() {
  return this._nodes_by_status('unchecked');
};
  
TreeBoo = function(raw_nodes) {
  this.version = '0.1';
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

