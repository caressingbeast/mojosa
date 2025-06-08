import ts from 'typescript';

export function extractInterface(sourceText: string, interfaceName: string): Record<string, string> {
  const source = ts.createSourceFile('temp.ts', sourceText, ts.ScriptTarget.Latest, true);
  const result: Record<string, string> = {};

  const visit = (node: ts.Node) => {
    if (ts.isInterfaceDeclaration(node) && node.name.text === interfaceName) {
      node.members.forEach((member) => {
        const name = (member.name as ts.Identifier).text;
        if (ts.isPropertySignature(member) && member.type) {
          result[name] = member.type.getText(source);
        } else if (ts.isMethodSignature(member)) {
          const sig = member.getText(source).replace(/;$/, ''); // full method signature
          result[name] = sig.substring(sig.indexOf('(')); // extract parameters + return
        }
      });
    }
    ts.forEachChild(node, visit);
  };

  ts.forEachChild(source, visit);
  return result;
}
