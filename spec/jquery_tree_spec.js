describe("Node", function() {

  describe("initializing tree", function() {
    
    describe("object creation", function() {

      it("creates a simple node with some html", function() {
        var node = new Node({id:'my_id', name:'node1'});

        expect(node.id).toBe('my_id');
        expect(node.name).toBe('node1');
        expect(node.children.length).toBe(0);
        expect(node.el).toNotBe(undefined);
      });

      it("creates a node with one child and one grand_child", function() {
        var father = {name:'father'};
        var child = {name:'child'};
        child.children = [{name:'grand_child'}];
        father.children = [child];
        var node = new Node(father);

        expect(node.name).toBe('father');
        expect(node instanceof Node).toBe(true);

        expect(node.children.length).toBe(1);
        expect(node.children[0].name).toBe('child');
        expect(node.children[0].children.length).toBe(1);
        expect(node.children[0] instanceof Node).toBe(true);

        expect(node.children[0].children.length).toBe(1);
        expect(node.children[0].children[0].name).toBe('grand_child');
        expect(node.children[0].children[0].children.length).toBe(0);
        expect(node.children[0].children[0] instanceof Node).toBe(true);
      });

      it("identifies node level in level attribute for every node", function() {
        var father = {id:'father', name:'father'};
        var child = {id:'child', name:'child'};
        var grand_child = {id:'grand_child', name:'grand_child'};

        child.children = [grand_child];
        father.children = [child];

        father = new Node(father);
        child = father.children[0];
        grand_child = child.children[0];

        expect(father.name).toBe('father');
        expect(father.level).toBe(0)
        expect(father.el.attr('_node_level')).toBe('0');

        expect(child.name).toBe('child');
        expect(child.level).toBe(1)
        expect(child.el.attr('_node_level')).toBe('1');

        expect(grand_child.name).toBe('grand_child');
        expect(grand_child.level).toBe(2)
        expect(grand_child.el.attr('_node_level')).toBe('2');
      });

      it("creates a node with two children", function() {
        var data = {name:'father'};
        data.children = [{name:'child1'}, {name:'child2'}]
        var node = new Node(data);

        expect(node.name).toBe('father');
        expect(node instanceof Node).toBe(true);

        var children = node.children;
        expect(children.length).toBe(2);

        expect(children[0].name).toBe('child1');
        expect(children[0].children.length).toBe(0);
        expect(children[0] instanceof Node).toBe(true);

        expect(children[1].name).toBe('child2');
        expect(children[1].children.length).toBe(0);
        expect(children[1] instanceof Node).toBe(true);
      });

      it("sets the object passed inside me propertie", function() {
        var data = {name:'name', attr1:'attr1', attr2:'attr2', attr3:'attr3', attr4:'attr4', attr5:'attr5'};
        var node = new Node(data);
        expect(node.me.name).toBe('name');
        expect(node.me.attr1).toBe('attr1');
        expect(node.me.attr2).toBe('attr2');
        expect(node.me.attr3).toBe('attr3');
        expect(node.me.attr4).toBe('attr4');
        expect(node.me.attr5).toBe('attr5');
      });

    });
    
    describe("html creation", function() {

      describe("html creation inside root node", function() {

        it("node with no children", function() {
          var node = new Node({id:'my_id', name:'node1'});

          expect(node.el.attr('id')).toBe('my_id');
          expect(node.el.find('.marker').length).toBe(1);
          expect(node.el.find('.name').length).toBe(1);
          expect(node.el.find('.name').text().trim()).toBe('node1');
          expect(node.el.find('.children').length).toBe(1);
          expect(node.el.find('.children').css('display')).toBe('none');
        });

        it("node with one child and two grand_children", function() {
          var father = {name:'father'};
          var child = {name:'child'};
          child.children = [{name:'grand_child1'}, {name:'grand_child2'}];
          father.children = [child];
          var node = new Node(father);

          expect(node.el.find('.marker').length).toBe(4);
          expect(node.el.find('.name').length).toBe(4);
          
          expect(node.el.find('.name:eq(0)').text().trim()).toBe('father');
          expect(node.el.find('.children:eq(0)').length).toBe(1);
          expect(node.el.find('.children:eq(0)').css('display')).toBe('none');

          expect(node.el.find('.name:eq(1)').text().trim()).toBe('child');
          expect(node.el.find('.children:eq(1)').length).toBe(1);
          expect(node.el.find('.children:eq(1)').css('display')).toBe('none');

          expect(node.el.find('.name:eq(2)').text().trim()).toBe('grand_child1');
          expect(node.el.find('.children:eq(2)').length).toBe(1);
          expect(node.el.find('.children:eq(2)').css('display')).toBe('none');

          expect(node.el.find('.name:eq(3)').text().trim()).toBe('grand_child2');
          expect(node.el.find('.children:eq(3)').length).toBe(1);
          expect(node.el.find('.children:eq(3)').css('display')).toBe('none');
        });

      });

      describe("opening and closing node", function() {

        it("shows and hides children when span.name is clicked", function() {
          var raw_node = {name:'father'}
          raw_node.children = [{name:'child'}];
          var node = new Node(raw_node);

          expect(node.el.find('.children:eq(0)').css('display')).toBe('none');
          node.el.find('span.name:eq(0)').click();
          expect(node.el.find('.children:eq(0)').css('display')).toBe('block');
          node.el.find('span.name:eq(0)').click();
          expect(node.el.find('.children:eq(0)').css('display')).toBe('none ');
        });

      });

      describe("node checkbox", function() {

        it("starts with status as 'unchecked'", function() {
          var raw_node = {name:'father'}
          raw_node.children = [{name:'child'}];
          var node = new Node(raw_node);
          expect(node.status).toBe('unchecked')
        });

        it("maker element starts with class 'unchecked'", function() {
          var raw_node = {name:'father'}
          raw_node.children = [{name:'child'}];
          var node = new Node(raw_node);
          expect(node.el.find('.marker:eq(0)').attr('class')).toBe('marker unchecked')
        });

        it("toggle status between 'unchecked' and 'checked' when span.marker is clicked", function() {
          var node = new Node({name:'father'});
          
          expect(node.status).toBe('unchecked');
          node.el.find('span.marker:eq(0)').click();
          expect(node.status).toBe('checked');
          node.el.find('span.marker:eq(0)').click();
          expect(node.status).toBe('unchecked');
        });

        it("toggle status between 'unchecked' and 'checked' when span.marker is clicked", function() {
          var raw_node = {name:'father'}
          var node = new Node(raw_node);
          
          expect(node.status).toBe('unchecked');
          node.el.find('span.marker:eq(0)').click();
          expect(node.status).toBe('checked');
          node.el.find('span.marker:eq(0)').click();
          expect(node.status).toBe('unchecked');
        });

        it("toggles maker element class between 'unchecked' and 'checked'", function() {
          var raw_node = {name:'father'}
          raw_node.children = [{name:'child'}];
          var node = new Node(raw_node);

          expect(node.el.find('.marker:eq(0)').attr('class')).toBe('marker unchecked')
          node.el.find('span.marker:eq(0)').click();
          expect(node.el.find('.marker:eq(0)').attr('class')).toBe('marker checked')
          node.el.find('span.marker:eq(0)').click();
          expect(node.el.find('.marker:eq(0)').attr('class')).toBe('marker unchecked')
        });

        it("uncheck all nodes", function() {
          var raw_node = {name:'father'}
          raw_node.children = [{name:'child'}];
          var node = new Node(raw_node);

          //check our two nodes
          node.el.find('span.marker:eq(0)').click();
          node.el.find('span.marker:eq(1)').click();
          expect(node.status).toBe('checked')
          expect(node.children[0].status).toBe('checked')
          expect(node.el.find('.marker:eq(0)').attr('class')).toBe('marker checked')
          expect(node.el.find('.marker:eq(1)').attr('class')).toBe('marker checked')

          node.uncheck_all_nodes();
          expect(node.status).toBe('unchecked')
          expect(node.children[0].status).toBe('unchecked')
          expect(node.el.find('.marker:eq(0)').attr('class')).toBe('marker unchecked')
          expect(node.el.find('.marker:eq(1)').attr('class')).toBe('marker unchecked')
        });

        it("toggle checkbox status", function() {
          var raw_node = {name:'father'}
          raw_node.children = [{name:'child'}];
          var node = new Node(raw_node);

          node.check_all_nodes();
          expect(node.status).toBe('checked')
          expect(node.children[0].status).toBe('checked')
          expect(node.el.find('.marker:eq(0)').attr('class')).toBe('marker checked')
          expect(node.el.find('.marker:eq(1)').attr('class')).toBe('marker checked')

          node.uncheck_all_nodes();
          expect(node.status).toBe('unchecked')
          expect(node.children[0].status).toBe('unchecked')
          expect(node.el.find('.marker:eq(0)').attr('class')).toBe('marker unchecked')
          expect(node.el.find('.marker:eq(1)').attr('class')).toBe('marker unchecked')

          node.check_all_nodes();
          expect(node.status).toBe('checked')
          expect(node.children[0].status).toBe('checked')
          expect(node.el.find('.marker:eq(0)').attr('class')).toBe('marker checked')
          expect(node.el.find('.marker:eq(1)').attr('class')).toBe('marker checked')
        });

      });

    });

  });

  describe("child node changing affecting parents", function() {
    it("changes its child status when someone else change it by reference", function() {
      var raw_node = {name:'father'}
      raw_node.children = [{name:'child'}];
      var father = new Node(raw_node);
      var child = father.children[0];

      child.check_node();
      expect(child.status).toBe('checked')
      expect(child.el.find('.marker:eq(0)').attr('class')).toBe('marker checked')
      expect(father.children[0].status).toBe('checked')
      expect(father.children[0].el.find('.marker:eq(0)').attr('class')).toBe('marker checked')
    });
  });

  it("gets node by id", function() {
    var raw_node = {id:'1', name:'node1'}
    raw_node.children = [];
    raw_node.children.push({id:'2', name:'node2'});
    raw_node.children.push({id:'3', name:'node3'});
    raw_node.children.push({id:'4', name:'node4'});
    var node = new Node(raw_node);

    expect(node.id).toBe('1');
    expect(node.node('1').name).toBe('node1');
    expect(node.node('2').name).toBe('node2');
    expect(node.node('3').name).toBe('node3');
    expect(node.node('4').name).toBe('node4');
  });

  it("gets checked nodes", function() {
    var raw_node = {id:'1', name:'node1'}
    raw_node.children = [];
    raw_node.children.push({id:'2', name:'node2'});
    raw_node.children.push({id:'3', name:'node3'});
    raw_node.children.push({id:'4', name:'node4'});

    var node1 = new Node(raw_node);
    var node2 = node1.children[0];
    var node3 = node1.children[1];
    var node4 = node1.children[2];

    expect(node1.checked_nodes().length).toBe(0);

    node1.check_node();
    expect(node1.checked_nodes().length).toBe(1);
    expect(node1.checked_nodes()[0]).toBe(node1);

    node2.check_node();
    expect(node1.checked_nodes().length).toBe(2);
    expect(node1.checked_nodes()[0]).toBe(node1);
    expect(node1.checked_nodes()[1]).toBe(node2);

    node3.check_node();
    expect(node1.checked_nodes().length).toBe(3);
    expect(node1.checked_nodes()[0]).toBe(node1);
    expect(node1.checked_nodes()[1]).toBe(node2);
    expect(node1.checked_nodes()[2]).toBe(node3);

    node4.check_node();
    expect(node1.checked_nodes().length).toBe(4);
    expect(node1.checked_nodes()[0]).toBe(node1);
    expect(node1.checked_nodes()[1]).toBe(node2);
    expect(node1.checked_nodes()[2]).toBe(node3);
    expect(node1.checked_nodes()[3]).toBe(node4);
  });

  it("gets unchecked nodes", function() {
    var raw_node = {id:'1', name:'node1'}
    raw_node.children = [];
    raw_node.children.push({id:'2', name:'node2'});
    raw_node.children.push({id:'3', name:'node3'});
    raw_node.children.push({id:'4', name:'node4'});

    var node1 = new Node(raw_node);
    var node2 = node1.children[0];
    var node3 = node1.children[1];
    var node4 = node1.children[2];

    expect(node1.unchecked_nodes().length).toBe(4);
    expect(node1.unchecked_nodes()[0]).toBe(node1);
    expect(node1.unchecked_nodes()[1]).toBe(node2);
    expect(node1.unchecked_nodes()[2]).toBe(node3);
    expect(node1.unchecked_nodes()[3]).toBe(node4);

    node1.check_node();
    expect(node1.unchecked_nodes().length).toBe(3);
    expect(node1.unchecked_nodes()[0]).toBe(node2);
    expect(node1.unchecked_nodes()[1]).toBe(node3);
    expect(node1.unchecked_nodes()[2]).toBe(node4);

    node2.check_node();
    expect(node1.unchecked_nodes().length).toBe(2);
    expect(node1.unchecked_nodes()[0]).toBe(node3);
    expect(node1.unchecked_nodes()[1]).toBe(node4);

    node3.check_node();
    expect(node1.unchecked_nodes().length).toBe(1);
    expect(node1.unchecked_nodes()[0]).toBe(node4);

    node4.check_node();
    expect(node1.unchecked_nodes().length).toBe(0);
  });
});


describe("TreeBoo", function() {

  describe("object creation", function() {

    it("creates one Node", function() {
      var node_array = new TreeBoo([{name:'name'}]);
      expect(node_array.nodes.length).toBe(1);
      expect(node_array.nodes[0] instanceof Node).toBe(true);
    });

    it("creates three Node", function() {
      var node_array = new TreeBoo([{name:'name1'}, {name:'name2'}, {name:'name3'}]);
      expect(node_array.nodes.length).toBe(3);
      expect(node_array.nodes[0] instanceof Node).toBe(true);
      expect(node_array.nodes[1] instanceof Node).toBe(true);
      expect(node_array.nodes[2] instanceof Node).toBe(true);
    });

  });

  describe("html creation", function() {

    it("creates correct html for two nodes", function() {
      var node_array = new TreeBoo([{name:'name1'}, {name:'name2'}]);

      expect(node_array.html.find('.node').length).toBe(2);
      expect(node_array.html.find('.node:eq(0)').find('.name:eq(0)').text().trim()).toBe('name1');
      expect(node_array.html.find('.node:eq(1)').find('.name:eq(0)').text().trim()).toBe('name2');
    });

  });

});