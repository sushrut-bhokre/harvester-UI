const config = require('@rancher/shell/vue.config');

module.exports = config(__dirname, {
  excludes: [],
  // excludes: ['harvester']

  chainWebpack(config) {
    config.plugin('html').tap((args) => {
      if (args && args.length > 0) {
        args[0].title = 'ZEUS';
      }
      return args;
    });

    config.plugin('define').tap((args) => {
      if (args && args[0]) {
        args[0]['process.env.pl'] = JSON.stringify('ZEUS');
      }
      return args;
    });
  }
});
