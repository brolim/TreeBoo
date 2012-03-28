JQueryTree = function(data_tree){
  this.el = this._create_html_string(data_tree, true);
};

JQueryTree.prototype._create_html_string = function(data_tree, is_root, level) {
  html_string = ''
  self = this;

  if(is_root){
    div_class = 'root'
    level = 0;
  } else{
    div_class = 'node' + level;
  }

  data_tree.forEach(function(root){
    html_string += '<div class="' + div_class + '">' + root.name;
    if(root.children){
      html_string += self._create_html_string(root.children, false, ++level);
    }
    html_string += '</div>';
  });

  return html_string;
};

JQueryTree.prototype.nodes = function(level) {

  if(level==0)
    return $('<p></p>').append(this.el).find('.root');
  else
    return $(this.el).find('.node'+level);
};

JQueryTree.prototype.roots = function() {
  return this.nodes(0);
};