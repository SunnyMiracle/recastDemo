import * as React from "react";
export interface IProps {
    show: boolean;
    name?: string;
    age: number;
}
declare class Loading extends React.Component<IProps, any> {
    tsDeclareMethod(): boolean;
}
export default Loading;