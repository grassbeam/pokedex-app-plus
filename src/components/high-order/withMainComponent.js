import React, { PureComponent, lazy } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import MainComponent from '../main/Main.Component';



export default function(PageComponent, PageTitle="") {


  const mapStateToProps = state => ({
    ...state
  });

  class HOC extends PureComponent {

    constructor(props) {
        super(props);

      this.state ={
        isLoadingState: false,
        isError: false,
      };
    }


    showLoaderSpinner = (isShowing, callback=(()=>{}) ) => {
        this.setState({
          isLoadingState: isShowing
        }, callback);
    }

    render() {
        return (
          <MainComponent 
            PageTitle={ PageTitle }
            ContainerClass="something" 
          >
            <PageComponent {...this.props} ShowLoaderSpinner={this.showLoaderSpinner.bind(this)} />
          </MainComponent>

        );
    }

  }

  return withRouter(connect(mapStateToProps)(HOC));
}