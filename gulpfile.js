const { src, dest, watch, series, parallel } = require("gulp");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();



const styles = () => {
	return src("./src/scss/**/*.scss")
		.pipe(sass())
		.pipe(dest("./src/css"))
		.pipe(browserSync.stream())
}

const serv = () => {
	browserSync.init({
        server: "./src"
    });

    watch("src/+(scss|sass)/**/*.+(scss|sass)", styles);
    watch("src/*.html").on('change', browserSync.reload);
}

exports.default = parallel(styles, serv);