# Antique-shop
Онлайн-магазин антиквариата

## Запуск проекта в dev режиме

### Установить необходимые инструменты
* Установить рекомендуемую версию Node.js (18.18.0+) https://nodejs.org/en/download/
* Установить npm
    ```bash
    npm install -g npm
    ```
* Установить python, если еще не установлен (3.11.5+) https://www.python.org/downloads/ или с Microsoft Store
* Склонировать репозиторий
    ```bash
    git clone https://github.com/Zayac11/antique-shop
    ```
* Открыть папку в vscode или другом редакторе

### Запуск backend
* Открыть терминал в ide или просто по адресу папки
* Перейти в папку backend
    ```bash
    cd backend
    ```
* Создать вирутальное окружение (должна появиться папка `venv`)
    ```bash
    python -m venv venv
    ```
* Запустить вирутальное окружение (Необходимо запускать каждый раз, когда хотим запустить проект)
    ```bash
    venv\Scripts\activate
    ```
    В терминале должен появиться префикс `venv` (Например `(venv) D:\JS\News-portal\backend> `)
* Установить зависимости из файла `requirements.txt`
    ```bash
    pip install -r requirements.txt
    ```
* Запустить backend
    ```bash
    .\start.bat
    ```
### Запуск frontend
* Открыть НОВЫЙ терминал в ide или просто по адресу папки
* Перейти в папку frontend
    ```bash
    cd frontend
    ```
* Установить зависимости
    ```bash
    npm i --force
    ```
* Запустить проект
    ```bash
    npm start
    ```
Проект откроется по адресу http://localhost:3000/
Для доступа в админку http://127.0.0.1:8000/admin/
### Данные для входа
login: admin2
password: admin
