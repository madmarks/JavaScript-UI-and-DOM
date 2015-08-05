function solve() {

    (function stringExtensions() {
        if (!String.prototype.repeat) {
            String.prototype.repeat = function (times) {
                var repeatedString;
                if (!times) {
                    times = 1;
                }
                repeatedString = "";

                for (var i = 0; i < times; i += 1) {
                    repeatedString += String(this);
                }
                return repeatedString;
            };
        }

        if (!String.prototype.trimLeftChars) {
            String.prototype.trimLeftChars = function (chars) {
                var regEx = new RegExp("^[" + chars + "]+");
                return this.replace(regEx, "");
            };
        }

        if (!String.prototype.trimRightChars) {
            String.prototype.trimRightChars = function (chars) {

                var regEx = new RegExp("[" + chars + "]+$");
                return this.replace(regEx, "");
            };
        }

        if (!String.prototype.trimChars) {
            String.prototype.trimChars = function (chars) {
                return this.trimLeftChars(chars).trimRightChars(chars);
            };
        }
    }());

    (function validator() {
        validatorMiro = {
            validateIfNotUndefined: function (value, name) {
                name = name || 'Value';
                if (value === undefined) {
                    throw new Error(name + ' cannot be undefined');
                }
            },
            validateIfNotNull: function (value, name) {
                name = name || 'Value';
                if (value === null) {
                    throw new Error(name + ' cannot be null');
                }
            },
            validateIfObject: function (value, name) {
                name = name || 'Value';
                this.validateIfNotUndefined(value, name);
                if (typeof value !== 'object') {
                    throw new Error(name + ' must be an object');
                }
            },
            validateIfString: function (value, name) {
                name = name || 'Value';
                this.validateIfNotUndefined(value, name);
                if (typeof value !== 'string') {
                    throw new Error(name + ' must be a string');
                }
            },
            validateIfStringIsBetweenMinAndMaxLengthInclusive: function (value, min, max, name) {
                name = name || 'Value';
                this.validateIfString(value, name);
                if (value.length < min || max < value.length) {
                    throw new Error(name + ' must be between ' + min + ' and ' + max + ' symbols');
                }
            },
            validateIfNumber: function (value, name) {
                name = name || 'Value';
                this.validateIfNotUndefined(value, name);
                if (typeof value !== 'number') {
                    throw new Error(name + ' must be a number');
                }
            },
            validateIfNumberBetweenMinAndMaxInclusive: function (value, min, max, name) {
                name = name || 'Value';
                this.validateIfNumber(value, name);
                if (value < min || max < value) {
                    throw new Error(name + ' must be between ' + min + ' and ' + max);
                }
            },
            validateIfNumberGreaterThanValue: function (number, value, name) {
                name = name || 'Value';
                this.validateIfNumber(number, name);
                this.validateIfNumber(value, name);
                if (number <= value) {
                    throw new Error(name + ' must be greater than ' + value);
                }
            },
            validateIfNumberGreaterOrEqualThanValue: function (number, value, name) {
                name = name || 'Value';
                this.validateIfNumber(number, name);
                this.validateIfNumber(value, name);
                if (number < value) {
                    throw new Error(name + ' must be greater or equal than ' + value);
                }
            },
            validateIfArray: function (value, name) {
                name = name || 'Value';
                this.validateIfNotUndefined(value, name);
                if (!Array.isArray(value)) {
                    throw new Error(name + ' must be Array');
                }
            },
            validateId: function (id) {
                return this.some(function (item) {
                    return item.id === id;
                });
            },
            validateIdIvajlo: function (id) {
                this.validateIfNotUndefined(id, 'Object id');
                if (typeof id !== 'number') {
                    id = id.id;
                }

                this.validateIfNotUndefined(id, 'Object must have id');
                return id;
            },
            validatePageAndSize: function (page, size, maxElements) {
                this.validateIfNotUndefined(page);
                this.validateIfNotUndefined(size);
                this.validateIfNumber(page);
                this.validateIfNumber(size);

                if (page < 0) {
                    throw new Error('Page must be greather than or equal to 0');
                }

                this.validatePositiveNumber(size, 'Size');

                if (page * size > maxElements) {
                    throw new Error('Page * size will not return any elements from collection');
                }
            }
        };

    })();

    return function (selector) {
        var $this = $(this);
        
        var $select = $(selector).hide();
        var $current = $('<div/>').addClass('current').text('Select an item');

        var $optionsContainer = $('<div/>')
                .addClass('options-container')
                .css('position', 'absolute')
                .hide();

        $select
            .find('option')
            .each(function(index) {
                var $that = $(this);
                var $currentDataValue = $that.val();
                var $currentText = $that.text();

                var $currentDiv = $('<div/>')
                    .addClass('dropdown-item')
                    .attr('data-value', $currentDataValue)
                    .attr('data-index', index)
                    .text($currentText)
                    .on('click', function() {
                        $current.val($currentDataValue);
                        $current.text($currentText);
                        $optionsContainer.hide();
                        $select.val($currentDataValue);
                    });

                $currentDiv.appendTo($optionsContainer);
            });

        var $container = $('<div/>').addClass('dropdown-list');
        $select.appendTo($container);
        $current.appendTo($container);
        $optionsContainer.appendTo($container);

        $current.on('click', function() {
            $optionsContainer.toggle();
            $current.text('Select an item');
        });

        $(document.body).append($container);

        return $this;
    };
}

module.exports = solve;