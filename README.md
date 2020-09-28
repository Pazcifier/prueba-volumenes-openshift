# Cómo configurar y asignar volúmenes de persistencia en tu contenedor de OpenShift
Este repositorio contiene un instructivo y una aplicación de prueba para conocer entender las capacidades de los volúmenes de persistencia que se pueden lograr en un clúster de Openshift.

## Crear el volumen de persistencia
Para crear un volumen tenemos dos acercamientos parecidos:
1. Crear un **Storage Class Name**, una especie de namespace de volúmenes para un mismo proyecto. Dentro de este crear un **Persistent Volume** y por último crear un **Persistent Volume Claim**
2. Crear un **Persistent Volume Claim** dentro de un **Storage Class Name** definido y dejar que se cree un Persistent Volume con valores por defecto.

### Configuraciones de los volúmenes de persistencia
* **Capacidad de Storage**: Cantidad de almacenamiento (En GB) que va a reservar el volumen en esa clase 
  * Valor por defecto: **5 Gi**
* **Modos de Acceso**: Cuántas conexiones se pueden tener en este volumen y las acciones que se pueden realizar
  * Valor por defecto: **ReadWriteOnce**
  * Valores posibles:
    * **ReadWriteOnce (RW0)**: Solo un pod puede acceder, puede leer y escribir
    * **ReadOnlyMany (R0X)**: Varios pods pueden acceder, puede leer
    * **ReadWriteMany (RWX)**: Varios pods pueden acceder, pueden leer y escribir
* **Política de Reclamación**: Qué hacer con los datos cuando se quita un volumen de un pod/despliegue
  * Valor por defecto: **Retain**
  * Valores posibles:
    * **Retain**: No se borran los datos del volumen, permitiendo reclamación manual
    * **Delete**: Se borran los datos del volumen apenas este se desocupa
    
## Persistent Volume Claim
Nosotros no accedemos directamente a los volúmenes de persistencia, más bien reclamamos espacio de ese volumen dedicado para uno o varios pods. Los **Persistent Volume Claims** son esas reclamaciones y son lo que estaremos agregando a los despliegues o pods. Un claim siempre estará atado a un volumen.

### Configuraciones de los volúmenes de persistencia
* **Capacidad de Storage**: Cantidad de almacenamiento (En GB) que va a reservar el volumen en esa clase 
  * Valor por defecto: **5 Gi**
* **Modos de Acceso**: Cuántas conexiones se pueden tener en este volumen y las acciones que se pueden realizar
  * Valor por defecto: **ReadWriteOnce**
  * Valores posibles:
    * **ReadWriteOnce (RW0)**: Solo un pod puede acceder, puede leer y escribir
    * **ReadOnlyMany (R0X)**: Varios pods pueden acceder, puede leer
    * **ReadWriteMany (RWX)**: Varios pods pueden acceder, pueden leer y escribir
    
# Demo
Esta sección es un paso a paso de como crear, configurar, bindear y probar un volumen de persistencia dentro de un contenedor de OpenShift.

## Crear el Volumen de Persistencia
1. En la consola de OpenShift, abrir la vista de administrador e ingresar al apartado de Storage -> Persistent Volume Claim
2. Crear el claim
3. Esperar a que esté disponible para su uso
## Crear nuestro despliegue
1. Abrir la vista de desarrollador y crear un nuevo despliegue
2. Copiar el link del repositorio
3. Desplegar la aplicación (con ruta creada)
4. Esperar que el despliegue esté activo
## Asignar storage
1. Abrir la vista de administrador e ingresar en el apartado de Workloads -> Deployments e ingresar a nuestro despliegue
2. Hacer click en Añadir Storage
3. Agregar el claim recién creado y un path donde va a residir la referencia de nuestro volumen de persistencia (/opt/app-root/src/logs)
4. Aceptar y esperar que se cree nuestra nueva pod

**Nota**: Cada vez que se realice un cambio a nivel del storage en el despliegue se tiene que esperar para crear una nueva pod con las nuevas configuraciones, este proceso puede tardar un poco.

Sabremos que nuestro volumen está bindeado con nuestro despliegue si vamos al path del volumen de referencia y encontramos la carpeta **lost+found**
