describe("Node", function() {

  describe("initializing tree", function() {
    
    describe("object creation", function() {

      it("creates a simple node with some html", function() {
        node = new Node({name:'node1'});

        expect(node.name).toBe('node1');
        expect(node.children.length).toBe(0);
        expect(node.el).toNotBe(undefined);
      });

      it("creates a node with one child", function() {
        data = {name:'father'};
        data.children = [{name:'child1'}]
        node = new Node(data);

        expect(node.name).toBe('father');
        expect(node instanceof Node).toBe(true);

        var children = node.children;
        expect(children.length).toBe(1);
        expect(children[0].name).toBe('child1');
        expect(children[0].children.length).toBe(0);
        expect(children[0] instanceof Node).toBe(true);
      });

      it("creates a node with two children", function() {
        data = {name:'father'};
        data.children = [{name:'child1'}, {name:'child2'}]
        node = new Node(data);

        expect(node.name).toBe('father');
        expect(node instanceof Node).toBe(true);

        var children = node.children;
        expect(children.length).toBe(2);

        expect(children[0].name).toBe('child1');
        expect(children[0].children.length).toBe(0);
        expect(children[0] instanceof Node).toBe(true);

        expect(children[1].name).toBe('child1');
        expect(children[1].children.length).toBe(0);
        expect(children[1] instanceof Node).toBe(true);
      });

      it("sets the object passed inside me propertie", function() {
        data = {name:'name', attr1:'attr1', attr2:'attr2', attr3:'attr3', attr4:'attr4', attr5:'attr5'};
        node = new Node(data);
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
          node = new Node({id:'my_id', name:'node1'});

          expect(node.el.attr('id')).toBe('my_id');
          expect(node.el.find('.marker').length).toBe(1);
          expect(node.el.find('.name').length).toBe(1);
          expect(node.el.find('.name').text().trim()).toBe('node1');
          expect(node.el.find('.children').length).toBe(1);
          expect(node.el.find('.children').css('display')).toBe('none');
        });

        it("node with one child", function() {
          raw_node = {name:'father'}
          raw_node.children = [{name:'child'}];
          node = new Node(raw_node);

          expect(node.el.find('.marker').length).toBe(2);
          expect(node.el.find('.name').length).toBe(2);
          
          expect(node.el.find('.name:eq(0)').text().trim()).toBe('father');
          expect(node.el.find('.children:eq(0)').length).toBe(1);
          expect(node.el.find('.children:eq(0)').css('display')).toBe('none');

          expect(node.el.find('.name:eq(1)').text().trim()).toBe('child');
          expect(node.el.find('.children:eq(1)').length).toBe(1);
          expect(node.el.find('.children:eq(1)').css('display')).toBe('none');
        });

      });

      describe("opening and closing node", function() {

        it("shows and hides children when span.name is clicked", function() {
          raw_node = {name:'father'}
          raw_node.children = [{name:'child'}];
          node = new Node(raw_node);

          expect(node.el.find('.children:eq(0)').css('display')).toBe('none');
          node.el.find('span.name:eq(0)').click();
          expect(node.el.find('.children:eq(0)').css('display')).toBe('block');
          node.el.find('span.name:eq(0)').click();
          expect(node.el.find('.children:eq(0)').css('display')).toBe('none ');
        });

      });

      describe("node checkbox", function() {

        it("starts with status as 'unchecked'", function() {
          raw_node = {name:'father'}
          raw_node.children = [{name:'child'}];
          node = new Node(raw_node);
          expect(node.status).toBe('unchecked')
        });

        it("maker element starts with class 'unchecked'", function() {
          raw_node = {name:'father'}
          raw_node.children = [{name:'child'}];
          node = new Node(raw_node);
          expect(node.el.find('.marker:eq(0)').attr('class')).toBe('marker unchecked')
        });

        it("toggle status between 'unchecked' and 'checked' when span.marker is clicked", function() {
          raw_node = {name:'father'}
          node = new Node(raw_node);
          
          expect(node.status).toBe('unchecked');
          node.el.find('span.marker:eq(0)').click();
          expect(node.status).toBe('checked');
          node.el.find('span.marker:eq(0)').click();
          expect(node.status).toBe('unchecked');
        });

        it("toggle status between 'unchecked' and 'checked' when span.marker is clicked", function() {
          raw_node = {name:'father'}
          node = new Node(raw_node);
          
          expect(node.status).toBe('unchecked');
          node.el.find('span.marker:eq(0)').click();
          expect(node.status).toBe('checked');
          node.el.find('span.marker:eq(0)').click();
          expect(node.status).toBe('unchecked');
        });

        it("toggles maker element class between 'unchecked' and 'checked'", function() {
          raw_node = {name:'father'}
          raw_node.children = [{name:'child'}];
          node = new Node(raw_node);

          expect(node.el.find('.marker:eq(0)').attr('class')).toBe('marker unchecked')
          node.el.find('span.marker:eq(0)').click();
          expect(node.el.find('.marker:eq(0)').attr('class')).toBe('marker checked')
          node.el.find('span.marker:eq(0)').click();
          expect(node.el.find('.marker:eq(0)').attr('class')).toBe('marker unchecked')
        });

        it("uncheck all nodes", function() {
          raw_node = {name:'father'}
          raw_node.children = [{name:'child'}];
          node = new Node(raw_node);

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
          raw_node = {name:'father'}
          raw_node.children = [{name:'child'}];
          node = new Node(raw_node);

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
      raw_node = {name:'father'}
      raw_node.children = [{name:'child'}];
      father = new Node(raw_node);
      child = father.children[0];

      child.check_node();
      expect(child.status).toBe('checked')
      expect(child.el.find('.marker:eq(0)').attr('class')).toBe('marker checked')
      expect(father.children[0].status).toBe('checked')
      expect(father.children[0].el.find('.marker:eq(0)').attr('class')).toBe('marker checked')
    });
  });
});


describe("NodeArray", function() {

  describe("object creation", function() {

    it("creates one Node", function() {
      node_array = new NodeArray([{name:'name'}]);
      expect(node_array.nodes.length).toBe(1);
      expect(node_array.nodes[0] instanceof Node).toBe(true);
    });

    it("creates three Node", function() {
      node_array = new NodeArray([{name:'name1'}, {name:'name2'}, {name:'name3'}]);
      expect(node_array.nodes.length).toBe(3);
      expect(node_array.nodes[0] instanceof Node).toBe(true);
      expect(node_array.nodes[1] instanceof Node).toBe(true);
      expect(node_array.nodes[2] instanceof Node).toBe(true);
    });

  });

  describe("html creation", function() {

    it("creates correct html for two nodes", function() {
      node_array = new NodeArray([{name:'name1'}, {name:'name2'}]);

      expect(node_array.html.find('.node').length).toBe(2);
      expect(node_array.html.find('.node:eq(0)').find('.name:eq(0)').text().trim()).toBe('name1');
      expect(node_array.html.find('.node:eq(1)').find('.name:eq(0)').text().trim()).toBe('name2');
    });

  });

});