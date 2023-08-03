import { createZodValidationPipe } from "nestjs-zod";
import { ZodInvalidTypeIssue, ZodIssue, ZodInvalidStringIssue } from "nestjs-zod/z";
import { BadRequestException } from "@nestjs/common";

const isInvalidTypeIssue = (error: Partial<ZodIssue>): error is ZodInvalidTypeIssue =>
  error.code === "invalid_type";

const isInvalidStringIssue = (error: Partial<ZodIssue>): error is ZodInvalidStringIssue =>
  error.code === "invalid_string";

const errorConstructor = (path: string, message: string, additionalData: object = {}) => ({
  path,
  ...additionalData,
  message
});

export const ZodValidationPipe = createZodValidationPipe({
  createValidationException(error) {
    const errors = error.errors.map(err => {
      if (isInvalidTypeIssue(err)) {
        const isEnum = err.expected.includes("|");
        const enumValues = err.expected.split("|").map(v => v.trim().replace(/^['"]|['"]$/g, ""));
        const enumValuesString = enumValues.join(", ");
        const path = err.path.join(".");
        const received = err.received === undefined ? "nothing" : err.received;
        const expected = err.expected === undefined ? "nothing" : err.expected;

        const message = isEnum
          ? `"${path}" value isn't correct. Expected one of: [${enumValuesString}], but got "${received}"`
          : `"${path}" value expected to be "${expected}" but got "${received}"`;

        return {
          path,
          expected: {
            type: isEnum ? "enum" : err.expected,
            values: isEnum ? enumValues : undefined
          },
          received,
          message
        };
      }

      if (isInvalidStringIssue(err)) {
        return `"${err.path.join(".")}" value isn't correct. ${err.message}`;
      }
    });

    throw new BadRequestException(errors, { cause: error });
  }
});
