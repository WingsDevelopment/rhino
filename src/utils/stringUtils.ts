export const camelCase = (str: string) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

export const pascalCase = (str: string) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

export const pluralCamelCase = (str: string) => {
  return camelCase(str) + "s";
};

export const pluralPascaleCase = (str: string) => {
  return pascalCase(str) + "s";
};

export const plural = (str: string) => {
  return str + "s";
};

export const pascalSplitedWithSpaceForEveryCapitalLetter = (str: string) => {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, function (str) {
      return str.toUpperCase();
    })
    .trim();
};

export const pascalSeparatedWithUnderlineForEveryCapitalLetter = (
  str: string
) => {
  return str.replace(/([A-Z])/g, "_$1").toUpperCase();
};
