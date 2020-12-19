import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import MainComponent from '../main/Main.Component';
import CollapsibleAlert from '../alert/CollapsibleAlert.Component';
import { Log } from '../../utility';


export default function withMainComponent(PageComponent, PageTitle="") {


  const mapStateToProps = state => ({
    ...state
  });

  class HOC extends PureComponent {

    constructor(props) {
        super(props);

      this.state ={
        isLoadingState: false,
        isShowError: false,
        ErrorContent: {
          Title: "Error",
          Message: "",
          Type: "error",
        },
      };
    }

    componentDidMount() {
      if (this.state.isNewLoad) {
        this.setState({ isNewLoad : false });
      }
    }


    showLoaderSpinner = (isShowing, callback=(()=>{}) ) => {
        this.setState({
          isLoadingState: isShowing
        }, callback);
    }

    showErrorMessage = (Title, Message, Type="error", callback=(()=>{}) ) => {
      this.setState({
        isShowError: true,
        ErrorContent: {
          Title,
          Message,
          Type,
        }
      }, callback);
    }

    closeErrorMessage = () => {
      this.setState({
        isShowError: false,
      });
    }

    render() {
        return (
          <MainComponent 
            PageTitle={ PageTitle }
            ContainerClass="something" 
          >
            <Box style={{ marginTop: '10px' }}>
              <CollapsibleAlert
                isShowAlert={this.state.isShowError}
                Title={this.state.ErrorContent.Title}
                AlertSeverity="error"
                onClose={ this.closeErrorMessage.bind(this) }
              >
                { this.state.ErrorContent.Message }
              </CollapsibleAlert>
            </Box>
            <PageComponent {...this.props} ShowLoaderSpinner={this.showLoaderSpinner.bind(this)} ShowErrorMessage={this.showErrorMessage.bind(this)} />
          </MainComponent>

        );
    }

  }

  return withRouter(connect(mapStateToProps)(HOC));
}