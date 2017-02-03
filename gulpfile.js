var gulp = require('gulp'); 
var sass = require('gulp-sass'); //Compilará nuestro SASS
var notify = require('gulp-notify'); //Utilizando las notificaciones de escritorio
var browserSync = require('browser-sync').create(); //Refrescando los cambios en el servidor 
													//¡¡¡ Crea un servidor virtual en el puerto: 3000
var concat = require("gulp-concat");
var browserify = require("browserify");
var tap = require("gulp-tap");
var buffer = require("gulp-buffer");
var sourceMaps = require("gulp-sourcemaps");

//
// Configuration
//

var config = {
	sass: {
		compileSassTaskName: 'compile-sass',
		watchFiles: './src/scss/*.scss',
		entryPoint: './src/scss/style.scss',
		dest: './dist/css'
	},
	js: {
		concatJSTaskName: 'concat-js',
		watchFile: './src/js/*.js',
		entryPoint: './src/js/main.js',
		concatFile: 'main.js',
		dest: './dist/js'
	}
};

// Tarea por defecto, veríficar cambios y en función de ellos lanzar procesos
gulp.task("default", [config.sass.compileSassTaskName, config.js.concatJSTaskName], function(){

	//arrancar el servidor
	browserSync.init( {
//		server: "./"
		proxy: "127.0.0.1:8000"
	});
	
	gulp.watch(config.sass.watchFiles, [config.sass.compileSassTaskName]); //comprobar cambios en fichero scss recompila el sass
	gulp.watch('./*.html', function() {
		browserSync.reload();
		notify().write("Navegador recargado");
	})		   //comprobar cambios en html y recargar el navegador
	gulp.watch(config.js.watchFile, ["concat-js"]);

});

//
// Compilar SASS
//
gulp.task(config.sass.compileSassTaskName, function(){
	gulp.src(config.sass.entryPoint)				//establece fuente
	.pipe(sourceMaps.init())
	.pipe(sass().on('error', function(error) {	//lo compila
		return notify().write(error);
	}))
//	.pipe(postcss([autoprefixer(), cssnano()])) //autoprefija y minifica el css (antes de escribirlo)
	.pipe(sourceMaps.write("./"))
	.pipe(gulp.dest(config.sass.dest))			//genera fichero de salida
	.pipe(browserSync.stream())					//actualiza este fichero en el servidor
	.pipe(notify("SASS Compilado"))				//notifica fin de acción
});

//
// Concatenar JS
//

gulp.task(config.js.concatJSTaskName, function() {
	gulp.src(config.js.entryPoint)
//tap para cada archivo
	.pipe(tap(function(file){
		//lo pasamos por browserify
		file.contents = browserify(file.path, {debug: true})
		.bundle().on('error', function(error){
			return notify().write(error);
		});
	}))
//lo reconvertimos de string a buffer para poder gestionarlo gulp como fichero
	.pipe(buffer())
	.pipe(concat(config.js.concatFile))
	.pipe(sourceMaps.init({loadMaps: true}))
	.pipe(sourceMaps.write("./")) //necesita una carpeta destino
	.pipe(gulp.dest(config.js.dest))
	.pipe(notify("JS Concatenado"))
	.pipe(browserSync.stream());
});



