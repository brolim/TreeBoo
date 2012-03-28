describe("JQueryTree", function() {

  describe("rendering", function() {
    
    it("renders the root div with its name", function() {
      tree = new JQueryTree({name: 'name1'});
      expect($(tree.el).text()).toBe('name1');
    });

  });

});