interface name {
    new (gender);
    <age extends string>(age): boolean;
    aaa: string;
    sayHello(name extends string): boolean;
    worker: (name extends unknown, age extends number) => boolean;
}