"skip babel";

"use strict";

const YamlUtils = require("YamlUtil").YamlUtil;
const File = Java.type("java.io.File");
const HashMap = Java.type("java.util.HashMap");
const Runtime = Java.type("java.lang.Runtime");
const Thread = Java.type("java.lang.Thread");

class VariableStorage {

  constructor(){
    var Storagefile = new File(YamlUtils.getPath() + "/plugins/VariableStorage/Data.yml")
    var parentfile = Storagefile.getParentFile()
    if(!(parentfile.exists())){
      parent.file.mkdirs()
    }

    if(!(Storagefile.exists())){
      Storagefile.createNewFile()
      this.datamap = new HashMap();
    } else {
      this.datamap = YamlUtils.getDataAs((YamlUtils.getPath() + "/plugins/VariableStorage/Data.yml"), HashMap);
    }

  }

  put(key, value){
    this.datamap.put(key, value);
  }

  replace(key, value){
    this.datamap.replace(key, value)
  }

  remove(key){
    this.datamap.remove(key)
  }

  get(key){
    return this.datamap.get(key)
  }

  save(){
    YamlUtils.dump((YamlUtils.getPath() + "/plugins/VariableStorage/Data.yml"), this.datamap)
  }
}

Runtime.getRuntime().addShutdownHook(new Thread(() => {
  storage.save()
}));

const storage = new VariableStorage()
module.exports = {
  storage
};