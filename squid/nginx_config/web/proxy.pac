function FindProxyForURL(url, host) {
  // -----------------------------------------------------------------
  // Remplazar por la IP de tu servidor Squid
  // -----------------------------------------------------------------
  const proxy = "PROXY 192.168.3.14:3128";
 
  const hosts = [
    "mifel-integracion.modyo.build",
    "mifel-integracion.modyo.be",
    "www.mifel.net"
  ];
 
  if (hosts.indexOf(host) != -1) {
    return proxy;
  }
 
  return "DIRECT";
}