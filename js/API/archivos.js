var f =
    {
        txt: null,
        action : null,
        
        createFile: function ()
        {
            f.action = 0;
            f.txt = $('#aSend').val();
            //solicita permisos de aceso al sistema de archivos
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, f.gotFS, f.fail);
        },
        
        //obtiene acceso al sistema de archivos
        gotFS: function(fileSystem) {
            if(f.action == 0)
                fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, f.gotFileEntry, f.fail);
            else
                fileSystem.root.getFile("readme.txt", null, f.gotFileEntry, f.fail);
        },
        //obitne acceso al archivo
        gotFileEntry: function(fileEntry) {
            if(f.action == 0)
                fileEntry.createWriter(f.gotFileWriter, f.fail);
            else
                f.readAsText(fileEntry);
        },
        gotFileWriter: function(writer) {
            writer.onwriteend = function(evt) {
                alert("archivo escrito");
            };
            writer.write(f.txt);
        },
        readFile: function()
        {
            f.action = 1;
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, f.gotFS, f.fail);
        },
        readAsText: function(file) {
            var reader = new FileReader();
            reader.onloadend = function(evt) {
                $('#aGet').text(evt.target.result);
            };
            reader.readAsText(file);
        },
        fail: function(error) {
            alert(error.code);
        }
    };


