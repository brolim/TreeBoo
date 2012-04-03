_node_template = _.template("\n\
<div id='<%= node_id %>' class='node level<%= level %>' _node_level='<%= level %>' style='display:block'>\n\
  <span class='marker unchecked'></span>\n\
  <span class='name'>\n\
    <%= name %>\n\
  </span>\n\
  <div class='children' style='display:none'>\n\
  </div>\n\
</div>\n");


Node = function(me, level){
  this.name = me.name;
  this.id = me.id;
  this.me = me;
  this.status = 'unchecked';
  this.level = (level==undefined) ? 0 : level;
  this.el = $(_node_template({node_id:(me.id), name:me.name, level:this.level}));

  var self = this;

  this.children = [];
  if(me.children){
    me.children.forEach(function(raw_child) {
      var new_node = new Node(raw_child, self.level+1);
      new_node.parent = self;
      self.children.push(new_node);
      self.el.find('.children:eq(0)').append(new_node.el);
    });
  }

  this.el.find('span.name:eq(0)').click(function(){
    var children = self.el.find('.children:eq(0)');
    if(children.css('display')=='none'){
      children.slideDown();
      self.el.trigger('children_was_opened');
    }
    else{
      children.slideUp();
      self.el.trigger('children_was_closed');
    }
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
  this.el.trigger('node_was_unchecked');
};

Node.prototype.check_node = function() {
  this.el.find('.marker:eq(0)').removeClass('unchecked');
  this.el.find('.marker:eq(0)').removeClass('checked');
  this.status = 'checked';
  this.el.find('.marker:eq(0)').addClass('checked');
  this.el.trigger('node_was_checked');
};

Node.prototype.uncheck_all_nodes = function() {
  this.uncheck_node();
  this.children.forEach(function(node) {
    node.uncheck_node();
  });
};

Node.prototype.check_all_nodes = function() {
  this.check_node();
  this.children.forEach(function(node) {
    node.check_node();
  });
};

Node.prototype._nodes_by_status = function(status) {
  var nodes = [];
  if(this.status == status){
    nodes.push(this);
  }

  this.children.forEach(function(node) {
    if(node.status == status){
      nodes.push(node);
    }
    if(node.children.length>0){
      nodes = nodes.concat(node._nodes_by_status(status));
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
  this.version = '0.1.0';
  var self = this;

  this.roots = []
  raw_nodes.forEach(function(raw_node) {
    self.roots.push(new Node(raw_node));
  });

  this.html = $('<div id=tree></div>');
  this.roots.forEach(function(node) {
    self.html.append(node.el);
  });
}

