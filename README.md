# MARVEL1.0-WEB
Single-page application Marvel

Hola, soy Braulio Alexander Chila Rodríguez el autor de esta aplicación web.
Este es un proyecto creado desde cero con angular material, el cual se inclina y es guiado al diseño de Marvel https://www.marvel.com/. Los datos obtenidos en la página es gracias al consumo de la api pública que Marvel ofrece a desarrolladores.

Dentro del árbol se encontrará con codigo descriptivo y componentes individualmente dependientes. Asi como comentarios asignados a los procesos lógicos.
No es un proyecto altamente modular ya que debido al tamaño y requerimientos no es necesario el uso de modulos.
 

# Guía para lanzamiento: 
Hágase del repositorio y baje las actualizaciones más recientes de la rama develop.

# Ubicación del proyecto angular
Dentro de la rama develop encontraras todo el árbol estructurado del proyecto.

# Visualiza el codigo fuente
Una vez clonado el repositorio abra la carpeta en su editor de código de preferencia (recomiendo usar visual estudio code) ya que las herramientas que ofrece son bastante provechosas.

# Instalar paquetes requeridos
Desde la terminal integrada del editor de código o bien sea desde su Terminal de sistema es recomendable ejecutar 
> npm install 
en la ubicación del proyecto para instalar todas las dependencias y paquetes.

# Ejecutar el proyecto
Una vez hecho esto podemos lanzar el servidor local ejecutando 
> ng serve

para visualizar nuestro proyecto en el navegador diríjase a http://localhost:4200/. 


# INFORMACIÓN Y CAPAS DE LA APLICACIÓN:
Este es un proyecto web Angular Material con un diseño agredable y responsive. Se trata de un aplicativo que ofrece información a cerca de los personajes de Marvel y sus relaciones con otros personajes, comics y series, así como la información detallada de cada uno.

Este proyecto está estructurado por componentes:

- Dentro de la carpeta src/app/ se encuantra la carpeta 'components' la cual contiene todas las vistas de la  aplicación.
- La carpeta 'navbar' se encarga de visualizar el encabezado de la aplicación (SPA).
- La carpeta 'providers' almacena todos los servicios que van a ser consumidos por los componentes (conecta con la api de Marvel).
- La carpeta 'assets' contiene todas las imagenes que se usan en la aplicación.
- En el archivo styles.css se encuantran definidos los estilos globales para la aplicación.
