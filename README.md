# Web library

## Установка

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/eternal-procrastinator/web-library.git
   ```

2. Перейдите в директорию проекта:

   ```bash
   cd web-library
   ```

3. Установите зависимости и client, и server
  
   ```bash
   cd client
   npm i (--legacy-peer-deps, если вдруг что-то пойдет не так)

   cd ../server
   npm i (--legacy-peer-deps)
   ```

## Запуск

1. Запустите параллельно две консоли (одна будет отвечать за операции с client, другая - с server)

2. Запустите и client, и server:
  
   Client:

   ```bash
   cd client
   npm run dev
   ```

   Server:

   ```bash
   cd server
   npm run start:dev
   ```

3. Откройте страницу http://localhost:5173/

4. Войдите в учетную запись уже существующего пользователя:

   ``email: test@example.com``
   
   ``password: password123``

   Либо зарегистрируйте нового
