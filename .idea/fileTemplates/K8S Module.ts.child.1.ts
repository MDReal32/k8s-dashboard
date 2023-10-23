#set($className = "")
#foreach($str in $NAME.split("-"))
  #set($str = $str.substring(0,1).toUpperCase()+$str.substring(1))
  #set($className = $className + $str)
#end
#set($fieldName = $className.substring(0, 1).toLowerCase() + $className.substring(1))

import { Test, TestingModule } from "@nestjs/testing";

import { ${className}Service } from "./${NAME}.service";

describe("${className}Service", () => {
  let ${fieldName}Service: ${className}Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [${className}Service]
    }).compile();

    ${fieldName}Service = module.get<${className}Service>(${className}Service);
  });

  it("should be defined", () => {
    expect(${fieldName}Service).toBeDefined();
  });
});
