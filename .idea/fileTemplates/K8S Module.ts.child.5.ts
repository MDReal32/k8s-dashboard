#set($className = "")
#foreach($str in $NAME.split("-"))
  #set($str = $str.substring(0,1).toUpperCase()+$str.substring(1))
  #set($className = $className + $str)
#end
#set($fieldName = $className.substring(0, 1).toLowerCase() + $className.substring(1))

import { Test, TestingModule } from "@nestjs/testing";

import { ${className}Controller } from "./${NAME}.controller";

describe("${className}Controller", () => {
  let ${fieldName}Controller: ${className}Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [${className}Controller]
    }).compile();

    ${fieldName}Controller = module.get<${className}Controller>(${className}Controller);
  });

  it("should be defined", () => {
    expect(${fieldName}Controller).toBeDefined();
  });
});
