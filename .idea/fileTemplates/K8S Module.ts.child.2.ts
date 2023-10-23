#set($className = "")
#foreach($str in $NAME.split("-"))
  #set($str = $str.substring(0,1).toUpperCase()+$str.substring(1))
  #set($className = $className + $str)
#end
#set($fieldName = $className.substring(0, 1).toLowerCase() + $className.substring(1))

import { WebSocketGateway } from "@nestjs/websockets";

import { BaseK8sGateway } from "../../base/base-k8s.gateway";
import { ${className}Service } from "./${NAME}.service";

@WebSocketGateway({ path: "/ws/k8s/v1/resource/${NAME}" })
export class ${className}Gateway extends BaseK8sGateway {
  constructor(private readonly ${fieldName}Service: ${className}Service) {
    super(${fieldName}Service);
  }
}
