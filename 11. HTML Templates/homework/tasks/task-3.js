/* globals $ */
/* globals handlebars */

function solve() {
    return function () {
        //"use strict";

        $.fn.listview = function (data) {
            var $this = $(this),
                id = "#" + $this.attr("data-template"),
                handlebarsTemplate = $(id).html(),
                compiledTemplate = handlebars.compile(handlebarsTemplate),
                $documentFragment = $(document.createDocumentFragment());

            data.forEach(function (item) {
                $documentFragment.append(compiledTemplate(item));
            });

            $documentFragment.appendTo($this);

            return $this;
        };
    };
}

module.exports = solve;