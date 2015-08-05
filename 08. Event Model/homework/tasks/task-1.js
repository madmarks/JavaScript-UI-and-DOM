/* globals $ */

/* 

Create a function that takes an id or DOM element and:

    If an id is provided, select the element
    Finds all elements with class button or content within the provided element
        Change the content of all .button elements with "hide"
    When a .button is clicked:
        Find the topmost .content element, that is before another .button and:
            If the .content is visible:
                Hide the .content
                Change the content of the .button to "show"
            If the .content is hidden:
                Show the .content
                Change the content of the .button to "hide"
            If there isn't a .content element after the clicked .button and before other .button, do nothing
    Throws if:
        The provided DOM element is non-existant
        The id is either not a string or does not select any DOM element

*/

function solve() {
    return function (selector) {

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

        var i,
            len,
            element,
            buttonElements;

        validatorMiro.validateIfNotUndefined(selector);
        validatorMiro.validateIfString(selector);

        element = document.getElementById(selector);

        if (element === null) {
            throw new Error('1');
        }

        buttonElements = document.getElementsByClassName('button');

        for (i = 0, len = buttonElements.length; i < len; i += 1) {
            buttonElements[i].innerHTML = 'hide';
        }

        element.addEventListener('click', hideOrShowElements)
    };

    function hideOrShowElements(ev) {
        var target = ev.target,
            nextElement = target.nextElementSibling,
            element;

        if (nextElement === null || nextElement.className === 'button') {
            return;
        }

        while (nextElement) {
            if (nextElement.className === 'content') {
                element = nextElement;
                break;
            } else {
                nextElement = nextElement.nextElementSibling;
            }
        }

        if (element.style.display === '') { // content is visible
            target.innerHTML = 'show';
            element.style.display = 'none'; // hide content
        } else {
            target.innerHTML = 'hide';
            element.style.display = '';     // show content
        }
    }
};

module.exports = solve;