declare module "js-cookie" {
  interface CookiesStatic<T = string> {
    get(name: string): T | undefined;
    set(name: string, value: T, options?: unknown): void;
    remove(name: string, options?: unknown): void;
  }

  const Cookies: CookiesStatic;
  export default Cookies;
}
