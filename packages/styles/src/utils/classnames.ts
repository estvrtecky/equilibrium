export function parseClassAttribute(attribute: string): string[] {
  // Remove className= and class= prefixes
  const attributeValue = attribute.replace(/^class(Name)?=/, "");

  // Remove quotes and braces
  const classNames = attributeValue
    .replace(/['"`]/g, "")
    .replace(/\{([^$][^}]*)\}/g, "$1");

  return classNames.split(/\s+/).filter(Boolean);
}
