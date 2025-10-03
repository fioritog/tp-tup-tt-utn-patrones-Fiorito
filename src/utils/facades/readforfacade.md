En cada una de las fachadas se arma un archivo con un constructor y un llamado a cada uno de los métodos que le corresponde, no se borran los métodos de "store.ts" porque en la facades se llaman a los métodos, no se ejecutan

Inyección de dependencia en "store.ts" para que se instancien todas juntas las fachadas

Se le agrega el "export" a la clase "inMemoryStorage" para que pueda ser accedida por las fachadas
