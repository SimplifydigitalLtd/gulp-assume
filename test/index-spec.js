/*global describe, it */

define(['../app/index.js'], function (main) {

  describe('gulp module', function () {
    var sut = main();

    it('looks like a through stream', function () {
      expect(sut.on).toBeDefined();
    });
  });
});



