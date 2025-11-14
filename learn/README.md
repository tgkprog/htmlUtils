## JavaScript Closures - Learned from Working Example

### What is a Closure?

A **closure** is when an inner function "remembers" and has access to variables from its outer function, even after the outer function has finished executing.

### What Happened in My Code:

When we save `3 * 2` to key `a`:

```javascript
// 1. called save() which executed:
mp['a'] = outer2(3, 2, '*');

// 2. Inside outer2(3, 2, '*'):
function outer2(op1, op2, op) {  // op1=3, op2=2, op='*'
    function mul() {
        return op1 * op2;  // mul() "captures" op1 and op2
    }
    return mul;  // Returns the FUNCTION, not the result
}

// 3. Now mp['a'] contains the mul() function
// BUT mul() still "remembers" that op1=3 and op2=2
```

### The Magic Moment:

When I later processed key `a`:

```javascript
mp['a']()  // Calls mul()
// Even though outer2() finished long ago,
// mul() STILL knows op1=3 and op2=2
// Returns: 6
```

### Why This is Powerful:

**Stored a function with captured parameters:**
- `mp['a']` holds `mul()` with op1=3, op2=2 frozen inside it
- `mp['b']` holds `div()` with op1=4, op2=2 frozen inside it
- Each function remembers its own unique values
- We can call them anytime: `mp['a']()` → 6, `mp['b']()` → 2

### What we See Happen Step-by-Step:

```
1. Call save(3, 2, '*', 'a')
   ↓
2. outer2(3, 2, '*') creates mul() 
   ↓
3. mul() "closes over" op1=3, op2=2
   ↓
4. outer2 returns mul (the function itself)
   ↓
5. mp['a'] = mul (with 3 and 2 baked in)
   ↓
[Time passes... outer2 is gone from memory]
   ↓
6. call proc() which calls mp['a']()
   ↓
7. mul() executes with its remembered op1=3, op2=2
   ↓
8. We get back 6
```

### Takeaway:

**The inner functions (`add`, `sub`, `mul`, `div`) don't just remember the *names* `op1` and `op2` - they remember the actual *values* (3, 2, 4, etc.) that existed when we called `outer2()`.**

The function code (how to execute)
The data it needs (the captured variables)

Closures: **Functions that carry their environment with them as data and can be invoked with those values repeatedly!** 🎯


## JavaScript Closures - Multiple Ways to Create Them

Closures don't have to be created as inner functions! JavaScript offers several approaches:

### 1. **Inner Functions (Classic Pattern)**
```javascript
function outer2(op1, op2, op) {
    function mul() {
        return op1 * op2;  // Closure over op1, op2
    }
    return mul;
}
```

### 2. **Arrow Functions (Modern & Concise)**
```javascript
function outer2(op1, op2, op) {
    const mul = () => op1 * op2;  // Arrow function creates closure
    return mul;
}

// Or even shorter:
const outer2 = (op1, op2, op) => {
    return () => op1 * op2;  // Returns arrow function closure
};
```

### 3. **Function Expression**
```javascript
function outer2(op1, op2, op) {
    const mul = function() {
        return op1 * op2;  // Anonymous function expression
    };
    return mul;
}
```

### 4. **Immediately Returned (No Variable)**
```javascript
function outer2(op1, op2, op) {
    return function() {
        return op1 * op2;
    };
}
```

### 5. **Event Handler Closures**
```javascript
function setupButton(count) {
    document.getElementById('btn').addEventListener('click', function() {
        console.log('Clicked ' + count + ' times');  // Closure over count
    });
}
```

### 6. **Module Pattern (Privacy via Closures)**
```javascript
const counter = (function() {
    let count = 0;  // Private variable
    return {
        increment: () => ++count,  // Closure
        get: () => count           // Closure
    };
})();
```

### 7. **Array Method Callbacks**
```javascript
function multiplyAll(factor) {
    const numbers = [1, 2, 3];
    return numbers.map(n => n * factor);  // Callback closes over factor
}
```

### The Key Principle:
**A closure happens automatically whenever a function accesses a variable from outside its own scope.** The method of function creation doesn't matter:
- Inner functions, arrow functions, or expressions
- Explicit returns or implicit usage
- Named or anonymous functions

The JavaScript engine creates closures automatically when needed.

**Bottom line:** Closures are functions that carry their environment with them as data - regardless of how they're created! 🎯
