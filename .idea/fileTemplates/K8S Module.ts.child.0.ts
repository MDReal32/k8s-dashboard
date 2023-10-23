#set($className = "")
#foreach($str in $NAME.split("-"))
  #set($str = $str.substring(0,1).toUpperCase()+$str.substring(1))
  #set($className = $className + $str)
#end
#set($fieldName = $className.substring(0, 1).toLowerCase() + $className.substring(1))

import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class ${className}Service extends K8sService {
  constructor() {
    super(new Logger(${className}Service.name));
  }
  
  async get${className}Resource(namespace: string) {
    this.expect(namespace, "namespace");

    const ${fieldName}s = await this.catch(
      // implement logic
    );
    return ${fieldName}s.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("someEndpoint");
  }
}
