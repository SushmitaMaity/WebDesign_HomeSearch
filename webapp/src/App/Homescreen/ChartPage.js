
import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import "./ChartPage.scss";

//data type set
const ChartPage = (props) => {

  const chartData = props.charts;
//setting the data needed for plotting the graph
  const [favoriteCount, setFavoriteCount] = useState([]);
  const [favoriteLabel, setFavoriteLabel] = useState([]);
  const [chartDataFormat, setChartDataFormat] = useState({ });

//counting the favorites
  const getGraph = () => {
    console.log("Hi")
    let favoritecountarray = [];
    let favoritelabels = [];
    console.log("length" + chartData.length)
    //looping the favorite count
    for (var i = 0; i < chartData.length; i++) {
      console.log(i)
      favoritecountarray.push(chartData[i].favorite.length)
      favoritelabels.push(chartData[i].name + " in " + chartData[i].city + " " + chartData[i].states)

    }

    console.log("favoritecountarray" + favoritecountarray);
    console.log("favoritelabels" + favoritelabels);
//setting the count and label
    setFavoriteCount(favoritecountarray)
    setFavoriteLabel(favoritelabels)

    console.log(favoriteCount);
    console.log(favoriteLabel);
    getChartData()
  }

  const getChartData = () => {
 

//details required for plotting the graph label and most liked property
    setChartDataFormat({
      labels : favoriteLabel,
      datasets : [
        {
          label: 'Most Liked Property',
          data: favoriteCount,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)'
          ]
        }
      ]
      
    }
      
      
      
      )
  }




  console.log('chartpage', chartData);
  //getting the data
  return (
    <div>
    <div> <button onClick={getGraph} className="getgraph">Get graph</button> </div> 
      <div>
        <div className="chart">
          {/* setting the data in bar chart */}
          <Bar className="barchart"
            data={chartDataFormat}
            options={{
              title: {
                display: 'Hottest Homes',
                text: 'Hottest Homes',
                fontSize: 25
              },
              legend: {
              
              }

            }}

          />
        </div>
      </div>
    </div>

  )
}

//exporting to the hothomeschart
export default ChartPage;

