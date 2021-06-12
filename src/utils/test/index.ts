import getInterface from "../getInterface";
import touchDTS from "../touchDTS";
import exportE from '../export';
import exportDefault from "../exportDefault";
import  * as path from 'path';
import { print, types } from 'recast';
import getKeyInfo from "../getKeyInfo";
import getClass from "../getClass";
import reactImport from "../reactImport";

const keyInfo = getKeyInfo(path.resolve(__dirname, '../../../files/index.jsx'));

console.log(JSON.stringify(keyInfo));

const IPropsNode = getInterface(keyInfo.PropTypes, 'IProps');
const classNode = getClass(keyInfo.className, 'IProps', 'any');

const importReactStr = print(reactImport).code
const IPropsStr = print(exportE(IPropsNode)).code;
const classNodeStr = 'declare' + ' ' + print(classNode).code;
const exportClassStr = print(exportDefault(types.builders.identifier(keyInfo.className))).code;

touchDTS(path.resolve(__dirname, './index.d.ts'), [importReactStr, IPropsStr, classNodeStr, exportClassStr].join('\n'));

