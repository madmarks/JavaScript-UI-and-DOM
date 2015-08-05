/* globals $ */

/* 

Create a function that takes a selector and COUNT, then generates inside a UL with COUNT LIs:   
  * The UL must have a class `items-list`
  * Each of the LIs must:
    * have a class `list-item`
    * content "List item #INDEX"
      * The indices are zero-based
  * If the provided selector does not selects anything, do nothing
  * Throws if
    * COUNT is a `Number`, but is less than 1
    * COUNT is **missing**, or **not convertible** to `Number`
      * _Example:_
        * Valid COUNT values:
          * 1, 2, 3, '1', '4', '1123'
        * Invalid COUNT values:
          * '123px' 'John', {}, [] 
*/

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

    return function (selector, count) {
        var $ulElement,
            $nodeElement,
            i,
            liClassName = 'list-item',
            liContent = 'List item #',
            ulClassName = 'items-list';

        validatorMiro.validateIfNotUndefined(selector);
        validatorMiro.validateIfString(selector);

        validatorMiro.validateIfNotUndefined(count);
        validatorMiro.validateIfNumberGreaterOrEqualThanValue(count, 1);

        $nodeElement = $(selector);

        if ($nodeElement === null) {
            return null;
        }

        $ulElement = $('<ul/>').addClass(ulClassName);

        for (i = 0; i < count; i += 1) {
            $('<li/>').addClass(liClassName).text(liContent + i).appendTo($ulElement);
        }

        $ulElement.appendTo($nodeElement);
    };
};

module.exports = solve;