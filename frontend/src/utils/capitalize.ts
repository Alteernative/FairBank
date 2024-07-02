export default function capitalize(str: string) {
  let splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; ++i)
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].slice(1).toLowerCase();
  return splitStr.join(" ");
}
