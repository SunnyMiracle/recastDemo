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
    instanceOf: PropTypes.instanceOf(Test).isRequired,
    oneOf: PropTypes.oneOf([1, 3]),
    oneOf1: PropTypes.oneOf(['1', '2', false]),
    oneOfType: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number, PropTypes.arrayOf(PropTypes.string)]).isRequired,
    arrayOf: PropTypes.arrayOf(PropTypes.string),
    objectOf: PropTypes.objectOf(PropTypes.bool).isRequired,
    objectOf1: PropTypes.objectOf(PropTypes.shape({
      name: PropTypes.string
    }).isRequired),
    shape: PropTypes.shape({
      name: PropTypes.string,
      age: PropTypes.number
    }).isRequired,
    extra: PropTypes.exact({
      gender: PropTypes.oneOf([0, 1]),
      name: PropTypes.string,
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
