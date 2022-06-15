// Reference: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
// The primitives: string,number, and boolean
const a: string = "hello";
const b: number = 123;
const c: boolean = true;

// Arrays
const d: number[] = [1, 2, 3];
const e: Array<string> = ["1", "2", "3"];

// any
let f: any = [];
f = null;
// noImplicitAny

// Type Annotations on Variables 变量的类型注解
// In most cases, though, this isn’t needed. Wherever possible, TypeScript tries to automatically infer the types in your code. For example, the type of a variable is inferred based on the type of its initializer:
let myName = "Alice";

const user = {
  name: "Mike",
  age: 26,
};

// Functions
function greet(person: string, date: Date): void {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddison", new Date());

// Anonymous Functions
// No type annotations here, but TypeScript can spot the bug
const names = ["Alice", "Bob", "Eve"];

// Contextual typing for function
names.forEach(function (s) {
  console.log(s.toUpperCase());
});

// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUpperCase());
});

// Object Types
// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });

// Optional Properties
function printName1(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName1({ first: "Bob" });
printName1({ first: "Alice", last: "Alisson" });

// In JavaScript, if you access a property that doesn’t exist, you’ll get the value undefined rather than a runtime error. Because of this, when you read from an optional property, you’ll have to check for undefined before using it.
function printName2(obj: { first: string; last?: string }) {
  // Error - might crash if 'obj.last' wasn't provided!
  // console.log(obj.last.toUpperCase());
  if (obj.last) {
    // OK
    console.log(obj.last.toUpperCase());
  }

  // A safe alternative using modern JavaScript syntax:
  console.log(obj.last?.toUpperCase());
}

// Union Types
// it’s time to start combining them in interesting ways.
function printId1(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId1(101);
// OK
printId1("202");
// Error
// printId({ myID: 22342 });

// Working with Union Types 需要提前判断参数类型
function printId2(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}

// Type Aliases 类型别名（就类似于 Webpack 里的 alias ，帮你省略一些书写）
// We’ve been using object types and union types by writing them directly in type annotations.
type Point = {
  x: number;
  y: number;
};

// Exactly the same as the earlier example
// function printCoord2(pt: { x: number; y: number }) {
function printCoord2(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord2({ x: 100, y: 100 });

// Interfaces 一般用于对象类型 the structure of the value
interface Point2 {
  x: number;
  y: number;
}

function printCoord3(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord3({ x: 100, y: 100 });

// Differences Between Type Aliases and Interfaces: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces
// the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.

// Type Assertions 类型断言
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
const myCanvas2 = <HTMLCanvasElement>document.getElementById("main_canvas");

// Literal Types
let x: "hello" = "hello";
// OK
x = "hello";
// Error
// x = "howdy";

function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
// printText("G'day, mate", "centre"); // error

// Numeric literal types work the same way:
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}

// Of course, you can combine these with non-literal types:
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
// configure("automatic"); // error

// Literal Inference（req.method 被推断为字符串，但是需要的是 "GET" 和 "POST"，ts 判断不出，需要我们自己断言）
const handleRequest = (url: string, method: "GET" | "POST") => {};
// Change 1:
const req = { url: "https://example.com", method: "GET" as "GET" };
// Change 2
handleRequest(req.url, req.method as "GET");

// null and undefined
// strictNullChecks on
// With strictNullChecks on, when a value is null or undefined, you will need to test for those values before using methods or properties on that value. Just like checking for undefined before using an optional property,
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
// Just like other type assertions, this doesn’t change the runtime behavior of your code, so it’s important to only use ! when you know that the value can’t be null or undefined.

// Enums: https://www.typescriptlang.org/docs/handbook/enums.html

// Less Common Primitives: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#less-common-primitives
// bigint
// symbol
