## File Size Pipe

### Module
PipesModule

### Description
Output file size based on an integer in bytes.

| Initial Value | Output |
| ------------- | ------ |
| 512           | 512b   |
| 10240         | 10kb   |
| 2097152       | 2mb    |

### Example
```html
<div>{{ 2097152 | sprFileSize }}</div>
```

Result:  
2mb
