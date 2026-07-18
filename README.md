# Diff Viewer

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
