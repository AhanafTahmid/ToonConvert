export interface ToonOptions {
  delimiter?: ',' | '|' | '\t';
  indentation?: number;
  showLengthMarkers?: boolean;
}

const DEFAULT_OPTIONS: Required<ToonOptions> = {
  delimiter: ',',
  indentation: 2,
  showLengthMarkers: true,
};

/**
 * Counts approximate tokens in a string
 * This is a simplified token counter - in production, you might want to use a proper tokenizer
 */
export function countTokens(text: string): number {
  if (!text) return 0;
  // Approximate: split by whitespace and punctuation
  const tokens = text.match(/\w+|[^\w\s]/g) || [];
  return tokens.length;
}

/**
 * Converts JSON to TOON format
 */
export function jsonToToon(data: any, options?: ToonOptions): string {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  // Handle root-level array
  if (Array.isArray(data)) {
    if (data.length === 0) {
      return opts.showLengthMarkers ? '[0]{}:' : '{}:';
    }
    // Check if array contains objects with consistent keys
    if (data.every(item => typeof item === 'object' && item !== null && !Array.isArray(item))) {
      return convertArrayOfObjects(data, opts, 0);
    }
    // Simple array with optional length marker
    const lengthPart = opts.showLengthMarkers ? `#${data.length}` : '';
    return `[${lengthPart}${data.map(v => convertValue(v, opts, 0)).join(',')}]`;
  }
  
  return convertValue(data, opts, 0);
}

/**
 * Converts TOON format back to JSON
 */
export function toonToJson(toonString: string): any {
  try {
    const lines = toonString.split('\n');
    
    // Check if the input is a root-level array (starts with [length]{fields} or {fields})
    const firstLine = lines.find(line => line.trim());
    if (firstLine) {
      const rootArrayMatch = firstLine.match(/^(?:\[(\d+)\])?\{([^}]+)\}([|,\t])?:/);
      if (rootArrayMatch) {
        return parseRootArray(lines);
      }
    }
    
    return parseToonLines(lines, 0).value;
  } catch (error) {
    throw new Error(`Invalid TOON format: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Parses a root-level TOON array (without a key name)
 */
function parseRootArray(lines: string[]): any[] {
  const firstLine = lines[0].trim();
  // Match with optional length: [length]{fields}delimiter: OR {fields}delimiter:
  const match = firstLine.match(/^(?:\[(\d+)\])?\{([^}]+)\}([|,\t])?:/);
  
  if (!match) {
    throw new Error('Invalid root array format');
  }
  
  const fieldNames = match[2].split(',').map(f => f.trim());
  const delimiter = match[3] === '|' ? '|' : match[3] === '\t' ? '\t' : ',';
  
  const arrayItems: any[] = [];
  
  // Parse data rows starting from line 1
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const trimmedData = line.trim();
    
    if (!trimmedData) continue;
    
    const values = trimmedData.split(delimiter);
    const item: any = {};
    
    fieldNames.forEach((fieldName, index) => {
      const value = values[index]?.trim();
      item[fieldName] = parseValue(value);
    });
    
    arrayItems.push(item);
  }
  
  return arrayItems;
}

/**
 * Helper function to convert a value to TOON format
 */
function convertValue(value: any, options: Required<ToonOptions>, depth: number): string {
  const indent = ' '.repeat(options.indentation * depth);

  if (value === null) {
    return 'null';
  }

  if (typeof value === 'boolean' || typeof value === 'number') {
    return String(value);
  }

  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    // Check if array contains objects with consistent keys
    if (value.length > 0 && value.every(item => typeof item === 'object' && item !== null && !Array.isArray(item))) {
      return convertArrayOfObjects(value, options, depth);
    }
    if (value.length === 0) {
      return options.showLengthMarkers ? '[0]{}:' : '{}:';
    }
    // Simple array - optionally show length
    const lengthPart = options.showLengthMarkers ? `#${value.length}` : '';
    return `[${lengthPart}${value.map(v => convertValue(v, options, 0)).join(',')}]`;
  }

  if (typeof value === 'object') {
    return convertObject(value, options, depth);
  }

  return String(value);
}

/**
 * Converts an object to TOON format
 */
