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
var imagemin = require('gulp-imagemin');
var responsive = require('gulp-responsive');
var spritesmith = require('gulp.spritesmith');


//
// Configuration
//

var config = {
	sass: {
		taskName: 'compile-sass',
		watchFiles: './src/scss/*.scss',
		entryPoint: './src/scss/style.scss',
		dest: './dist/css'
	},
	js: {
		taskName: 'concat-js',
		watchFile: './src/js/*.js',
		entryPoint: './src/js/main.js',
		concatFile: 'main.js',
		dest: './dist/js'
	}, 
	fontAwesome: {
		taskName: 'move-fonts',
		entryPoint: 'node_modules/font-awesome/fonts/**.*',
		dest: './dist/css'
	}, 
	images: {
		taskName: "optimize-images",
		src: "src/images/*",
		dest: "./dist/images",
		responsive: {
			'logoCompleto.png': [ //119, 238, 357
				{
					width: 119,
					rename: { suffix: '-119px'}
				},
				{
					width: 238,
					rename: { suffix: '-238px'}
				},
				{
					width: 357,
					rename: { suffix: '-357px'}
				},
				{
					rename: { suffix: '-original'}
				}
			],
			'logoNombre.png': [ //111, 222, 333
				{
					width: 111,
					rename: { suffix: '-111px'}
				},
				{
					width: 222,
					rename: { suffix: '-222px'}
				},
				{
					width: 333,
					rename: { suffix: '-333px'}
				},
				{
					rename: { suffix: '-original'}
				}
			], 
			'*.*': {
				width: '100%'
			}
		}
	},

	sprites: {
		taskName: "gen-sprites",
		imgSrc: './src/images/sprites/*.png',
		imgName: 'sprite.png',
		cssName: '_sprite.scss',
		imgDest: './dist/images/',
		cssDest: './src/scss/',
		imgPath:  '../images/'
	}

};

// Tarea por defecto, veríficar cambios y en función de ellos lanzar procesos
gulp.task("default", [config.sass.taskName, config.js.taskName, config.images.taskName, config.fontAwesome.taskName, config.sprites.taskName], function(){

	//arrancar el servidor
	browserSync.init( {
		server: "./"
//		proxy: "127.0.0.1:8000"
	});
	
	gulp.watch(config.sass.watchFiles, [config.sass.taskName]); //comprobar cambios en fichero scss recompila el sass
	gulp.watch('./*.html', function() {
		browserSync.reload();
		notify().write("Navegador recargado");
	})		   //comprobar cambios en html y recargar el navegador
	gulp.watch(config.js.watchFile, ["concat-js"]);

});

//
// Compilar SASS
//
gulp.task(config.sass.taskName, function(){
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

gulp.task(config.js.taskName, function() {
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

//
// Mover fuentes Awewsome
//

gulp.task(config.fontAwesome.taskName, function() {
	gulp.src(config.fontAwesome.entryPoint)
	.pipe(gulp.dest(config.fontAwesome.dest));
});

//
// Optimizar imagenes
//

gulp.task(config.images.taskName, function() {
	gulp.src(config.images.src)
	.pipe(responsive(config.images.responsive))
	.pipe(imagemin())
	.pipe(gulp.dest(config.images.dest));
});

//
// Generar sprites para optimizar la carga de la web
//

gulp.task(config.sprites.taskName, function() {
	var spriteData = gulp.src(config.sprites.imgSrc).
	pipe(spritesmith({
		imgName: config.sprites.imgName,
		cssName: config.sprites.cssName,
		imgPath: config.sprites.imgPath+config.sprites.imgName
	}));
	spriteData.img.pipe(gulp.dest(config.sprites.imgDest));
	spriteData.css.pipe(gulp.dest(config.sprites.cssDest));
});
