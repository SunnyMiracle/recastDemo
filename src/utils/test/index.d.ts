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
    otherInfo: React.ElementType;
}
declare class Loading extends React.Component<IProps, any> {
    tsDeclareMethod(): boolean;
}
export default Loading;