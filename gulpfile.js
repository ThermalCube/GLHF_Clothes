const gulp = require('gulp');
const spawn = require('child_process').spawnSync;

//#region Clean

gulp.task('cleanDist', async function (cb) {
    const del = await import('del');
    del.deleteSync(['dist/**', '!dist'], { force: true });
    cb();
});

//#endregion

//#region Build

gulp.task('buildHTML', function (cb) {
    const buildNUI = spawn('npm', ['run', 'build'], { cwd: 'html/', stdio: [0, 'pipe', 'pipe'], shell: true });
    if (buildNUI.error || buildNUI.status != 0) {
        return 'Vite Build failed';
    } else {
        cb();
    }
});

gulp.task('copyHTML', function () {
    return gulp.src('html/dist/**')
        .pipe(gulp.dest('dist/html/dist'))
});

gulp.task('copyLua', function () {
    return gulp.src(['client/**', 'server/**', 'fxmanifest.lua'], { base: '.' })
        .pipe(gulp.dest('dist/'))
});

//#endregion

exports.default = gulp.series('cleanDist', 'buildHTML', 'copyHTML', 'copyLua');