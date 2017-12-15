export interface RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
}
export interface HSVA {
    h: number;
    s: number;
    v: number;
    a: number;
}
export declare class Color {
    rgb: number[] | null;
    a: number;
    hsv: number[] | null;
    /**
     * @example
     * // Following ways are supported to construct Kolor object
     * new Kolor(); // Creates Black color with alpha = 1.0
     * new Kolor(r,g,b,a); // each of r,g,b,a should be in 0.0 to 1.0, otherwise undefined behavior
     * new Kolor([r,g,b,a]); // each of r,g,b,a should be in 0.0 to 1.0, otherwise undefined behavior
     * new Kolor({r,g,b,a}); // each of r,g,b,a should be in 0.0 to 1.0, otherwise undefined behavior
     * new Kolor({h,s,v,a}); // each of h,s,v,a should be in 0.0 to 1.0, otherwise undefined behavior
     */
    constructor(arg0: number | RGBA | HSVA | number[], arg1?: number, arg2?: number, arg3?: number);
    /**
     * Returns RGB value
     * @returns {Number[]} Each of RGB values is in range 0.0 to 1.0
     */
    RGB(): number[];
    /**
     * Returns HSV value
     * @returns {Number[]} Each of HSV values is in range 0.0 to 1.0
     */
    HSV(): number[];
    /**
     * Returns CSS string for this color value
     * @param {Number} [bytes=2] Number of bytes to use (default 2)
     * @returns {string}
     */
    toCSS(bytes?: number): string;
    /**
     * Returns CSS string of format `#xxx` for this color value
     * The returned value format doesn't support alpha, hence it's ignored
     * @param {Number} [bytes=2] Number of bytes to use (default 2)
     * @returns {string}
     */
    toCSSHex(bytes?: number): string;
    /**
    * Return a single number that encode R-G-B values of the color
    */
    toNumber(): number;
    /**
     * Get Alpha
     * @returns {Number}
     */
    /**
     * Set Alpha
     * @param {!Number} a
     * @returns {Kolor} this instance
     */
    alpha: number;
    /**
     * Get Hue
     * @returns {Number}
     */
    /**
     * Set Hue
     * @param {!Number} h
     * @returns {Kolor} this instance
     */
    hue: number;
    /**
     * Get Saturation
     * @returns {Number}
     */
    /**
     * Set Saturation
     * @param {!Number} s
     * @returns {Kolor} this instance
     */
    saturation: number;
    /**
     * Get Value
     * @returns {Number}
     */
    /**
     * Set Value
     * @param {!Number} v
     * @returns {Kolor} this instance
     */
    value: number;
    /**
     * Get Red
     * @returns {Number}
     */
    /**
     * Set Red
     * @param {!Number} r
     * @returns {Kolor} this instance
     */
    red: number;
    /**
     * Get Green
     * @returns {Number}
     */
    /**
     * Set Green
     * @param {!Number} g
     * @returns {Kolor} this instance
     */
    green: number;
    /**
     * Get Blue
     * @returns {Number}
     */
    /**
     * Set Blue
     * @param {!Number} b
     * @returns {Kolor} this instance
     */
    blue: number;
    /**
     * Returns RGBA value
     * @returns {Number[]}
     */
    RGBA(): number[];
    /**
     * Clones this instance
     * @returns {Kolor}
     */
    clone(): Color;
    /**
     * To String
     * @returns {string}
     */
    toString(): string;
    /**
     * Revive Kolor instance from memento
     * @param {!Object} m
     * @returns {Kolor}
     */
    static fromMemento(m: number[]): Color;
    /**
     * Generate Memento
     * @returns {Object} Memento
     */
    toMemento(): number[];
    /**
     * Generate random color
     * @returns {Kolor}
     */
    static random(): Color;
}
export declare const WHITE: Color;
export declare const BLACK: Color;
export declare const RED: Color;
export declare const GREEN: Color;
export declare const BLUE: Color;
