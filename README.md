# Servidor SQUID

## Dependencias

* Docker
* Docker Compose

## Configuración en el dispositivo servidor

1. **Clonar el repositorio de código**
   Clona el repositorio que contiene la configuración del servidor Squid.

2. **Configurar la IP del proxy**
   Edita el archivo `proxy.pac` y reemplaza la constante `proxy` con la IP local del dispositivo donde se levantará el contenedor de Squid.

3. **Definir los hosts que pasarán por el proxy**
   Agrega al arreglo `hosts` las URLs (dominios) que deseas que se enruten a través del proxy.

```js
function FindProxyForURL(url, host) {
  // -----------------------------------------------------------------
  // Reemplazar por la IP local del servidor Squid
  // -----------------------------------------------------------------
  const proxy = "PROXY <TU_IP_LOCAL>:3128";

  const hosts = [
    "mifel-integracion.modyo.build",
    "mifel-integracion.modyo.be",
    "www.mifel.net"
    // Agregar más hosts aquí
  ];

  if (hosts.indexOf(host) !== -1) {
    return proxy;
  }

  return "DIRECT";
}
```

4. **Levantar el contenedor**
   Ejecuta el siguiente comando para iniciar el contenedor en segundo plano:

```bash
docker compose up -d
```

## Configuración en el dispositivo cliente

1. **Conexión a la red**
   Asegúrate de que el dispositivo cliente esté conectado a la misma red local que el dispositivo servidor.

2. **Configurar el proxy automático**
   En las propiedades de red del dispositivo cliente, habilita la opción de **proxy con configuración automática** y proporciona la siguiente URL:

```
http://<IP_SERVIDOR_LOCAL>:8080/proxy.pac
```

3. **Validación del enrutamiento**
   A partir de este momento, todas las peticiones que coincidan con los hosts definidos en el archivo `proxy.pac` se enrutarán a través del proxy Squid.

## Consideraciones adicionales

* Verifica que ninguna otra aplicación esté utilizando los puertos **3128** (Squid) y **8080** (servidor del archivo PAC).
* En el dispositivo servidor, asegúrate de que el perfil de red esté configurado como **Privado**, para permitir la visibilidad y el acceso desde otros dispositivos en la red local.
* Si existen firewalls o reglas de seguridad, valida que los puertos mencionados estén habilitados para tráfico entrante.
