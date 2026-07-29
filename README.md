# Diff Viewer / Diff Viewer

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
  <img src="https://img.shields.io/badge/dependencies-0-success" alt="Zero deps">
  <img src="https://img.shields.io/badge/port-3465-informational" alt="Port 3465">
</p>

---

## 🇬🇧 English

Side-by-side text and file comparison tool. Custom LCS diff algorithm with highlighted changes and statistics.

### Features

- 📄 Side-by-side comparison
- 🟢 Highlights added/removed/changed lines
- 📊 Change statistics
- ⚡ Custom LCS algorithm (no deps)
- 🌓 Dark/light theme

### Quick Start

```bash
git clone https://github.com/olegmrponsao34-boop/diff-viewer
cd diff-viewer
node server.js
```

Then open `http://localhost:3465` in your browser.

### API

```
POST /api - main endpoint (see source for details)
```

---

## 🇷🇺 Русский

Веб-инструмент для сравнения двух текстов или файлов бок о бок.
## Функции
- Построчное сравнение текста с подсветкой добавленных, удалённых и изменённых строк
- Тёмная и светлая тема
- Статистика: количество добавленных, удалённых и изменённых строк
- Собственная реализация LCS-диффа (без внешних библиотек)
- REST API для сравнения текстов
## Установка и запуск
```bash
git clone https://github.com/olegmrponsao34-boop/diff-viewer.git
cd diff-viewer
npm start
```
Откройте браузер по адресу http://localhost:3465
## API
### POST /api/diff
Тело запроса (JSON):
```json
{
  "oldText": "старый текст",
  "newText": "новый текст"
}
```
Ответ:
```json
{
  "lines": [
    { "type": "same", "oldLine": "...", "newLine": "..." },
    { "type": "removed", "oldLine": "...", "newLine": null },
    { "type": "added", "oldLine": null, "newLine": "..." },
    { "type": "changed", "oldLine": "...", "newLine": "..." }
  ],
  "stats": { "added": 1, "removed": 1, "changed": 0 }
}
```
- `same` — строка не изменилась
- `added` — строка добавлена (зелёный)
- `removed` — строка удалена (красный)
- `changed` — строка изменена (жёлтый)
## Технологии
- Node.js (http-сервер)
- Чистый JavaScript (LCS-алгоритм)
- HTML + CSS (адаптивный дизайн, тёмная тема)
## 💛 Support
If you find this project useful, consider supporting:
```
USDT TRC-20: TYVN7HLcb5nrLVee9k8DBMZofxJur7ZgLB
USDT TON:    UQD4mGTxZsIWXx1bNXJ1fsyN0XKvogr34TGSxB7D4nPzOozF
USDT ERC-20: 0xa79f0713ab132eae54002c9c34fbb837272590c0
```
---

