#set($className = "")
#foreach($str in $NAME.split("-"))
  #set($str = $str.substring(0,1).toUpperCase()+$str.substring(1))
  #set($className = $className + $str)
#end
#set($fieldName = $className.substring(0, 1).toLowerCase() + $className.substring(1))

import { Test, TestingModule } from "@nestjs/testing";

import { ${className}Gateway } from "./${NAME}.gateway";

describe("${className}Gateway", () => {
  let ${fieldName}Gateway: ${className}Gateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [${className}Gateway]
    }).compile();

    ${fieldName}Gateway = module.get<${className}Gateway>(${className}Gateway);
  });

  it("should be defined", () => {
    expect(${fieldName}Gateway).toBeDefined();
  });
});
