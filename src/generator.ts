function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function isFunctionType(type: string): boolean {
  // crude check for function type, can be improved
  return /^\(.*\)\s*=>/.test(type.trim());
}

function getDefaultValue(type: string): string {
  const t = type.trim();
  if (t === 'string') return "''";
  if (t === 'number') return '0';
  if (t === 'boolean') return 'false';
  if (isFunctionType(t)) return '() => {}';
  return 'null';
}

function extractParameters(type: string): string {
  // Matches between parentheses at start: ( ... ) => ...
  const match = type.match(/^\(([^)]*)\)\s*=>/);
  return match ? match[1].trim() : '';
}

function extractReturnType(type: string): string {
  // Matches return type after =>
  const match = type.match(/=>\s*(.+)$/);
  return match ? match[1].trim() : 'void';
}

export function generateReactContext(name: string, fields: Record<string, string>): string {
  const pascalName = capitalize(name);
  const contextName = `${pascalName}Context`;

  const stateFields = Object.entries(fields).filter(([, type]) => !isFunctionType(type));
  const functionFields = Object.entries(fields).filter(([, type]) => isFunctionType(type));

  const interfaceLines = [
    ...stateFields.map(([key, type]) => `  ${key}: ${type};`),
    ...functionFields.map(([key, type]) => `  ${key}: ${type};`)
  ];

  const stateHooks = stateFields.map(([key, type]) => {
    const defaultValue = getDefaultValue(type);
    return `  const [${key}, set${capitalize(key)}] = useState<${type}>(${defaultValue});`;
  });

  const methodPlaceholders = functionFields.map(([key, type]) => {
    const params = extractParameters(type);
    const returnType = extractReturnType(type);
    return `  const ${key} = (${params}): ${returnType} => { throw new Error('${key} not implemented'); };`;
  });

  const valueObject = [
    ...stateFields.map(([key]) => `      ${key},`),
    ...functionFields.map(([key]) => `      ${key},`)
  ];

  return `
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ${pascalName}State {
${interfaceLines.join('\n')}
}

const ${contextName} = createContext<${pascalName}State | undefined>(undefined);

export const ${pascalName}Provider = ({ children }: { children: ReactNode }) => {
${stateHooks.join('\n')}
${methodPlaceholders.join('\n')}

  return (
    <${contextName}.Provider value={{
${valueObject.join('\n')}
    }}>
      {children}
    </${contextName}.Provider>
  );
};

export const use${pascalName} = () => {
  const context = useContext(${contextName});
  if (!context) throw new Error("use${pascalName} must be used within ${pascalName}Provider");
  return context;
};
`.trim();
}
