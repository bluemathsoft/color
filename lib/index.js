"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Color = /** @class */ (function () {
    /**
     * @example
     * // Following ways are supported to construct Kolor object
     * new Kolor(); // Creates Black color with alpha = 1.0
     * new Kolor(r,g,b,a); // each of r,g,b,a should be in 0.0 to 1.0, otherwise undefined behavior
     * new Kolor([r,g,b,a]); // each of r,g,b,a should be in 0.0 to 1.0, otherwise undefined behavior
     * new Kolor({r,g,b,a}); // each of r,g,b,a should be in 0.0 to 1.0, otherwise undefined behavior
     * new Kolor({h,s,v,a}); // each of h,s,v,a should be in 0.0 to 1.0, otherwise undefined behavior
     */
    function Color(arg0, arg1, arg2, arg3) {
        this.rgb = null;
        this.a = 1;
        this.hsv = null;
        if (arguments.length === 0) {
            this.rgb = [0, 0, 0];
            this.a = 1.0;
        }
        else {
            if (Array.isArray(arguments[0])) {
                var c = arguments[0];
                this.rgb = [c[0], c[1], c[2]];
                if (c[3] === undefined || c[3] === null) {
                    this.a = 1.0;
                }
                else {
                    this.a = c[3];
                }
            }
            else if (arguments.length > 1) {
                this.rgb = [arguments[0], arguments[1], arguments[2]];
                if (arguments[3] === undefined || arguments[3] === null) {
                    this.a = 1.0;
                }
                else {
                    this.a = arguments[3];
                }
            }
            else {
                var c = arguments[0];
                if (c instanceof Color) {
                    this.rgb = c.RGB();
                    this.a = c.a;
                }
                else if (c.hasOwnProperty('r')) {
                    // Assume - new Kolor({r:<number>,g:<number>,b:<number>,a:<number>})
                    this.rgb = [c.r, c.g, c.b];
                    if (c.a === undefined || c.a === null) {
                        this.a = 1.0;
                    }
                    else {
                        this.a = c.a;
                    }
                }
                else if (c.hasOwnProperty('h')) {
                    // Assume - new Kolor({h:<number>,s:<number>,v:<number>,a:<number>})
                    this.hsv = [c.h, c.s, c.v];
                    this.a = c.a;
                    if (c.a === undefined || c.a === null) {
                        this.a = 1.0;
                    }
                    else {
                        this.a = c.a;
                    }
                }
            }
        }
    }
    /**
     * Returns RGB value
     * @returns {Number[]} Each of RGB values is in range 0.0 to 1.0
     */
    Color.prototype.RGB = function () {
        if (!this.rgb) {
            console.assert(this.hsv !== null);
            this.rgb = hsv2rgb(this.hsv);
        }
        return this.rgb.slice();
    };
    /**
     * Returns HSV value
     * @returns {Number[]} Each of HSV values is in range 0.0 to 1.0
     */
    Color.prototype.HSV = function () {
        if (!this.hsv) {
            console.assert(this.rgb !== null);
            this.hsv = rgb2hsv(this.rgb);
        }
        return this.hsv.slice();
    };
    /**
     * Returns CSS string for this color value
     * @param {Number} [bytes=2] Number of bytes to use (default 2)
     * @returns {string}
     */
    Color.prototype.toCSS = function (bytes) {
        if (bytes === void 0) { bytes = 2; }
        if (!this.rgb) {
            this.rgb = hsv2rgb(this.hsv);
        }
        if (this.a >= 1.0)
            return this.toCSSHex(bytes);
        var red = this.rgb[0];
        var green = this.rgb[1];
        var blue = this.rgb[2];
        var alpha = this.a;
        var max = 255;
        var components = [
            'rgba(',
            Math.max(0, Math.min(max, Math.round(red * max))), ',',
            Math.max(0, Math.min(max, Math.round(green * max))), ',',
            Math.max(0, Math.min(max, Math.round(blue * max))), ',',
            Math.max(0, Math.min(1.0, alpha)).toFixed(3),
            ')'
        ];
        return components.join('');
    };
    /**
     * Returns CSS string of format `#xxx` for this color value
     * The returned value format doesn't support alpha, hence it's ignored
     * @param {Number} [bytes=2] Number of bytes to use (default 2)
     * @returns {string}
     */
    Color.prototype.toCSSHex = function (bytes) {
        if (bytes === void 0) { bytes = 2; }
        if (!this.rgb) {
            this.rgb = hsv2rgb(this.hsv);
        }
        var red = this.rgb[0];
        var green = this.rgb[1];
        var blue = this.rgb[2];
        bytes = bytes || 2;
        var max = Math.pow(16, bytes) - 1;
        var css = [
            "#",
            pad(Math.round(red * max).toString(16).toUpperCase(), bytes),
            pad(Math.round(green * max).toString(16).toUpperCase(), bytes),
            pad(Math.round(blue * max).toString(16).toUpperCase(), bytes)
        ];
        return css.join('');
    };
    /**
     * Create color object from CSS Hex string
     * @param s Hex string of the form '#ff0' or '#f0f0cc'
     */
    Color.fromCSSHex = function (s) {
        if (s.length === 4) {
            var match = /#(\w)(\w)(\w)/.exec(s);
            if (match) {
                var r = parseInt(match[1], 16);
                var g = parseInt(match[2], 16);
                var b = parseInt(match[3], 16);
                return new Color([r / 16, g / 16, b / 16, 1]);
            }
            else {
                throw new Error('Invalid input format');
            }
        }
        else if (s.length === 7) {
            var match = /#(\w\w)(\w\w)(\w\w)/.exec(s);
            if (match) {
                var r = parseInt(match[1], 16);
                var g = parseInt(match[2], 16);
                var b = parseInt(match[3], 16);
                return new Color([r / 255, g / 255, b / 255, 1]);
            }
            else {
                throw new Error('Invalid input format');
            }
        }
        else {
            throw new Error('Invalid input format');
        }
    };
    /**
    * Return a single number that encode R-G-B values of the color
    */
    Color.prototype.toNumber = function () {
        if (!this.rgb) {
            this.rgb = hsv2rgb(this.hsv);
        }
        var red = Math.round(this.rgb[0] * 255);
        var green = Math.round(this.rgb[1] * 255);
        var blue = Math.round(this.rgb[2] * 255);
        return (red << 16) | (green << 8) | blue;
    };
    Object.defineProperty(Color.prototype, "alpha", {
        /**
         * Get Alpha
         * @returns {Number}
         */
        get: function () {
            return this.a;
        },
        /**
         * Set Alpha
         * @param {!Number} a
         * @returns {Kolor} this instance
         */
        set: function (a) {
            this.a = a;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "hue", {
        /**
         * Get Hue
         * @returns {Number}
         */
        get: function () {
            if (!this.hsv) {
                this.hsv = rgb2hsv(this.rgb);
            }
            return this.hsv[0];
        },
        /**
         * Set Hue
         * @param {!Number} h
         * @returns {Kolor} this instance
         */
        set: function (h) {
            if (!this.hsv) {
                this.hsv = rgb2hsv(this.rgb);
            }
            this.hsv[0] = h;
            this.rgb = null; // to force RGB recalculation
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "saturation", {
        /**
         * Get Saturation
         * @returns {Number}
         */
        get: function () {
            if (!this.hsv) {
                this.hsv = rgb2hsv(this.rgb);
            }
            return this.hsv[1];
        },
        /**
         * Set Saturation
         * @param {!Number} s
         * @returns {Kolor} this instance
         */
        set: function (s) {
            if (!this.hsv) {
                this.hsv = rgb2hsv(this.rgb);
            }
            this.hsv[1] = s;
            this.rgb = null; // to force RGB recalculation
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "value", {
        /**
         * Get Value
         * @returns {Number}
         */
        get: function () {
            if (!this.hsv) {
                this.hsv = rgb2hsv(this.rgb);
            }
            return this.hsv[2];
        },
        /**
         * Set Value
         * @param {!Number} v
         * @returns {Kolor} this instance
         */
        set: function (v) {
            if (!this.hsv) {
                this.hsv = rgb2hsv(this.rgb);
            }
            this.hsv[2] = v;
            this.rgb = null; // to force RGB recalculation
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "red", {
        /**
         * Get Red
         * @returns {Number}
         */
        get: function () {
            if (!this.rgb) {
                this.rgb = hsv2rgb(this.hsv);
            }
            return this.rgb[0];
        },
        /**
         * Set Red
         * @param {!Number} r
         * @returns {Kolor} this instance
         */
        set: function (r) {
            if (!this.rgb) {
                this.rgb = hsv2rgb(this.hsv);
            }
            this.rgb[0] = r;
            this.hsv = null; // to force HSV recalculation
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "green", {
        /**
         * Get Green
         * @returns {Number}
         */
        get: function () {
            if (!this.rgb) {
                this.rgb = hsv2rgb(this.hsv);
            }
            return this.rgb[1];
        },
        /**
         * Set Green
         * @param {!Number} g
         * @returns {Kolor} this instance
         */
        set: function (g) {
            if (!this.rgb) {
                this.rgb = hsv2rgb(this.hsv);
            }
            this.rgb[1] = g;
            this.hsv = null; // to force HSV recalculation
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "blue", {
        /**
         * Get Blue
         * @returns {Number}
         */
        get: function () {
            if (!this.rgb) {
                this.rgb = hsv2rgb(this.hsv);
            }
            return this.rgb[2];
        },
        /**
         * Set Blue
         * @param {!Number} b
         * @returns {Kolor} this instance
         */
        set: function (b) {
            if (!this.rgb) {
                this.rgb = hsv2rgb(this.hsv);
            }
            this.rgb[2] = b;
            this.hsv = null; // to force HSV recalculation
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns RGBA value
     * @returns {Number[]}
     */
    Color.prototype.RGBA = function () {
        if (!this.rgb) {
            this.rgb = hsv2rgb(this.hsv);
        }
        return [
            this.rgb[0],
            this.rgb[1],
            this.rgb[2],
            this.a
        ];
    };
    /**
     * Clones this instance
     * @returns {Kolor}
     */
    Color.prototype.clone = function () {
        return Color.fromJSON(this.toJSON());
    };
    /**
     * To String
     * @returns {string}
     */
    Color.prototype.toString = function () {
        var r = this.red;
        var g = this.green;
        var b = this.blue;
        var a = this.alpha;
        return "rgba(" + Math.round(255 * r) + "," + Math.round(255 * g) + "," + Math.round(255 * b) + "," + a + ")";
    };
    /**
     * Revive Kolor instance from memento
     * @param {!Object} m
     * @returns {Kolor}
     */
    Color.fromJSON = function (m) {
        return new Color(m);
    };
    /**
     * Generate Memento
     * @returns {Object} Memento
     */
    Color.prototype.toJSON = function () {
        if (!this.rgb) {
            this.rgb = hsv2rgb(this.hsv);
        }
        return [this.rgb[0], this.rgb[1], this.rgb[2], this.a];
    };
    /**
     * Generate random color
     * @returns {Kolor}
     */
    Color.random = function () {
        return new Color([
            Math.random(),
            Math.random(),
            Math.random(),
            1.0
        ]);
    };
    return Color;
}());
exports.Color = Color;
/* takes a value, converts to string if need be, then pads it
 * to a minimum length.
 */
function pad(val, len) {
    val = val.toString();
    var padded = [];
    for (var i = 0, j = Math.max(len - val.length, 0); i < j; i++) {
        padded.push('0');
    }
    padded.push(val);
    return padded.join('');
}
function hsv2rgb(hsv) {
    var hue = hsv[0];
    var saturation = hsv[1];
    var value = hsv[2];
    hue %= 360;
    saturation = Math.min(Math.max(0, saturation), 1);
    value = Math.min(1, Math.max(0, value));
    var i;
    var f, p, q, t;
    var red, green, blue;
    if (saturation === 0) {
        // achromatic (grey)
        return [value, value, value];
    }
    var h = hue / 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // fractional part of h
    p = value * (1 - saturation);
    q = value * (1 - saturation * f);
    t = value * (1 - saturation * (1 - f));
    switch (i) {
        case 0:
            red = value;
            green = t;
            blue = p;
            break;
        case 1:
            red = q;
            green = value;
            blue = p;
            break;
        case 2:
            red = p;
            green = value;
            blue = t;
            break;
        case 3:
            red = p;
            green = q;
            blue = value;
            break;
        case 4:
            red = t;
            green = p;
            blue = value;
            break;
        default:// case 5:
            red = value;
            green = p;
            blue = q;
            break;
    }
    return [red, green, blue];
}
function rgb2hsv(rgb) {
    var red = rgb[0];
    var green = rgb[1];
    var blue = rgb[2];
    var min, max, delta;
    var hue, saturation, value;
    min = Math.min(red, green, blue);
    max = Math.max(red, green, blue);
    value = max; // v
    delta = max - min;
    if (delta == 0) {
        hue = saturation = 0;
    }
    else {
        saturation = delta / max;
        if (red == max) {
            hue = (green - blue) / delta; // between yellow & magenta
        }
        else if (green == max) {
            hue = 2 + (blue - red) / delta; // between cyan & yellow
        }
        else {
            hue = 4 + (red - green) / delta; // between magenta & cyan
        }
        hue = ((hue * 60) + 360) % 360; // degrees
    }
    return [hue, saturation, value];
}
exports.WHITE = new Color([1, 1, 1, 1]);
exports.BLACK = new Color([0, 0, 0, 1]);
exports.RED = new Color([1, 0, 0, 1]);
exports.GREEN = new Color([0, 1, 0, 1]);
exports.BLUE = new Color([0, 0, 1, 1]);
