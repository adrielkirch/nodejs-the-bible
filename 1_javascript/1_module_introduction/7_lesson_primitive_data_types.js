/**
 * Importing the assert module.
 * @param {import('assert')} assert - The assert module.
 */
const assert = require('assert');

/**
 * Class representing primitive data types.
 */
class PrimitiveDataTypes {
    constructor() {
        // Number
        /**
         * An example of a number.
         * @type {number}
         */
        this.numberExample = 42;
        
        // String
        /**
         * An example of a string.
         * @type {string}
         */
        this.stringExample = 'Hello, world!';
        
        // Boolean
        /**
         * An example of a boolean.
         * @type {boolean}
         */
        this.booleanExample = true;
        
        // Undefined
        /**
         * An example of undefined.
         * @type {undefined}
         */
        this.undefinedExample = undefined;
        
        // Null
        /**
         * An example of null.
         * @type {null}
         */
        this.nullExample = null;
        
        // Symbol
        /**
         * An example of a symbol.
         * @type {symbol}
         */
        this.symbolExample = Symbol('example');
    }
    
    /**
     * Display all primitive data types.
     */
    displayAll() {
        console.log('Number:', this.numberExample);
        console.log('String:', this.stringExample);
        console.log('Boolean:', this.booleanExample);
        console.log('Undefined:', this.undefinedExample);
        console.log('Null:', this.nullExample);
        console.log('Symbol:', this.symbolExample);
    }

    /**
     * Asserts the data types of primitive values.
     */
    assertDataTypes() {
        /**
         * Asserts the data types of primitive values.
         * @param {*} actual - The actual value to test.
         * @param {string} expectedType - The expected data type.
         */
        const assertDataType = (actual, expectedType) => {
            assert.strictEqual(typeof actual, expectedType);
        };

        assertDataType(this.numberExample, 'number');
        assertDataType(this.stringExample, 'string');
        assertDataType(this.booleanExample, 'boolean');
        assertDataType(this.undefinedExample, 'undefined');
        assert.strictEqual(this.nullExample, null);
        assertDataType(this.symbolExample, 'symbol');
    }
}

// Usage
const primitiveDataTypesInstance = new PrimitiveDataTypes();
primitiveDataTypesInstance.displayAll();
primitiveDataTypesInstance.assertDataTypes();
