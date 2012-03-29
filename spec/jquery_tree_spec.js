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
      html = $('<p></p>').append(tree.el);

      roots = tree.nodes(0); 
      expect(roots.length).toBe(3);
      expect( (html.find('#'+roots[0].div_id)).find('.name:eq(0)').text().trim()).toBe('node1');
      expect( (html.find('#'+roots[1].div_id)).find('.name:eq(0)').text().trim()).toBe('node2');
      expect( (html.find('#'+roots[2].div_id)).find('.name:eq(0)').text().trim()).toBe('node3');

      level1_nodes = tree.nodes(1); 
      expect(level1_nodes.length).toBe(6);
      expect( (html.find('#'+level1_nodes[0].div_id)).find('.name:eq(0)').text().trim()).toBe('node1.1');
      expect( (html.find('#'+level1_nodes[1].div_id)).find('.name:eq(0)').text().trim()).toBe('node1.2');
      expect( (html.find('#'+level1_nodes[2].div_id)).find('.name:eq(0)').text().trim()).toBe('node2.1');
      expect( (html.find('#'+level1_nodes[3].div_id)).find('.name:eq(0)').text().trim()).toBe('node2.2');
      expect( (html.find('#'+level1_nodes[4].div_id)).find('.name:eq(0)').text().trim()).toBe('node3.1');
      expect( (html.find('#'+level1_nodes[5].div_id)).find('.name:eq(0)').text().trim()).toBe('node3.2');

      level2_nodes = tree.nodes(2); 
      expect(level2_nodes.length).toBe(2);
      expect( (html.find('#'+level2_nodes[0].div_id)).find('.name:eq(0)').text().trim()).toBe('node1.1.1');
      expect( (html.find('#'+level2_nodes[1].div_id)).find('.name:eq(0)').text().trim()).toBe('node1.1.2');

      level3_nodes = tree.nodes(3); 
      expect(level3_nodes.length).toBe(0);
    });

    it("renders all nodes with class node", function() {
      expect($('<p></p>').append(tree.el).find('.node').length).toBe(11);
    });    

    it("renders two level1 children with their names and divs", function() {
      data = [{name: 'root0', children: [{name:'child0'},
                                         {name:'child1'}]}];
      tree = new JQueryTree(data);

      expect(tree.jquery_nodes(1).length).toBe(2);
      expect(tree.jquery_nodes(1).eq(0).text().trim()).toBe('child0');
      expect(tree.jquery_nodes(1).eq(1).text().trim()).toBe('child1');
    });

    // it("renders span.markers for all nodes", function() {
    //   tree.nodes().toArray().forEach(function(node) {
    //     expect($(node).find('.marker:eq(0)').length).toBe(1);
    //   });
    // });

  });

//   describe("data structure", function() {
//     it("all methods to get nodes return an array of Node objects", function() {
//       expect(tree.all_nodes.length).toBe(11);
//       tree.all_nodes.forEach(function(node) {
//         expect(node instanceof Node).toBe(true);
//       });
//     });
//   });

//   describe("openings and closings children nodes", function() {


//     it("starts with all root nodes colapsed", function() {
//       expect(tree.nodes().length).toBe(11);

//       //roots      
//       tree.nodes(0).toArray().forEach(function(node){
//         expect($(node).css('display')).toBe('block');
//         expect($(node).find('.children:eq(0)').css('display')).toBe('none');
//       });
//     });

//     // it("when a node is clicked, it toggle visibility of the straight children nodes", function() {
//     //   tree.nodes(0).eq(0).click();
//     //   tree.nodes(0).eq(0).click();

//     // });



//   });
});

// // ========================================================
// //      class Node documentation
// // ========================================================
// describe("Node", function() {

//   beforeEach(function () {
//     root1 = {name: 'node1', children: [{name:'node1.1', children: [{name:'node1.1.1'}, {name:'node1.1.2'}]}, 
//                                        {name:'node1.2'}]},
//     root2 = {name: 'node2', children: [{name:'node2.1'}, {name:'node2.2'}]}
//     root3 = {name: 'node3', children: [{name:'node3.1'}, {name:'node3.2'}]}
//     tree = new JQueryTree([root1, root2, root3]);
//   });

//   describe("toggle_node", function() {

//     it("togles its html div element", function() {
//       root0 = tree.nodes(0).eq(0);
//       node0 = tree.all_nodes[0];
//       expect(node0.div_id).toBe(root0.attr('id'));
//     });

//   });
  
// });