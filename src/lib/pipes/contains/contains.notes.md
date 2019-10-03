## Contains Pipe

### Module
PipesModule

### Description
Filter items in an array that match a given criteria.

### Examples
All items with 'a' in the name

```js
const list1 = [{ name: 'a' }, { name: 'a', test: 't' }, { name: 'b', test: 'a'
}];
```
```html
<p *ngFor="let item of list1 | bbContains:'a':'name'">{{item.name}}</p>
```

Result:  
name: a, test:  
name: a, test: t

```js
const list2 = [{ name: 'a', test: 't' }, { name: 'b', test: 'a' }, { name: 't'
}];
```
```html
<p *ngFor="let item of list2 | bbContains:'t'">{{item.name}}</p>
```

Result:
name: a, test: t
name: t, test:
