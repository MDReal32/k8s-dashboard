#set($className = "")
#foreach($str in $NAME.split("-"))
  #set($str = $str.substring(0,1).toUpperCase()+$str.substring(1))
  #set($className = $className + $str)
#end
#set($fieldName = $className.substring(0, 1).toLowerCase() + $className.substring(1))

import { Controller, Get, Param, Query } from "@nestjs/common";

import { ${className}Service } from "./${NAME}.service";

@Controller(["k8s/v1/namespace/:namespace/resource/${NAME}", "k8s/v1/${NAME}"])
export class ${className}Controller {
  constructor(private readonly ${fieldName}Service: ${className}Service) {}

  @Get()
  get${className}Resource(
    @Param("namespace")
    namespaceParam: string,
    @Query("namespace")
    namespaceQuery: string
  ) {
    return this.${fieldName}Service.get${className}Resource(namespaceParam || namespaceQuery);
  }
}
