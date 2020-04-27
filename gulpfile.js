//目标：
//1.  把css里面的px 换算成
// 2.  修改html,css文件后，后自动编译文件，刷新浏览器

const gulp = require("gulp")
const vx = require("postcss-px-to-viewport")
const postcss = require("gulp-postcss")
const brower_sync = require("browser-sync")
const jshint = require('gulp-jshint'); 
const babel = require('gulp-babel');
const uglify = require('gulp-uglify'); // 引入js压缩模块
const minhtml = require('gulp-minify-html'); // 引入html压缩模块
// 定义换算的任务 将css目录下的所有css文件中的px转换成vm
const task_pxtovm = (done) => {

	// 需要配置的参数
	let attr = {
	  unitToConvert: 'px',  // 要转换的单位，默认情况下是px
	  viewportWidth: 750, // 视口的宽度
	  unitPrecision: 5, 
	  propList: ['*'],
	  viewportUnit: 'vw',
	  fontViewportUnit: 'vw',
	  selectorBlackList: [],
	  minPixelValue: 1,
	  mediaQuery: false,
	  replace: true,
	  exclude: []
	}

	var processors = [
        vx(attr)
    ];

	gulp.src("./css/*.css")
		// 如果开发WEP端 注释掉 px => vw
		.pipe(postcss(processors))
		.pipe(gulp.dest("build/css/"))
		
	done()
}

// 把index.html 、 js 、image等静态资源 移动到生产打包中环境中
const task_move_assets = (done) => {

	gulp.src("./*.html")
		.pipe(minhtml()) //进行压缩
		.pipe(gulp.dest("build/"))

	gulp.src("./js/*.js")
	    .pipe(babel())
		.pipe(jshint())
		.pipe(uglify())
		.pipe(gulp.dest("build/js/"))

	gulp.src("./images/*")
		.pipe(gulp.dest("build/images/"))

	done()
}

// 初始化启动本地服务 根目录指向生产环境目录
const init_server = (done) => {

	// 启动服务器
	let server = brower_sync.create()
	server.init({
		server: "./build",
		port: 8001,
		ui: { port: 8080 }
	});

	// 监听css、js、html文件是否修改编辑，如果修改编辑后将会重启服务
	let watcher = gulp.watch(["./css/*.css","./js/*.js","./*.html"], gulp.series(task_pxtovm, task_move_assets))
	watcher.on("change", (path, stats) => {
		server.reload()
	})

	done()
}


exports.default = gulp.series(init_server, task_pxtovm, task_move_assets)