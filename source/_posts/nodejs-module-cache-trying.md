title: Nodejs Module Caching
date: 2016-04-19 11:05:24
tags:
  - Nodejs
---

# Nodejs Module Caching

Modules are cached after the first time they are loaded. This means (among other things) that every call to require(‘foo’) will get exactly the same object returned, if it would resolve to the same file.

Multiple calls to require(‘foo’) may not cause the module code to be executed multiple times. This is an important feature. With it, “partially done” objects can be returned, thus allowing transitive dependencies to be loaded even when they would cause cycles.

If you want to have a module execute code multiple times, then export a function, and call that function.

([https://nodejs.org/api/modules.html#modules_caching](https://nodejs.org/api/modules.html#modules_caching))

<!-- more -->

# Trying code

Let’s see bellow test code and the result:

A.js  

```
var list = [];

module.exports = {
  list: list,
  name: 't'
};
```

index.js  

```
var a1 = require('./A');
var a2 = require('./A');

a1.list.push(1);
console.log(a1.list);
console.log(a2.list);

console.log(a2.name);
console.log(a1.name);
a1.name = 'update';
console.log(a2.name);
console.log(a1.name);
```

Result  

```
[ 1 ]
[ 1 ]
t
t
update
update
```

So, we know `a1` and `a2` are the same object.