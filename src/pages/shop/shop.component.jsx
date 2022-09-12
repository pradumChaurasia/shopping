import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateCollections } from '../../redux/shop/shop.actions';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.component';
import CollectionPageContainer from '../collection/collection.component';

class ShopPage extends React.Component {
  unsubscribeFromSnapshot= null;

  //snapshot is going to be snapshot repressentation of collections array 
//that wwe get from firestore abd we would fetch them inside the componentDidMount
  componentDidMount() {
    const { updateCollections } = this.props;

    // fetchCollectionsStartAsync();
    const collectionRef = firestore.collection('collections')
    // in our to get this data
    //

    collectionRef.onSnapshot(async snapshot=>{
      // console.log(snapshot);
      const collectionsMap=convertCollectionsSnapshotToMap(snapshot)
      updateCollections(collectionsMap);
    })
  }



  render() {
    const { match } = this.props;

    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections:collectionsMap=>dispatch(updateCollections(collectionsMap))
});

export default connect(null,
  mapDispatchToProps)(ShopPage);

// import React from 'react';
// import { Route } from 'react-router-dom';

// import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
// import CollectionPage from '../collection/collection.component';

// // const ShopPage = ({ match }) => (
// //   <div className='shop-page'>
// //     <Route exact path={`${match.path}`} component={CollectionsOverview} />
// //     <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
// //   </div>
// // );

// // converting into class component
// class ShopPage extends React.Component {
//  render(){
//   const {match}=this.props
//   return {
    
//     <div className='shop-page'>
//          <Route exact path={`${match.path}`} component={CollectionsOverview} />
//          <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//        </div>

    
//   }
//  }
// }

// export default ShopPage;