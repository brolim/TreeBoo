describe("JQueryTree", function() {

  beforeEach(function () {
    root1 = {name: 'node1', children: [{name:'node1.1', children: [{name:'node1.1.1'}, {name:'node1.1.2'}]}, 
                                       {name:'node1.2'}]},
    root2 = {name: 'node2', children: [{name:'node2.1'}, {name:'node2.2'}]}
    root3 = {name: 'node3', children: [{name:'node3.1'}, {name:'node3.2'}]}
    tree = new Node([root1, root2, root3]);
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

    // it("renders all nodes with class node", function() {
    //   expect($('<p></p>').append(tree.el).find('.node').length).toBe(11);
    // });    

    // it("renders two level1 children with their names and divs", function() {
    //   data = [{name: 'root0', children: [{name:'child0'},
    //                                      {name:'child1'}]}];
    //   tree = new Node(data);

    //   expect(tree.nodes_as_jquery(1).length).toBe(2);
    //   expect(tree.nodes_as_jquery(1)[0].text().trim()).toBe('child0');
    //   expect(tree.nodes_as_jquery(1)[1].text().trim()).toBe('child1');
    // });

    // it("renders span.markers for all nodes", function() {
    //   tree.nodes_as_jquery().forEach(function(node) {
    //     expect(node.find('.marker:eq(0)').length).toBe(1);
    //   });
    // });

  });

//   describe("data structure", function() {
//     it("all_nodes attr and nodes() method return an array of Node objects", function() {
//       expect(tree.all_nodes.length).toBe(11);
//       tree.all_nodes.forEach(function(node) {
//         expect(node instanceof NodeT).toBe(true);
//       });
//       tree.nodes(0).forEach(function(node) {
//         expect(node instanceof NodeT).toBe(true);
//       });
//     });

//     it("has same id of html element", function() {
//       root0 = tree.nodes_as_jquery(0)[0];
//       node0 = tree.nodes(0)[0];
//       expect(node0.div_id).toBe(root0.attr('id'));
//     });

//   });

//   describe("openings and closings children nodes", function() {


//     it("starts with all root nodes colapsed", function() {
//       expect(tree.nodes().length).toBe(11);

//       //roots      
//       tree.nodes_as_jquery(0).forEach(function(node){
//         expect(node.css('display')).toBe('block');
//         expect(node.find('.children:eq(0)').css('display')).toBe('none');
//       });
//     });

//   });
// });

// // // ========================================================
// // //      class Node documentation
// // // ========================================================
// describe("NodeT", function() {

//   beforeEach(function () {
//     root1 = {name: 'node1', children: [{name:'node1.1', children: [{name:'node1.1.1'}, {name:'node1.1.2'}]}, 
//                                        {name:'node1.2'}]},
//     root2 = {name: 'node2', children: [{name:'node2.1'}, {name:'node2.2'}]}
//     root3 = {name: 'node3', children: [{name:'node3.1'}, {name:'node3.2'}]}
//     tree = new Node([root1, root2, root3]);

//     node = tree.all_nodes[0];
//     node_jquery = tree.nodes_as_jquery(0)[0];
//     expect(node.div_id).toBe(node_jquery.attr('id'));

//   });

//   describe("slide div.children down and up", function() {

//     it("starts with div.children hidden", function() {
//       expect(node_jquery.find('div.children:eq(0)').css('display')).toBe('none');
//     });

//     // it("changes display in html when slide_toggle on node is called", function() {
//     //   node.slide_toggle();
//     //   expect(node_jquery.find('div.children:eq(0)').css('display')).toBe('block');
//     // });

//     // it("togles its html div.children visibility", function() {
//     //   tree.nodes(0).eq(0).click();
//     //   tree.nodes(0).eq(0).click();

//     // });

//   });
  
});