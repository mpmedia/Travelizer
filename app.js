$(function() {
    var sojo = (function () {

        var sojo = function () {
            var self = this;
        };

        sojo.prototype = {
            constructor: sojo
        };

        return sojo;
    })();

    var app = new sojo();
});
