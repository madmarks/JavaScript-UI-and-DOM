/* globals $ */

/* 

Create a function that takes an id or DOM element and an array of contents

* if an id is provided, select the element
* Add divs to the element
  * Each div's content must be one of the items from the contents array
* The function must remove all previous content from the DOM element provided
* Throws if:
  * The provided first parameter is neither string or existing DOM element
  * The provided id does not select anything (there is no element that has such an id)
  * Any of the function params is missing
  * Any of the function params is not as described
  * Any of the contents is neight `string` or `number`
    * In that case, the content of the element **must not be** changed   
*/

module.exports = function () {
    return function (element, contents) {

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


        validatorMiro.validateIfNotUndefined(element);
        validatorMiro.validateIfNotNull(element);

        // The nodeType property returns the node type, as a number, of the specified node.
        // If the node is an element node, the nodeType property will return 1.
        // If the node is an attribute node, the nodeType property will return 2.
        // If the node is a text node, the nodeType property will return 3.
        // If the node is a comment node, the nodeType property will return 8.
        //
        //if (typeof (element) !== 'string' && element.nodeType !== 1) {
        if (typeof (element) !== 'string' && !(element instanceof HTMLElement)) {
            throw new Error('The provided first parameter is neither string or existing DOM element');
        }

        validatorMiro.validateIfNotUndefined(contents);
        validatorMiro.validateIfNotNull(contents);
        validatorMiro.validateIfArray(contents);

        contents.forEach(function (item) {
            if (typeof item !== 'string' && typeof item !== 'number') {
                throw new Error('Content must be a string or number');
            }
        });

        if (typeof (element) === 'string') {

            element = document.getElementById(element);

            if (element === null) {
                throw new Error('');
            }
        }

        element.innerHTML = '';

        var div = document.createElement('div');
        var documentFragment = document.createDocumentFragment();

        for (var i = 0, len = contents.length; i < len; i += 1) {
            var divClone = div.cloneNode(true);
            divClone.innerHTML = contents[i];
            documentFragment.appendChild(divClone);
        }

        element.appendChild(documentFragment);
    };
};