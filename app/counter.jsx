import React from "react";

export default React.createClass({
  render: function() {
    return (
      <div>
        <div>{this.props.children}</div>
        <div>{this.props.value}</div>
        <button onClick={this.props.syncIncrementCount}>Sync Increment</button>
        <button onClick={this.props.asyncIncrementCount}>Async Increment</button>
        <h1>stock quote</h1>
        <div>{this.props.quote}</div>
        <div>
          <input type="text" ref={(i) => this._symbol = i} />
          <button onClick={() => {
              let symbol = this._symbol.value;
              this.props.asyncGetQuote(symbol);
              this._symbol.value = '';
            }}>Get Quote</button>
        </div>
        <ul>
          {this.props.nums.map(n => <li>{n}</li>)}
        </ul>
      </div>
    );
  },
});
