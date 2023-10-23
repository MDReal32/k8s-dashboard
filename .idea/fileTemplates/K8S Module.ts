#set($className = "")
#foreach($str in $NAME.split("-"))
  #set($str = $str.substring(0,1).toUpperCase()+$str.substring(1))
  #set($className = $className + $str)
#end
#set($fieldName = $className.substring(0, 1).toLowerCase() + $className.substring(1))

import { Module } from "@nestjs/common";

import { ${className}Controller } from "./${NAME}.controller";
import { ${className}Gateway } from "./${NAME}.gateway";
import { ${className}Service } from "./${NAME}.service";

@Module({
  controllers: [${className}Controller],
  providers: [${className}Gateway, ${className}Service],
  exports: [${className}Service]
})
export class ${className}Module {}