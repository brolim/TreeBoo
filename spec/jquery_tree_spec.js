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
        root_html = $('<p></p>').append($(tree.el).eq(i)).html();
        expect(root_html).toContain('<div class="root">');
        expect($(tree.el).eq(i).text()).toBe('root'+i);
      });
    });

    it("renders two level1 children with their names and divs", function() {
      data = [{name: 'root0', children: [{name:'child0'},
                                         {name:'child1'}]}];
      tree = new JQueryTree(data);
      root = $('<p></p>').append($(tree.el));

      expect(root.eq(0).find('.node1').length).toBe(2);
      expect(root.eq(0).find('.node1:eq(0)').text()).toBe('child0');
      expect(root.eq(0).find('.node1:eq(1)').text()).toBe('child1');
    });


  });

});