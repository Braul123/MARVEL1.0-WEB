// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/** IMPORTATN * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 //Key para acceder a marvel api cuenta 1 ... usar segunda cuenta en caso de limite de peticiones
 PUBLIC_KEY = '0cfe4d22a69532706e0e75c48a27ec1f';
 HASH = 'a3578f6656d351fa2116d522c7f2d242';
 
 //Segunda Cuenta ... Peticione limitadas

 PUBLIC_KEY2 = 'e8bdf9e3c1fbdc0613bcbd15ec9848b6';
 HASH2 = '9233432e3c656aa4469d4ec2b130ebdc';
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

export const environment = {
  production: false,

  CREDENTIALS : '?ts=1&apikey=0cfe4d22a69532706e0e75c48a27ec1f&hash=a3578f6656d351fa2116d522c7f2d242',
  URL_API     : 'https:gateway.marvel.com/v1/public/',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
