import React from "react";
import PropTypes from 'prop-types';
import MainHeader from './header/Header.Main';

export default function MainComponent(props) {
  const {ContainerClass, PageTitle, children} = props
  return (
          <React.Fragment>
            <MainHeader 
                PageTitle={PageTitle}
              />
              <main className="App">
                <div className={ ContainerClass }>
                  {children}
                </div>
              </main>
          </React.Fragment>
    );
}


MainComponent.propTypes = {
    children: PropTypes.element.isRequired,
    PageTitle: PropTypes.string.isRequired,
    ContainerClass: PropTypes.string.isRequired,
}