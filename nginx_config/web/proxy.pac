function FindProxyForURL(url, host) {
  // -----------------------------------------------------------------
  // Remplazar por la IP de tu servidor Squid
  // -----------------------------------------------------------------
  const proxy = "PROXY 192.168.3.111:3130";
 
  const hosts = [
    "mifel-integracion.modyo.build",
    "mifel-integracion.modyo.be",
    "www.mifel.net",
    "mlg.mifel.com"
  ];
 
  if (hosts.indexOf(host) != -1) {
    return proxy;
  }
 
  return "DIRECT";
}