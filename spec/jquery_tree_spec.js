describe("JQueryTree", function() {

  describe("rendering", function() {
    
    it("renders the root div", function() {
      tree = new JQueryTree([{name: 'name1'}]);
      expect(tree.el).toContain('<div class="root">');
    });

    it("renders the root div with its name", function() {
      tree = new JQueryTree([{name: 'name1'}]);
      expect($(tree.el).text()).toBe('name1');
    });

    it("renders four roots with their names and their divs", function() {
      data = [{name: 'root0'}, 
              {name: 'root1'}, 
              {name: 'root2'}, 
              {name: 'root3'}];
      tree = new JQueryTree(data);

      [0,1,2,3].forEach(function(i){
        expect(tree.roots()[0].tagName).toBe('DIV');
        expect(tree.roots()[0].className).toBe('root');
        expect(tree.roots().eq(i).text()).toBe('root'+i);
      });
    });

    it("renders two level1 children with their names and divs", function() {
      data = [{name: 'root0', children: [{name:'child0'},
                                         {name:'child1'}]}];
      tree = new JQueryTree(data);

      expect(tree.nodes(1).length).toBe(2);
      expect(tree.nodes(1).eq(0).text()).toBe('child0');
      expect(tree.nodes(1).eq(1).text()).toBe('child1');
    });

  });

});