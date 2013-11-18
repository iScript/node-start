
/*
{ message: 'Cast to number failed for value "asdfsdfg" at path "password"',
  name: 'CastError',
  type: 'number',
  value: 'asdfsdfg',
  path: 'password' }


{ message: 'Validation failed',
  name: 'ValidationError',
  errors: 
   { password: 
      { message: '密码不能为空',
        name: 'ValidatorError',
        path: 'password',
        type: 'user defined',
        value: '' },
     username: 
      { message: '用户名不能为空',
        name: 'ValidatorError',
        path: 'username',
        type: 'user defined',
        value: '' } } }
*/
exports.errors = function(errors){
    console.log('[Oops! There was an error]');
    var name = errors.name;
    var errs = [];
    switch(name){
        case 'CastError':
            errs.push(errors);
            break;
        case 'ValidationError':
            for(k in errors.errors){
                errs.push(errors.errors[k]);
            }
            break;
        default:
            errs.push(errors);
    }
    return errs;
}