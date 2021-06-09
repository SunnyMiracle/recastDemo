import * as React from "react";
export interface IProps {
    show: boolean;
    name?: string;
    age: number;
    title: React.ReactNode;
    subTitle?: React.ReactElement;
    children: unknown[];
    info?: object;
    say: () => unknown;
    other?: any;
    id: symbol;
    otherInfo: string;
    instanceOf: any;
    oneOf?: 1 | 3;
    oneOf1?: "1" | "2" | false;
    oneOfType: string | number | string[];
    arrayOf?: string[];
    objectOf: {
        [key: string]: boolean
    };
    objectOf1?: {
        [key: string]: {
            name: string,
            [key: string]: any
        }
    };
    shape: {
        name: string,
        age: number,
        [key: string]: any
    };
    extra?: {
        gender: 0 | 1,
        name: string
    };
}
declare class Loading extends React.Component<IProps, any> {}
export default Loading;