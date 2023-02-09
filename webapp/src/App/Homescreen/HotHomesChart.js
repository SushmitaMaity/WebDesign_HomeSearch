import React from 'react';
import ChartPage from './ChartPage';

//adding class hothomeschart
class HotHomesChart extends React.Component {
  //adding constructor
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
    };
  }

  // to get all the items from the database
  componentDidMount = () => {
    var toJson = (response) => response.json()
    fetch('config/config.json').then(toJson)
      .then((config) => {
        fetch(config.home_api_url).then(toJson)
          .then((chartData) => {
            //setting the data
            this.setState({ chartData });
          });
      });
  }

  //setting the chartdata after fetching
  render() {
    console.log("inside hot home" + this.state.chartData)
    return (
      <div>
        <ChartPage charts={this.state.chartData}></ChartPage>
      </div>
    )
  }
}

//exporting it to the hothomesdisplay
export default HotHomesChart;
