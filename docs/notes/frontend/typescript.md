# TypeScript

## 泛型

### 通用约束

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}
```

### 在泛型约束中使用类型参数

您可以声明一个受另一个类型参数约束的类型参数。例如，在这里我们想从给定名称的对象中获取属性。我们想确保不会意外获取不存在的属性 obj，因此我们将在两种类型之间设置约束：

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
getProperty(x, "m"); // Error: Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
```

### 在泛型中使用类类型

```typescript
class Person {
  name: string = "John";
  age: number = 30;

  sayHello() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`
    );
  }
}

/**
 * 形参也可以是这种方式: cls: { new (): T }
 */
function create<T>(cls: new () => T): T {
  return new cls();
}

const person = create(Person);
person.sayHello(); // Output: "Hello, my name is John and I am 30 years old."
```

### 通用参数默认值

```typescript
class Animal {
  name: string;
}

class Dog extends Animal {
  constructor() {
    super();
    this.name = "Dog";
  }
}

class Cat extends Animal {
  constructor() {
    super();
    this.name = "Cat";
  }
}

function createAnimal<A extends Animal = Dog>(c: new () => A): A {
  return new c();
}

console.log(createAnimal(Dog).name); // output: Dog
console.log(createAnimal(Cat).name); // output: Cat
console.log(createAnimal(Animal).name); // output: Dog
```

## 类型运算符

### keyof

```typescript
type Point = { x: number; y: number };
type P = keyof Point; // "x" | "y"

type Arrayish = { [index: number]: unknown };
type A = keyof Arrayish; // number

type Mapish = { [key: string]: boolean };
type M = keyof Mapish; // string | number
```

::: tip 提示
请注意，在此示例中，M 是 string | number。这是因为 JavaScript 对象键总是被强制转换为字符串，因此 obj[0] 总是与 obj["0"]相同。
:::

### typeof

```typescript
function fn() {
  return { x: 10, y: "2" };
}

type P = ReturnType<typeof fn>; // { x: number; y: string }
```

## 索引访问类型

可以使用索引访问类型来查找另一种类型的特定属性：

```typescript
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"]; // number
```

索引类型本身是一种类型，因此我们可以使用联合 keyof 或其他类型：

```typescript
type I1 = Person["age" | "name"]; // string | number
type I2 = Person[keyof Person]; // string | number | boolean

type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName]; // string | boolean
```

使用任意类型进行索引的另一个示例是使用 number 来获取数组元素的类型。我们可以将其与 typeof 方便地捕获数组文字的元素类型相结合：

```typescript
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];

type Person = (typeof MyArray)[number]; // { name: string; age: number }
type Age = (typeof MyArray)[number]["age"]; // number
// Or
type Age2 = Person["age"]; // number
```

索引时只能使用类型，这意味着您不能使用 const 来创建变量引用：

```typescript
const key = "age";
type Age = Person[key]; // Type 'key' cannot be used as an index type. 'key' refers to a value, but is being used as a type here. Did you mean 'typeof key'?
```

但是，您可以使用类型别名进行类似风格的重构：

```typescript
type key = "age";
type Age = Person[key]; // number
```

## 映射类型

映射类型是一种通用类型，它使用 PropertyKeys 的联合（通常通过 keyof 创建）来遍历键来创建类型：

```typescript
type OptionsFlags<T> = {
  [prop in keyof T]: boolean;
};
```

在这个例子中，OptionsFlags 将从类型中获取所有属性 T 并将其值更改为布尔值。

```typescript
type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<Features>; // { darkMode: boolean; newUserProfile: boolean; }
```

### 映射修饰符

映射期间可以应用两个附加修饰符：`readonly` 和 `?`，它们分别影响可变性和可选性。

您可以通过在前缀中添加 `-` 或 `+` 来删除或添加这些修饰符。如果您不添加前缀，则假定使用 +。

```typescript
// Removes 'readonly' attributes from a type's properties
type CreateMutable<T> = {
  -readonly [prop in keyof T]: T[prop];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>; // { id: string; name: string; }
```

```typescript
// Removes 'optional' attributes from a type's properties
type Concrete<T> = {
  [prop in keyof T]-?: T[prop];
};

type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};

type User = Concrete<MaybeUser>; // { id: string; name: string; age: number }
```

### as

在 TypeScript 4.1 及更高版本中，您可以使用映射类型中的子句`as`重新映射类型中的键：

```typescript
type MappedTypeWithNewProperties<Type> = {
  [Properties in keyof Type as NewKeyType]: Type[Properties];
};
```

从以前的属性名称创建新的属性名称：

```typescript
type Getters<T> = {
  [prop in keyof T as `get${Capitalize<string & prop>}`]: () => T[prop];
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person>; // { getLocation: () => string, getName: () => string, getAge: () => number }
```

通过条件类型生成来过滤掉键：

```typescript
// Remove the 'kind' property
type RemoveKindField<T> = {
  [prop in keyof T as Exclude<prop, "kind">]: T[prop];
};

interface Circle {
  kind: "circle";
  radius: number;
}

type KindlessCircle = RemoveKindField<Circle>; // { radius: number }
```

## 模板字面量类型

## Class
