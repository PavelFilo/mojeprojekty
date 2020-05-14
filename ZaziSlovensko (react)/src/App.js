import React, { Suspense, useEffect } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import ScrollToTop from './hoc/scrollToTop/scrollToTop';
import Spinner from './components/UI/Spinner/Spinner';

const Map = React.lazy(() => {
    return import('./containers/map/Map');
});

const HotelItems = React.lazy(() => {
    return import('./containers/hotelItems/hotelItems');
});

const Accommodation = React.lazy(() => {
    return import('./components/Accomodation/accommodation');
});

const FirstStep = React.lazy(() => {
    return import('./containers/AddHotel/FirstStep/FirstStep');
});

const SecondStep = React.lazy(() => {
    return import('./containers/AddHotel/SecondStep/SecondStep');
});



const App = (props) => {

    const { onReloadAuth } = props;

    useEffect(() => {
        onReloadAuth();
    }, [onReloadAuth]);

    let routes = (
        <Switch>
            <Route path='/acco' component={Accommodation} />
            <Route path='/hotely' component={HotelItems} />
            <Route path='/' exact component={Map} />
            <Route path='/' component={Map} />
        </Switch>
    );

    if (props.isLoggedIn) {
        routes = (
            <Switch>
                <Route path='/acco' component={Accommodation} />
                <Route path='/hotely' component={HotelItems} />
                <Route path='/pridat' component={FirstStep} />
                <Route path='/pridatNext' component={SecondStep} />
                <Route path='/' exact component={Map} />
                <Route path='/' component={Map} />
            </Switch>
        );
    }

    return (
        <div className="App">
            <BrowserRouter>
                <ScrollToTop />
                <Layout>
                    <Suspense fallback={<Spinner/>}>
                        {routes}
                    </Suspense>
                </Layout>
            </BrowserRouter>
        </div>
  );
}


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.token != null,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReloadAuth: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);