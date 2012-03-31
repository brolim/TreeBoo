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
          node = new Node({name:'node1'});
          expect(node.el.find('.marker').length).toBe(1); //marker
          expect(node.el.find('.name').length).toBe(1); //name
          expect(node.el.find('.name').text().trim()).toBe('node1'); //name
          expect(node.el.find('.children').length).toBe(1); //name
          expect(node.el.find('.children').css('display')).toBe('none'); //name
        });

        it("node with one child", function() {
          raw_node = {name:'father'}
          raw_node.children = [{name:'child'}];
          node = new Node(raw_node);

          expect(node.el.find('.marker').length).toBe(2); //marker
          expect(node.el.find('.name').length).toBe(2); //name
          
          expect(node.el.find('.name:eq(0)').text().trim()).toBe('father'); //name
          expect(node.el.find('.children:eq(0)').length).toBe(1); //name
          expect(node.el.find('.children:eq(0)').css('display')).toBe('none'); //name

          expect(node.el.find('.name:eq(1)').text().trim()).toBe('child'); //name
          expect(node.el.find('.children:eq(1)').length).toBe(1); //name
          expect(node.el.find('.children:eq(1)').css('display')).toBe('none'); //name
        });

      });
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