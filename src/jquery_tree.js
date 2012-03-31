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
    
    self.el.find('.marker:eq(0)').removeClass('unchecked');
    self.el.find('.marker:eq(0)').removeClass('checked');
    if(self.status=='checked'){
      self.el.find('.marker:eq(0)').addClass('unchecked');
      self.status = 'unchecked';
    }
    else {
      self.el.find('.marker:eq(0)').addClass('checked');
      self.status = 'checked';
    }

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

