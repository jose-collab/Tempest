## Tempest


Tempest é um free code database para ajuda nas pessoas que não sabem usar database!


## Example


```js
const tp = require('Tempest');


tp.set('userInfo', { difficulty: 'Easy' })
// -> { difficulty: 'Easy' }


tp.push('userInfo.items', 'Sword')
// -> { difficulty: 'Easy', items: ['Sword'] }


tp.add('userInfo.balance', 500)
// -> { difficulty: 'Easy', items: ['Sword'], balance: 500 }


tp.push('userInfo.items', 'Watch')
// -> { difficulty: 'Easy', items: ['Sword', 'Watch'], balance: 500 }

tp.add('userInfo.balance', 500)
// -> { difficulty: 'Easy', items: ['Sword', 'Watch'], balance: 1000 }


tp.get('userInfo.balance') // -> 1000
tp.get('userInfo.items') // ['Sword', 'Watch']
```

## Installation



**Linux & Windows**
- `npm i Tempest`
