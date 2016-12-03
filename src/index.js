var gutil = require('gulp-util');
module.exports = {
    init(gulp, options, env){
        gutil.log('\n', gutil.colors.green('================= '+ options.name +' Builder ================='), '\n',
            gutil.colors.cyan('Environment:'), env ? 'Development' : 'Production', '\n',
            gutil.colors.green('==================================================='));
        let tasks = [];
        for(var key in options.tasks){
            if (!options.tasks.hasOwnProperty(key)) continue;
            tasks.push(key);
            require('./'+ key + '-task')(gulp,options.tasks[key], env);
        }
        gulp.task('default', tasks);
    }
};