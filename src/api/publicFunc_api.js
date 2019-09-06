export function getXScrollSize(params, deltaSize) {
        let x = 0;
        console.log('params', params);
        console.log('deltaSize', deltaSize);
        console.log('total width', x);
        if (params[0]['fixed'] == 'left' && params[0]['title'] == undefined) {
          params.splice(0, 1)
        }
        x = params.reduce((ac, next) => ac + next['width'], deltaSize);
        console.log('total width', '{ x:' , x , '}');
        return x;
}