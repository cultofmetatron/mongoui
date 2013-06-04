var derby = require('derby');
derby.use(require('./ui'));
var app = derby.createApp(module);

app.ready(function(model) {
  //var myCodeMirror = CodeMirror.fromTextArea(document.getElementsByTagName('textarea')[0]);


  model.on('set','dbName',function(path,object){
  });
  model.on('set','collectionBox', function(path,obj){
    app.page.render();
  });
  model.on('set','collections',function(path,object){
    console.log('!',model.get('collections'), app);
    app.page.render();
  });

  app.changeDatabase = function(e, element, next) {
    app.model.set('dbName', $(element).find('a').attr('data-value'));
    console.log(app.model.get('dbName'));
    next();
  };
  app.toggleCollection = function (e, element, next){
    app.model.set('collectionBoxName',e.target.dataset.value);
    next();
  }
});

