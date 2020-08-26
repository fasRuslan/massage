let project_folder = "dist"; //Папка для конечного выполнения проекта
let source_folder = "#src"; //Папка с исходниками

let path = {
	build: {
		html: project_folder + "/",
		css: project_folder + "/css/",
		js: project_folder + "/js/",
		img: project_folder + "/img/",
		fonts: project_folder + "/fonts/",
	},
	src: {
		html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"], //Все файлы кроме файлов которые начинаются с символа подчеркивание 
		css: source_folder + "/scss/style.scss", //Папка со стилями
		js: source_folder + "/js/script.js",
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}", //Две звездочки означает что мы будем слушать все папки в папке img, одна звездочка и точка смотрим расширения которые мы будем слушать
		fonts: source_folder + "/fonts/*.ttf", //интересуют файлы в папке fonts с расширением ttf
	},
	watch: {
		html: source_folder + "/**/*.html", //слушаем все что c расширением html
		css: source_folder + "/scss/**/*.scss", //Папка со стилями
		js: source_folder + "/js/script.js",
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp,jpeg}", //Две звездочки означает что мы будем слушать все папки в папке img, одна звездочка и точка смотрим расширения которые мы будем слушать
	},
	clean: "./" + project_folder + "/"
}

let { src, dest } = require('gulp'),
	gulp = require('gulp'),
	browsersync = require("browser-sync").create(),
	fileinclude = require("gulp-file-include"),
	del = require("del"),
	scss = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	group_media = require("gulp-group-css-media-queries"),
	clean_css = require("gulp-clean-css"),
	rename = require('gulp-rename'),
	uglify = require("gulp-uglify-es").default,
	imagemin = require("gulp-imagemin"),
	webp = require('gulp-webp'),
	// webphtml = require('gulp-webp-html'), ошибка с плагином
	svgSprite = require("gulp-svg-sprite"),
	htmlmin = require('gulp-htmlmin');
// ttf2woff = require('gulp-ttf2woff'), ошибка плагина
// ttf2woff2 = require('gulp-ttfwoff2') ошибка плагина



function browserSync(params) {
	browsersync.init({
		server: {
			baseDir: "./" + project_folder + "/"
		},
		port: 3000,
		notify: false
	})
}

function html() {
	return src(path.src.html)
		.pipe(fileinclude()) //Для сборки файла
		// .pipe(webphtml()) ошибка с плагином
		// .pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

function css() {
	// Получаем исходники
	return src(path.src.css)
		// Обрабатываем Scss
		.pipe(
			scss({
				outputStyle: "expanded"
			})
		)
		//Группируем медиа-запросы
		.pipe(
			group_media()
		)
		// Добавляем вендорные префиксы
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 5 versions"],
				cascade: true
			})
		)
		.pipe(dest(path.build.css))
		//Сжимаем css файл
		.pipe(clean_css())
		// Переименовываем css файл
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		//Выгружаем
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

function js() {
	return src(path.src.js)
		.pipe(fileinclude()) //Для сборки файла
		.pipe(dest(path.build.js))
		.pipe(
			uglify()
		)
		.pipe(rename({
			extname: ".min.js"
		}))
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}

function images() {
	return src(path.src.img)
		.pipe(
			webp({
				quality: 70 //Качество изображения
			})
		)
		.pipe(dest(path.build.img))
		.pipe(src(path.src.img))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3 //0 to 7
			})
		)
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}
//Фавикон
var realFavicon = require('gulp-real-favicon');
var fs = require('fs');

// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function (done) {
	realFavicon.generateFavicon({
		masterPicture: '#src/img/favicon/favicon.ico',
		dest: 'dist/img/icons',
		iconsPath: '/',
		design: {
			ios: {
				pictureAspect: 'noChange',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#da532c',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: false,
						rectangle: false
					}
				}
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#ffffff',
				manifest: {
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			}
		},
		settings: {
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function () {
		done();
	});
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function () {
	return gulp.src(['dist/*.html'])
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest('dist'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function (done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function (err) {
		if (err) {
			throw err;
		}
	});
});

// Шрифты

function font() {
	src(path.src.fonts)
		.pipe(ttf2woff())
		.pipe(dest(path.build.fonts));
	return src(path.src.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts));
}
// Для спрайта
gulp.task("svgSprite", function () {
	return gulp.src([source_folder + '/iconsprite/*.svg'])
	pipe(svgSprite({
		mode: {
			stack: {
				sprite: "../icons/icons.svg", //sprite file name
				//example: true
			}
		}
	}))
		.pipe(dest(path.build.img))
})

// Слежка за изменениями в файле
function watchFiles(params) {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
}
//Очищает папку dist 
function clean(params) {
	return del(path.clean);
}

//Сначало папка дист чиститься потом будет выполняться функция html
let build = gulp.series(clean, gulp.parallel(js, css, html, images));
let watch = gulp.parallel(build, watchFiles, browserSync); //Добавляем функции которые будут выполняться

// exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;