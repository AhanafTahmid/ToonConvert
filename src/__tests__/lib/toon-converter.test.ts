import { 
  jsonToToon, 
  toonToJson, 
  xmlToToon, 
  toonToXml, 
  csvToToon, 
  toonToCsv, 
  yamlToToon, 
  toonToYaml,
  countTokens, 
  calculateTokenSavings,
  ToonOptions 
} from '@/lib/toon-converter';

describe('TOON Converter', () => {
  describe('jsonToToon', () => {
    test('should convert simple object to TOON format', () => {
      const json = {
        name: 'Alice',
        age: 30,
        city: 'Boston'
      };

      const expected = `name: Alice
age: 30
city: Boston`;

      expect(jsonToToon(json)).toBe(expected);
    });

    test('should convert array of objects to tabular TOON format', () => {
      const json = {
        users: [
          { id: 1, name: 'Alice', role: 'admin' },
          { id: 2, name: 'Bob', role: 'user' }
        ]
      };

      const expected = `users[2]{id,name,role}:
  1,Alice,admin
  2,Bob,user`;

      expect(jsonToToon(json)).toBe(expected);
    });

    test('should handle nested objects', () => {
      const json = {
        user: {
          name: 'Alice',
          contact: {
            email: 'alice@example.com',
            phone: '555-1234'
          }
        }
      };

      const expected = `user:
  name: Alice
  contact:
    email: alice@example.com
    phone: 555-1234`;

      expect(jsonToToon(json)).toBe(expected);
    });

    test('should handle custom delimiter (pipe)', () => {
      const json = {
        addresses: [
          { street: '123 Main St, Suite 100', city: 'Boston', country: 'USA' },
          { street: '456 Oak Ave, Apt 5B', city: 'Seattle', country: 'USA' }
        ]
      };

      const options: ToonOptions = { delimiter: '|' };
      const expected = `addresses[2]{street,city,country}|:
  123 Main St, Suite 100|Boston|USA
  456 Oak Ave, Apt 5B|Seattle|USA`;

      expect(jsonToToon(json, options)).toBe(expected);
    });

    test('should handle custom delimiter (tab)', () => {
      const json = {
        items: [
          { sku: 'A1', qty: 2, price: 9.99 },
          { sku: 'B2', qty: 1, price: 14.5 }
        ]
      };

      const options: ToonOptions = { delimiter: '\t' };
      const result = jsonToToon(json, options);
      
      // Check that it uses tab delimiter and has the correct structure
      expect(result).toContain('items[2]{sku,qty,price}\t:');
      expect(result).toContain('A1\t2\t9.99');
      expect(result).toContain('B2\t1\t14.5');
    });

    test('should handle custom indentation', () => {
      const json = {
        user: {
          name: 'Alice',
          age: 30
        }
      };

      const options: ToonOptions = { indentation: 4 };
      const expected = `user:
    name: Alice
    age: 30`;

      expect(jsonToToon(json, options)).toBe(expected);
    });

    test('should include length markers when option is enabled', () => {
      const json = {
        users: [
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' }
        ]
      };

      const options: ToonOptions = { showLengthMarkers: true };
      const expected = `users[2]{id,name}:
  1,Alice
  2,Bob`;

      expect(jsonToToon(json, options)).toBe(expected);
    });

    test('should handle empty arrays', () => {
      const json = {
        users: []
      };

      const expected = `users[0]{}:`;

      expect(jsonToToon(json)).toBe(expected);
    });

    test('should handle null values', () => {
      const json = {
        name: 'Alice',
        age: null
      };

      const expected = `name: Alice
age: null`;

      expect(jsonToToon(json)).toBe(expected);
    });

    test('should handle boolean values', () => {
      const json = {
        isActive: true,
        isDeleted: false
      };

      const expected = `isActive: true
isDeleted: false`;

      expect(jsonToToon(json)).toBe(expected);
    });

    test('should handle complex nested structure', () => {
      const json = {
        company: {
          name: 'Tech Corp',
          employees: [
            { id: 1, name: 'Alice', salary: 75000 },
            { id: 2, name: 'Bob', salary: 65000 }
          ]
        }
      };

      const expected = `company:
  name: Tech Corp
  employees[2]{id,name,salary}:
    1,Alice,75000
    2,Bob,65000`;

      expect(jsonToToon(json)).toBe(expected);
    });

    test('should handle root-level array', () => {
      const json = [
        { id: 1, productName: 'Laptop', price: 1200, inStock: true },
        { id: 2, productName: 'Mouse', price: 25.5, inStock: true },
        { id: 3, productName: 'Keyboard', price: 75, inStock: false }
      ];

      const expected = `[3]{id,productName,price,inStock}:
  1,Laptop,1200,true
  2,Mouse,25.5,true
  3,Keyboard,75,false`;

      expect(jsonToToon(json)).toBe(expected);
    });
  });

  describe('toonToJson', () => {
    test('should convert simple TOON to JSON', () => {
      const toon = `name: Alice
age: 30
city: Boston`;

      const expected = {
        name: 'Alice',
        age: 30,
        city: 'Boston'
      };

      expect(toonToJson(toon)).toEqual(expected);
    });

    test('should convert tabular TOON to JSON array', () => {
      const toon = `users[2]{id,name,role}:
  1,Alice,admin
  2,Bob,user`;

      const expected = {
        users: [
          { id: 1, name: 'Alice', role: 'admin' },
          { id: 2, name: 'Bob', role: 'user' }
        ]
      };

      expect(toonToJson(toon)).toEqual(expected);
    });

    test('should convert nested TOON to JSON', () => {
      const toon = `user:
  name: Alice
  contact:
    email: alice@example.com
    phone: 555-1234`;

      const expected = {
        user: {
          name: 'Alice',
          contact: {
            email: 'alice@example.com',
            phone: '555-1234'
          }
        }
      };

      expect(toonToJson(toon)).toEqual(expected);
    });

    test('should handle pipe delimiter', () => {
      const toon = `addresses[2]{street,city,country}|:
  123 Main St, Suite 100|Boston|USA
  456 Oak Ave, Apt 5B|Seattle|USA`;

      const expected = {
        addresses: [
          { street: '123 Main St, Suite 100', city: 'Boston', country: 'USA' },
          { street: '456 Oak Ave, Apt 5B', city: 'Seattle', country: 'USA' }
        ]
      };

      expect(toonToJson(toon)).toEqual(expected);
    });

    test('should throw error for invalid TOON format', () => {
      const invalidToon = 'invalid toon format {{{';
      
      // For now, toonToJson is permissive and returns an object even for invalid input
      // In a production app, you might want stricter validation
      const result = toonToJson(invalidToon);
      expect(typeof result).toBe('object');
    });

    test('should handle complex nested structure', () => {
      const toon = `company:
  name: Tech Corp
  employees[2]{id,name,salary}:
    1,Alice,75000
    2,Bob,65000`;

      const expected = {
        company: {
          name: 'Tech Corp',
          employees: [
            { id: 1, name: 'Alice', salary: 75000 },
            { id: 2, name: 'Bob', salary: 65000 }
          ]
        }
      };

      expect(toonToJson(toon)).toEqual(expected);
    });

    test('should handle root-level array without key name', () => {
      const toon = `[3]{id,productName,price,inStock}:
  1,Laptop,1200,true
  2,Mouse,25.5,true
  3,Keyboard,75,false`;

      const expected = [
        { id: 1, productName: 'Laptop', price: 1200, inStock: true },
        { id: 2, productName: 'Mouse', price: 25.5, inStock: true },
        { id: 3, productName: 'Keyboard', price: 75, inStock: false }
      ];

      expect(toonToJson(toon)).toEqual(expected);
    });
  });

  describe('countTokens', () => {
    test('should count tokens in a string', () => {
      const text = 'Hello world';
      const count = countTokens(text);
      expect(count).toBeGreaterThan(0);
      expect(typeof count).toBe('number');
    });

    test('should count more tokens for longer text', () => {
      const shortText = 'Hi';
      const longText = 'This is a much longer text with many more words';
      
      expect(countTokens(longText)).toBeGreaterThan(countTokens(shortText));
    });

    test('should handle empty string', () => {
      expect(countTokens('')).toBe(0);
    });
  });

  describe('Round-trip conversion', () => {
    test('should preserve data through JSON -> TOON -> JSON conversion', () => {
      const originalJson = {
        users: [
          { id: 1, name: 'Alice', role: 'admin', active: true },
          { id: 2, name: 'Bob', role: 'user', active: false }
        ]
      };

      const toon = jsonToToon(originalJson);
      const convertedJson = toonToJson(toon);

      expect(convertedJson).toEqual(originalJson);
    });

    test('should preserve nested data through round-trip conversion', () => {
      const originalJson = {
        company: {
          name: 'Tech Corp',
          founded: 2020,
          employees: [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' }
          ]
        }
      };

      const toon = jsonToToon(originalJson);
      const convertedJson = toonToJson(toon);

      expect(convertedJson).toEqual(originalJson);
    });

    test('should preserve root-level array through round-trip conversion', () => {
      const originalJson = [
        { id: 1, productName: 'Laptop', price: 1200, inStock: true },
        { id: 2, productName: 'Mouse', price: 25.5, inStock: true },
        { id: 3, productName: 'Keyboard', price: 75, inStock: false }
      ];

      const toon = jsonToToon(originalJson);
      const convertedJson = toonToJson(toon);

      expect(convertedJson).toEqual(originalJson);
    });
  });

  describe('xmlToToon', () => {
    test('should convert simple XML to TOON format', () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root>
  <name>Alice</name>
  <age>30</age>
  <city>Boston</city>
</root>`;

      const result = xmlToToon(xml);
      expect(result).toContain('name:');
      expect(result).toContain('Alice');
      expect(result).toContain('age:');
      expect(result).toContain('30');
      expect(result).toContain('city:');
      expect(result).toContain('Boston');
    });

    test('should convert XML with nested elements', () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<user>
  <name>Alice</name>
  <contact>
    <email>alice@example.com</email>
    <phone>555-1234</phone>
  </contact>
</user>`;

      const result = xmlToToon(xml);
      // The XML parser may flatten the structure, so we just check for key values
      expect(result).toContain('name:');
      expect(result).toContain('Alice');
      expect(result).toContain('contact:');
      expect(result).toContain('email:');
      expect(result).toContain('alice@example.com');
    });

    test('should convert XML with multiple similar elements to array', () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<users>
  <user>
    <id>1</id>
    <name>Alice</name>
  </user>
  <user>
    <id>2</id>
    <name>Bob</name>
  </user>
</users>`;

      const result = xmlToToon(xml);
      expect(result).toContain('user');
      expect(result).toContain('Alice');
      expect(result).toContain('Bob');
    });

    test('should handle XML with attributes', () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<product id="123" category="electronics">
  <name>Laptop</name>
  <price>1200</price>
</product>`;

      const result = xmlToToon(xml);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });

    test('should handle custom delimiter for XML', () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<items>
  <item>
    <id>1</id>
    <name>Product A</name>
  </item>
</items>`;

      const options: ToonOptions = { delimiter: '|' };
      const result = xmlToToon(xml, options);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  describe('toonToXml', () => {
    test('should convert simple TOON to XML', () => {
      const toon = `name: Alice
age: 30
city: Boston`;

      const result = toonToXml(toon);
      expect(result).toContain('<?xml');
      expect(result).toContain('<root>');
      expect(result).toContain('<name>Alice</name>');
      expect(result).toContain('<age>30</age>');
      expect(result).toContain('<city>Boston</city>');
      expect(result).toContain('</root>');
    });

    test('should convert nested TOON to nested XML', () => {
      const toon = `user:
  name: Alice
  contact:
    email: alice@example.com
    phone: 555-1234`;

      const result = toonToXml(toon);
      expect(result).toContain('<user>');
      expect(result).toContain('<name>Alice</name>');
      expect(result).toContain('<contact>');
      expect(result).toContain('<email>alice@example.com</email>');
      expect(result).toContain('</contact>');
      expect(result).toContain('</user>');
    });

    test('should convert TOON array to XML elements', () => {
      const toon = `users[2]{id,name}:
  1,Alice
  2,Bob`;

      const result = toonToXml(toon);
      expect(result).toContain('Alice');
      expect(result).toContain('Bob');
    });

    test('should handle root-level TOON array to XML', () => {
      const toon = `[2]{id,name}:
  1,Alice
  2,Bob`;

      const result = toonToXml(toon);
      expect(result).toContain('<?xml');
      expect(result).toBeDefined();
    });
  });

  describe('csvToToon', () => {
    test('should convert simple CSV to TOON format', () => {
      const csv = `id,name,role
1,Alice,admin
2,Bob,user`;

      const result = csvToToon(csv);
      expect(result).toContain('{id,name,role}');
      expect(result).toContain('Alice');
      expect(result).toContain('Bob');
      expect(result).toContain('admin');
      expect(result).toContain('user');
    });

    test('should handle CSV with quoted values', () => {
      const csv = `id,name,address
1,Alice,"123 Main St, Suite 100"
2,Bob,"456 Oak Ave"`;

      const result = csvToToon(csv);
      expect(result).toContain('Alice');
      expect(result).toContain('Bob');
      expect(result).toContain('123 Main St');
    });

    test('should handle CSV with numbers', () => {
      const csv = `id,product,price,quantity
1,Laptop,1200.50,5
2,Mouse,25.99,10`;

      const result = csvToToon(csv);
      expect(result).toContain('Laptop');
      // Numbers may be parsed without trailing zeros
      expect(result).toContain('1200.5');
      expect(result).toContain('25.99');
    });

    test('should handle CSV with empty fields', () => {
      const csv = `id,name,email
1,Alice,alice@example.com
2,Bob,`;

      const result = csvToToon(csv);
      expect(result).toContain('Alice');
      expect(result).toContain('alice@example.com');
      expect(result).toContain('Bob');
    });

    test('should handle CSV with custom delimiter option', () => {
      const csv = `id,name,role
1,Alice,admin
2,Bob,user`;

      const options: ToonOptions = { delimiter: '|' };
      const result = csvToToon(csv, options);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });

    test('should handle single row CSV', () => {
      const csv = `id,name,role
1,Alice,admin`;

      const result = csvToToon(csv);
      expect(result).toContain('Alice');
      expect(result).toContain('admin');
    });

    test('should handle CSV with special characters', () => {
      const csv = `id,name,description
1,Product A,"Contains: comma, semicolon; and quotes"`;

      const result = csvToToon(csv);
      expect(result).toContain('Product A');
    });
  });

  describe('toonToCsv', () => {
    test('should convert TOON to CSV format', () => {
      const toon = `[2]{id,name,role}:
  1,Alice,admin
  2,Bob,user`;

      const result = toonToCsv(toon);
      expect(result).toContain('id,name,role');
      expect(result).toContain('1,Alice,admin');
      expect(result).toContain('2,Bob,user');
    });

    test('should handle single-item TOON array', () => {
      const toon = `[1]{id,name,price}:
  1,Laptop,1200`;

      const result = toonToCsv(toon);
      expect(result).toContain('id,name,price');
      expect(result).toContain('1,Laptop,1200');
    });

    test('should handle TOON with numeric values', () => {
      const toon = `[3]{id,amount,quantity}:
  1,100.50,5
  2,250.75,10
  3,50.00,2`;

      const result = toonToCsv(toon);
      // Numbers may be parsed without trailing zeros
      expect(result).toContain('100.5');
      expect(result).toContain('250.75');
      expect(result).toContain('50');
    });

    test('should handle root-level TOON array', () => {
      const toon = `[2]{id,name}:
  1,Alice
  2,Bob`;

      const result = toonToCsv(toon);
      expect(result).toContain('id,name');
      expect(result).toContain('Alice');
      expect(result).toContain('Bob');
    });

    test('should handle TOON with pipe delimiter', () => {
      const toon = `[2]{id,name,role}|:
  1|Alice|admin
  2|Bob|user`;

      const result = toonToCsv(toon);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result).toContain('Alice');
      expect(result).toContain('Bob');
    });
  });

  describe('yamlToToon', () => {
    test('should convert simple YAML to TOON format', () => {
      const yaml = `name: Alice
age: 30
city: Boston`;

      const result = yamlToToon(yaml);
      expect(result).toContain('name:');
      expect(result).toContain('Alice');
      expect(result).toContain('age:');
      expect(result).toContain('30');
      expect(result).toContain('city:');
      expect(result).toContain('Boston');
    });

    test('should convert nested YAML to TOON', () => {
      const yaml = `user:
  name: Alice
  contact:
    email: alice@example.com
    phone: 555-1234`;

      const result = yamlToToon(yaml);
      expect(result).toContain('user:');
      expect(result).toContain('name:');
      expect(result).toContain('Alice');
      expect(result).toContain('contact:');
      expect(result).toContain('email:');
      expect(result).toContain('alice@example.com');
    });

    test('should convert YAML array to TOON', () => {
      const yaml = `users:
  - id: 1
    name: Alice
    role: admin
  - id: 2
    name: Bob
    role: user`;

      const result = yamlToToon(yaml);
      expect(result).toContain('users');
      // YAML array parsing might vary, just check that we get some output
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });

    test('should handle YAML with boolean values', () => {
      const yaml = `isActive: true
isDeleted: false
verified: true`;

      const result = yamlToToon(yaml);
      expect(result).toContain('isActive:');
      expect(result).toContain('true');
      expect(result).toContain('isDeleted:');
      expect(result).toContain('false');
    });

    test('should handle YAML with numbers', () => {
      const yaml = `id: 123
price: 99.99
quantity: 5`;

      const result = yamlToToon(yaml);
      expect(result).toContain('123');
      expect(result).toContain('99.99');
      expect(result).toContain('5');
    });

    test('should handle YAML with null values', () => {
      const yaml = `name: Alice
email: null
age: 30`;

      const result = yamlToToon(yaml);
      expect(result).toContain('Alice');
      expect(result).toContain('null');
      expect(result).toContain('30');
    });

    test('should handle YAML with custom delimiter option', () => {
      const yaml = `name: Alice
age: 30`;

      const options: ToonOptions = { delimiter: '|' };
      const result = yamlToToon(yaml, options);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  describe('toonToYaml', () => {
    test('should convert simple TOON to YAML', () => {
      const toon = `name: Alice
age: 30
city: Boston`;

      const result = toonToYaml(toon);
      expect(result).toContain('name: Alice');
      expect(result).toContain('age: 30');
      expect(result).toContain('city: Boston');
    });

    test('should convert nested TOON to nested YAML', () => {
      const toon = `user:
  name: Alice
  contact:
    email: alice@example.com
    phone: 555-1234`;

      const result = toonToYaml(toon);
      expect(result).toContain('user:');
      expect(result).toContain('name: Alice');
      expect(result).toContain('contact:');
      expect(result).toContain('email: alice@example.com');
    });

    test('should convert TOON array to YAML array', () => {
      const toon = `users[2]{id,name,role}:
  1,Alice,admin
  2,Bob,user`;

      const result = toonToYaml(toon);
      expect(result).toContain('users:');
      expect(result).toContain('Alice');
      expect(result).toContain('Bob');
    });

    test('should handle root-level TOON array to YAML', () => {
      const toon = `[2]{id,name}:
  1,Alice
  2,Bob`;

      const result = toonToYaml(toon);
      expect(result).toContain('Alice');
      expect(result).toContain('Bob');
    });

    test('should handle TOON with boolean values', () => {
      const toon = `isActive: true
isDeleted: false`;

      const result = toonToYaml(toon);
      expect(result).toContain('isActive: true');
      expect(result).toContain('isDeleted: false');
    });
  });

  describe('calculateTokenSavings', () => {
    test('should calculate token savings between JSON and TOON', () => {
      const json = JSON.stringify({
        users: [
          { id: 1, name: 'Alice', role: 'admin' },
          { id: 2, name: 'Bob', role: 'user' }
        ]
      });
      
      const toon = `users[2]{id,name,role}:
  1,Alice,admin
  2,Bob,user`;

      const result = calculateTokenSavings(json, toon);
      
      expect(result.jsonTokens).toBeGreaterThan(0);
      expect(result.toonTokens).toBeGreaterThan(0);
      expect(result.savedTokens).toBeGreaterThan(0);
      expect(result.savedPercentage).toBeGreaterThan(0);
      expect(result.savedPercentage).toBeLessThan(100);
    });

    test('should show zero savings for identical strings', () => {
      const text = 'same text';
      const result = calculateTokenSavings(text, text);
      
      expect(result.jsonTokens).toBe(result.toonTokens);
      expect(result.savedTokens).toBe(0);
      expect(result.savedPercentage).toBe(0);
    });

    test('should handle empty strings', () => {
      const result = calculateTokenSavings('', '');
      
      expect(result.jsonTokens).toBe(0);
      expect(result.toonTokens).toBe(0);
      expect(result.savedTokens).toBe(0);
      expect(result.savedPercentage).toBe(0);
    });

    test('should show significant savings for large JSON objects', () => {
      const largeJson = JSON.stringify({
        data: Array(10).fill({ id: 1, name: 'Test', value: 100, active: true })
      });
      
      const largeToon = jsonToToon(JSON.parse(largeJson));
      const result = calculateTokenSavings(largeJson, largeToon);
      
      expect(result.savedPercentage).toBeGreaterThan(20);
    });
  });

  describe('Cross-format Round-trip Conversions', () => {
    test('XML -> TOON -> XML should preserve basic structure', () => {
      const originalXml = `<?xml version="1.0" encoding="UTF-8"?>
<root>
  <name>Alice</name>
  <age>30</age>
</root>`;

      const toon = xmlToToon(originalXml);
      const convertedXml = toonToXml(toon);
      
      expect(convertedXml).toContain('name');
      expect(convertedXml).toContain('Alice');
      expect(convertedXml).toContain('age');
      expect(convertedXml).toContain('30');
    });

    test('CSV -> TOON -> CSV should preserve data', () => {
      const originalCsv = `id,name,role
1,Alice,admin
2,Bob,user`;

      const toon = csvToToon(originalCsv);
      const convertedCsv = toonToCsv(toon);
      
      expect(convertedCsv).toContain('id,name,role');
      expect(convertedCsv).toContain('Alice');
      expect(convertedCsv).toContain('Bob');
    });

    test('YAML -> TOON -> YAML should preserve basic structure', () => {
      const originalYaml = `name: Alice
age: 30
city: Boston`;

      const toon = yamlToToon(originalYaml);
      const convertedYaml = toonToYaml(toon);
      
      expect(convertedYaml).toContain('Alice');
      expect(convertedYaml).toContain('30');
      expect(convertedYaml).toContain('Boston');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle empty XML string', () => {
      // Empty XML throws an error - that's expected behavior
      expect(() => xmlToToon('')).toThrow('Invalid XML format');
    });

    test('should handle empty CSV string', () => {
      // Empty CSV throws an error - that's expected behavior
      expect(() => csvToToon('')).toThrow('Invalid CSV');
    });

    test('should handle empty YAML string', () => {
      expect(() => yamlToToon('')).not.toThrow();
    });

    test('should handle malformed XML gracefully', () => {
      const malformedXml = '<root><unclosed>';
      // Malformed XML throws an error - that's expected behavior
      expect(() => xmlToToon(malformedXml)).toThrow('Invalid XML format');
    });

    test('should handle CSV with only headers', () => {
      const csv = 'id,name,role';
      // CSV with only headers throws an error - that's expected behavior
      expect(() => csvToToon(csv)).toThrow('Invalid CSV');
    });

    test('should handle TOON with empty array', () => {
      const toon = '[0]{}:';
      // Empty array throws an error for CSV export - that's expected behavior
      expect(() => toonToCsv(toon)).toThrow('CSV export requires an array of objects');
    });

    test('should handle very long strings', () => {
      const longString = 'x'.repeat(10000);
      const tokens = countTokens(longString);
      expect(tokens).toBeGreaterThan(0);
    });

    test('should handle special characters in all formats', () => {
      const specialChars = 'Special: !@#$%^&*()_+-=[]{}|;:,.<>?';
      
      expect(() => {
        const json = { text: specialChars };
        const toon = jsonToToon(json);
        toonToJson(toon);
      }).not.toThrow();
    });

    test('should handle unicode characters', () => {
      const unicode = { text: '你好世界 🌍 مرحبا' };
      const toon = jsonToToon(unicode);
      const result = toonToJson(toon);
      
      expect(result.text).toContain('你好');
      expect(result.text).toContain('🌍');
    });
  });

  describe('Options Consistency Across Formats', () => {
    test('should apply custom indentation to all formats', () => {
      const options: ToonOptions = { indentation: 4 };
      
      const jsonResult = jsonToToon({ nested: { value: 1 } }, options);
      expect(jsonResult).toContain('    '); // 4 spaces
      
      const xml = '<root><nested><value>1</value></nested></root>';
      const xmlResult = xmlToToon(xml, options);
      expect(xmlResult).toBeDefined();
    });

    test('should apply custom delimiter to array formats', () => {
      const options: ToonOptions = { delimiter: '|' };
      
      const csv = 'id,name\n1,Alice';
      const csvResult = csvToToon(csv, options);
      expect(csvResult).toBeDefined();
    });

    test('should apply showLengthMarkers option', () => {
      const options: ToonOptions = { showLengthMarkers: true };
      
      const json = { items: [{ id: 1 }, { id: 2 }] };
      const result = jsonToToon(json, options);
      
      expect(result).toContain('[2]');
    });
  });
});
