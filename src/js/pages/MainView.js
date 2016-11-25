import React from "react";
import { connect } from "react-redux";

// Main data store for handling and processing
@connect((store) => {
    return {
        currency: store.socket.currency,
        assets: store.socket.assets,
    };
})

export default class MainView extends React.Component {
    render() {
        const { currency } = this.props;
        if (!currency) return <h1>Loading data</h1>;

        // Render the main dashboard after data has been loaded
        return (
            <main class="page-wrapper">
    			<h1>Portfolio <small>Overview</small></h1>
				<div class="row tile_count">
		            <div class="col-lg-3 col-sm-6 col-xs-12 tile_stats_count">
		              <span class="count_top"><i class="fa fa-usd"></i> Total Net Assets</span>
		              <div class="count">23,500,650</div>
		              <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>4% </i> From last Week</span>
		            </div>
		            <div class="col-lg-3 col-sm-6 col-xs-12 tile_stats_count">
		              <span class="count_top"><i class="fa fa-usd"></i> Portfolio 1 Net Assets</span>
		              <div class="count">12,300,200</div>
		              <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>3% </i> From last Week</span>
		            </div>
		            <div class="col-lg-3 col-sm-6 col-xs-12 tile_stats_count">
		              <span class="count_top"><i class="fa fa-usd"></i> Portfolio 2 Net Assets</span>
		              <div class="count green">7,700,150</div>
		              <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>34% </i> From last Week</span>
		            </div>
		            <div class="col-lg-3 col-sm-6 col-xs-12 tile_stats_count">
		              <span class="count_top"><i class="fa fa-usd"></i> Portfolio 3 Net Assets</span>
		              <div class="count">3,500,300</div>
		              <span class="count_bottom"><i class="red"><i class="fa fa-sort-desc"></i>12% </i> From last Week</span>
		            </div>
				</div>
			    <div class="row">
			        <div class="col-lg-6">
						<div class="x_panel fixed_height">
			                <div class="x_title">
			                  <h2>Gross Assets</h2>
			                  <div class="clearfix"></div>
			                </div>
			                <div class="x_content">
			                </div>
		              	</div>
			        </div>
			        <div class="col-lg-6">
						<div class="x_panel fixed_height">
			                <div class="x_title">
			                  <h2>Foreign Exchange Rates</h2>
			                  <p>Updated on: {currency.date}</p>
			                  <div class="clearfix"></div>
			                </div>
			                <div class="x_content">
			                	<table class="table table-hover">
							    <thead>
							      <tr>
							        <th>Currency</th>
							        <th>Buy/Sell (Base rate: {currency.base})</th>
							      </tr>
							    </thead>
							    <tbody>
							     {Object.keys(currency.rates).map((key, i) => {
									return (							      
										<tr key={i}>
									        <td>{key}</td>
									        <td>{currency.rates[key]}</td>
								      	</tr>
								      );
								})}
							    </tbody>
							  </table>
			                </div>
		              	</div>
			        </div>
			    </div>
			    <div class="row">
			        <div class="col-lg-12">
						<div class="x_panel fixed_height">
			                <div class="x_title">
			                  <h2>Performance of all Assets</h2>
			                  <div class="clearfix"></div>
			                </div>
			                <div class="x_content">
			                </div>
		              	</div>
			        </div>
			    </div>
			    <div class="row">
			        <div class="col-lg-12">
						<div class="x_panel fixed_height">
			                <div class="x_title">
			                  <h2>Related News to your holdings</h2>
			                  <div class="clearfix"></div>
			                </div>
			                <div class="x_content">
			                </div>
		              	</div>
			        </div>
			    </div>
    		</main>
        );
    }
}
