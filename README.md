# Proyecto stub de Node.js y Express

Para instalar la dependencia Express simplemente hacer

```
npm install
```

Para ejecutar hacer 

```
node app
```


##  Sobre HTTPS

Se necesita generar un certificado de HTTPS/TLS para connectarse por HTTPS, para ello generaremos una llave ya que comprar un certificado puede llegar a ser costoso, si no es un certificado gratis de nivel 1.

Para algo simple basta con hacer algo como


levantemos el servidor haciendo

```
node app
```

Ahora veamos de chequear si funcional el certificado que creamos

```bash
openssl s_client -connect localhost:8000
```

Despues de eso podremos correr el cliente, ya seteado con el certificado.

```
node client
```

## Documentacion 

La documentación sobre Express esta en este [link](http://expressjs.com/guide/routing.html). 


Y para algo más detallado ver [acá](http://expressjs.com/4x/api.html)
