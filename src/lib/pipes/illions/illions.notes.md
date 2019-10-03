## Illions Pipe

### Module
PipesModule

### Description
Format amounts to a financial services friendly abbreviated version

| Initial Value | Output    |
| ------------- | --------- |
| 1900000       | \$1.9M    |
| 34000000      | \$\$34.0M |
| 9760000000    | \$9.8B    |

### Example
```html
<div>{{ 9760000000 | sprIllions : 1 }}</div>
```

Result:  
\$9.8B
