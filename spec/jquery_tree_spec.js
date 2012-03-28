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
        expect($('<p></p>').append($(tree.el).eq(i)).html()).toContain('<div class="root">');
        expect($(tree.el).eq(i).text()).toBe('root'+i);
      });
    });


  });

});