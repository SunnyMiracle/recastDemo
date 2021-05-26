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
