"use strict";

/*
#### Задача 3

Улучшите свою имплементацию функции `mix`. Если на каком то из уровней callback сгенерировал ошибку → отловите ее, а затем перейдите на следующий callback. Функция `mix` всегда должна возвращать объект в котором будет 2 поля `errors` и `value`. Обратите внимание что `value` содержит результат вызовов всех функций, а `errors` содержит массив с информацией про все ошибки а также индекс callback где он сгенерировался.

Пример вызова:

```javascript
mix(() => {
return 0;
}, (prev) => {
return prev + 1;
}, (prev) => {
throw new RangeError('Range is wrong');
}, (prev) => {
return prev * 3;
});
// Функция вернет
{
errors: [{
name: 'RangeError',
message: 'Range is wrong',
stack: 'Стек вызовов'
}],
value: 3
}
*/

function mix() {
    //преобразуем псевдомассив в массив
    const agrs = Array.prototype.slice.call(arguments);
    if (!agrs.every(item => typeof item == "function")) throw new Error("Some argument is not a function");
    let res = {
        errors: []
    };
    for (let i = 0; i < agrs.length; i++) {
        try {
            res.value = agrs[i](res.value || null);
        } catch(e) {
            res.errors.push({
                name: e.name,
                message: e.message,
                stack: 'Стек вызовов'
            });
        }
    }
    console.log(res);
}


mix(() => {
    return 0;
}, (prev) => {
    return prev + 1;
}, (prev) => {
    throw new RangeError('Range is wrong');
}, (prev) => {
    return prev * 3;
});

// Функция вернет
/*{
    errors: [{
        name: 'RangeError',
        message: 'Range is wrong',
        stack: 'Стек вызовов'
    }],
        value: 3
}*/