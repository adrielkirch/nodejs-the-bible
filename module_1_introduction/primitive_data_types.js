const assert = require('assert');

class PrimitiveDataTypes {
    constructor() {
        // Number
        this.numberExample = 42;
        
        // String
        this.stringExample = 'Hello, world!';
        
        // Boolean
        this.booleanExample = true;
        
        // Undefined
        this.undefinedExample = undefined;
        
        // Null
        this.nullExample = null;
        
        // Symbol
        this.symbolExample = Symbol('example');
    }
    
    displayAll() {
        console.log('Number:', this.numberExample);
        console.log('String:', this.stringExample);
        console.log('Boolean:', this.booleanExample);
        console.log('Undefined:', this.undefinedExample);
        console.log('Null:', this.nullExample);
        console.log('Symbol:', this.symbolExample);
    }


    assertDataTypes() {
        assert.strictEqual(typeof this.numberExample, 'number');
        assert.strictEqual(typeof this.stringExample, 'string');
        assert.strictEqual(typeof this.booleanExample, 'boolean');
        assert.strictEqual(typeof this.undefinedExample, 'undefined');
        assert.strictEqual(this.nullExample, null);
        assert.strictEqual(typeof this.symbolExample, 'symbol');
    }
}

// Usage
const primitiveDataTypesInstance = new PrimitiveDataTypes();
primitiveDataTypesInstance.displayAll();
primitiveDataTypesInstance.assertDataTypes();