function convertObject(obj: Record<string, any>, options: Required<ToonOptions>, depth: number): string {
  const indent = ' '.repeat(options.indentation * depth);
  const lines: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        // Empty array
        const emptyMarker = options.showLengthMarkers ? '[0]{}:' : '{}:';
        lines.push(`${indent}${key}${emptyMarker}`);
      } else if (value.every(item => typeof item === 'object' && item !== null && !Array.isArray(item))) {
        // Array of objects - use tabular format
        const arrayToon = convertArrayOfObjects(value, options, depth);
        lines.push(`${indent}${key}${arrayToon}`);
      } else {
        // Simple array
        const valueStr = convertValue(value, options, 0);
        lines.push(`${indent}${key}: ${valueStr}`);
      }
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Nested object
      lines.push(`${indent}${key}:`);
      const nestedLines = convertObject(value, options, depth + 1);
      lines.push(nestedLines);
    } else {
      // Simple value
      const valueStr = convertValue(value, options, 0);
      lines.push(`${indent}${key}: ${valueStr}`);
    }
  }

  return lines.join('\n');
}

/**
 * Converts an array of objects to tabular TOON format
 */
function convertArrayOfObjects(array: Record<string, any>[], options: Required<ToonOptions>, depth: number): string {
  if (array.length === 0) {
    return options.showLengthMarkers ? '[0]{}:' : '{}:';
  }

  const keys = Object.keys(array[0]);
  const length = array.length;
  const delimiter = options.delimiter;
  const indent = ' '.repeat(options.indentation * (depth + 1));

  // Include length marker only if showLengthMarkers is true
  const lengthPart = options.showLengthMarkers ? `[${length}]` : '';
  const header = `${lengthPart}{${keys.join(',')}}${delimiter === '\t' ? '\t' : delimiter !== ',' ? delimiter : ''}:`;
  
  const rows = array.map(item => {
    const values = keys.map(key => {
      const value = item[key];
      if (value === null) return 'null';
      if (typeof value === 'boolean' || typeof value === 'number') return String(value);
      return String(value);
    });
    return `${indent}${values.join(delimiter)}`;
  });

  return `${header}\n${rows.join('\n')}`;
}

/**
 * Parses TOON lines into a JSON object
 */
function parseToonLines(lines: string[], startIndex: number): { value: any; endIndex: number } {
  const result: any = {};
  let i = startIndex;

  while (i < lines.length) {
    const line = lines[i];
    
    if (!line.trim()) {
      i++;
      continue;
    }

    const currentIndent = line.length - line.trimStart().length;
    
    if (i > startIndex) {
      const prevLine = lines[i - 1];
      const prevIndent = prevLine.length - prevLine.trimStart().length;
      
      if (currentIndent < prevIndent) {
        // Going back up in nesting
        return { value: result, endIndex: i };
      }
    }

    // Check for tabular array format with optional length: key[length]{fields}delimiter: OR key{fields}delimiter:
    const tabularMatch = line.match(/^(\s*)(\w+)(?:\[(\d+)\])?\{([^}]+)\}([|,\t])?:/);
    if (tabularMatch) {
      const key = tabularMatch[2];
      const fieldNames = tabularMatch[4].split(',');
      const delimiter = tabularMatch[5] === '|' ? '|' : tabularMatch[5] === '\t' ? '\t' : ',';
      
      const arrayItems: any[] = [];
      i++;
      
      // Parse data rows
      while (i < lines.length) {
        const dataLine = lines[i];
        const dataIndent = dataLine.length - dataLine.trimStart().length;
        
        if (dataIndent <= currentIndent) break;
        
        const trimmedData = dataLine.trim();
        if (trimmedData) {
          const values = trimmedData.split(delimiter);
          const item: any = {};
          
          fieldNames.forEach((fieldName, index) => {
            const value = values[index]?.trim();
            item[fieldName] = parseValue(value);
          });
          
          arrayItems.push(item);
        }
        i++;
      }
      
      result[key] = arrayItems;
      continue;
    }

    // Check for nested object: key:
    const nestedMatch = line.match(/^(\s*)(\w+):$/);
    if (nestedMatch) {
      const key = nestedMatch[2];
      i++;
      const nested = parseToonLines(lines, i);
      result[key] = nested.value;
      i = nested.endIndex;
      continue;
    }

    // Simple key-value pair: key: value
    const kvMatch = line.match(/^(\s*)(\w+):\s*(.+)$/);
    if (kvMatch) {
      const key = kvMatch[2];
      const value = kvMatch[3];
      result[key] = parseValue(value);
      i++;
      continue;
    }

    i++;
  }

  return { value: result, endIndex: i };
}

/**
 * Parses a TOON value string into the appropriate type
 */
