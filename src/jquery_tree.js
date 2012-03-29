JQueryTree = function(data_tree){
  this.el = this._create_html_string(data_tree, true);
};

JQueryTree.prototype._create_html_string = function(data_tree, is_root, level) {
  html_string = ''
  self = this;

  var div_class = undefined;
  if(is_root){
    div_class = 'root'
    level = 0;
  } else{
    div_class = 'node level' + level;
  }

  data_tree.forEach(function(node){
    html_string += '<div class="' + div_class + '">' + '<span class="name">' + node.name + '</span>';
    if(node.children){
      html_string += self._create_html_string(node.children, false, level+1);
    }
    html_string += '</div>';
  });

  return html_string;
};

JQueryTree.prototype.nodes = function(level) {

  if(level==0)
    return $('<p></p>').append(this.el).find('.root');
  else if(level)
    return $(this.el).find('.level'+level);
  else
    return $(this.el).find('.root, .node');
};

JQueryTree.prototype.roots = function() {
  return this.nodes(0);
};