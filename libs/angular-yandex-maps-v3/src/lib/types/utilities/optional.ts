/**
 * See https://github.com/piotrwitek/utility-types/blob/2491e464b9adfa88ff9f799e4fd151aa25b71249/src/mapped-types.ts#L567
 * @internal
 */
export type Optional<T extends object, K extends keyof T = keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