function parseValue(value: string): any {
  if (value === 'null') return null;
  if (value === 'true') return true;
  if (value === 'false') return false;
  
  // Try to parse as number, preserving decimal precision
  const num = Number(value);
  if (!isNaN(num) && value.trim() !== '') {
    // Keep original string representation if it has trailing zeros after decimal
    if (value.includes('.') && value.endsWith('0')) {
      return parseFloat(value);
    }
    return num;
  }
  
  return value;
}

/**
 * Calculates token savings between JSON and TOON
 */
export function calculateTokenSavings(jsonString: string, toonString: string): {
  jsonTokens: number;
  toonTokens: number;
  savedTokens: number;
  savedPercentage: number;
} {
  const jsonTokens = countTokens(jsonString);
  const toonTokens = countTokens(toonString);
  const savedTokens = jsonTokens - toonTokens;
  const savedPercentage = jsonTokens > 0 ? Math.round((savedTokens / jsonTokens) * 100) : 0;

  return {
    jsonTokens,
    toonTokens,
    savedTokens,
    savedPercentage,
  };
}

// ============= XML Converters =============

/**
 * Converts XML to TOON format via JSON
 */
export function xmlToToon(xmlString: string, options?: ToonOptions): string {
  const json = xmlToJson(xmlString);
  return jsonToToon(json, options);
}

/**
 * Converts TOON to XML format via JSON
 */
export function toonToXml(toonString: string): string {
  const json = toonToJson(toonString);
  return jsonToXml(json);
}

/**
 * Simple XML to JSON converter
 */
function xmlToJson(xml: string): any {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, 'text/xml');
  
  if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
    throw new Error('Invalid XML format');
  }
  
  return parseXmlNode(xmlDoc.documentElement);
}

function parseXmlNode(node: Element): any {
  // Handle text-only nodes
  if (node.childNodes.length === 1 && node.childNodes[0].nodeType === 3) {
    return node.textContent;
  }
  
  const result: any = {};
  
  // Handle attributes
  if (node.attributes.length > 0) {
    result['@attributes'] = {};
    for (let i = 0; i < node.attributes.length; i++) {
      const attr = node.attributes[i];
      result['@attributes'][attr.name] = attr.value;
    }
  }
  
  // Handle child nodes
  const children: { [key: string]: any[] } = {};
  for (let i = 0; i < node.childNodes.length; i++) {
    const child = node.childNodes[i];
    if (child.nodeType === 1) { // Element node
      const childElement = child as Element;
      const childName = childElement.tagName;
      
      if (!children[childName]) {
        children[childName] = [];
      }
      children[childName].push(parseXmlNode(childElement));
    }
  }
  
  // Convert arrays to objects or keep as arrays
  for (const [key, value] of Object.entries(children)) {
    if (value.length === 1) {
      result[key] = value[0];
    } else {
      result[key] = value;
    }
  }
  
  return result;
}

/**
 * Simple JSON to XML converter
 */
function jsonToXml(obj: any, rootName: string = 'root'): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += objectToXml(obj, rootName);
  return xml;
}

function objectToXml(obj: any, tagName: string): string {
  if (Array.isArray(obj)) {
    return obj.map(item => objectToXml(item, 'item')).join('\n');
  }
  
  if (typeof obj === 'object' && obj !== null) {
    let attrs = '';
    let children = '';
    
    for (const [key, value] of Object.entries(obj)) {
      if (key === '@attributes') {
        const attrObj = value as Record<string, any>;
        attrs = Object.entries(attrObj)
          .map(([k, v]) => ` ${k}="${v}"`)
          .join('');
      } else if (Array.isArray(value)) {
        children += value.map(item => objectToXml(item, key)).join('\n');
      } else if (typeof value === 'object' && value !== null) {
        children += objectToXml(value, key);
      } else {
        children += `<${key}>${value}</${key}>`;
      }
    }
    
    if (children) {
      return `<${tagName}${attrs}>\n${children}\n</${tagName}>`;
    }
    return `<${tagName}${attrs}/>`;
  }
  
  return `<${tagName}>${obj}</${tagName}>`;
}

// ============= CSV Converters =============

/**
 * Converts CSV to TOON format
 */
export function csvToToon(csvString: string, options?: ToonOptions): string {
  const json = csvToJson(csvString);
  return jsonToToon(json, options);
}

/**
 * Converts TOON to CSV format
 */
