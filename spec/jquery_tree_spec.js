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

    it("renders roots and children nodes", function() {
      root1 = {name: 'node1', children: [{name:'node1.1', children: [{name:'node1.1.1'}, {name:'node1.1.2'}]}, 
                                         {name:'node1.2'}]},
      root2 = {name: 'node2', children: [{name:'node2.1'}, {name:'node2.2'}]}
      root3 = {name: 'node3', children: [{name:'node3.1'}, {name:'node3.2'}]}
      tree = new JQueryTree([root1, root2, root3]);

      expect(tree.roots().length).toBe(3);
      expect(tree.nodes(0).length).toBe(3); // tree.roots() is the same
      expect(tree.roots().eq(0).find('span:eq(0)').text()).toBe('node1');
      expect(tree.roots().eq(1).find('span:eq(0)').text()).toBe('node2');
      expect(tree.roots().eq(2).find('span:eq(0)').text()).toBe('node3');

      expect(tree.nodes(1).length).toBe(6);
      expect(tree.nodes(1).eq(0).find('span:eq(0)').text()).toBe('node1.1');
      expect(tree.nodes(1).eq(1).find('span:eq(0)').text()).toBe('node1.2');
      expect(tree.nodes(1).eq(2).find('span:eq(0)').text()).toBe('node2.1');
      expect(tree.nodes(1).eq(3).find('span:eq(0)').text()).toBe('node2.2');
      expect(tree.nodes(1).eq(4).find('span:eq(0)').text()).toBe('node3.1');
      expect(tree.nodes(1).eq(5).find('span:eq(0)').text()).toBe('node3.2');

      expect(tree.nodes(2).length).toBe(2);
      expect(tree.nodes(2).eq(0).find('span:eq(0)').text()).toBe('node1.1.1');
      expect(tree.nodes(2).eq(1).find('span:eq(0)').text()).toBe('node1.1.2');

      expect(tree.nodes(3).length).toBe(0);
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

  // describe("openings and closings children nodes", function() {


  //   it("starts with all root nodes colapsed", function() {

  //     root1 = {name: 'node1', children: [{name:'node1.1', children: [{name:'node1.1.1'}, {name:'node1.1.2'}]}, {name:'node1.2'}]}
  //     root2 = {name: 'node2', children: [{name:'node2.1'}, {name:'node2.2'}]}
  //     root3 = {name: 'node3', children: [{name:'node3.1'}, {name:'node3.2'}]}

  //     tree = new JQueryTree([root1, root2, root3]);
  //     expect(tree.nodes().length).toBe(11);
  //   });


  // });
});