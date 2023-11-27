import 'regenerator-runtime/runtime';
import React from 'react';
import { Switch, Route } from "react-router-dom";

import VerticalLayout from "./Layouts/index";
import WhalesTracker from './pages/WhalesTracker';
import CollectionsTrends from './pages/CollectionsTrends';
import CollectionProfile from './pages/CollectionProfile';
import NearHighlights from './pages/NearHighlights';
import WhalesProfile from './pages/WhalesProfile'
import FeaturedCollectionsMain from './pages/FeaturedCollectionsMain';
import './assets/scss/themes.scss';
import './assets/scss/style.scss';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';


function App() {
    return (
        <VerticalLayout>
            <Switch>
                
                <Route path="/blogs" component={Blog} />
                <Route path="/blog/:url" component ={BlogDetails} />
                <Route path="/whales-tracker" component={WhalesTracker} />
                <Route path="/profile/:userId" component={WhalesProfile} />
                <Route path="/collections/:collectionId" component={CollectionProfile} />
                <Route path="/collections" component={CollectionsTrends} />
                <Route path="/near-highlights" component={NearHighlights} />
                <Route path="/partners" component={FeaturedCollectionsMain} />
                <Route path="/" component={CollectionsTrends} />
                
            </Switch>
        </VerticalLayout>
    );
}

export default App;