export function toonToCsv(toonString: string): string {
  const json = toonToJson(toonString);
  return jsonToCsv(json);
}

/**
 * Simple CSV to JSON converter
 */
function csvToJson(csv: string): any[] {
  const lines = csv.trim().split('\n');
  if (lines.length < 2) {
    throw new Error('Invalid CSV: must have header and at least one data row');
  }
  
  const headers = lines[0].split(',').map(h => h.trim());
  const result: any[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const obj: any = {};
    
    headers.forEach((header, index) => {
      obj[header] = parseValue(values[index] || '');
    });
    
    result.push(obj);
  }
  
  return result;
}

/**
 * Simple JSON to CSV converter
 */
function jsonToCsv(json: any): string {
  if (!Array.isArray(json) || json.length === 0) {
    throw new Error('CSV export requires an array of objects');
  }
  
  const headers = Object.keys(json[0]);
  const csvLines: string[] = [headers.join(',')];
  
  for (const obj of json) {
    const values = headers.map(header => {
      const value = obj[header];
      if (value === null || value === undefined) return '';
      return String(value);
    });
    csvLines.push(values.join(','));
  }
  
  return csvLines.join('\n');
}

// ============= YAML Converters =============

/**
 * Converts YAML to TOON format via JSON
 */
export function yamlToToon(yamlString: string, options?: ToonOptions): string {
  const json = yamlToJson(yamlString);
  return jsonToToon(json, options);
}

/**
 * Converts TOON to YAML format via JSON
 */
export function toonToYaml(toonString: string): string {
  const json = toonToJson(toonString);
  return jsonToYaml(json);
}

/**
 * Simple YAML to JSON converter
 */
function yamlToJson(yaml: string): any {
  // This is a very basic YAML parser - for production use a proper library
  const lines = yaml.trim().split('\n');
  const result: any = {};
  const stack: any[] = [result];
  const indentStack: number[] = [0];
  
  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    
    const indent = line.length - line.trimStart().length;
    const trimmed = line.trim();
    
    // Handle array items
    if (trimmed.startsWith('- ')) {
      const value = trimmed.substring(2);
      const currentArray = stack[stack.length - 1];
      
      if (!Array.isArray(currentArray)) {
        // Convert to array
        const parent = stack[stack.length - 2];
        const keys = Object.keys(currentArray);
        const lastKey = keys[keys.length - 1];
        parent[lastKey] = [parseYamlValue(value)];
      } else {
        currentArray.push(parseYamlValue(value));
      }
      continue;
    }
    
    // Handle key-value pairs
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex > 0) {
      const key = trimmed.substring(0, colonIndex).trim();
      const value = trimmed.substring(colonIndex + 1).trim();
      
      // Adjust stack based on indentation
      while (indentStack.length > 1 && indent <= indentStack[indentStack.length - 1]) {
        stack.pop();
        indentStack.pop();
      }
      
      const current = stack[stack.length - 1];
      
      if (value === '') {
        // Nested object or array coming
        current[key] = {};
        stack.push(current[key]);
        indentStack.push(indent);
      } else {
        current[key] = parseYamlValue(value);
      }
    }
  }
  
  return result;
}

function parseYamlValue(value: string): any {
  if (value === 'null' || value === '~') return null;
  if (value === 'true') return true;
  if (value === 'false') return false;
  
  const num = Number(value);
  if (!isNaN(num) && value.trim() !== '') {
    return num;
  }
  
  // Remove quotes if present
  if ((value.startsWith('"') && value.endsWith('"')) || 
      (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  
  return value;
}

/**
 * Simple JSON to YAML converter
 */
function jsonToYaml(obj: any, indent: number = 0): string {
  const indentStr = ' '.repeat(indent);
  
  if (Array.isArray(obj)) {
    return obj.map(item => {
      if (typeof item === 'object' && item !== null) {
        return `${indentStr}- ${jsonToYaml(item, indent + 2).trim()}`;
      }
      return `${indentStr}- ${item}`;
    }).join('\n');
  }
  
  if (typeof obj === 'object' && obj !== null) {
    return Object.entries(obj).map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${indentStr}${key}:\n${jsonToYaml(value, indent + 2)}`;
      } else if (typeof value === 'object' && value !== null) {
        return `${indentStr}${key}:\n${jsonToYaml(value, indent + 2)}`;
      } else {
        return `${indentStr}${key}: ${value}`;
      }
    }).join('\n');
  }
  
  return `${indentStr}${obj}`;
}
