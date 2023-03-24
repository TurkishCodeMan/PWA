import * as R from "ramda";
const replace = (s: string, targ: string, sub: string) =>
  s.split(targ).join(sub);
export const DASH = "-";
export const UNDERSCORE = "_";
export const SPACE = " ";
export const EMPTY = "";

const capitalize = (s: string) => s.charAt(0).toUpperCase();

const stripDashes = (s: string) => replace(s, DASH, SPACE);
const stripUnderscore = (s: string) => replace(s, UNDERSCORE, SPACE);
const strip = R.pipe(stripDashes, stripUnderscore);


export const upperFirstLetter=(s:string)=>s.split(SPACE).map(capitalize).join(SPACE);


 