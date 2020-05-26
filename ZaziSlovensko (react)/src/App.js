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

const ThirdStep = React.lazy(() => {
    return import('./containers/AddHotel/ThirdStep/ThirdStep');
});

const Error = React.lazy(() => {
    return import('./components/UI/ErrorHandler/Error');
});



const App = (props) => {

    const { onReloadAuth, onReset, done } = props;

    useEffect(() => {
        onReloadAuth();
    }, [onReloadAuth]);

    useEffect(() => {
        if (done) { onReset() };
    }, [onReset, done]);

    let routes = (
        <Switch>
            <Route path='/acco' exact component={Accommodation} />
            <Route path='/hotely' exact component={HotelItems} />
            <Route path='/' exact component={Map} />
            <Route path='/' component={Error} />
        </Switch>
    );

    if (props.isLoggedIn) {
        routes = (
            <Switch>
                <Route path='/acco' exact component={Accommodation} />
                <Route path='/hotely' exact component={HotelItems} />
                <Route path='/pridat' exact component={FirstStep} />
                <Route path='/pridat2' exact component={SecondStep} />
                <Route path='/pridatHotel' exact component={ThirdStep} />
                <Route path='/' exact component={Map} />
                <Route path='/' component={Error} />
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
        done: state.addHotel.statusDone,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReloadAuth: () => dispatch(actions.authCheckState()),
        onReset: () => dispatch(actions.resetDone()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);