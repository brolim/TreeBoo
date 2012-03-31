_node_template = _.template("\n\
<div id='jqt<%= node_id %>' class='node' style='display:block'>\n\
  <span class='marker unchecked'></span>\n\
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
  this.me = me;
  this.status = 'unchecked';
  this.el = $(_node_template({node_id:(++_node_id), name:me.name}));

  var self = this;

  this.children = [];
  if(me.children){
    me.children.forEach(function(raw_child) {
      var new_node = new Node(me.children[0])
      self.children.push(new_node);
      self.el.find('.children:eq(0)').html(new_node.el);
    });
  }

  this.el.find('span.name:eq(0)').click(function(){
    var children = self.el.find('.children:eq(0)');
    if(children.length>0)
      children.slideToggle();
  });
  this.el.find('span.marker:eq(0)').click(function(){
    if(self.status=='checked')
      self.uncheck_node();
    else
      self.check_node();
  });
  
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

