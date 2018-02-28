# tcomb-validators :fire:

Ready, customizable and scalable validators to use with tcomb forms system or as standalone solution can be used in client side or server.

## Install

`npm i --save tcomb-validators`

## Usage

**Standalone Usage**
    
	import validate, { Email, Min, Max } from 'tcomb-validators;
    
    validate('example.com', Email()); // => false
    validate('Hello world', [ Min(5), Max(10) ]); // => true

**Tcomb Usage**
    
	import { tValidate,  Email, Min, Max } from 'tcomb-validators;
    
	type: t.struct({
      name: tValidate([
        Min(5),
        Max(10),
        Email()
      ])
    })`


## Validators
|  Validator | Description  | Parameters  |
| :------------ | :------------ | :------------ |
| Email  | If valid email  | -  |
|  Min | validate input min lenght  | 1 param -> `Number`  |
|  Max | validate input max lenght  | 1 param -> `Number`  |

** Validators will be updated every period. **
