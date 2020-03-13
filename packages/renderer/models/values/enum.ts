export type EnumOrLiteral<T extends { [key: number]: string | number }> = T[keyof T] | keyof T;
