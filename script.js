'use strict';
const jsonInput = document.getElementById('jsonInput');
const outputArea = document.getElementById('outputArea');
const status = document.getElementById('json-status');

function span(text, className) {
    const element = document.createElement('span');
    element.className = className;
    element.textContent = text;
    return element;
}
function parseAndVisualize() {
    outputArea.replaceChildren();
    status.textContent = '';
    status.classList.remove('ui-error');
    if (!jsonInput.value.trim()) return;
    try {
        const data = JSON.parse(jsonInput.value);
        const pending = [{ value: data, path: 'data', parent: outputArea, depth: 0 }];
        let count = 0;
        while (pending.length && count < 3000) {
            const { value, path, parent, depth } = pending.pop();
            const node = document.createElement('div');
            node.className = 'node';
            node.append(span(path, 'path'));
            parent.append(node);
            count++;
            if (value !== null && typeof value === 'object') {
                const array = Array.isArray(value);
                node.append(span(array ? ` // Array(${value.length})` : ' // Object', 'type-label'));
                if (depth >= 100) {
                    node.append(span(' （深さ100で省略）', 'type-label'));
                    continue;
                }
                const keys = Object.keys(value);
                for (let i = keys.length - 1; i >= 0; i--) {
                    const key = keys[i];
                    const suffix = array ? `[${key}]` : /^[A-Za-z_$][\w$]*$/.test(key) ? `.${key}` : `[${JSON.stringify(key)}]`;
                    pending.push({ value: value[key], path: path + suffix, parent: node, depth: depth + 1 });
                }
            } else {
                const type = typeof value;
                node.append(' = ', span(JSON.stringify(value), type === 'string' ? 'val-string' : type === 'number' ? 'val-number' : 'val-boolean'));
            }
        }
        status.textContent = pending.length ? '表示は先頭3000ノードまでです。' : `${count}ノードを表示しました。`;
    } catch (error) {
        status.classList.add('ui-error');
        status.textContent = 'JSONの解析に失敗しました: ' + error.message;
    }
}
function resetAll() {
    jsonInput.value = '';
    outputArea.replaceChildren();
    status.textContent = '';
}
function readFile(file) {
    if (!file) return;
    if (!/\.json$/i.test(file.name) && file.type !== 'application/json') {
        status.textContent = 'JSON形式（.json）のファイルを選択してください。';
        return;
    }
    if (file.size > 5 * 1024 * 1024) {
        status.textContent = 'ファイルは5MB以下にしてください。';
        return;
    }
    const reader = new FileReader();
    reader.onload = () => { jsonInput.value = reader.result; parseAndVisualize(); };
    reader.onerror = () => { status.textContent = 'ファイルを読み込めませんでした。'; };
    reader.readAsText(file);
}
for (const name of ['dragenter', 'dragover', 'dragleave', 'drop']) {
    jsonInput.addEventListener(name, event => {
        event.preventDefault();
        jsonInput.classList.toggle('dragover', name === 'dragenter' || name === 'dragover');
    });
}
jsonInput.addEventListener('drop', event => readFile(event.dataTransfer.files[0]));
document.getElementById('jsonFile').addEventListener('change', event => readFile(event.target.files[0]));
parseAndVisualize();
