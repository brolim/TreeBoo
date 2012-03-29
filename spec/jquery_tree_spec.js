describe("JQueryTree", function() {

  beforeEach(function () {
    root1 = {name: 'node1', children: [{name:'node1.1', children: [{name:'node1.1.1'}, {name:'node1.1.2'}]}, 
                                       {name:'node1.2'}]},
    root2 = {name: 'node2', children: [{name:'node2.1'}, {name:'node2.2'}]}
    root3 = {name: 'node3', children: [{name:'node3.1'}, {name:'node3.2'}]}
    tree = new JQueryTree([root1, root2, root3]);
  });

  describe("rendering", function() {
    
    it("renders roots and children nodes", function() {
      expect(tree.nodes(0).length).toBe(3); // tree.nodes(0) is the same
      expect(tree.nodes(0).eq(0).find('.name:eq(0)').text()).toBe('node1');
      expect(tree.nodes(0).eq(1).find('.name:eq(0)').text()).toBe('node2');
      expect(tree.nodes(0).eq(2).find('.name:eq(0)').text()).toBe('node3');

      expect(tree.nodes(1).length).toBe(6);
      expect(tree.nodes(1).eq(0).find('.name:eq(0)').text()).toBe('node1.1');
      expect(tree.nodes(1).eq(1).find('.name:eq(0)').text()).toBe('node1.2');
      expect(tree.nodes(1).eq(2).find('.name:eq(0)').text()).toBe('node2.1');
      expect(tree.nodes(1).eq(3).find('.name:eq(0)').text()).toBe('node2.2');
      expect(tree.nodes(1).eq(4).find('.name:eq(0)').text()).toBe('node3.1');
      expect(tree.nodes(1).eq(5).find('.name:eq(0)').text()).toBe('node3.2');

      expect(tree.nodes(2).length).toBe(2);
      expect(tree.nodes(2).eq(0).find('.name:eq(0)').text()).toBe('node1.1.1');
      expect(tree.nodes(2).eq(1).find('.name:eq(0)').text()).toBe('node1.1.2');

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

  describe("data structure", function() {
    it("all methods to get nodes return an array of Node objects", function() {
      expect(tree.all_nodes.length).toBe(11);
      tree.all_nodes.forEach(function(node) {
        expect(node instanceof Node).toBe(true);
      });
    });
  });

  describe("openings and closings children nodes", function() {


    it("starts with all root nodes colapsed", function() {
      expect(tree.nodes().length).toBe(11);

      //roots      
      [0,1,2].forEach(function(i){
        expect(tree.nodes(0).eq(i).css('display')).toBe('block');
      });

      //nodes level 1
      [0,1,2,3,4,5].forEach(function(i){
        expect(tree.nodes(1).eq(i).css('display')).toBe('none');
      });

      //nodes level 2
      [0,1].forEach(function(i){
        expect(tree.nodes(1).eq(i).css('display')).toBe('none');
      });
    });

    // it("when a node is clicked, it toggle visibility of the straight children nodes", function() {
    //   tree.nodes(0).eq(0).click();
    //   tree.nodes(0).eq(0).click());

    // });



  });
});




// ========================================================
//      class Node documentation
// ========================================================
describe("Node", function() {
  
});