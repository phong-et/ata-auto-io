# ata-auto-io

## Config token bear

- Change your token attribute ***tokenUser*** at ./aio.cfg.js

    ```js
    {
        tokenUser :'string...'
    }
    ```

## Service attendance

```js
node service
```

## Run as window service

```js
nssm install AttendanceService "C:\Program Files\nodejs\node.exe" "H:\VSCode\ata-auto-io\service.js"
```

## Server attendance controler

```js
npm start
```

## Client attendance controler

```js
node client
```
