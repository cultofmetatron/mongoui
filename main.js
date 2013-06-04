var derby = require('derby');
derby.use(require('./ui'));
var app = derby.createApp(module);

app.ready(function(model) {
  var setCodemirror = function() {
    setTimeout( function() {
      var myCodeMirror = CodeMirror.fromTextArea(document.getElementsByTagName('textarea')[0]);
    }, 100);
  };
  //setCodemirror();
  model.on('set','dbName',function(path,object){
    //setCodemirror();
  });

  model.on('set','collectionBoxName', function(path,obj){
    setCodemirror();
    app.page.render();
  });
  model.on('set','collections',function(path,object){
    console.log('path', path, 'object', object);
    console.log('!',model.get('collections'), app);
    //setCodemirror();
    app.page.render('texteditor');

  });




  model.on('change', 'dbName', function(path, object) {
    console.log('collection boxname changed!!');
    console.log('textarea', document.getElementsByTagName('textarea')[0]);
    var myCodeMirror = CodeMirror.fromTextArea(document.getElementsByTagName('textarea')[0]);
  });

  app.changeDatabase = function(e, element, next) {
    app.model.set('dbName', $(element).find('a').attr('data-value'));
    console.log(app.model.get('dbName'));
    next();
  };
  app.toggleCollection = function (e, element, next){
    app.model.set('collectionBoxName',e.target.dataset.value);
    next();
  };
});

