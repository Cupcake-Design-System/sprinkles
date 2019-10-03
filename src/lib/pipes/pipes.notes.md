## Custom Pipes Element

### Module

PipesModule

#### Highlight Pipe

Highlight sections of text in a string.

##### Examples

```html
<div [innerHtml]="'Sample long text' | sprHighlight: 'ampl'"></div>
```

```html
<div [innerHtml]="'Sample long text' | highlight: 'sam'"></div>
```

#### Illions Pipe

Format amounts to a financial services friendly abbreviated version

| Initial Value | Output    |
| ------------- | --------- |
| 1900000       | \$1.9M    |
| 34000000      | \$\$34.0M |
| 9760000000    | \$9.8B    |

##### Example

```html
<div>{{ 9760000000 | sprIllions : 1 }}</div>
```

Result:  
\$9.8B

#### Contains Pipe

Filter items in an array that match a given criteria.

##### Examples

All items with 'a' in the name

```html
const list1 = [{ name: 'a' }, { name: 'a', test: 't' }, { name: 'b', test: 'a'
}];
<p *ngFor="let item of list1 | bbContains:'a':'name'">{{item.name}}</p>
```

Result:  
name: a, test:  
name: a, test: t

```html
const list2 = [{ name: 'a', test: 't' }, { name: 'b', test: 'a' }, { name: 't'
}];
<p *ngFor="let item of list2 | bbContains:'t'">{{item.name}}</p>
```

Result:
name: a, test: t
name: t, test:

#### File Size Pipe

Output file size based on an integer in bytes.

| Initial Value | Output |
| ------------- | ------ |
| 512           | 512b   |
| 10240         | 10kb   |
| 2097152       | 2mb    |

##### Example

```html
<div>{{ 2097152 | sprFileSize }}</div>
```

Result:  
2mb
