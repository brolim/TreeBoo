_node_template = _.template("\n\
<div id='jqt<%= node_id %>' class='<%= div_class %>' style='<%= div_style %>'>\n\
  <span class='marker'></span>\n\
  <span class='name'>\n\
    <%= name %>\n\
  </span>\n\
  <div class='children'></div>\n\
</div>");

JQueryTree = function(data_tree){
  _node_id = -1;
  this.all_nodes = [];
  this.el = this._create_node_recursive(data_tree, true);
};

JQueryTree.prototype._create_node_recursive = function(data_tree, is_root, level) {

  var div_class = undefined;
  var style = undefined
  if(is_root){
    div_class = 'root'
    style = "display:block;";
    level = 0;
  } else{
    style = "display:none;";
    div_class = 'node';
  }
  div_class += ' level' + level

  self = this;
  var node_jquery = $('<p></p>');
  data_tree.forEach(function(node){

    node_jquery.append($(_node_template({node_id:(++_node_id), name:node.name, div_style:style, div_class:div_class})));
    // console.log(node_jquery);

    if(node.children){
      var jquery_selector = '#jqt'+_node_id+' .children:eq(0)';
      node_jquery.find(jquery_selector).append(self._create_node_recursive(node.children, false, level+1));
    }
    self.all_nodes.push(new Node(node.name, _node_id));
  });

  return node_jquery.html();
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

Node = function(name, div_id) {
  this.name = name
  this.div_id = div_id
}