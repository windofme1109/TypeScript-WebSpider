const path = require('path');

// D:\foo\bar\baz
console.log(path.resolve('/foo/bar', './baz'));
// D:\baz
console.log(path.resolve('foo/bar', '/baz'));
// D:\foo\baw
console.log(path.resolve('/foo/bar', '../baw'));
// D:\baw
console.log(path.resolve('foo', '/bar', '../baw'));
// D:\sss\ttt
console.log(path.resolve('/foo', '/bar', '../sss', 'ttt'));
// D:\Front-End\TypeScript-WebSpider\demo\foo\sss
console.log(path.resolve('foo/aaa', '../sss'));
// console.log(path.resolve('/oo/aaa', '/bar', '../sss'));
// console.log(path.resolve('/oo/aaa', '/bar', '../sss'));
// console.log(path.resolve('/a/b', '../', 'c'));
// D:\a\b\d\c
// console.log(path.resolve('/a/b', 'd/e', '../c'));
// console.log(path.resolve('a/b', '../', '../c'));
// D:\Front-End\TypeScript-WebSpider\demo\wwwroot\vvv\static_files\gif\image.gif
console.log(
    path.resolve('wwwroot/vvv', 'static_files/png/', '../gif/image.gif')
);
