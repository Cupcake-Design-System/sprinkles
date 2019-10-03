## InsertHtml Pipe

### Module

PipesModule

### Description

Allows for injection of html. Can be used along with Angular's built-in json pipe. Note: This does not utilize Angular's SanitizeHtml api. That pipe is coming later.

### Example

```html
<pre>
    {{
        [
            'here', 'is', 'an', 'array', 'that', 'looks', 'like', 'an', 'array'
        ] | json | sprInsertHtml
    }}
</pre>
```

[
'here',
'is',
 'an',
 'array',
 'that',
 'looks',
 'like',
 'an',
 'array'
]
