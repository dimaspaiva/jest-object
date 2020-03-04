# jest-object

    Check if database have returned the same object as was passed on schemas. Using jest and node.js only.

## check

Function to compare passed object with pattern, receive two parameters, object to compare(compareObject) and object pattern (objecPattern), so the funcion is `check(compareObject, objectPattern)`.

That function has tree possibles return values, `Object, true, false`. **Object** is returned when number of keys doesn't match, the object is used to return two infos, it is pass, to info the situation, as **boolean**, and type, to info what is the error, in this case the length, as a **String**

Jest give the _expect.extend_ function, to append new expected functions, is that function used to create the new expected. With that tool was created two functions, `checkObject` and `checkListObjects`.

The first function get the `check` returns and repsonse if that goes wrong or have success. This function have tree returns, all of they is objects with enforced by jest pattern, wrong number of keys, wrong keys and succes.

```javascript
// Pattern
{
  pass: Boolean,
  message: () => String
}

// Success
{
  pass: true,
  message: () => ''
}

// Failed wrong number of keys
{
  pass: false,
  message: () => `bjects doesnt match
        first object keys: ${Object.keys(object1).length}
        second object keys: ${Object.keys(object2).length}`
}

// Failed wrong keys
{
  pass: false,
  message: () => 'Objects doesnt match'
}
```

## To undestand more about the features used access

[Link to Andrei Pfeiffer tutorial](https://medium.com/@andrei.pfeiffer/jest-matching-objects-in-array-50fe2f4d6b98)

[Link to jest docs tutorial](https://jestjs.io/docs/en/expect.html#expectextendmatchers)
