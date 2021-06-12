import React from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import './index.less';

class Loading extends React.Component {
  static propTypes = {
    show: PT.bool.isRequired,
    name: PT.string,
    age: React.propTypes.number.isRequired,
    title: PT.node.isRequired,
    subTitle: PT.element,
    children: PT.array.isRequired,
    info: PT.object,
    say: PT.func.isRequired,
    other: PT.any,
    id: PT.symbol.isRequired,
    otherInfo: PT.elementType.isRequired,
    instanceOf: PT.instanceOf(Test).isRequired,
    oneOf: PT.oneOf([1, 3]),
    oneOf1: PT.oneOf(['1', '2', false]),
    oneOfType: PT.oneOfType([PT.string.isRequired, PT.number, PT.arrayOf(PT.string)]).isRequired,
    arrayOf: PT.arrayOf(PT.string),
    objectOf: PT.objectOf(PT.bool).isRequired,
    objectOf1: PT.objectOf(PT.shape({
      name: PT.string
    }).isRequired),
    shape: PT.shape({
      name: PT.string,
      age: PT.number
    }).isRequired,
    extra: PT.exact({
      gender: PT.oneOf([0, 1]),
      name: PT.string,
    }),
  };
  static configNum = 100;
  static cofnigName = 'config name';
  static config(info) {

  }

  render() {
    let name = () => {
      const age = 100;
      const person = 1000;
    };
    if (this.props.show) {
      return (
        <div className="global-loading">
          <div className="global-loading-wrap">
            <Spin tip="加载中..." size="large" spinning={this.props.show} />
          </div>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  show: state.gb.act.loadingToggle,
});

export default connect(mapStateToProps)(Loading);
