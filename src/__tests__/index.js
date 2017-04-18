import {readFileSync as read} from 'fs';
import {spawn} from 'child_process';
import path from 'path';
import test from 'ava';
import size from '../';
import nanoProcessor from '../../processors/nano.js';

function setup (args) {
    return new Promise((resolve, reject) => {
        process.chdir(__dirname);

        let ps = spawn(process.execPath, [
            path.resolve(__dirname, '../../dist/cli.js'),
            '-p',
            path.resolve(__dirname, '../../processors/nano.js'),
        ].concat(args));

        let out = '';
        let err = '';

        ps.stdout.on('data', buffer => (out += buffer));
        ps.stderr.on('data', buffer => (err += buffer));

        ps.on('exit', code => {
            if (err) {
                reject(err);
            }
            resolve([out, code]);
        });
    });
}

test('cli', t => {
    return setup(['test.css']).then(results => {
        let out = results[0];
        t.truthy(~out.indexOf('43 B'));
        t.truthy(~out.indexOf('34 B'));
        t.truthy(~out.indexOf('9 B'));
        t.truthy(~out.indexOf('79.07%'));
    });
});

test('api', t => {
    return size(nanoProcessor, read('test.css', 'utf-8')).then(result => {
        t.deepEqual(result, {
            uncompressed: {
                original: '23 B',
                processed: '14 B',
                difference: '9 B',
                percent: '60.87%',
            },
            gzip: {
                original: '43 B',
                processed: '34 B',
                difference: '9 B',
                percent: '79.07%',
            },
            brotli: {
                original: '27 B',
                processed: '16 B',
                difference: '11 B',
                percent: '59.26%',
            },
        });
    });
});

test('api options', t => {
    return size(
        nanoProcessor,
        '@namespace islands url("http://bar.yandex.ru/ui/islands");', {
            discardUnused: false,
        }
    ).then(result => {
        t.deepEqual(result.gzip.processed, "67 B");
    });
});
