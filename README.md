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
nssm install AttendanceServer "C:\Program Files\nodejs\node.exe" "H:\VSCode\ata-auto-io\server.js"
```

## Fix bug on windows

   Error message from window event : *C:\Program Files\nodejs\node.exe for service exited with return code 1.*

   Environment Variables > System Variables : change/add from ```%SystemRoot%\system32\cmd.exe;prefix=C:\Program Files (x86)\nodejs\node.exe``` to ```%SystemRoot%\system32\cmd.exe```

## Server attendance controler

```js
npm start
```

## Client attendance controler

```js
node client
```
